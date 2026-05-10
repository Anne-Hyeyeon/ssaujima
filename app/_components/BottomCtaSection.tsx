import Link from 'next/link'

export const BottomCtaSection = () => {
  return (
    <section className="relative overflow-hidden py-28 px-6" style={{ background: '#1a1a1a' }}>
      {/* Subtle pink glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, #f47b9b18 0%, transparent 70%)' }}
      />
      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center">
        <p className="text-[#f47b9b] text-sm font-medium tracking-wide mb-5">이제 시작해볼까요</p>
        <h2
          className="font-bold tracking-[-0.025em] leading-[1.1] text-white mb-5"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          우리,<br />정말 괜찮을까?
        </h2>
        <p className="text-[#6b6b6b] text-[15px] leading-relaxed mb-10 max-w-xs">
          결혼 전 지금이 가장 좋은 타이밍이에요.<br />
          서로를 알고 시작하는 것, 작은 차이 하나가<br />
          나중에 큰 갈등이 되는 걸 막아줘요.
        </p>
        <Link
          href="/test/simple"
          className="inline-flex items-center justify-center bg-white text-[#1a1a1a] rounded-full px-8 py-4 text-[15px] font-semibold tracking-[-0.01em] hover:opacity-90 transition-opacity"
          style={{ boxShadow: '0 2px 20px rgba(244,123,155,0.25)' }}
        >
          무료로 시작하기 →
        </Link>
        <p className="text-[#4a4a4a] text-sm mt-5">무료로 시작 · 2분이면 충분해요 · 가입 불필요</p>
      </div>
    </section>
  )
}

export default BottomCtaSection
