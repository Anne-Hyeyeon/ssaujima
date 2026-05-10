'use client'

import { CATEGORY_LABELS } from '../../../lib/types'
import type { ConflictDetail, AIAdvice } from '../../../lib/types'

interface IConflictCardProps {
  conflict: ConflictDetail
  advice: AIAdvice['perConflict'][number] | undefined
  index: number
}

export const ConflictCard = ({ conflict, advice, index }: IConflictCardProps) => {
  return (
    <div className="border border-[#e8e8e6] rounded-xl p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ffeef3] text-[#c2185b] text-sm font-semibold shrink-0">
          {index + 1}
        </span>
        <div>
          <p className="text-xs text-[#a0a0a0] mb-0.5">{CATEGORY_LABELS[conflict.category]}</p>
          <p className="font-medium text-[#1a1a1a]">{conflict.title}</p>
        </div>
      </div>
      {advice && (
        <div className="space-y-2 pt-1 border-t border-[#e8e8e6]">
          <div>
            <p className="text-xs font-medium text-[#a0a0a0] mb-1">왜 다를까요?</p>
            <p className="text-[15px] text-[#6b6b6b] leading-relaxed">{advice.reason}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#a0a0a0] mb-1">절충안</p>
            <p className="text-[15px] text-[#6b6b6b] leading-relaxed">{advice.compromise}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-[#a0a0a0] mb-1">문화적 맥락</p>
            <p className="text-[15px] text-[#6b6b6b] leading-relaxed">{advice.cultural}</p>
          </div>
        </div>
      )}
    </div>
  )
}
