'use client'

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import type { CategoryKey } from '../../../lib/types'
import { CATEGORY_ORDER, CATEGORY_LABELS } from '../../../lib/types'

interface IRadarChartProps {
  categoryScores: Record<CategoryKey, { a: number; b: number }>
}

export const CompatibilityRadarChart = ({ categoryScores }: IRadarChartProps) => {
  const data = CATEGORY_ORDER.map((key) => ({
    subject: CATEGORY_LABELS[key],
    A: categoryScores[key].a,
    B: categoryScores[key].b,
    fullMark: 100,
  }))

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e8e8e6" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b6b6b' }} />
            <Radar name="A" dataKey="A" stroke="#f47b9b" fill="#f47b9b" fillOpacity={0.2} />
            <Radar name="B" dataKey="B" stroke="#6b9bd8" fill="#6b9bd8" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <span className="flex items-center gap-1.5 text-sm text-[#6b6b6b]">
          <span className="w-3 h-3 rounded-full bg-[#f47b9b]" /> A
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[#6b6b6b]">
          <span className="w-3 h-3 rounded-full bg-[#6b9bd8]" /> B
        </span>
      </div>
    </div>
  )
}
