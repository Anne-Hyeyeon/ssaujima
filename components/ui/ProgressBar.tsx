import clsx from 'clsx'

interface IProgressBarProps {
  current: number
  total: number
  color?: 'pink' | 'blue'
  className?: string
}

export const ProgressBar = ({ current, total, color = 'pink', className }: IProgressBarProps) => {
  const pct = Math.min(100, Math.round((current / total) * 100))
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div className="flex-1 h-1 bg-[#e8e8e6] rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-300', {
            'bg-[#f47b9b]': color === 'pink',
            'bg-[#6b9bd8]': color === 'blue',
          })}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#a0a0a0] tabular-nums shrink-0">
        {current}/{total}
      </span>
    </div>
  )
}
