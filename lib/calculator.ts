// Shared lib: score calculation and result computation for 싸우지마 test

import type {
  Answers,
  CategoryKey,
  TypeKey,
  SimpleResult,
  ProResult,
  Insight,
  ConflictDetail,
  Question,
} from './types'
import { CATEGORY_LABELS, TYPE_NAMES } from './types'

// Score: sum of |a-b| for each question, normalized to 0-100
// Max possible diff per question is 3, so max total = 3 * n
// Score = 100 - (totalDiff / maxDiff) * 100
export const calculateSimpleScore = (answersA: Answers, answersB: Answers): number => {
  const n = Math.min(answersA.length, answersB.length)
  if (n === 0) return 100

  const totalDiff = answersA.slice(0, n).reduce((sum, a, i) => sum + Math.abs(a - answersB[i]), 0)
  const maxDiff = 3 * n
  return Math.round((1 - totalDiff / maxDiff) * 100)
}

// Type from 3 axes based on first 9 questions (0-indexed)
// cleanScore = answersA[0]+answersA[1]+answersA[2], clean='tidy' if <6 else 'relaxed'
// planScore = answersA[6]+answersA[7], plan='planner' if <4 else 'spontaneous'
// timeScore = answersA[8], time='morning' if <2.5 else 'night'
export const classifyType = (answers: Answers): TypeKey => {
  const cleanScore = (answers[0] ?? 1) + (answers[1] ?? 1) + (answers[2] ?? 1)
  const planScore = (answers[6] ?? 1) + (answers[7] ?? 1)
  const timeScore = answers[8] ?? 1

  const clean: 'tidy' | 'relaxed' = cleanScore < 6 ? 'tidy' : 'relaxed'
  const plan: 'planner' | 'spontaneous' = planScore < 4 ? 'planner' : 'spontaneous'
  const time: 'morning' | 'night' = timeScore < 2.5 ? 'morning' : 'night'

  return `${clean}-${plan}-${time}` as TypeKey
}

// Extract good matches (diff <= 1, top 3) and conflicts (diff >= 2, top 3)
export const extractInsights = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
): { goodMatches: Insight[]; conflicts: Insight[] } => {
  const n = Math.min(answersA.length, answersB.length, questions.length)

  const diffs = Array.from({ length: n }, (_, i) => ({
    index: i,
    category: questions[i].category,
    text: questions[i].text,
    diff: Math.abs(answersA[i] - answersB[i]),
  }))

  const goodMatches: Insight[] = diffs
    .filter((d) => d.diff <= 1)
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 3)
    .map((d) => ({ index: d.index, category: d.category, text: d.text, diff: d.diff }))

  const conflicts: Insight[] = diffs
    .filter((d) => d.diff >= 2)
    .sort((a, b) => b.diff - a.diff)
    .slice(0, 3)
    .map((d) => ({ index: d.index, category: d.category, text: d.text, diff: d.diff }))

  return { goodMatches, conflicts }
}

// Each person's score per category: average answer value mapped to 0-100
// (answerValue - 1) / 3 * 100
export const calculateCategoryScores = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
): Record<CategoryKey, { a: number; b: number }> => {
  const buckets: Record<string, { aSum: number; bSum: number; count: number }> = {}

  const n = Math.min(answersA.length, answersB.length, questions.length)
  for (let i = 0; i < n; i++) {
    const cat = questions[i].category
    if (!buckets[cat]) buckets[cat] = { aSum: 0, bSum: 0, count: 0 }
    buckets[cat].aSum += answersA[i]
    buckets[cat].bSum += answersB[i]
    buckets[cat].count += 1
  }

  const result = {} as Record<CategoryKey, { a: number; b: number }>
  for (const [cat, { aSum, bSum, count }] of Object.entries(buckets)) {
    result[cat as CategoryKey] = {
      a: Math.round(((aSum / count - 1) / 3) * 100),
      b: Math.round(((bSum / count - 1) / 3) * 100),
    }
  }

  // Fill any missing categories with 0
  const allCategories = Object.keys(CATEGORY_LABELS) as CategoryKey[]
  for (const cat of allCategories) {
    if (!result[cat]) result[cat] = { a: 0, b: 0 }
  }

  return result
}

const CATEGORY_WEIGHTS: Record<CategoryKey, number> = {
  money: 1.5,
  family: 1.5,
  digital: 1.5,
  communication: 1.3,
  future: 1.3,
  cleaning: 1.0,
  laundry: 1.0,
  organizing: 1.0,
  food: 1.0,
  rhythm: 1.0,
  social: 1.0,
}

// Extract top 5 conflicts: questions where |a-b| >= 2, weighted by category
export const extractTop5Conflicts = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
): ConflictDetail[] => {
  const n = Math.min(answersA.length, answersB.length, questions.length)

  const candidates = Array.from({ length: n }, (_, i) => {
    const diff = Math.abs(answersA[i] - answersB[i])
    const cat = questions[i].category
    const weight = CATEGORY_WEIGHTS[cat] ?? 1.0
    return {
      id: i,
      questionId: questions[i].id,
      category: cat,
      title: questions[i].text,
      diff,
      weight,
      weightedScore: diff * weight,
    }
  })
    .filter((c) => c.diff >= 2)
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .slice(0, 5)

  return candidates.map(({ id, questionId, category, title, diff, weight }) => ({
    id,
    questionId,
    category,
    title,
    diff,
    weight,
  }))
}

export const computeSimple = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
): SimpleResult => {
  const score = calculateSimpleScore(answersA, answersB)
  const type = classifyType(answersA)
  const typeName = TYPE_NAMES[type]
  const { goodMatches, conflicts } = extractInsights(answersA, answersB, questions)

  return { score, type, typeName, goodMatches, conflicts }
}

export const computePro = (
  answersA: Answers,
  answersB: Answers,
  questions: Question[],
): Omit<ProResult, 'aiAdvice'> => {
  const simple = computeSimple(answersA, answersB, questions)
  const categoryScores = calculateCategoryScores(answersA, answersB, questions)
  const top5Conflicts = extractTop5Conflicts(answersA, answersB, questions)

  return { ...simple, categoryScores, top5Conflicts }
}
