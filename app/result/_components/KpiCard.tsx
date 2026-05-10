// KPI metric card used in executive summary grids.
// Pattern: small uppercase label, big number, unit, optional trailing context.

import clsx from 'clsx'

export type KpiTone = 'pink' | 'blue' | 'mint' | 'lavender' | 'neutral' | 'peach'

interface IKpiCardProps {
  label: string
  value: string | number
  unit?: string
  caption?: string
  tone?: KpiTone
}

const toneStyles: Record<KpiTone, string> = {
  pink: 'bg-[#ffeef3] text-[#c2185b]',
  blue: 'bg-[#e8f0fa] text-[#2c5282]',
  mint: 'bg-[#e8f4ee] text-[#2d8a57]',
  lavender: 'bg-[#f0ebf8] text-[#7c3aed]',
  peach: 'bg-[#fff0e8] text-[#e07020]',
  neutral: 'bg-[#fafaf9] text-[#1a1a1a]',
}

export const KpiCard = ({
  label,
  value,
  unit,
  caption,
  tone = 'neutral',
}: IKpiCardProps) => {
  return (
    <div className="border border-[#e8e8e6] rounded-2xl p-4 sm:p-5 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-medium">
          {label}
        </span>
        <span
          className={clsx(
            'inline-block w-2 h-2 rounded-full',
            toneStyles[tone].split(' ')[0],
          )}
          aria-hidden="true"
        />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.025em] text-[#1a1a1a] tabular-nums leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-[13px] text-[#6b6b6b] font-medium">{unit}</span>
        )}
      </div>
      {caption && (
        <p className="text-[12px] text-[#6b6b6b] mt-2 leading-relaxed">{caption}</p>
      )}
    </div>
  )
}

export default KpiCard
