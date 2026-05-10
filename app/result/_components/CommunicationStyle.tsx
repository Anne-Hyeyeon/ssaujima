// Pro-only: Communication style profile — dual horizontal bars showing A vs B
// across 4 dimensions extracted from communication category answers.

'use client'

import type { CommunicationDimension } from '../../../lib/report-stats'

interface ICommunicationStyleProps {
  dimensions: CommunicationDimension[]
}

export const CommunicationStyle = ({ dimensions }: ICommunicationStyleProps) => {
  return (
    <div className="border border-[#e8e8e6] rounded-2xl bg-white overflow-hidden">
      <div className="px-5 py-3 bg-[#fafaf9] border-b border-[#e8e8e6] flex items-center justify-between">
        <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-medium">
          커뮤니케이션 프로파일
        </span>
        <div className="flex items-center gap-3 text-[11px] text-[#6b6b6b]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f47b9b]" /> A
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6b9bd8]" /> B
          </span>
        </div>
      </div>

      <ul className="divide-y divide-[#e8e8e6]">
        {dimensions.map((dim) => (
          <li key={dim.key} className="px-5 py-4">
            <div className="flex items-baseline justify-between mb-1">
              <p className="text-[14px] font-medium text-[#1a1a1a]">{dim.label}</p>
              <p className="text-[11px] text-[#a0a0a0]">{dim.description}</p>
            </div>
            <div className="space-y-1.5 mt-2">
              <Bar value={dim.aValue} side="a" />
              <Bar value={dim.bValue} side="b" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Bar = ({ value, side }: { value: number; side: 'a' | 'b' }) => {
  const color = side === 'a' ? '#f47b9b' : '#6b9bd8'
  const label = side === 'a' ? 'A' : 'B'
  const labelColor = side === 'a' ? 'text-[#c2185b]' : 'text-[#2c5282]'
  return (
    <div className="flex items-center gap-3">
      <span className={`text-[10px] font-semibold w-3 ${labelColor}`}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[#fafaf9] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
          aria-hidden="true"
        />
      </div>
      <span className="text-[11px] font-mono tabular-nums text-[#6b6b6b] w-9 text-right">
        {value}
      </span>
    </div>
  )
}

export default CommunicationStyle
