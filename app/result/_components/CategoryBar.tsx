'use client'

import type { CategoryKey } from '../../../lib/types'
import { CATEGORY_ORDER, CATEGORY_LABELS } from '../../../lib/types'

interface ICategoryBarProps {
  categoryScores: Record<CategoryKey, { a: number; b: number }>
}

export const CategoryBarChart = ({ categoryScores }: ICategoryBarProps) => {
  return (
    <div className="space-y-4">
      {CATEGORY_ORDER.map((key) => {
        const { a, b } = categoryScores[key]
        const agreement = 100 - Math.abs(a - b)
        return (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-[#1a1a1a]">{CATEGORY_LABELS[key]}</span>
              <span className="text-sm text-[#a0a0a0]">{Math.round(agreement)}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#e8e8e6] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#f47b9b] transition-all"
                style={{ width: `${agreement}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
