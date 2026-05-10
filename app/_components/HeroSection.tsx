import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffeef3 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-28">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 animate-fade-up">
            <Badge className="mb-6">결혼 전 필수 진단</Badge>
            <h1
              className="font-semibold tracking-[-0.03em] leading-[1.08] text-[#1a1a1a] mb-5"
              style={{ fontSize: 'clamp(40px, 6vw, 62px)' }}
            >
              우리,<br />정말<br />안 싸울까?
            </h1>
            <p className="text-[17px] text-[#6b6b6b] leading-[1.65] mb-9 max-w-xs md:max-w-sm">
              생활습관 64가지로 알아보는<br />진짜 부부 궁합
            </p>
            <Link
              href="/test/simple"
              className="inline-flex items-center justify-center bg-[#1a1a1a] text-white rounded-full px-8 py-4 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
            >
              시작하기 →
            </Link>
            <p className="text-[#a0a0a0] text-sm mt-4">12,847쌍이 진단했어요</p>
            <Link
              href="/result/pro?demo=1"
              className="text-[#a0a0a0] text-sm underline mt-2 hover:text-[#6b6b6b] transition-colors"
            >
              예시 결과 보기
            </Link>
          </div>

          {/* Image */}
          <div
            className="relative flex-shrink-0 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
            {/* Pink glow behind image */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, #f47b9b22 0%, transparent 70%)', transform: 'scale(1.3)' }}
            />
            <Image
              src="/couple-hero.png"
              alt="손으로 하트를 만드는 커플 일러스트"
              width={400}
              height={400}
              className="relative w-60 h-60 md:w-[360px] md:h-[360px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
