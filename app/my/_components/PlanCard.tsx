'use client'
import Link from 'next/link'
import type { MockUser } from '../../../lib/types'

interface IPlanCardProps {
  user: MockUser
  onDowngrade: () => void
}

export const PlanCard = ({ user, onDowngrade }: IPlanCardProps) => {
  if (user.plan === 'pro') {
    return (
      <div className="border border-[#e8e8e6] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f0ebf8] text-[#6b39b5]">
            PRO
          </span>
          <h2 className="font-medium">프로 플랜 이용 중</h2>
        </div>
        <div className="text-sm text-[#6b6b6b] space-y-1 mb-6">
          <p>결제일: 2026. 05. 10</p>
          <p>다음 결제: 2026. 06. 10</p>
          <p>금액: 월 2,900원</p>
        </div>
        <button
          type="button"
          onClick={onDowngrade}
          className="text-sm text-[#a0a0a0] underline"
        >
          플랜 해지
        </button>
      </div>
    )
  }

  return (
    <div className="border border-[#e8e8e6] rounded-2xl p-6">
      <h2 className="font-medium mb-3">현재 무료 플랜</h2>
      <div className="text-sm text-[#6b6b6b] space-y-1 mb-6">
        <p>✓ 심플 버전 (15문항)</p>
        <p className="text-[#a0a0a0]">✗ 11개 영역별 분석</p>
        <p className="text-[#a0a0a0]">✗ AI 맞춤 조언</p>
        <p className="text-[#a0a0a0]">✗ 레이더 차트</p>
      </div>
      <Link
        href="/pay"
        className="block w-full text-center bg-[#1a1a1a] text-white rounded-full py-3 text-[15px] font-medium"
      >
        프로 업그레이드 →
      </Link>
    </div>
  )
}
