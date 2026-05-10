// Document-style header used at the top of both Simple and Pro reports.
// Inspired by Notion / Apple report layouts: hero visual, small label, big title, metadata row.

import Image from 'next/image'

interface IReportHeaderProps {
  badge: string
  title: string
  subtitle: string
  reportId: string
  date: string
  pages?: string
}

export const ReportHeader = ({
  badge,
  title,
  subtitle,
  reportId,
  date,
  pages,
}: IReportHeaderProps) => {
  return (
    <header className="mb-12">
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#ffeef3] via-[#fdf6ff] to-[#e8f1ff]">
        <Image
          src="/report-couple-hero-transparent.png"
          alt="두 사람이 마주 보고 미소 짓는 일러스트"
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-contain object-bottom drop-shadow-[0_8px_24px_rgba(244,123,155,0.15)]"
        />
      </div>

      <div className="flex items-center gap-2 mb-5">
        <span className="inline-block bg-[#ffeef3] text-[#c2185b] text-[11px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-md">
          {badge}
        </span>
        <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0]">
          Compatibility Report
        </span>
      </div>

      <h1 className="text-[36px] sm:text-[40px] font-semibold tracking-[-0.025em] leading-[1.1] text-[#1a1a1a] mb-3">
        {title}
      </h1>
      <p className="text-[15px] text-[#6b6b6b] leading-relaxed mb-6 max-w-xl">
        {subtitle}
      </p>

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 pt-5 border-t border-[#e8e8e6]">
        <MetaItem label="Report ID" value={reportId} mono />
        <MetaItem label="발행일" value={date} mono />
        <MetaItem label="문항 수" value={pages ?? '15문항'} mono />
        <MetaItem label="버전" value="v1.0" mono />
      </dl>
    </header>
  )
}

const MetaItem = ({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) => (
  <div>
    <dt className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] mb-0.5">
      {label}
    </dt>
    <dd
      className={
        'text-[13px] text-[#1a1a1a]' +
        (mono ? ' font-mono tabular-nums' : ' font-medium')
      }
    >
      {value}
    </dd>
  </div>
)

export default ReportHeader
