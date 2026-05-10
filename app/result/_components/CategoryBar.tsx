'use client'

import clsx from 'clsx'
import type { CategoryKey } from '../../../lib/types'
import { CATEGORY_ORDER, CATEGORY_LABELS } from '../../../lib/types'

interface ICategoryBarProps {
  categoryScores: Record<CategoryKey, { a: number; b: number }>
}

const getAgreementColor = (pct: number) => {
  if (pct >= 70) return { dot: 'bg-[#f47b9b]', bar: 'bg-gradient-to-r from-[#f47b9b] to-[#e05e85]', text: 'text-[#f47b9b]' }
  if (pct >= 45) return { dot: 'bg-[#e09b40]', bar: 'bg-gradient-to-r from-[#e09b40] to-[#c07830]', text: 'text-[#e09b40]' }
  return { dot: 'bg-[#c05070]', bar: 'bg-gradient-to-r from-[#c05070] to-[#a03050]', text: 'text-[#c05070]' }
}

export const CategoryBarChart = ({ categoryScores }: ICategoryBarProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {CATEGORY_ORDER.map((key) => {
        const { a, b } = categoryScores[key]
        const agreement = Math.round(100 - Math.abs(a - b))
        const colors = getAgreementColor(agreement)

        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={clsx('w-2 h-2 rounded-full shrink-0', colors.dot)}
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium text-[#2d2340]">{CATEGORY_LABELS[key]}</span>
              </div>
              <span className={clsx('text-xs font-semibold', colors.text)}>{agreement}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#ede8f5] overflow-hidden">
              <div
                className={clsx('h-full rounded-full transition-all duration-500', colors.bar)}
                style={{ width: `${agreement}%` }}
                role="progressbar"
                aria-valuenow={agreement}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${CATEGORY_LABELS[key]} 일치율 ${agreement}%`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
