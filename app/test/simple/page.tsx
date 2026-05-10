'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { QUESTIONS_SIMPLE } from '../_data/questions-simple'
import type { AnswerValue, MockUser } from '../../../lib/types'
import { generateDemoAnswers } from '../../../lib/mock-data'
import {
  bothFinished,
  buildPairedResultUrl,
  submitAnswers,
} from '../../../lib/partner-tests'
import { getUserById } from '../../../lib/mock-auth'
import TestProgressBar from '../_components/TestProgressBar'
import OptionRadio from '../_components/OptionRadio'
import TestGate from '../_components/TestGate'

const HeartIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const SimpleTestRunner = ({ user }: { user: MockUser }) => {
  const router = useRouter()
  const isPink = user.gender === 'female'
  const colorKey = isPink ? 'pink' : 'blue'
  const accent = isPink ? '#f47b9b' : '#6b9bd8'
  const accentDark = isPink ? '#e05e85' : '#4b7bb8'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    () => new Array(15).fill(null),
  )

  useEffect(() => {
    sessionStorage.setItem('ssaujima:simple-answers', JSON.stringify(answers))
  }, [answers])

  const finalize = (filled: AnswerValue[]) => {
    submitAnswers(user.id, 'simple', filled)
    if (user.partnerId && bothFinished(user.id, user.partnerId, 'simple')) {
      const partner = getUserById(user.partnerId)
      const url = buildPairedResultUrl(
        '/result/simple',
        user.id,
        user.gender,
        user.partnerId,
        partner?.gender ?? (user.gender === 'female' ? 'male' : 'female'),
        'simple',
      )
      if (url) {
        router.push(url)
        return
      }
    }
    router.push('/test/simple/waiting')
  }

  const advance = (newAnswers: (AnswerValue | null)[]) => {
    if (currentIndex < 14) {
      setCurrentIndex(currentIndex + 1)
      return
    }
    const filled = newAnswers.filter((v): v is AnswerValue => v !== null)
    if (filled.length < 15) return
    finalize(filled)
  }

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
    setTimeout(() => advance(newAnswers), 280)
  }

  const handleNext = () => {
    if (answers[currentIndex] !== null) advance(answers)
  }

  const handleAutoFill = () => {
    const auto = generateDemoAnswers(15, user.gender)
    setAnswers(auto)
    setTimeout(() => finalize(auto), 200)
  }

  const question = QUESTIONS_SIMPLE[currentIndex]

  return (
    <main
      className={clsx(
        'min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-16',
        isPink
          ? 'bg-gradient-to-br from-[#faf5ff] via-[#fef2f8] to-[#fff0f5]'
          : 'bg-gradient-to-br from-[#f0f5ff] via-[#f5f8ff] to-[#f0f8ff]',
      )}
    >
      <div className="w-full max-w-[420px] sm:max-w-md">
        <div
          className={clsx(
            'bg-white rounded-3xl overflow-hidden',
            isPink
              ? 'shadow-[0_8px_40px_rgba(244,123,155,0.12)]'
              : 'shadow-[0_8px_40px_rgba(107,155,216,0.12)]',
          )}
        >
          <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <HeartIcon color={accent} />
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: accent }}
                >
                  생활 습관 문항
                </span>
              </div>
              <span className="text-xs font-medium text-[#b0a8c0]">
                {currentIndex + 1} / 15
              </span>
            </div>
            <TestProgressBar current={currentIndex + 1} total={15} color={colorKey} />
          </div>

          <div className="px-5 pb-4 sm:px-6">
            <h1 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-[#1a1a1a] leading-snug mb-5 min-h-[66px] sm:min-h-[80px]">
              {question.text}
            </h1>

            <div className="space-y-2.5 sm:space-y-3">
              {question.options.map((option, idx) => (
                <OptionRadio
                  key={idx}
                  option={option}
                  index={idx as 0 | 1 | 2 | 3}
                  selected={answers[currentIndex] === idx + 1}
                  onSelect={() => handleAnswer((idx + 1) as AnswerValue)}
                  color={colorKey}
                />
              ))}
            </div>
          </div>

          <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6 flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#a0a0a0]">
              @{user.id}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={answers[currentIndex] === null}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer"
              style={{ background: `linear-gradient(to right, ${accent}, ${accentDark})` }}
              aria-label="다음 질문으로 이동"
            >
              다음 질문
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Auto-fill (skip for free version) */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleAutoFill}
            className={clsx(
              'text-[12px] font-medium tracking-wide',
              'border border-dashed rounded-full px-4 py-1.5',
              'transition-colors',
              isPink
                ? 'border-[#f47b9b]/50 text-[#c2185b] hover:bg-[#fff5f8]'
                : 'border-[#6b9bd8]/50 text-[#2c5282] hover:bg-[#f0f7ff]',
            )}
          >
            시연용 — 자동 응답으로 스킵
          </button>
          <span className="text-[10px] text-[#a0a0a0]">
            데모용 빠른 시연 버튼이에요. 자동으로 모든 항목을 채워 결과로 이동해요.
          </span>
        </div>
      </div>
    </main>
  )
}

export default function SimpleTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] text-[#a0a0a0] text-sm">
          로딩 중...
        </div>
      }
    >
      <TestGate track="simple">
        {(user) => <SimpleTestRunner user={user} />}
      </TestGate>
    </Suspense>
  )
}
