import Link from 'next/link'

export const BottomCtaSection = () => {
  return (
    <section className="bg-[#1a1a1a] py-24 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-xl font-medium tracking-[-0.01em] leading-[1.3] text-white mb-8">
          우리, 진짜 괜찮을까?
        </h2>
        <Link
          href="/test/simple"
          className="inline-flex items-center justify-center bg-white text-[#1a1a1a] rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
        >
          지금 확인하기 →
        </Link>
      </div>
    </section>
  )
}

export default BottomCtaSection
