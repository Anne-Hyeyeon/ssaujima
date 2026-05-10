'use client'

// Test UI: progress bar with count display for 싸우지마 test

import clsx from 'clsx'

interface ITestProgressBarProps {
  current: number
  total: number
  color?: 'pink' | 'blue'
}

export const TestProgressBar = ({ current, total, color = 'pink' }: ITestProgressBarProps) => {
  const pct = Math.min(100, Math.round((current / total) * 100))

  return (
    <div className="w-full px-6 pt-5">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-[#e8e8e6] overflow-hidden">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-300',
              color === 'pink' ? 'bg-[#f47b9b]' : 'bg-[#6b9bd8]',
            )}
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={1}
            aria-valuemax={total}
          />
        </div>
        <span className="text-sm text-[#a0a0a0] shrink-0 tabular-nums">
          {current} / {total}
        </span>
      </div>
    </div>
  )
}

export default TestProgressBar
