// Numbered section heading: "01 — 종합 점수" — used to anchor the report sections.

interface ISectionLabelProps {
  number: string
  title: string
  description?: string
}

export const SectionLabel = ({ number, title, description }: ISectionLabelProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-[12px] font-mono tabular-nums text-[#c2185b] tracking-[0.08em]">
          {number}
        </span>
        <span className="h-px flex-1 bg-[#e8e8e6]" aria-hidden="true" />
      </div>
      <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[#1a1a1a]">
        {title}
      </h2>
      {description && (
        <p className="text-[13px] text-[#6b6b6b] mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionLabel
