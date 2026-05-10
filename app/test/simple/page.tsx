'use client'

// Page: 15-question simple compatibility test

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { QUESTIONS_SIMPLE } from '../_data/questions-simple'
import { encodeAnswers } from '../../../lib/url-codec'
import type { AnswerValue } from '../../../lib/types'
import TestProgressBar from '../_components/TestProgressBar'
import OptionRadio from '../_components/OptionRadio'

const SimpleTestPageInner = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === '1'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(new Array(15).fill(null))

  // Persist answers to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('ssaujima:simple-answers', JSON.stringify(answers))
  }, [answers])

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentIndex < 14) {
        setCurrentIndex(currentIndex + 1)
      } else {
        const filled = newAnswers.filter((v): v is AnswerValue => v !== null)
        const encoded = encodeAnswers(filled)
        router.push(`/result/simple?a=${encoded}`)
      }
    }, 300)
  }

  const handleSkipDemo = () => {
    router.push('/result/simple?demo=1')
  }

  const question = QUESTIONS_SIMPLE[currentIndex]

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <TestProgressBar current={currentIndex + 1} total={15} color="pink" />

      {isDemo && (
        <div className="flex justify-end px-6 pt-3">
          <button
            type="button"
            onClick={handleSkipDemo}
            className="text-sm text-[#a0a0a0] hover:text-[#f47b9b] transition-colors duration-150 underline underline-offset-2"
          >
            건너뛰기 (시연) →
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <p className="text-[#a0a0a0] text-sm mb-6">{currentIndex + 1} / 15</p>

        <h1 className="text-[28px] font-medium tracking-[-0.02em] text-center mb-10 max-w-lg text-[#1a1a1a]">
          {question.text}
        </h1>

        <div className="w-full max-w-md space-y-3">
          {question.options.map((option, idx) => (
            <OptionRadio
              key={idx}
              option={option}
              index={idx as 0 | 1 | 2 | 3}
              selected={answers[currentIndex] === idx + 1}
              onSelect={() => handleAnswer((idx + 1) as AnswerValue)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

const SimpleTestPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-[#a0a0a0]">
          로딩 중...
        </div>
      }
    >
      <SimpleTestPageInner />
    </Suspense>
  )
}

export default SimpleTestPage
