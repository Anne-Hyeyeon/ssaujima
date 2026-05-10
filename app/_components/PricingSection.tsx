import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

interface IPlanFeature {
  text: string
}

interface IPlan {
  name: string
  price: string
  duration: string
  features: IPlanFeature[]
  ctaLabel: string
  ctaHref: string
  recommended?: boolean
}

const PLANS: IPlan[] = [
  {
    name: '심플',
    price: '무료',
    duration: '15문항 · 2분',
    features: [
      { text: '궁합 점수' },
      { text: '유형 진단' },
      { text: '잘 맞는 부분' },
      { text: '부딪힐 수 있는 부분' },
    ],
    ctaLabel: '무료로 시작',
    ctaHref: '/test/simple',
  },
  {
    name: '프로',
    price: '2,900원',
    duration: '64문항 · 7~10분',
    features: [
      { text: '심플 전체 포함' },
      { text: '11개 영역별 분석' },
      { text: '레이더 차트' },
      { text: 'AI 맞춤 조언' },
      { text: '다툼 TOP 5' },
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
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-10">
          딱 2,900원으로
          <br />
          싸울 일 줄여요.
        </h2>
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
              </div>
              <p className="text-[28px] font-medium tracking-[-0.02em] text-[#1a1a1a]">
                {plan.price}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-[15px] text-[#6b6b6b]">
                    <span className="text-[#f47b9b] font-medium" aria-hidden="true">✓</span>
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
