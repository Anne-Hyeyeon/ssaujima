import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

interface IPlanFeature {
  text: string
}

interface IPlan {
  name: string
  price: string
  duration: string
  note: string
  features: IPlanFeature[]
  ctaLabel: string
  ctaHref: string
  recommended?: boolean
}

const PLANS: IPlan[] = [
  {
    name: '심플',
    price: '무료',
    duration: '15문항 · 약 2분',
    note: '핵심만 빠르게',
    features: [
      { text: '궁합 점수 (100점 만점)' },
      { text: '나의 생활 유형 진단' },
      { text: '잘 맞는 부분 리스트' },
      { text: '부딪힐 수 있는 부분 리스트' },
    ],
    ctaLabel: '무료로 시작',
    ctaHref: '/test/simple',
  },
  {
    name: '프로',
    price: '2,900원',
    duration: '64문항 · 7~10분',
    note: '결혼 전 필수 코스',
    features: [
      { text: '심플 항목 전부 포함' },
      { text: '11개 영역 심층 분석' },
      { text: '레이더 차트 시각화' },
      { text: 'AI 맞춤 조언 & 절충안' },
      { text: '다툼 가능성 TOP 5' },
    ],
    ctaLabel: '프로 시작하기',
    ctaHref: '/pay',
    recommended: true,
  },
]

export const PricingSection = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">04</span>
          <span className="text-[#6b6b6b]"> — 가격</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-4">
          딱 2,900원으로
          <br />
          싸울 일을 줄여요.
        </h2>
        <p className="text-[15px] text-[#6b6b6b] leading-relaxed mb-10 max-w-sm">
          결혼식보다 신혼생활이 길어요.<br />
          2,900원짜리 진단 하나가 수십 번의 싸움을 막을 수도 있어요.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.recommended
                  ? 'rounded-2xl p-6 flex flex-col gap-5 border border-[#e0d4f7]'
                  : 'border border-[#e8e8e6] rounded-2xl p-6 flex flex-col gap-5'
              }
              style={
                plan.recommended
                  ? { background: 'linear-gradient(145deg, #f5f0fd 0%, #fff 100%)' }
                  : undefined
              }
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-[#1a1a1a]">
                    {plan.name}
                  </h3>
                  {plan.recommended && <Badge>추천</Badge>}
                </div>
                <p className="text-[#a0a0a0] text-sm">{plan.duration}</p>
                <p className="text-[12px] text-[#f47b9b] font-medium mt-1">{plan.note}</p>
              </div>
              <p className="text-[28px] font-medium tracking-[-0.02em] text-[#1a1a1a]">
                {plan.price}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-[15px] text-[#6b6b6b]">
                    <span className="text-[#f47b9b] font-medium shrink-0" aria-hidden="true">✓</span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className={
                  plan.recommended
                    ? 'inline-flex items-center justify-center bg-[#1a1a1a] text-white rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity'
                    : 'inline-flex items-center justify-center border border-[#e8e8e6] text-[#1a1a1a] rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:bg-[#fafaf9] transition-colors'
                }
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
