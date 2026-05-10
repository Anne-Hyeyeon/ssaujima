'use client'

// Wrapper that ensures the user is logged in AND has a partner registered
// before rendering test content. Falls back to a friendly redirect screen.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '../../../lib/mock-auth'
import type { MockUser } from '../../../lib/types'

interface ITestGateProps {
  track: 'simple' | 'pro'
  children: (user: MockUser) => React.ReactNode
}

type State = { kind: 'loading' } | { kind: 'no-user' } | { kind: 'no-partner'; user: MockUser } | { kind: 'ready'; user: MockUser }

export const TestGate = ({ track, children }: ITestGateProps) => {
  const router = useRouter()
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      setState({ kind: 'no-user' })
      return
    }
    if (!user.partnerId) {
      setState({ kind: 'no-partner', user })
      return
    }
    setState({ kind: 'ready', user })
  }, [])

  if (state.kind === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#fafaf9] text-[#a0a0a0] text-[13px]">
        준비 중…
      </main>
    )
  }

  if (state.kind === 'no-user') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-6">
        <div className="max-w-sm w-full bg-white border border-[#e8e8e6] rounded-2xl p-6 text-center">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold mb-2">
            로그인 필요
          </p>
          <h1 className="text-[20px] font-semibold tracking-[-0.015em] mb-2">
            먼저 본인 정보를 등록해 주세요
          </h1>
          <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-5">
            싸우지마는 커플이 함께 쓰는 서비스라, 두 분 모두 본인 계정이 필요해요.
          </p>
          <button
            type="button"
            onClick={() => router.push(`/login?returnTo=/test/${track}`)}
            className="w-full bg-[#1a1a1a] text-white rounded-full py-3 text-[14px] font-semibold"
          >
            로그인하러 가기 →
          </button>
        </div>
      </main>
    )
  }

  if (state.kind === 'no-partner') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-6">
        <div className="max-w-sm w-full bg-white border border-[#e8e8e6] rounded-2xl p-6 text-center">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold mb-2">
            파트너 등록 필요
          </p>
          <h1 className="text-[20px] font-semibold tracking-[-0.015em] mb-2">
            테스트 전, 파트너를 등록해 주세요
          </h1>
          <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-5">
            두 분의 답변을 매칭해야 리포트가 공개돼요. 마이페이지에서 파트너 닉네임을 입력하세요.
          </p>
          <Link
            href="/my"
            className="block w-full bg-[#1a1a1a] text-white rounded-full py-3 text-[14px] font-semibold"
          >
            마이페이지로 이동 →
          </Link>
        </div>
      </main>
    )
  }

  return <>{children(state.user)}</>
}

export default TestGate
