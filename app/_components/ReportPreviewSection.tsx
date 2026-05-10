// Landing section: shows beautiful previews of the actual Simple / Pro reports.
// Each preview links to its respective `?demo=1` page.

import Image from 'next/image'
import Link from 'next/link'

interface IPreview {
  badge: string
  badgeTone: string
  title: string
  description: string
  bullets: string[]
  href: string
  imageSrc: string
  imageAlt: string
  shadowTone: string
}

const PREVIEWS: IPreview[] = [
  {
    badge: 'SIMPLE',
    badgeTone: 'bg-[#ffeef3] text-[#c2185b]',
    title: '심플 리포트',
    description:
      '15문항 · 5분 안에 끝나는 무료 진단. 핵심 지표와 갈등 가능 영역을 한눈에 보여드려요.',
    bullets: [
      '궁합 점수 + 4단계 밴드 게이지',
      '나의 생활유형 + 강점·주의점',
      '잘 맞는 부분 / 신경 써야 할 부분',
    ],
    href: '/result/simple?demo=1',
    imageSrc: '/landing-report-simple.png',
    imageAlt: '심플 리포트 미리보기',
    shadowTone: 'shadow-[0_24px_60px_rgba(244,123,155,0.18)]',
  },
  {
    badge: 'PRO',
    badgeTone: 'bg-[#f0ebf8] text-[#7c3aed]',
    title: '프로 리포트',
    description:
      '64문항 · 11개 영역 정밀 분석. AI 상담사가 두 분의 답변을 바탕으로 실제 조언과 90일 액션 플랜까지 작성해 드려요.',
    bullets: [
      '11개 영역 레이더 + 일치 강도 히트맵',
      'AI 맞춤 갈등 TOP 5 + 절충안',
      '90일 액션 플랜 + 커뮤니케이션 프로파일',
    ],
    href: '/result/pro?demo=1',
    imageSrc: '/landing-report-pro.png',
    imageAlt: '프로 리포트 미리보기',
    shadowTone: 'shadow-[0_24px_60px_rgba(124,58,237,0.20)]',
  },
]

export const ReportPreviewSection = () => {
  return (
    <section className="bg-[#fafaf9] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">00</span>
          <span className="text-[#6b6b6b]"> — 어떤 리포트가 나오는지</span>
        </p>
        <h2 className="text-[32px] sm:text-[36px] font-medium tracking-[-0.02em] leading-[1.15] text-[#1a1a1a] mb-4">
          이런 리포트를
          <br />
          받게 돼요.
        </h2>
        <p className="text-[15px] text-[#6b6b6b] leading-relaxed mb-12 max-w-md">
          실제 결과 화면을 그대로 가져왔어요. 클릭해서 전체 예시 리포트를 둘러보실 수 있어요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PREVIEWS.map((p) => (
            <ReportCard key={p.badge} preview={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ReportCard = ({ preview }: { preview: IPreview }) => (
  <article className="flex flex-col group">
    <Link
      href={preview.href}
      aria-label={`${preview.title} 예시 보기`}
      className={`relative block rounded-[20px] overflow-hidden border border-[#e8e8e6] bg-white ${preview.shadowTone} mb-6 transition-transform duration-300 group-hover:-translate-y-1`}
      prefetch={false}
    >
      {/* Mock browser chrome */}
      <div className="flex items-center gap-1.5 bg-[#fafaf9] border-b border-[#e8e8e6] px-3 py-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-3 text-[11px] font-mono text-[#a0a0a0] truncate">
          ssaujima.com{preview.href.replace('?demo=1', '')}
        </span>
      </div>

      <div className="relative bg-white aspect-[3/4] overflow-hidden">
        <Image
          src={preview.imageSrc}
          alt={preview.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
          priority={false}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white/95"
        />
      </div>
    </Link>

    {/* Caption */}
    <div className="flex items-center gap-2 mb-3">
      <span
        className={`text-[10px] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 rounded-md ${preview.badgeTone}`}
      >
        {preview.badge}
      </span>
      <h3 className="text-[20px] font-semibold tracking-[-0.015em] text-[#1a1a1a]">
        {preview.title}
      </h3>
    </div>
    <p className="text-[14px] text-[#6b6b6b] leading-relaxed mb-4">
      {preview.description}
    </p>
    <ul className="space-y-2 mb-6">
      {preview.bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-[13px] text-[#1a1a1a]">
          <span
            aria-hidden="true"
            className="text-[#a0a0a0] mt-0.5 flex-shrink-0"
          >
            ―
          </span>
          <span>{b}</span>
        </li>
      ))}
    </ul>

    <Link
      href={preview.href}
      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1a1a1a] hover:gap-2.5 transition-all w-fit"
    >
      예시 리포트 보기
      <span aria-hidden="true">→</span>
    </Link>
  </article>
)

export default ReportPreviewSection
