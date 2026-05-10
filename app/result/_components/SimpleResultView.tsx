'use client'

// Simple report — Notion / Apple-style document.
// Sections: 00 metadata header → 01 executive summary → 02 type → 03 chart →
// 04 strengths → 05 watch-outs → 06 pro preview → CTA.

import Link from 'next/link'
import clsx from 'clsx'
import type { SimpleResult } from '../../../lib/types'
import { QUESTIONS_SIMPLE } from '../../test/_data/questions-simple'
import {
  buildCategoryRows,
  computeReportStats,
  formatReportDate,
  formatReportId,
  SCORE_BAND_ACTION_MESSAGES,
} from '../../../lib/report-stats'
import ReportHeader from './ReportHeader'
import SectionLabel from './SectionLabel'
import KpiCard from './KpiCard'
import ScoreGauge from './ScoreGauge'
import TypeCard from './TypeCard'
import CategoryBreakdownTable from './CategoryBreakdownTable'
import StrengthsList from './StrengthsList'
import CautionsList from './CautionsList'
import ReportFootnote from './ReportFootnote'

interface ISimpleResultViewProps {
  computed: SimpleResult
  answersA: number[]
  answersB: number[]
}

const PRO_LOCKED_PREVIEWS = [
  { key: 'money', label: '돈 & 소비', sample: '저축형 vs 소비형 차이를 시각화' },
  { key: 'family', label: '가족 & 친척', sample: '양가 방문·연락 빈도 갈등 분석' },
  { key: 'future', label: '자녀 & 미래', sample: '인원·육아 분담 시뮬레이션' },
  { key: 'digital', label: '디지털 & 사생활', sample: '비밀번호·SNS 경계 분석' },
  { key: 'communication', label: '소통 & 갈등', sample: '커뮤니케이션 4축 프로파일' },
  { key: 'roadmap', label: '90일 액션 플랜', sample: '단계별 실천 가이드' },
] as const

const SCORE_BAND_TONES = {
  excellent: { tag: 'text-[#c2185b] bg-[#ffeef3]', ring: 'border-[#f47b9b]', score: 'text-[#f47b9b]' },
  good: { tag: 'text-[#2d8a57] bg-[#e8f4ee]', ring: 'border-[#2d8a57]', score: 'text-[#2d8a57]' },
  fair: { tag: 'text-[#b58900] bg-[#fff8e6]', ring: 'border-[#d4a017]', score: 'text-[#d4a017]' },
  caution: { tag: 'text-[#e07020] bg-[#fff0e8]', ring: 'border-[#e07020]', score: 'text-[#e07020]' },
} as const

export const SimpleResultView = ({
  computed,
  answersA,
  answersB,
}: ISimpleResultViewProps) => {
  const { score, type, typeName, goodMatches, conflicts } = computed

  const SIMPLE_CATEGORY_KEYS = new Set(['cleaning', 'laundry', 'organizing', 'rhythm'])

  const categoryRows = buildCategoryRows(
    answersA as never,
    answersB as never,
    QUESTIONS_SIMPLE,
    null,
  ).filter((row) => SIMPLE_CATEGORY_KEYS.has(row.key))

  const filteredGoodMatches = goodMatches.filter((m) => SIMPLE_CATEGORY_KEYS.has(m.category))
  const filteredConflicts = conflicts.filter((m) => SIMPLE_CATEGORY_KEYS.has(m.category))
  const stats = computeReportStats(
    answersA as never,
    answersB as never,
    QUESTIONS_SIMPLE,
    score,
    null,
  )

  const reportId = formatReportId(score, stats.totalQuestions)
  const date = formatReportDate()
  const tone = SCORE_BAND_TONES[stats.scoreBand]

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <article className="max-w-3xl mx-auto px-6 py-12 sm:py-16 bg-white sm:rounded-3xl sm:my-10 sm:shadow-[0_2px_24px_rgba(0,0,0,0.04)] sm:border sm:border-[#e8e8e6]">
        <ReportHeader
          badge="SIMPLE"
          title="생활습관 궁합 리포트"
          subtitle="15개 핵심 항목의 답변 차이를 분석해 두 사람의 생활 적합성을 진단했어요."
          reportId={reportId}
          date={date}
          pages="15문항"
        />

        {/* 01 — Executive summary */}
        <section className="mb-14" aria-labelledby="sec-summary">
          <SectionLabel
            number="01"
            title="종합 진단"
            description="궁합 점수와 핵심 지표를 한눈에 확인하세요."
          />

          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-center mb-6">
            <div
              className={clsx(
                'flex flex-col items-center justify-center w-32 h-32 rounded-full border-[5px]',
                tone.ring,
              )}
              aria-label={`궁합 점수 ${score}점`}
            >
              <span className={clsx('text-[44px] font-bold leading-none tabular-nums', tone.score)}>
                {score}
              </span>
              <span className="text-[11px] text-[#a0a0a0] mt-1 tracking-wide">/ 100</span>
            </div>

            <div>
              <span
                className={clsx(
                  'inline-block text-[11px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md mb-2',
                  tone.tag,
                )}
              >
                {stats.scoreBand === 'excellent' && '환상의 궁합'}
                {stats.scoreBand === 'good' && '양호한 궁합'}
                {stats.scoreBand === 'fair' && '조율 필요'}
                {stats.scoreBand === 'caution' && '주의 필요'}
              </span>
              <h3 id="sec-summary" className="text-[20px] font-semibold tracking-[-0.015em] mb-1.5">
                {scoreHeadline(stats.scoreBand)}
              </h3>
              <p className="text-[15px] text-[#1a1a1a] font-semibold leading-relaxed mb-1">
                {SCORE_BAND_ACTION_MESSAGES[stats.scoreBand]}
              </p>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed">
                평균 답변 차이는{' '}
                <span className="text-[#1a1a1a] font-semibold tabular-nums">
                  {stats.avgDiff.toFixed(1)}점
                </span>
                /3점 척도에서 측정됐어요.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <ScoreGauge score={score} band={stats.scoreBand} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KpiCard
              label="완전 일치"
              value={stats.perfectMatchCount}
              unit={`/ ${stats.totalQuestions}`}
              tone="mint"
              caption="답변이 똑같이 매칭된 항목"
            />
            <KpiCard
              label="대체로 일치"
              value={stats.smallDiffCount}
              unit={`/ ${stats.totalQuestions}`}
              tone="blue"
              caption="1단계 차이의 가벼운 차이"
            />
            <KpiCard
              label="조율 필요"
              value={stats.bigDiffCount}
              unit={`/ ${stats.totalQuestions}`}
              tone="peach"
              caption="2단계 차이의 갈등 가능"
            />
            <KpiCard
              label="큰 차이"
              value={stats.hugeDiffCount}
              unit={`/ ${stats.totalQuestions}`}
              tone="pink"
              caption="3단계, 적극 대화 필요"
            />
          </div>
        </section>

        {/* 02 — Type profile */}
        <section className="mb-14" aria-labelledby="sec-type">
          <SectionLabel
            number="02"
            title="나의 생활유형"
            description="3가지 축(청결·계획성·아침저녁)으로 분류한 8가지 유형 중 하나예요."
          />
          <h3 id="sec-type" className="sr-only">
            생활유형
          </h3>
          <TypeCard type={type} typeName={typeName} />
        </section>

        {/* 03 — Category breakdown */}
        {categoryRows.length > 0 && (
          <section className="mb-14" aria-labelledby="sec-breakdown">
            <SectionLabel
              number="03"
              title="영역별 일치도"
              description={`측정된 ${categoryRows.length}개 영역의 답변 차이를 비교한 결과예요.`}
            />
            <h3 id="sec-breakdown" className="sr-only">
              영역별 일치도
            </h3>
            <CategoryBreakdownTable rows={categoryRows} />
          </section>
        )}

        {/* 04 — Strengths */}
        <section className="mb-14" aria-labelledby="sec-strength">
          <SectionLabel
            number="04"
            title="잘 맞는 부분"
            description="두 분이 비슷하거나 같은 답을 한 항목이에요. 관계의 자산이 됩니다."
          />
          <h3 id="sec-strength" className="sr-only">
            잘 맞는 부분
          </h3>
          <StrengthsList items={filteredGoodMatches} />
        </section>

        {/* 05 — Cautions */}
        <section className="mb-14" aria-labelledby="sec-caution">
          <SectionLabel
            number="05"
            title="신경 써야 할 부분"
            description="답변 차이가 컸던 항목이에요. 미리 대화를 나누는 것만으로 갈등을 크게 줄일 수 있어요."
          />
          <h3 id="sec-caution" className="sr-only">
            신경 써야 할 부분
          </h3>
          <CautionsList items={filteredConflicts} />

          <div className="mt-6 border border-[#e8e8e6] rounded-2xl px-5 py-4 bg-[#fafaf9] flex items-start gap-3">
            <span
              aria-hidden="true"
              className="w-7 h-7 rounded-full bg-[#1a1a1a] text-white text-[12px] font-semibold flex items-center justify-center shrink-0 mt-0.5"
            >
              i
            </span>
            <div>
              <p className="text-[13px] font-semibold text-[#1a1a1a] mb-1">
                지금 이대로면 어떻게 될까요?
              </p>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed">
                위 항목은 결혼 후 1~6개월 안에 가장 자주 다투게 되는 영역이에요. 먼저 알고 합의하면
                관계가 흔들릴 일이 거의 없어요.
              </p>
            </div>
          </div>
        </section>

        {/* 06 — Pro lock preview */}
        <section className="mb-12" aria-labelledby="sec-pro">
          <SectionLabel
            number="06"
            title="프로 리포트에서 더 깊게"
            description="64문항 + 11개 영역 분석 + AI 맞춤 조언 + 90일 액션 플랜이 포함돼요."
          />

          <div className="border border-[#e8e8e6] rounded-2xl bg-gradient-to-br from-[#f0ebf8] via-white to-[#ffeef3] p-5 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {PRO_LOCKED_PREVIEWS.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-3 bg-white/85 border border-white rounded-xl px-4 py-3"
                >
                  <span
                    className="w-6 h-6 rounded-full bg-[#f0ebf8] text-[#7c3aed] text-[10px] font-semibold flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    PRO
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</p>
                    <p className="text-[11px] text-[#6b6b6b] mt-0.5 leading-snug">
                      {item.sample}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-[13px] text-[#7c3aed] font-semibold uppercase tracking-[0.08em]">
                  Pro Report
                </p>
                <p className="text-[16px] font-semibold text-[#1a1a1a]">
                  64문항 · 11개 영역 · AI 맞춤 조언
                </p>
              </div>
              <p className="text-[14px] text-[#6b6b6b]">
                <span className="text-[20px] font-semibold text-[#1a1a1a] tabular-nums">
                  ₩2,900
                </span>
                <span className="text-[#a0a0a0]"> · 일회성 결제</span>
              </p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/pay"
            className={clsx(
              'flex-1 flex items-center justify-center',
              'px-6 py-4 rounded-full',
              'bg-[#1a1a1a] text-white',
              'text-[15px] font-semibold tracking-[-0.01em]',
              'transition-opacity duration-150 hover:opacity-85',
            )}
          >
            프로 리포트 받기 →
          </Link>
          <Link
            href="/test/simple"
            className={clsx(
              'flex-1 flex items-center justify-center',
              'px-6 py-4 rounded-full',
              'border border-[#e8e8e6] text-[#6b6b6b]',
              'text-[15px] font-medium',
              'hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors',
            )}
          >
            다시 시작하기
          </Link>
        </section>

        <ReportFootnote reportId={reportId} />
      </article>
    </main>
  )
}

const scoreHeadline = (band: string): string => {
  switch (band) {
    case 'excellent':
      return '두 사람의 생활 패턴이 매우 잘 맞아요.'
    case 'good':
      return '평균 이상의 안정적인 궁합이에요.'
    case 'fair':
      return '몇몇 영역에서 조율이 필요해요.'
    default:
      return '차이가 큰 만큼, 솔직한 대화가 중요해요.'
  }
}

export default SimpleResultView
