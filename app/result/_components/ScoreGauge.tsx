// Sophisticated horizontal score gauge with band markers.
// Pattern: a rail with 4 labeled bands and a marker showing the score position.

import clsx from 'clsx'
import { SCORE_BAND_LABELS, type ScoreBand } from '../../../lib/report-stats'

interface IScoreGaugeProps {
  score: number
  band: ScoreBand
}

const BANDS: { key: ScoreBand; from: number; to: number; bg: string; text: string }[] = [
  { key: 'caution', from: 0, to: 45, bg: 'bg-[#fff0e8]', text: 'text-[#e07020]' },
  { key: 'fair', from: 45, to: 65, bg: 'bg-[#fff8e6]', text: 'text-[#b58900]' },
  { key: 'good', from: 65, to: 80, bg: 'bg-[#e8f4ee]', text: 'text-[#2d8a57]' },
  { key: 'excellent', from: 80, to: 100, bg: 'bg-[#ffeef3]', text: 'text-[#c2185b]' },
]

export const ScoreGauge = ({ score, band }: IScoreGaugeProps) => {
  return (
    <div className="border border-[#e8e8e6] rounded-2xl p-5 sm:p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] tracking-[0.08em] uppercase text-[#a0a0a0] font-medium">
          궁합 지수
        </span>
        <span
          className={clsx(
            'text-[12px] font-semibold px-2.5 py-1 rounded-full',
            BANDS.find((b) => b.key === band)?.bg,
            BANDS.find((b) => b.key === band)?.text,
          )}
        >
          {SCORE_BAND_LABELS[band]}
        </span>
      </div>

      <div className="relative">
        <div className="flex h-3 rounded-full overflow-hidden border border-[#e8e8e6]">
          {BANDS.map((b) => (
            <div
              key={b.key}
              className={clsx(b.bg, 'flex-1')}
              aria-hidden="true"
            />
          ))}
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${Math.min(99, Math.max(1, score))}%` }}
        >
          <div className="w-4 h-4 rounded-full bg-[#1a1a1a] border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
        </div>
      </div>

      <div className="grid grid-cols-4 mt-3 text-[10px] tracking-[0.08em] uppercase text-[#a0a0a0]">
        <span>주의</span>
        <span className="text-center">조율</span>
        <span className="text-center">양호</span>
        <span className="text-right">환상</span>
      </div>

      <div className="grid grid-cols-4 mt-1 text-[10px] font-mono tabular-nums text-[#a0a0a0]">
        <span>0–44</span>
        <span className="text-center">45–64</span>
        <span className="text-center">65–79</span>
        <span className="text-right">80–100</span>
      </div>
    </div>
  )
}

export default ScoreGauge
