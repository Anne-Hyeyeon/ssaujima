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
        <p className="text-[#f47b9b] text-sm font-medium tracking-wide mb-5">지금 시작해보세요</p>
        <h2
          className="font-semibold tracking-[-0.025em] leading-[1.1] text-white mb-10"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          우리,<br />진짜 괜찮을까?
        </h2>
        <Link
          href="/test/simple"
          className="inline-flex items-center justify-center bg-white text-[#1a1a1a] rounded-full px-8 py-4 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
          style={{ boxShadow: '0 2px 20px rgba(244,123,155,0.25)' }}
        >
          지금 확인하기 →
        </Link>
        <p className="text-[#6b6b6b] text-sm mt-5">무료로 시작 · 2분이면 충분해요</p>
      </div>
    </section>
  )
}

export default BottomCtaSection
