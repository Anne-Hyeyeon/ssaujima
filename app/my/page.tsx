'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, downgradeTofree } from '../../lib/mock-auth'
import { getUserReports } from '../../lib/saved-reports'
import type { MockUser, SavedReport } from '../../lib/types'
import { SavedReportCard } from './_components/SavedReportCard'
import { PlanCard } from './_components/PlanCard'
import { PartnerCard } from './_components/PartnerCard'

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

  const tone = user.gender === 'female' ? 'pink' : 'blue'

  return (
    <main className="min-h-screen py-12 px-6 bg-[#fafaf9]">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <header className="bg-white border border-[#e8e8e6] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={
                'inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full ' +
                (tone === 'pink'
                  ? 'bg-[#ffeef3] text-[#c2185b]'
                  : 'bg-[#e8f0fa] text-[#2c5282]')
              }
            >
              <span
                className={
                  'w-1.5 h-1.5 rounded-full ' +
                  (tone === 'pink' ? 'bg-[#f47b9b]' : 'bg-[#6b9bd8]')
                }
              />
              {user.gender === 'female' ? '여성' : '남성'}
            </span>
            <span className="text-[11px] font-mono text-[#a0a0a0]">@{user.id}</span>
          </div>
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#1a1a1a] mb-1">
            {user.name}님 안녕하세요
          </h1>
          <p className="text-[14px] text-[#6b6b6b] leading-relaxed">
            테스트는 두 분이 모두 끝내야 리포트가 공개돼요. 아래에서 파트너와 플랜 상태를 관리하세요.
          </p>
        </header>

        {/* Partner */}
        <section>
          <h2 className="text-[#a0a0a0] text-[11px] tracking-[0.08em] uppercase font-semibold mb-3">
            파트너
          </h2>
          <PartnerCard user={user} onUpdate={setUser} />
        </section>

        {/* Quick CTA: start a test */}
        <section>
          <h2 className="text-[#a0a0a0] text-[11px] tracking-[0.08em] uppercase font-semibold mb-3">
            테스트 시작하기
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TestStartLink
              href="/test/simple"
              title="심플 테스트"
              meta="15문항 · 무료"
              disabled={!user.partnerId}
            />
            <TestStartLink
              href="/test/pro"
              title="프로 테스트"
              meta="64문항 · 프로 전용"
              disabled={!user.partnerId}
            />
          </div>
          {!user.partnerId && (
            <p className="text-[12px] text-[#e07020] mt-2">
              테스트를 시작하려면 먼저 파트너를 등록해 주세요.
            </p>
          )}
        </section>

        {/* Plan */}
        <section>
          <h2 className="text-[#a0a0a0] text-[11px] tracking-[0.08em] uppercase font-semibold mb-3">
            플랜
          </h2>
          <PlanCard user={user} onDowngrade={handleDowngrade} />
        </section>

        {/* Saved Reports */}
        <section>
          <h2 className="text-[#a0a0a0] text-[11px] tracking-[0.08em] uppercase font-semibold mb-3">
            저장한 리포트
          </h2>
          {reports.length === 0 ? (
            <div className="border border-dashed border-[#e8e8e6] rounded-2xl text-center py-10 text-[#a0a0a0] bg-white">
              <p className="text-[13px] mb-3">아직 저장된 리포트가 없어요.</p>
              <Link
                href="/test/simple"
                className="text-[#1a1a1a] underline text-[13px]"
              >
                심플 테스트로 시작하기
              </Link>
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

const TestStartLink = ({
  href,
  title,
  meta,
  disabled,
}: {
  href: string
  title: string
  meta: string
  disabled?: boolean
}) => {
  const cls =
    'block border border-[#e8e8e6] rounded-2xl bg-white px-5 py-4 transition-colors'
  if (disabled) {
    return (
      <span
        className={cls + ' opacity-50 cursor-not-allowed'}
        aria-disabled="true"
      >
        <p className="text-[15px] font-semibold text-[#1a1a1a]">{title}</p>
        <p className="text-[12px] text-[#a0a0a0] mt-0.5">{meta}</p>
      </span>
    )
  }
  return (
    <Link href={href} className={cls + ' hover:border-[#1a1a1a]'}>
      <p className="text-[15px] font-semibold text-[#1a1a1a]">{title}</p>
      <p className="text-[12px] text-[#a0a0a0] mt-0.5">{meta}</p>
    </Link>
  )
}
