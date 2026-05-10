'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { QUESTIONS_PRO } from '../_data/questions-pro'
import { encodeAnswers } from '../../../lib/url-codec'
import { CATEGORY_LABELS } from '../../../lib/types'
import type { AnswerValue } from '../../../lib/types'
import TestProgressBar from '../_components/TestProgressBar'
import OptionRadio from '../_components/OptionRadio'

function ProTestPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === '1'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(new Array(64).fill(null))

  useEffect(() => {
    sessionStorage.setItem('ssaujima:pro-answers', JSON.stringify(answers))
  }, [answers])

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentIndex < 63) {
        setCurrentIndex(currentIndex + 1)
      } else {
        const encoded = encodeAnswers(newAnswers.filter(Boolean) as AnswerValue[])
        router.push(`/result/pro?a=${encoded}`)
      }
    }, 300)
  }

  const handleSkipDemo = () => router.push('/result/pro?demo=1')

  const question = QUESTIONS_PRO[currentIndex]
  const categoryName = CATEGORY_LABELS[question.category]

  return (
    <main className="min-h-screen flex flex-col">
      <TestProgressBar current={currentIndex + 1} total={64} color="blue" />
      {isDemo && (
        <div className="flex justify-end px-6 pt-4">
          <button type="button" onClick={handleSkipDemo} className="text-sm text-[#a0a0a0] underline">
            건너뛰기 (시연) →
          </button>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <p className="text-[#a0a0a0] text-xs mb-1 tracking-wide">{categoryName}</p>
        <p className="text-[#a0a0a0] text-sm mb-6">{currentIndex + 1} / 64</p>
        <h1 className="text-[28px] font-medium tracking-[-0.02em] text-center mb-10 max-w-lg">
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

export default function ProTestPage() {
  return (
    <Suspense>
      <ProTestPageInner />
    </Suspense>
  )
}
