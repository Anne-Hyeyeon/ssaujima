// Shared lib: derived statistics for the report — built on top of calculator output.
// Pure functions, deterministic, UI-agnostic.

import type {
  Answers,
  CategoryKey,
  Question,
} from './types'
import { CATEGORY_LABELS, CATEGORY_ORDER } from './types'

export type AgreementBand = 'aligned' | 'mostly' | 'mixed' | 'apart'
export type ScoreBand = 'excellent' | 'good' | 'fair' | 'caution'

export interface ReportStats {
  totalQuestions: number
  perfectMatchCount: number
  smallDiffCount: number
  bigDiffCount: number
  hugeDiffCount: number
  avgDiff: number
  agreementRate: number
  bestCategory: { key: CategoryKey; label: string; agreement: number } | null
  worstCategory: { key: CategoryKey; label: string; agreement: number } | null
  scoreBand: ScoreBand
  scorePercentile: number
}

export interface CategoryRow {
  key: CategoryKey
  label: string
  questionCount: number
  agreement: number
  band: AgreementBand
  aScore: number | null
  bScore: number | null
  diffSum: number
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const toBand = (agreement: number): AgreementBand => {
  if (agreement >= 85) return 'aligned'
  if (agreement >= 65) return 'mostly'
  if (agreement >= 45) return 'mixed'
  return 'apart'
}

export const BAND_LABELS: Record<AgreementBand, string> = {
  aligned: '거의 일치',
  mostly: '대체로 일치',
  mixed: '일부 차이',
  apart: '큰 차이',
}

export const SCORE_BAND_LABELS: Record<ScoreBand, string> = {
  excellent: '환상의 궁합',
  good: '양호',
  fair: '조율 필요',
  caution: '주의 필요',
}

const computeScoreBand = (score: number): ScoreBand => {
  if (score >= 80) return 'excellent'
  if (score >= 65) return 'good'
  if (score >= 45) return 'fair'
  return 'caution'
}

// Synthetic, deterministic percentile so users see "상위 X%" framing.
// Anchored to the score so demos look consistent across reloads.
const computeScorePercentile = (score: number): number => {
  const raw = 100 - score * 0.95
  return clamp(Math.round(raw), 1, 99)
}

export const computeReportStats = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
  score: number,
  categoryScores: Record<CategoryKey, { a: number; b: number }> | null,
): ReportStats => {
  const n = Math.min(answersA.length, answersB.length, questions.length)
  let perfect = 0
  let small = 0
  let big = 0
  let huge = 0
  let diffSum = 0

  for (let i = 0; i < n; i += 1) {
    const d = Math.abs(answersA[i] - answersB[i])
    diffSum += d
    if (d === 0) perfect += 1
    else if (d === 1) small += 1
    else if (d === 2) big += 1
    else huge += 1
  }

  const avgDiff = n === 0 ? 0 : diffSum / n
  const agreementRate = n === 0 ? 100 : Math.round(((perfect + small) / n) * 100)

  let best: ReportStats['bestCategory'] = null
  let worst: ReportStats['worstCategory'] = null

  if (categoryScores) {
    const rows = CATEGORY_ORDER.map((key) => {
      const { a, b } = categoryScores[key]
      const present = a !== 0 || b !== 0
      const agreement = clamp(100 - Math.abs(a - b), 0, 100)
      return { key, label: CATEGORY_LABELS[key], agreement, present }
    }).filter((r) => r.present)

    if (rows.length > 0) {
      const sorted = [...rows].sort((x, y) => y.agreement - x.agreement)
      best = sorted[0]
      worst = sorted[sorted.length - 1]
    }
  }

  return {
    totalQuestions: n,
    perfectMatchCount: perfect,
    smallDiffCount: small,
    bigDiffCount: big,
    hugeDiffCount: huge,
    avgDiff: Math.round(avgDiff * 10) / 10,
    agreementRate,
    bestCategory: best,
    worstCategory: worst,
    scoreBand: computeScoreBand(score),
    scorePercentile: computeScorePercentile(score),
  }
}

// Per-category breakdown (used for tables, heatmaps, detail charts).
export const buildCategoryRows = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
  categoryScores: Record<CategoryKey, { a: number; b: number }> | null,
): CategoryRow[] => {
  const buckets: Record<string, { count: number; diffSum: number }> = {}
  const n = Math.min(answersA.length, answersB.length, questions.length)

  for (let i = 0; i < n; i += 1) {
    const cat = questions[i].category
    if (!buckets[cat]) buckets[cat] = { count: 0, diffSum: 0 }
    buckets[cat].count += 1
    buckets[cat].diffSum += Math.abs(answersA[i] - answersB[i])
  }

  return CATEGORY_ORDER.filter((key) => buckets[key] && buckets[key].count > 0).map((key) => {
    const { count, diffSum } = buckets[key]
    const maxDiff = 3 * count
    const agreement = maxDiff === 0 ? 100 : Math.round((1 - diffSum / maxDiff) * 100)
    const aScore = categoryScores?.[key].a ?? null
    const bScore = categoryScores?.[key].b ?? null
    return {
      key,
      label: CATEGORY_LABELS[key],
      questionCount: count,
      agreement: clamp(agreement, 0, 100),
      band: toBand(agreement),
      aScore,
      bScore,
      diffSum,
    }
  })
}

// Communication style — derived from communication-related answers (Pro).
// Returns 4 dimensions with 0-100 scores for each partner.
export interface CommunicationDimension {
  key: 'directness' | 'resolution' | 'expression' | 'reactivity'
  label: string
  description: string
  aValue: number
  bValue: number
}

const toPercent = (answer: number | undefined, invert = false): number => {
  if (answer === undefined) return 50
  const base = ((answer - 1) / 3) * 100
  return Math.round(invert ? 100 - base : base)
}

export const buildCommunicationProfile = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
): CommunicationDimension[] => {
  const findIdx = (predicate: (q: Question) => boolean) =>
    questions.findIndex(predicate)

  const idxResolution = findIdx((q) => q.category === 'communication' && q.text.includes('다툼'))
  const idxExpression = findIdx((q) => q.category === 'communication' && q.text.includes('애정'))
  const idxDirect = findIdx((q) => q.category === 'communication' && q.text.includes('감정'))
  const idxNight = findIdx((q) => q.category === 'communication' && q.text.includes('자기 전'))

  return [
    {
      key: 'resolution',
      label: '갈등 해결 속도',
      description: '다툼이 생겼을 때 얼마나 빨리 풀려고 하는지',
      aValue: toPercent(answersA[idxResolution], true),
      bValue: toPercent(answersB[idxResolution], true),
    },
    {
      key: 'expression',
      label: '애정 표현 빈도',
      description: '평소에 애정을 얼마나 자주 표현하는지',
      aValue: toPercent(answersA[idxExpression], true),
      bValue: toPercent(answersB[idxExpression], true),
    },
    {
      key: 'directness',
      label: '직설적 표현',
      description: '감정과 의견을 얼마나 직접적으로 말하는지',
      aValue: toPercent(answersA[idxDirect], true),
      bValue: toPercent(answersB[idxDirect], true),
    },
    {
      key: 'reactivity',
      label: '즉시 화해 성향',
      description: '자기 전에는 꼭 풀어야 한다는 원칙',
      aValue: toPercent(answersA[idxNight], true),
      bValue: toPercent(answersB[idxNight], true),
    },
  ]
}

// Format helper for "Report ID" UX flair: ssj-{date}-{hash}
export const formatReportId = (score: number, totalQuestions: number): string => {
  const seed = (score * 31 + totalQuestions * 7 + 127) % 9999
  return `SSJ-${String(seed).padStart(4, '0')}`
}

export const formatReportDate = (d = new Date()): string => {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}
