import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center max-w-2xl mx-auto py-24 md:py-32 px-6">
      <Badge className="mb-6">결혼 전 필수 진단</Badge>
      <h1 className="text-[44px] font-medium tracking-[-0.025em] leading-[1.15] text-[#1a1a1a] mb-4">
        우리,
        <br />
        정말 안 싸울까?
      </h1>
      <p className="text-[17px] text-[#6b6b6b] leading-relaxed mb-8">
        생활습관 64가지로 알아보는 진짜 부부 궁합
      </p>
      <Link
        href="/test/simple"
        className="inline-flex items-center justify-center bg-[#1a1a1a] text-white rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
      >
        시작하기 →
      </Link>
      <p className="text-[#a0a0a0] text-sm mt-3">12,847쌍이 진단했어요</p>
      <Link
        href="/result/pro?demo=1"
        className="text-[#a0a0a0] text-sm underline mt-2 hover:text-[#6b6b6b] transition-colors"
      >
        예시 결과 보기
      </Link>
    </section>
  )
}

export default HeroSection
