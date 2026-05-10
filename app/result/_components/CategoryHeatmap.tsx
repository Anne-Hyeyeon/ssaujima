// Compact heatmap visualizing per-category agreement intensity.
// Pattern: small squares colored by intensity, labeled below each square.

'use client'

import clsx from 'clsx'
import type { CategoryRow } from '../../../lib/report-stats'

interface ICategoryHeatmapProps {
  rows: CategoryRow[]
}

const intensityClass = (agreement: number): string => {
  if (agreement >= 85) return 'bg-[#1a1a1a] text-white'
  if (agreement >= 70) return 'bg-[#3d3d3d] text-white'
  if (agreement >= 55) return 'bg-[#6b6b6b] text-white'
  if (agreement >= 40) return 'bg-[#bcb9b6] text-white'
  if (agreement >= 25) return 'bg-[#e8e8e6] text-[#1a1a1a]'
  return 'bg-[#fafaf9] text-[#1a1a1a]'
}

export const CategoryHeatmap = ({ rows }: ICategoryHeatmapProps) => {
  return (
    <div className="border border-[#e8e8e6] rounded-2xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] tracking-[0.08em] uppercase text-[#a0a0a0] font-medium">
          영역별 일치 강도
        </span>
        <Legend />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {rows.map((row) => (
          <div key={row.key} className="flex flex-col items-stretch gap-1.5">
            <div
              className={clsx(
                'aspect-square rounded-lg flex items-end justify-start p-2',
                intensityClass(row.agreement),
              )}
              aria-hidden="true"
            >
              <span className="text-[18px] font-semibold tabular-nums leading-none">
                {row.agreement}
              </span>
            </div>
            <p className="text-[11px] text-[#1a1a1a] font-medium leading-tight text-center">
              {row.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const Legend = () => (
  <div className="flex items-center gap-1.5">
    <span className="text-[10px] text-[#a0a0a0]">낮음</span>
    {['#fafaf9', '#e8e8e6', '#bcb9b6', '#6b6b6b', '#3d3d3d', '#1a1a1a'].map((c) => (
      <span
        key={c}
        className="w-3 h-3 rounded-sm border border-[#e8e8e6]"
        style={{ backgroundColor: c }}
        aria-hidden="true"
      />
    ))}
    <span className="text-[10px] text-[#a0a0a0]">높음</span>
  </div>
)

export default CategoryHeatmap
