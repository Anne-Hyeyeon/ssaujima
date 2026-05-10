'use client'

import clsx from 'clsx'
import { CATEGORY_LABELS } from '../../../lib/types'
import { summarizeConflict } from '../../../lib/insight-text'
import type { ConflictDetail, AIAdvice } from '../../../lib/types'

interface IConflictCardProps {
  conflict: ConflictDetail
  advice: AIAdvice['perConflict'][number] | undefined
  index: number
}

export const ConflictCard = ({ conflict, advice, index }: IConflictCardProps) => {
  return (
    <div className="rounded-2xl bg-[#faf5ff] overflow-hidden">
      {/* Header row */}
      <div className="flex items-start gap-3 px-4 py-3.5">
        <span
          className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#f47b9b] to-[#e05e85] text-white text-xs font-bold shrink-0"
          aria-label={`${index + 1}번째 갈등 요소`}
        >
          {index + 1}
        </span>
        <div>
          <p className="text-[10px] font-semibold text-[#b0a8c0] uppercase tracking-wide mb-0.5">
            {CATEGORY_LABELS[conflict.category]}
          </p>
          <p className="text-[14px] font-semibold text-[#2d2340] leading-snug">
            {summarizeConflict(conflict.title, conflict.diff)}
          </p>
        </div>
      </div>

      {/* AI advice rows */}
      {advice && (
        <div className="border-t border-[#ede8f5] divide-y divide-[#ede8f5]">
          <AdviceRow label="왜 다를까요?" text={advice.reason} accent="text-[#f47b9b]" />
          <AdviceRow label="절충안" text={advice.compromise} accent="text-[#6b9bd8]" />
          <AdviceRow label="문화적 맥락" text={advice.cultural} accent="text-[#9b80d0]" />
        </div>
      )}
    </div>
  )
}

const AdviceRow = ({ label, text, accent }: { label: string; text: string; accent: string }) => (
  <div className="px-4 py-3">
    <p className={clsx('text-[10px] font-bold uppercase tracking-wide mb-1', accent)}>{label}</p>
    <p className="text-[13px] text-[#4a4260] leading-relaxed">{text}</p>
  </div>
)
