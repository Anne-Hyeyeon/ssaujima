'use client'

import clsx from 'clsx'

interface IOptionRadioProps {
  option: string
  index: 0 | 1 | 2 | 3
  selected: boolean
  onSelect: () => void
  color?: 'pink' | 'blue'
}

export const OptionRadio = ({ option, selected, onSelect, color = 'pink' }: IOptionRadioProps) => {
  const isPink = color === 'pink'

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={clsx(
        'flex items-center gap-3.5 w-full px-4 py-4 rounded-2xl border-2 text-left cursor-pointer',
        'transition-all duration-150 min-h-[56px]',
        selected
          ? isPink
            ? 'border-[#f47b9b] bg-[#fff5f8] shadow-sm'
            : 'border-[#6b9bd8] bg-[#f0f7ff] shadow-sm'
          : isPink
            ? 'border-[#ede8f5] bg-white hover:border-[#f47b9b]/50 hover:bg-[#fdf8fc]'
            : 'border-[#e0e8f5] bg-white hover:border-[#6b9bd8]/50 hover:bg-[#f5f8fd]',
      )}
    >
      {/* Circle radio */}
      <span
        className={clsx(
          'flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 transition-all duration-150',
          selected
            ? isPink
              ? 'border-[#f47b9b] bg-[#f47b9b]'
              : 'border-[#6b9bd8] bg-[#6b9bd8]'
            : 'border-[#ccc4e0] bg-white',
        )}
        aria-hidden="true"
      >
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
      </span>

      <span
        className={clsx(
          'flex-1 text-[15px] font-medium leading-snug',
          selected
            ? isPink ? 'text-[#c2185b]' : 'text-[#2b5fa0]'
            : 'text-[#2d2340]',
        )}
      >
        {option}
      </span>
    </button>
  )
}

export default OptionRadio
