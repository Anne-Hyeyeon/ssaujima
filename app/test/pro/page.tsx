'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { QUESTIONS_PRO } from '../_data/questions-pro'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '../../../lib/types'
import type { AnswerValue, MockUser, CategoryKey } from '../../../lib/types'
import { generateDemoAnswers } from '../../../lib/mock-data'
import {
  bothFinished,
  buildPairedResultUrl,
  submitAnswers,
} from '../../../lib/partner-tests'
import { getUserById } from '../../../lib/mock-auth'
import TestGate from '../_components/TestGate'
import ClinicalQuestionItem from '../_components/ClinicalQuestionItem'

const CATEGORY_CODES: Record<CategoryKey, string> = {
  cleaning: 'CL',
  laundry: 'LD',
  organizing: 'OR',
  food: 'FD',
  rhythm: 'RH',
  money: 'MN',
  family: 'FM',
  social: 'SC',
  communication: 'CM',
  future: 'FT',
  digital: 'DG',
}

const ProTestRunner = ({ user }: { user: MockUser }) => {
  const router = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(
    () => new Array(64).fill(null),
  )

  useEffect(() => {
    sessionStorage.setItem('ssaujima:pro-answers', JSON.stringify(answers))
  }, [answers])

  // Domain ordering used for "Section II of XI" display.
  const domainIndex = useMemo(() => {
    const map = new Map<CategoryKey, number>()
    let counter = 0
    for (const cat of CATEGORY_ORDER) {
      if (QUESTIONS_PRO.some((q) => q.category === cat)) {
        counter += 1
        map.set(cat, counter)
      }
    }
    return map
  }, [])
  const totalDomains = domainIndex.size

  // Per-question item-in-domain index (e.g. CL-005)
  const itemInDomainSequence = useMemo(() => {
    const seqMap = new Map<number, number>()
    const counters: Partial<Record<CategoryKey, number>> = {}
    QUESTIONS_PRO.forEach((q) => {
      counters[q.category] = (counters[q.category] ?? 0) + 1
      seqMap.set(q.id, counters[q.category]!)
    })
    return seqMap
  }, [])

  const finalize = (filled: AnswerValue[]) => {
    submitAnswers(user.id, 'pro', filled)
    if (user.partnerId && bothFinished(user.id, user.partnerId, 'pro')) {
      const partner = getUserById(user.partnerId)
      const url = buildPairedResultUrl(
        '/result/pro',
        user.id,
        user.gender,
        user.partnerId,
        partner?.gender ?? (user.gender === 'female' ? 'male' : 'female'),
        'pro',
      )
      if (url) {
        router.push(url)
        return
      }
    }
    router.push('/test/pro/waiting')
  }

  const advance = (newAnswers: (AnswerValue | null)[]) => {
    if (currentIndex < 63) {
      setCurrentIndex(currentIndex + 1)
      return
    }
    const filled = newAnswers.filter((v): v is AnswerValue => v !== null)
    if (filled.length < 64) return
    finalize(filled)
  }

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
    setTimeout(() => advance(newAnswers), 220)
  }

  const handleNext = () => {
    if (answers[currentIndex] !== null) advance(answers)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleAutoFill = () => {
    const auto = generateDemoAnswers(64, user.gender)
    setAnswers(auto)
    setTimeout(() => finalize(auto), 200)
  }

  const question = QUESTIONS_PRO[currentIndex]
  const overallPct = Math.round(((currentIndex + 1) / 64) * 100)
  const itemCode = `${CATEGORY_CODES[question.category]}-${String(itemInDomainSequence.get(question.id) ?? 0).padStart(3, '0')}`

  return (
    <main className="min-h-screen bg-[#f4f3f0] pb-16">
      {/* Top form-style header */}
      <header className="bg-white border-b border-[#dcdcd8]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-5">
          <div className="flex items-center justify-between mb-2 text-[10px] tracking-[0.16em] uppercase font-mono text-[#a0a0a0]">
            <span>SSAUJIMA · LIFESTYLE COMPATIBILITY ASSESSMENT</span>
            <span>Form: PRO · 64 Items</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] text-[#1a1a1a] leading-tight">
                생활 적합성 정밀 검사
              </h1>
              <p className="text-[12px] text-[#6b6b6b] mt-1 leading-relaxed">
                다음 항목들에 대해 본인의 평소 생각·습관과 가장 가까운 응답을 선택해 주세요.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] tracking-[0.08em] uppercase text-[#a0a0a0] mb-0.5">
                Respondent
              </p>
              <p className="text-[13px] font-mono tabular-nums text-[#1a1a1a]">@{user.id}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1 rounded-full bg-[#e8e8e6] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1a1a1a] transition-all duration-400"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <span className="text-[11px] font-mono tabular-nums text-[#1a1a1a]">
              {String(currentIndex + 1).padStart(3, '0')} / 064
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-8">
        <ClinicalQuestionItem
          questionNumber={currentIndex + 1}
          totalQuestions={64}
          domainNumber={domainIndex.get(question.category) ?? 1}
          domainTotal={totalDomains}
          domainLabel={CATEGORY_LABELS[question.category]}
          itemCode={itemCode}
          text={question.text}
          options={question.options}
          selected={(answers[currentIndex] ?? null) as 1 | 2 | 3 | 4 | null}
          onSelect={(v) => handleAnswer(v as AnswerValue)}
          gender={user.gender}
        />

        {/* Nav row */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a] px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← 이전 문항
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={answers[currentIndex] === null}
            className={clsx(
              'flex items-center gap-2 px-5 py-2.5 rounded-[2px] text-[13px] font-semibold',
              'bg-[#1a1a1a] text-white disabled:opacity-30 disabled:cursor-not-allowed',
              'hover:bg-[#333] transition-colors',
            )}
          >
            {currentIndex === 63 ? '검사 제출' : '다음 문항'} →
          </button>
        </div>

        {/* Auto-fill demo button */}
        <div className="mt-10 border-t border-[#dcdcd8] pt-6 text-center">
          <button
            type="button"
            onClick={handleAutoFill}
            className="inline-flex items-center gap-2 border border-dashed border-[#bcb9b6] rounded-[2px] px-4 py-2 text-[12px] font-mono tabular-nums text-[#6b6b6b] hover:bg-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#bcb9b6]" aria-hidden="true" />
            DEMO · AUTO-FILL ALL ITEMS
          </button>
          <p className="text-[10px] tracking-[0.08em] uppercase text-[#a0a0a0] mt-2">
            시연용 — 무작위 응답으로 64항을 즉시 채워 검사를 종료합니다
          </p>
        </div>

        {/* Footer note */}
        <footer className="mt-10 text-[10px] tracking-[0.04em] uppercase font-mono text-[#a0a0a0] flex items-center justify-between">
          <span>FORM-LCA-64 · v1.0</span>
          <span>Confidential · For research demonstration only</span>
        </footer>
      </div>
    </main>
  )
}

export default function ProTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f4f3f0] text-[#a0a0a0] text-sm">
          로딩 중...
        </div>
      }
    >
      <TestGate track="pro">
        {(user) => <ProTestRunner user={user} />}
      </TestGate>
    </Suspense>
  )
}
