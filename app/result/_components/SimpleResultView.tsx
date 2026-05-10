'use client'

// Result UI: Simple compatibility result display with locked PRO preview

import Link from 'next/link'
import clsx from 'clsx'
import type { SimpleResult } from '../../../lib/types'
import { CATEGORY_LABELS } from '../../../lib/types'

interface ISimpleResultViewProps {
  computed: SimpleResult
}

const getScoreMessage = (score: number): string => {
  if (score >= 80) return '궁합이 아주 좋아요!'
  if (score >= 60) return '평균 이상이에요.'
  if (score >= 40) return '조율이 필요한 부분이 있어요.'
  return '차이가 꽤 있어요. 대화가 중요해요.'
}

const Divider = () => <hr className="border-t border-[#e8e8e6]/50 my-8" />

const PRO_LOCKED_CATEGORIES = [
  { key: 'money', label: '돈 & 소비' },
  { key: 'family', label: '가족 & 친척' },
  { key: 'future', label: '자녀 & 미래' },
  { key: 'digital', label: '디지털 & 사생활' },
] as const

export const SimpleResultView = ({ computed }: ISimpleResultViewProps) => {
  const { score, typeName, goodMatches, conflicts } = computed
  const scoreMessage = getScoreMessage(score)

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-16 px-6">

        {/* Score circle */}
        <section className="flex flex-col items-center mb-10" aria-label="궁합 점수">
          <div
            className={clsx(
              'flex flex-col items-center justify-center',
              'w-40 h-40 rounded-full border-4 border-[#f47b9b]',
              'mb-4',
            )}
          >
            <span className="text-[64px] font-bold leading-none text-[#f47b9b]">{score}</span>
            <span className="text-sm text-[#a0a0a0] mt-1">점 / 100</span>
          </div>
          <p className="text-base text-[#6b6b6b] font-medium">{scoreMessage}</p>
        </section>

        {/* Type badge */}
        <section className="flex flex-col items-center mb-4" aria-label="생활 유형">
          <span className="inline-block px-3 py-1 rounded-full bg-[#ffeef3] text-[#c2185b] text-xs font-semibold tracking-wide mb-2">
            내 유형
          </span>
          <h2 className="text-2xl font-semibold text-[#1a1a1a]">{typeName}</h2>
        </section>

        <Divider />

        {/* Good matches */}
        <section aria-label="잘 맞는 부분">
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">잘 맞는 부분</h3>
          {goodMatches.length === 0 ? (
            <p className="text-[#a0a0a0] text-sm">공통점을 찾아보는 중이에요.</p>
          ) : (
            <ul className="space-y-3">
              {goodMatches.map((item) => (
                <li key={item.index} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#e8f4ee] text-[#2d8a57] text-xs font-bold shrink-0"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <div>
                    <span className="text-xs text-[#a0a0a0] block mb-0.5">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    <span className="text-sm text-[#1a1a1a]">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Divider />

        {/* Conflicts */}
        <section aria-label="부딪힐 수 있는 부분">
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">부딪힐 수 있는 부분</h3>
          {conflicts.length === 0 ? (
            <p className="text-[#a0a0a0] text-sm">갈등 요소가 많지 않아요.</p>
          ) : (
            <ul className="space-y-3">
              {conflicts.map((item) => (
                <li key={item.index} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#fff0e8] text-[#e07020] text-xs font-bold shrink-0"
                    aria-hidden="true"
                  >
                    !
                  </span>
                  <div>
                    <span className="text-xs text-[#a0a0a0] block mb-0.5">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    <span className="text-sm text-[#1a1a1a]">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Divider />

        {/* Locked PRO section */}
        <section aria-label="프로 리포트 미리보기">
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">심층 분석</h3>
          <div className="relative rounded-2xl bg-[#f0ebf8] p-6 overflow-hidden">
            {/* Blurred preview grid */}
            <div className="grid grid-cols-2 gap-3 blur-sm select-none" aria-hidden="true">
              {PRO_LOCKED_CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center gap-2 bg-white/70 rounded-xl p-3"
                >
                  <span className="text-lg">🔒</span>
                  <span className="text-sm font-medium text-[#1a1a1a]">{cat.label}</span>
                </div>
              ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[#f0ebf8]/70">
              <p className="text-base font-semibold text-[#5b3e8c] text-center px-4">
                프로 리포트에서 확인하세요
              </p>
              <p className="text-xs text-[#7c5ab8] mt-1 text-center">
                돈, 가족, 미래, 디지털 항목 포함
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* CTAs */}
        <section className="flex flex-col items-center gap-4">
          <Link
            href="/pay"
            className={clsx(
              'flex items-center justify-center',
              'w-full max-w-sm',
              'px-6 py-4',
              'rounded-2xl',
              'bg-[#1a1a1a] text-white',
              'text-base font-semibold',
              'transition-opacity duration-150 hover:opacity-80',
            )}
          >
            프로 리포트 받기 →
          </Link>

          <Link
            href="/test/simple"
            className="text-sm text-[#a0a0a0] hover:text-[#1a1a1a] transition-colors duration-150 underline underline-offset-2"
          >
            다시 시작하기
          </Link>
        </section>
      </div>
    </main>
  )
}

export default SimpleResultView
