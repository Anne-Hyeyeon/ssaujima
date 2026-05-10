'use client'

// Institutional-assessment styled question card.
// Pattern: ID code + domain code + 4-option Likert-style anchored answers (A/B/C/D).

import clsx from 'clsx'
import type { Gender } from '../../../lib/types'

interface IClinicalQuestionItemProps {
  questionNumber: number
  totalQuestions: number
  domainNumber: number
  domainTotal: number
  domainLabel: string
  itemCode: string
  text: string
  options: readonly [string, string, string, string]
  selected: 1 | 2 | 3 | 4 | null
  onSelect: (value: 1 | 2 | 3 | 4) => void
  gender: Gender
}

const LETTERS = ['A', 'B', 'C', 'D'] as const

export const ClinicalQuestionItem = ({
  questionNumber,
  totalQuestions,
  domainNumber,
  domainTotal,
  domainLabel,
  itemCode,
  text,
  options,
  selected,
  onSelect,
  gender,
}: IClinicalQuestionItemProps) => {
  const isPink = gender === 'female'
  const accent = isPink ? '#c2185b' : '#2c5282'
  const accentBg = isPink ? '#fff5f8' : '#f0f7ff'
  const accentBorder = isPink ? '#f47b9b' : '#6b9bd8'

  return (
    <article className="border border-[#dcdcd8] rounded-[2px] bg-white">
      {/* Top metadata strip */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-2.5 border-b border-[#dcdcd8] bg-[#fafaf9]">
        <span className="text-[10px] font-mono tabular-nums text-[#6b6b6b] tracking-[0.04em]">
          Q-{String(questionNumber).padStart(3, '0')}/{String(totalQuestions).padStart(3, '0')}
        </span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#a0a0a0] truncate text-center">
          Section {romanize(domainNumber)} · {domainLabel}
        </span>
        <span className="text-[10px] font-mono tabular-nums text-[#6b6b6b]">
          {itemCode}
        </span>
      </div>

      {/* Section progress dots */}
      <div className="flex items-center gap-1 px-5 pt-3">
        {Array.from({ length: domainTotal }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              'h-0.5 flex-1 rounded-full',
              i < domainNumber ? 'bg-[#1a1a1a]' : 'bg-[#e8e8e6]',
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Question */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] mb-2">
          Item statement
        </p>
        <h2 className="text-[18px] sm:text-[20px] font-medium tracking-[-0.01em] text-[#1a1a1a] leading-[1.45]">
          {text}
        </h2>
      </div>

      {/* Anchored response scale */}
      <div className="px-5 pt-3 pb-5">
        <div className="flex items-center justify-between text-[10px] tracking-[0.08em] uppercase text-[#a0a0a0] font-medium mb-2 px-1">
          <span>응답 척도</span>
          <span>4-point forced choice</span>
        </div>

        <ul className="divide-y divide-[#e8e8e6] border border-[#e8e8e6] rounded-[2px] overflow-hidden">
          {options.map((option, idx) => {
            const value = (idx + 1) as 1 | 2 | 3 | 4
            const isSelected = selected === value
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => onSelect(value)}
                  aria-pressed={isSelected}
                  className={clsx(
                    'w-full px-3 py-3 flex items-center gap-3 text-left transition-colors min-h-[52px]',
                    isSelected ? 'bg-[color:var(--accent-bg)]' : 'bg-white hover:bg-[#fafaf9]',
                  )}
                  style={
                    {
                      ['--accent-bg' as string]: accentBg,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={clsx(
                      'shrink-0 w-7 h-7 rounded-[2px] border-[1.5px] flex items-center justify-center text-[12px] font-mono tabular-nums font-semibold',
                      isSelected ? 'text-white' : 'text-[#6b6b6b]',
                    )}
                    style={{
                      borderColor: isSelected ? accent : '#bcb9b6',
                      backgroundColor: isSelected ? accent : 'transparent',
                    }}
                    aria-hidden="true"
                  >
                    {LETTERS[idx]}
                  </span>
                  <span
                    className="flex-1 text-[14px] leading-snug"
                    style={{
                      color: isSelected ? accent : '#1a1a1a',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    {option}
                  </span>
                  <span
                    className="text-[10px] font-mono tabular-nums text-[#a0a0a0]"
                    aria-hidden="true"
                  >
                    [{value}]
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <p
          className="text-[10px] tracking-[0.08em] uppercase font-mono text-[#a0a0a0] mt-2 px-1 text-right"
          style={{ borderColor: accentBorder }}
        >
          Subscale · {domainLabel}
        </p>
      </div>
    </article>
  )
}

const romanize = (n: number): string => {
  const map: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    11: 'XI',
  }
  return map[n] ?? String(n)
}

export default ClinicalQuestionItem
