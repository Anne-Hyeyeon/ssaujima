// Watch-out / friction list for Simple report.
// Pattern: numbered item, category label, severity tag.

import { CATEGORY_LABELS } from '../../../lib/types'
import { summarizeCaution } from '../../../lib/insight-text'
import type { Insight } from '../../../lib/types'

interface ICautionsListProps {
  items: Insight[]
  emptyText?: string
}

const severityFor = (diff: number) => {
  if (diff >= 3) return { label: '큰 차이', tone: 'bg-[#fff0e8] text-[#e07020]' }
  if (diff >= 2) return { label: '주의', tone: 'bg-[#fff8e6] text-[#b58900]' }
  return { label: '경미', tone: 'bg-[#e8f0fa] text-[#2c5282]' }
}

export const CautionsList = ({
  items,
  emptyText = '주의할 갈등 요소가 많지 않아요.',
}: ICautionsListProps) => {
  if (items.length === 0) {
    return <p className="text-[#a0a0a0] text-sm">{emptyText}</p>
  }

  return (
    <ul className="border border-[#e8e8e6] rounded-2xl divide-y divide-[#e8e8e6] bg-white">
      {items.map((item, idx) => {
        const sev = severityFor(item.diff)
        return (
          <li key={item.index} className="flex items-start gap-4 px-5 py-4">
            <span className="text-[11px] font-mono tabular-nums text-[#a0a0a0] w-6 mt-1">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.04em] uppercase text-[#e07020] font-semibold mb-1">
                {CATEGORY_LABELS[item.category]}
              </p>
              <p className="text-[14px] text-[#1a1a1a] leading-relaxed">
                {summarizeCaution(item.text, item.diff)}
              </p>
            </div>
            <span
              className={`shrink-0 inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${sev.tone}`}
            >
              {sev.label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default CautionsList
