// Single-type personality card used in the Simple report.
// Pattern: type name + tagline, traits chips, strengths and cautions lists.

import type { TypeKey } from '../../../lib/types'
import { getTypeDescription } from '../../../lib/type-descriptions'

interface ITypeCardProps {
  type: TypeKey
  typeName: string
}

export const TypeCard = ({ type, typeName }: ITypeCardProps) => {
  const desc = getTypeDescription(type)

  return (
    <div className="border border-[#e8e8e6] rounded-2xl bg-white overflow-hidden">
      <div className="px-6 py-5 bg-[#fafaf9] border-b border-[#e8e8e6]">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#c2185b] font-semibold mb-1">
          나의 생활유형
        </p>
        <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[#1a1a1a] mb-2">
          {typeName}
        </h3>
        <p className="text-[14px] text-[#6b6b6b] leading-relaxed">{desc.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {desc.traits.map((t) => (
            <span
              key={t}
              className="inline-block bg-white border border-[#e8e8e6] text-[#1a1a1a] text-[11px] font-medium px-2.5 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#e8e8e6]">
        <ListBlock
          title="강점"
          accent="text-[#2d8a57]"
          marker="bg-[#e8f4ee] text-[#2d8a57]"
          items={desc.strengths}
        />
        <ListBlock
          title="주의할 점"
          accent="text-[#e07020]"
          marker="bg-[#fff0e8] text-[#e07020]"
          items={desc.cautions}
        />
      </div>
    </div>
  )
}

const ListBlock = ({
  title,
  accent,
  marker,
  items,
}: {
  title: string
  accent: string
  marker: string
  items: string[]
}) => (
  <div className="px-6 py-5">
    <p className={`text-[11px] tracking-[0.08em] uppercase font-semibold ${accent} mb-3`}>
      {title}
    </p>
    <ul className="space-y-2.5">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2.5 text-[13px] text-[#1a1a1a] leading-relaxed">
          <span
            className={`w-5 h-5 rounded-full ${marker} text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5`}
            aria-hidden="true"
          >
            {idx + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default TypeCard
