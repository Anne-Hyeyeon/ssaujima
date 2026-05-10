'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { QUESTIONS_PRO } from '../_data/questions-pro'
import { encodeAnswers } from '../../../lib/url-codec'
import { CATEGORY_LABELS } from '../../../lib/types'
import type { AnswerValue } from '../../../lib/types'
import TestProgressBar from '../_components/TestProgressBar'
import OptionRadio from '../_components/OptionRadio'

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b9bd8" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

function ProTestPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === '1'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(new Array(64).fill(null))

  useEffect(() => {
    sessionStorage.setItem('ssaujima:pro-answers', JSON.stringify(answers))
  }, [answers])

  const currentAnswer = answers[currentIndex]

  const advance = (newAnswers: (AnswerValue | null)[]) => {
    if (currentIndex < 63) {
      setCurrentIndex(currentIndex + 1)
    } else {
      const encoded = encodeAnswers(newAnswers.filter(Boolean) as AnswerValue[])
      router.push(`/result/pro?a=${encoded}`)
    }
  }

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
    setTimeout(() => advance(newAnswers), 280)
  }

  const handleNext = () => {
    if (currentAnswer !== null) advance(answers)
  }

  const question = QUESTIONS_PRO[currentIndex]
  const categoryName = CATEGORY_LABELS[question.category]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f5ff] via-[#f5f0ff] to-[#f0f8ff] px-4 py-10 sm:py-16">
      <div className="w-full max-w-[390px] sm:max-w-sm md:max-w-md lg:max-w-lg">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(107,155,216,0.12)] overflow-hidden">

          {/* Header */}
          <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <StarIcon />
                <span className="text-xs font-semibold text-[#6b9bd8] tracking-wide">{categoryName}</span>
              </div>
              <span className="text-xs font-medium text-[#b0b8c8]">{currentIndex + 1} / 64</span>
            </div>
            <TestProgressBar current={currentIndex + 1} total={64} color="blue" />
          </div>

          {/* Question */}
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
                  color="blue"
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6 flex items-center justify-between">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 opacity-60"
              aria-hidden="true"
            >
              <Image
                src="/couple-hero.png"
                alt=""
                width={48}
                height={48}
                className="object-cover w-full h-full scale-[1.2]"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentAnswer === null}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white
                bg-gradient-to-r from-[#6b9bd8] to-[#4b7bb8]
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer"
              aria-label="다음 질문으로 이동"
            >
              다음 질문
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Skip (demo only) */}
        {isDemo && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => router.push('/result/pro?demo=1')}
              className="text-xs text-[#c0b8d0] hover:text-[#6b9bd8] transition-colors duration-150 underline underline-offset-2 cursor-pointer"
            >
              건너뛰기 (시연) →
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function ProTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f5ff] to-[#f0f8ff] text-[#b0b8c8] text-sm">
          로딩 중...
        </div>
      }
    >
      <ProTestPageInner />
    </Suspense>
  )
}
