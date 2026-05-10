'use client'

import Link from 'next/link'
import { useCallback } from 'react'
import type { ProResult, MockUser } from '../../../lib/types'
import { CompatibilityRadarChart } from './RadarChart'
import { CategoryBarChart } from './CategoryBar'
import { ConflictCard } from './ConflictCard'

interface IProResultViewProps {
  computed: ProResult
}

const getScoreText = (score: number): string => {
  if (score >= 85) return '환상의 궁합! 함께라면 뭐든 잘 될 것 같아요.'
  if (score >= 70) return '꽤 잘 맞아요. 작은 노력으로 더 좋아질 수 있어요.'
  if (score >= 55) return '보통이에요. 서로 이해하고 맞춰가는 과정이 필요해요.'
  if (score >= 40) return '차이가 꽤 있네요. 솔직한 대화가 중요해요.'
  return '많이 달라요. 충분한 소통과 각오가 필요해요.'
}

export const ProResultView = ({ computed }: IProResultViewProps) => {
  const { score, typeName, categoryScores, top5Conflicts, aiAdvice } = computed

  const handleSaveReport = useCallback(() => {
    const raw = localStorage.getItem('ssaujima:user')
    if (!raw) {
      window.location.href = '/login?returnTo=/result/pro'
      return
    }
    const user: MockUser = JSON.parse(raw)
    const savedReports = JSON.parse(localStorage.getItem('ssaujima:reports') ?? '[]')
    savedReports.push({
      id: crypto.randomUUID(),
      userId: user.id,
      type: 'pro',
      createdAt: new Date().toISOString(),
      computed,
    })
    localStorage.setItem('ssaujima:reports', JSON.stringify(savedReports))
    alert('리포트가 저장되었어요!')
  }, [computed])

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('ssaujima:user')

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#f0ebf8] text-[#7c3aed] text-xs font-medium px-3 py-1 rounded-full mb-4">
            프로 리포트
          </span>
          <h1 className="text-[28px] font-medium tracking-[-0.02em]">궁합 분석 완료</h1>
        </div>

        <div className="text-center mb-12">
          <p className="text-[64px] font-bold text-[#f47b9b] leading-none mb-3">
            {score}
            <span className="text-[32px] font-medium text-[#a0a0a0]">점</span>
          </p>
          <p className="text-[#6b6b6b] text-[17px] mb-4">{getScoreText(score)}</p>
          <p className="text-sm text-[#a0a0a0]">유형: <span className="text-[#1a1a1a] font-medium">{typeName}</span></p>
        </div>

        <hr className="border-[#e8e8e6] mb-12" />

        <section className="mb-12">
          <h2 className="text-[18px] font-medium mb-6">레이더 차트</h2>
          <CompatibilityRadarChart categoryScores={categoryScores} />
        </section>

        <hr className="border-[#e8e8e6] mb-12" />

        <section className="mb-12">
          <h2 className="text-[18px] font-medium mb-6">영역별 일치도</h2>
          <CategoryBarChart categoryScores={categoryScores} />
        </section>

        <hr className="border-[#e8e8e6] mb-12" />

        <section className="mb-12">
          <h2 className="text-[18px] font-medium mb-6">다툼 가능성 TOP 5</h2>
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

        <hr className="border-[#e8e8e6] mb-12" />

        <section className="mb-12">
          <h2 className="text-[18px] font-medium mb-4">종합 결론</h2>
          <p className="text-[17px] text-[#6b6b6b] leading-relaxed">{aiAdvice.conclusion}</p>
        </section>

        {aiAdvice.isFallback && (
          <p className="text-xs text-[#a0a0a0] mb-8">
            * AI 연결 실패로 예시 조언을 보여드리고 있어요.
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/test/simple"
            className="flex-1 text-center border border-[#e8e8e6] rounded-full py-3.5 text-[15px] text-[#6b6b6b] hover:border-[#1a1a1a] transition-colors"
          >
            다시 시작하기
          </Link>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleSaveReport}
              className="flex-1 text-center bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-medium hover:bg-[#333] transition-colors"
            >
              리포트 저장
            </button>
          ) : (
            <Link
              href="/login?returnTo=/result/pro"
              className="flex-1 text-center bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-medium hover:bg-[#333] transition-colors"
            >
              리포트 저장
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProResultView
