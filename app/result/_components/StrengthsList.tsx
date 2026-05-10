// Curated list of "strengths" — questions where partners aligned.
// Used in both Simple and Pro reports.

import { CATEGORY_LABELS } from '../../../lib/types'
import type { Insight } from '../../../lib/types'

interface IStrengthsListProps {
  items: Insight[]
  emptyText?: string
}

export const StrengthsList = ({
  items,
  emptyText = '잘 맞는 영역을 찾는 중이에요.',
}: IStrengthsListProps) => {
  if (items.length === 0) {
    return <p className="text-[#a0a0a0] text-sm">{emptyText}</p>
  }

  return (
    <ul className="border border-[#e8e8e6] rounded-2xl divide-y divide-[#e8e8e6] bg-white">
      {items.map((item, idx) => (
        <li key={item.index} className="flex items-start gap-4 px-5 py-4">
          <span className="text-[11px] font-mono tabular-nums text-[#a0a0a0] w-6 mt-1">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div className="flex-1">
            <p className="text-[11px] tracking-[0.04em] uppercase text-[#2d8a57] font-semibold mb-1">
              {CATEGORY_LABELS[item.category]}
            </p>
            <p className="text-[14px] text-[#1a1a1a] leading-relaxed">{item.text}</p>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-1 bg-[#e8f4ee] text-[#2d8a57] text-[10px] font-semibold px-2 py-0.5 rounded-full"
          >
            {item.diff === 0 ? '완전 일치' : '거의 일치'}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default StrengthsList
