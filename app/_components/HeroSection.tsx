import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft radial glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ffeef3 0%, transparent 65%)', transform: 'translate(25%, -25%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-28">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 animate-fade-up">
            <Badge className="mb-6">결혼 전 필수 진단</Badge>
            <h1
              className="font-bold tracking-[-0.03em] leading-[1.08] text-[#1a1a1a] mb-5"
              style={{ fontSize: 'clamp(38px, 6vw, 60px)' }}
            >
              이제 그만,<br />싸우지마!
            </h1>
            <p className="text-[16px] sm:text-[17px] text-[#6b6b6b] leading-[1.75] mb-9 max-w-xs md:max-w-sm">
              부부가 가장 많이 다투는 원인은<br className="hidden sm:block" />다름 아닌 서로 다른 가치관, 살아온 배경.<br className="hidden sm:block" />
              <span className="text-[#1a1a1a] font-medium">서로를 미리 알 수 있었으면 얼마나 좋았을까?</span>
            </p>
            <Link
              href="/test/simple"
              className="inline-flex items-center justify-center bg-[#1a1a1a] text-white rounded-full px-8 py-4 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}
            >
              지금 바로 시작하기 →
            </Link>
            <p className="text-[#a0a0a0] text-sm mt-4">무료 · 2분이면 충분해요 · 12,847쌍이 진단했어요</p>
            <Link
              href="/result/pro?demo=1"
              className="text-[#a0a0a0] text-sm underline mt-2 hover:text-[#6b6b6b] transition-colors"
            >
              예시 결과 먼저 보기
            </Link>
          </div>

          {/* Image */}
          <div
            className="relative flex-shrink-0 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, #f47b9b1a 0%, transparent 70%)', transform: 'scale(1.2)' }}
            />
            <Image
              src="/couple-hero.png"
              alt="집 모양 테두리 안에서 함께 하트를 만드는 커플 일러스트"
              width={420}
              height={420}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] object-contain drop-shadow-sm"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
