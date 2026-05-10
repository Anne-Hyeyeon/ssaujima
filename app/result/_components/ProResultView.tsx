'use client'

// Pro report — comprehensive Notion / Apple-style document.
// Section flow: header → 01 executive summary → 02 score gauge → 03 type comparison →
// 04 radar chart → 05 category breakdown → 06 heatmap → 07 strengths →
// 08 conflict analysis (TOP 5 + AI) → 09 communication profile →
// 10 90-day roadmap → 11 conclusion → footnote.

import Link from 'next/link'
import { useCallback } from 'react'
import clsx from 'clsx'
import type { ProResult } from '../../../lib/types'
import { saveReport } from '../../../lib/saved-reports'
import { QUESTIONS_PRO } from '../../test/_data/questions-pro'
import {
  buildCategoryRows,
  buildCommunicationProfile,
  computeReportStats,
  formatReportDate,
  formatReportId,
  SCORE_BAND_ACTION_MESSAGES,
} from '../../../lib/report-stats'
import { CompatibilityRadarChart } from './RadarChart'
import { ConflictCard } from './ConflictCard'
import ReportHeader from './ReportHeader'
import SectionLabel from './SectionLabel'
import KpiCard from './KpiCard'
import ScoreGauge from './ScoreGauge'
import CategoryBreakdownTable from './CategoryBreakdownTable'
import CategoryHeatmap from './CategoryHeatmap'
import CommunicationStyle from './CommunicationStyle'
import ActionRoadmap from './ActionRoadmap'
import StrengthsList from './StrengthsList'
import ReportFootnote from './ReportFootnote'

interface IProResultViewProps {
  computed: ProResult
  answersA: number[]
  answersB: number[]
}

const SCORE_BAND_TONES = {
  excellent: { tag: 'text-[#c2185b] bg-[#ffeef3]', score: 'text-[#f47b9b]' },
  good: { tag: 'text-[#2d8a57] bg-[#e8f4ee]', score: 'text-[#2d8a57]' },
  fair: { tag: 'text-[#b58900] bg-[#fff8e6]', score: 'text-[#d4a017]' },
  caution: { tag: 'text-[#e07020] bg-[#fff0e8]', score: 'text-[#e07020]' },
} as const

const TOC_ITEMS = [
  { id: 'sec-summary', number: '01', label: '익스큐티브 서머리' },
  { id: 'sec-gauge', number: '02', label: '궁합 지수 분석' },
  { id: 'sec-radar', number: '03', label: '11개 영역 레이더' },
  { id: 'sec-table', number: '04', label: '영역별 상세 데이터' },
  { id: 'sec-heatmap', number: '05', label: '일치 강도 맵' },
  { id: 'sec-strengths', number: '06', label: '관계의 강점' },
  { id: 'sec-conflicts', number: '07', label: '갈등 항목 TOP 5' },
  { id: 'sec-comm', number: '08', label: '커뮤니케이션 프로파일' },
  { id: 'sec-roadmap', number: '09', label: '90일 액션 플랜' },
  { id: 'sec-conclusion', number: '10', label: '종합 결론' },
] as const

export const ProResultView = ({
  computed,
  answersA,
  answersB,
}: IProResultViewProps) => {
  const { score, typeName, categoryScores, top5Conflicts, aiAdvice, goodMatches } = computed

  const stats = computeReportStats(
    answersA as never,
    answersB as never,
    QUESTIONS_PRO,
    score,
    categoryScores,
  )
  const categoryRows = buildCategoryRows(
    answersA as never,
    answersB as never,
    QUESTIONS_PRO,
    categoryScores,
  )
  const communication = buildCommunicationProfile(
    answersA as never,
    answersB as never,
    QUESTIONS_PRO,
  )

  const reportId = formatReportId(score, stats.totalQuestions)
  const date = formatReportDate()
  const tone = SCORE_BAND_TONES[stats.scoreBand]

  const handleSaveReport = useCallback(() => {
    const raw = localStorage.getItem('ssaujima:user')
    if (!raw) {
      window.location.href = '/login?returnTo=/result/pro'
      return
    }
    const result = saveReport('pro', answersA, answersB, computed)
    if (result) alert('리포트가 저장되었어요!')
  }, [computed, answersA, answersB])

  const isLoggedIn =
    typeof window !== 'undefined' && !!localStorage.getItem('ssaujima:user')

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <article className="max-w-3xl mx-auto px-6 py-12 sm:py-16 bg-white sm:rounded-3xl sm:my-10 sm:shadow-[0_2px_24px_rgba(0,0,0,0.04)] sm:border sm:border-[#e8e8e6]">
        <ReportHeader
          badge="PRO"
          title="생활습관 궁합 종합 리포트"
          subtitle="64문항 · 11개 영역 분석 · AI 맞춤 조언이 포함된 결혼 전 적합성 진단 리포트예요."
          reportId={reportId}
          date={date}
          pages="64문항"
        />

        {/* Table of contents */}
        <nav
          aria-label="목차"
          className="mb-14 border border-[#e8e8e6] rounded-2xl bg-[#fafaf9] px-5 py-4"
        >
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold mb-3">
            목차
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {TOC_ITEMS.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-[13px]">
                <span className="font-mono tabular-nums text-[#a0a0a0] w-7">
                  {item.number}
                </span>
                <a
                  href={`#${item.id}`}
                  className="text-[#1a1a1a] hover:text-[#c2185b] transition-colors flex-1 truncate"
                >
                  {item.label}
                </a>
                <span className="text-[#e8e8e6] flex-1 border-b border-dotted border-[#e8e8e6]" />
              </li>
            ))}
          </ol>
        </nav>

        {/* 01 — Executive summary */}
        <section id="sec-summary" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="01"
            title="익스큐티브 서머리"
            description="이번 리포트의 가장 중요한 4가지 지표를 한눈에 보여드려요."
          />

          <div className="border border-[#e8e8e6] rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white via-[#fafaf9] to-white mb-6">
            <span
              className={clsx(
                'inline-block text-[11px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md mb-4',
                tone.tag,
              )}
            >
              {stats.scoreBand === 'excellent' && '환상의 궁합'}
              {stats.scoreBand === 'good' && '양호한 궁합'}
              {stats.scoreBand === 'fair' && '조율 필요'}
              {stats.scoreBand === 'caution' && '주의 필요'}
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span
                className={clsx(
                  'text-[72px] sm:text-[80px] font-bold leading-none tabular-nums',
                  tone.score,
                )}
              >
                {score}
              </span>
              <span className="text-[24px] font-medium text-[#a0a0a0]">/ 100</span>
            </div>
            <p className="text-[18px] sm:text-[20px] text-[#1a1a1a] font-semibold tracking-[-0.01em] leading-snug mb-2">
              {SCORE_BAND_ACTION_MESSAGES[stats.scoreBand]}
            </p>
            <p className="text-[15px] sm:text-[16px] text-[#6b6b6b] leading-relaxed">
              {scoreHeadline(stats.scoreBand)}
            </p>
            <p className="text-[14px] text-[#6b6b6b] leading-relaxed mt-2">
              유형: <span className="text-[#1a1a1a] font-semibold">{typeName}</span> · 평균 답변 차이{' '}
              <span className="text-[#1a1a1a] font-mono tabular-nums font-semibold">
                {stats.avgDiff.toFixed(1)}
              </span>
              점 · 강점 영역{' '}
              <span className="text-[#1a1a1a] font-semibold">
                {stats.bestCategory?.label ?? '—'}
              </span>{' '}
              · 조율 필요 영역{' '}
              <span className="text-[#1a1a1a] font-semibold">
                {stats.worstCategory?.label ?? '—'}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KpiCard
              label="일치율"
              value={`${stats.agreementRate}`}
              unit="%"
              tone="mint"
              caption="답변 차이 1점 이하 비율"
            />
            <KpiCard
              label="완전 일치"
              value={stats.perfectMatchCount}
              unit={`/ ${stats.totalQuestions}`}
              tone="blue"
              caption="똑같이 매칭된 문항"
            />
            <KpiCard
              label="조율 필요"
              value={stats.bigDiffCount + stats.hugeDiffCount}
              unit={`/ ${stats.totalQuestions}`}
              tone="peach"
              caption="2점 이상 차이 문항"
            />
            <KpiCard
              label="핵심 갈등"
              value={top5Conflicts.length}
              unit="개"
              tone="pink"
              caption="가중 점수 기반 TOP 5"
            />
          </div>
        </section>

        {/* 02 — Score gauge */}
        <section id="sec-gauge" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="02"
            title="궁합 지수 분석"
            description="0~100점 범위에서 4단계 밴드로 환산한 결과예요."
          />
          <ScoreGauge score={score} band={stats.scoreBand} />
        </section>

        {/* 03 — Radar chart */}
        <section id="sec-radar" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="03"
            title="11개 영역 레이더"
            description="두 사람 각자의 영역 점수를 다각형으로 겹쳐 본 모습이에요."
          />
          <div className="border border-[#e8e8e6] rounded-2xl p-5 bg-white">
            <CompatibilityRadarChart categoryScores={categoryScores} />
          </div>
        </section>

        {/* 04 — Category table */}
        <section id="sec-table" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="04"
            title="영역별 상세 데이터"
            description="각 영역의 문항 수, 두 사람의 점수, 최종 일치도를 표로 정리했어요."
          />
          <CategoryBreakdownTable rows={categoryRows} showPartnerScores />
        </section>

        {/* 05 — Heatmap */}
        <section id="sec-heatmap" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="05"
            title="일치 강도 맵"
            description="진할수록 두 사람 답변이 잘 맞은 영역이에요."
          />
          <CategoryHeatmap rows={categoryRows} />
        </section>

        {/* 06 — Strengths */}
        <section id="sec-strengths" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="06"
            title="관계의 강점"
            description="두 분이 가장 잘 맞은 영역들이에요. 이미 합의되어 있는 부분이라, 안정의 토대예요."
          />
          <StrengthsList items={goodMatches} />
        </section>

        {/* 07 — Conflicts + AI advice */}
        <section id="sec-conflicts" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="07"
            title="갈등 항목 TOP 5"
            description="답변 차이와 카테고리 가중치를 곱해 가장 우선 조율이 필요한 항목을 추렸어요."
          />
          <div className="space-y-4">
            {top5Conflicts.map((conflict, idx) => (
              <ConflictCard
                key={conflict.id}
                conflict={conflict}
                advice={aiAdvice.perConflict.find((p) => p.conflictId === conflict.id)}
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* 08 — Communication profile */}
        <section id="sec-comm" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="08"
            title="커뮤니케이션 프로파일"
            description="갈등 해결 방식, 애정 표현 빈도 등 4가지 차원에서 두 사람의 스타일을 비교했어요."
          />
          <CommunicationStyle dimensions={communication} />
        </section>

        {/* 09 — Action roadmap */}
        <section id="sec-roadmap" className="mb-14 scroll-mt-8">
          <SectionLabel
            number="09"
            title="90일 액션 플랜"
            description="결혼 상담 전문가들이 권장하는 단계별 실천 가이드예요."
          />
          <ActionRoadmap />
        </section>

        {/* 10 — Conclusion */}
        <section id="sec-conclusion" className="mb-12 scroll-mt-8">
          <SectionLabel
            number="10"
            title="종합 결론"
            description="AI 상담사가 이번 리포트를 토대로 정리한 두 분에 대한 메시지예요."
          />
          <div className="border border-[#e8e8e6] rounded-2xl p-6 bg-[#fafaf9]">
            <span className="text-[11px] tracking-[0.08em] uppercase text-[#7c3aed] font-semibold mb-3 block">
              AI Advisor
            </span>
            <p className="text-[16px] text-[#1a1a1a] leading-[1.7] whitespace-pre-line">
              {aiAdvice.conclusion}
            </p>
          </div>
        </section>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/test/simple"
            className="flex-1 text-center border border-[#e8e8e6] rounded-full py-3.5 text-[15px] text-[#6b6b6b] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
          >
            다시 시작하기
          </Link>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleSaveReport}
              className="flex-1 text-center bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-semibold hover:bg-[#333] transition-colors"
            >
              리포트 저장하기
            </button>
          ) : (
            <Link
              href="/login?returnTo=/result/pro"
              className="flex-1 text-center bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-semibold hover:bg-[#333] transition-colors"
            >
              리포트 저장하기
            </Link>
          )}
        </div>

        <ReportFootnote reportId={reportId} isFallback={aiAdvice.isFallback} />
      </article>
    </main>
  )
}

const scoreHeadline = (band: string): string => {
  switch (band) {
    case 'excellent':
      return '환상의 궁합이에요. 함께라면 사소한 차이까지 자산이 됩니다.'
    case 'good':
      return '꽤 잘 맞아요. 이번 리포트의 조언만 챙기면 더 단단해질 수 있어요.'
    case 'fair':
      return '평균 수준의 궁합이에요. 핵심 갈등 영역에 집중적으로 대화해 보세요.'
    default:
      return '차이가 큰 만큼, 시간을 들여 솔직하게 이야기해야 할 항목이 많아요.'
  }
}

export default ProResultView
