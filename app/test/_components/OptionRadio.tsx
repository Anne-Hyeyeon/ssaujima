'use client'

// Test UI: card-style radio option button for compatibility test

import clsx from 'clsx'

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

interface IOptionRadioProps {
  option: string
  index: 0 | 1 | 2 | 3
  selected: boolean
  onSelect: () => void
}

export const OptionRadio = ({ option, index, selected, onSelect }: IOptionRadioProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={clsx(
        // Layout
        'flex items-center gap-3',
        // Sizing
        'w-full',
        // Spacing
        'p-4',
        // Typography
        'text-left text-base',
        // Shape
        'rounded-xl border',
        // Transition
        'transition-colors duration-150',
        // States
        selected
          ? 'border-[#f47b9b] bg-[#ffeef3] text-[#c2185b]'
          : 'border-[#e8e8e6] bg-white text-[#1a1a1a] hover:border-[#f47b9b]',
      )}
    >
      <span
        className={clsx(
          'flex items-center justify-center',
          'w-7 h-7 shrink-0',
          'rounded-full border text-sm font-semibold',
          selected
            ? 'border-[#f47b9b] bg-[#f47b9b] text-white'
            : 'border-[#e8e8e6] bg-white text-[#a0a0a0]',
        )}
      >
        {OPTION_LETTERS[index]}
      </span>
      <span className="flex-1">{option}</span>
    </button>
  )
}

export default OptionRadio
