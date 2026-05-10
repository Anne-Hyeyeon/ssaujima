'use client'

import clsx from 'clsx'

interface ITestProgressBarProps {
  current: number
  total: number
  color?: 'pink' | 'blue'
}

export const TestProgressBar = ({ current, total, color = 'pink' }: ITestProgressBarProps) => {
  const pct = Math.min(100, Math.round((current / total) * 100))

  return (
    <div className="w-full">
      <div className="flex items-center justify-end mb-1.5">
        <span className={clsx(
          'text-xs font-semibold',
          color === 'pink' ? 'text-[#f47b9b]' : 'text-[#6b9bd8]',
        )}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#ede8f5] overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            color === 'pink'
              ? 'bg-gradient-to-r from-[#f47b9b] to-[#e05e85]'
              : 'bg-gradient-to-r from-[#6b9bd8] to-[#4b7bb8]',
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`진행률 ${pct}%`}
        />
      </div>
    </div>
  )
}

export default TestProgressBar
