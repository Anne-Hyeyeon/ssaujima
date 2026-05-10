'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, downgradeTofree } from '../../lib/mock-auth'
import { getUserReports } from '../../lib/saved-reports'
import type { MockUser, SavedReport } from '../../lib/types'
import { SavedReportCard } from './_components/SavedReportCard'
import { PlanCard } from './_components/PlanCard'

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<MockUser | null>(null)
  const [reports, setReports] = useState<SavedReport[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login?returnTo=/my')
      return
    }
    setUser(currentUser)
    setReports(getUserReports())
  }, [router])

  const handleDowngrade = () => {
    downgradeTofree()
    setUser(getCurrentUser())
  }

  if (!user) return null

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <p className="text-[#a0a0a0] text-sm mb-1">마이페이지</p>
          <h1 className="text-[32px] font-medium tracking-[-0.02em]">{user.name}님</h1>
        </div>

        {/* Plan Card */}
        <section>
          <h2 className="text-[#a0a0a0] text-xs tracking-widest uppercase mb-3">플랜</h2>
          <PlanCard user={user} onDowngrade={handleDowngrade} />
        </section>

        {/* Saved Reports */}
        <section>
          <h2 className="text-[#a0a0a0] text-xs tracking-widest uppercase mb-3">저장한 리포트</h2>
          {reports.length === 0 ? (
            <div className="text-center py-12 text-[#a0a0a0]">
              <p className="mb-4">저장한 리포트가 없어요.</p>
              <a href="/test/simple" className="text-[#1a1a1a] underline text-sm">
                테스트 시작하기
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <SavedReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
