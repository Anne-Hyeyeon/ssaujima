// Notion-style table that breaks down each category with mini horizontal bars.
// Pattern: column header row, then per-category row showing label, mini bar, agreement %, band tag.

'use client'

import clsx from 'clsx'
import type { CategoryRow } from '../../../lib/report-stats'
import { BAND_LABELS } from '../../../lib/report-stats'

interface ICategoryBreakdownTableProps {
  rows: CategoryRow[]
  showPartnerScores?: boolean
}

const bandStyles = {
  aligned: 'bg-[#e8f4ee] text-[#2d8a57]',
  mostly: 'bg-[#e8f0fa] text-[#2c5282]',
  mixed: 'bg-[#fff8e6] text-[#b58900]',
  apart: 'bg-[#fff0e8] text-[#e07020]',
} as const

export const CategoryBreakdownTable = ({
  rows,
  showPartnerScores = false,
}: ICategoryBreakdownTableProps) => {
  return (
    <div className="border border-[#e8e8e6] rounded-2xl overflow-hidden bg-white">
      <div
        className={clsx(
          'grid items-center px-5 py-3 bg-[#fafaf9] border-b border-[#e8e8e6]',
          'text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0]',
          showPartnerScores
            ? 'grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr]'
            : 'grid-cols-[2fr_3fr_1fr_0.8fr]',
        )}
      >
        <span>영역</span>
        {showPartnerScores ? (
          <>
            <span className="text-right">파트너 점수</span>
            <span className="text-right">일치도</span>
            <span className="text-right">문항</span>
            <span className="text-right">상태</span>
          </>
        ) : (
          <>
            <span>일치도</span>
            <span className="text-right">문항</span>
            <span className="text-right">상태</span>
          </>
        )}
      </div>

      <ul>
        {rows.map((row) => (
          <li
            key={row.key}
            className={clsx(
              'grid items-center px-5 py-4 border-b border-[#e8e8e6] last:border-b-0',
              showPartnerScores
                ? 'grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-3'
                : 'grid-cols-[2fr_3fr_1fr_0.8fr] gap-3',
            )}
          >
            <span className="text-[14px] font-medium text-[#1a1a1a]">{row.label}</span>

            {showPartnerScores ? (
              <PartnerScoreBar a={row.aScore ?? 0} b={row.bScore ?? 0} />
            ) : (
              <AgreementBar agreement={row.agreement} />
            )}

            {showPartnerScores && (
              <span className="text-right text-[13px] font-mono tabular-nums text-[#1a1a1a]">
                {row.agreement}
                <span className="text-[#a0a0a0]">%</span>
              </span>
            )}

            <span className="text-right text-[13px] font-mono tabular-nums text-[#a0a0a0]">
              {row.questionCount}
            </span>

            <span
              className={clsx(
                'text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full justify-self-end whitespace-nowrap',
                bandStyles[row.band],
              )}
            >
              {BAND_LABELS[row.band]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const AgreementBar = ({ agreement }: { agreement: number }) => (
  <div className="flex items-center gap-3">
    <div className="flex-1 h-1.5 rounded-full bg-[#f0eeec] overflow-hidden">
      <div
        className="h-full rounded-full bg-[#1a1a1a]"
        style={{ width: `${agreement}%` }}
        aria-hidden="true"
      />
    </div>
    <span className="text-[13px] font-mono tabular-nums text-[#1a1a1a] w-10 text-right">
      {agreement}
      <span className="text-[#a0a0a0]">%</span>
    </span>
  </div>
)

const PartnerScoreBar = ({ a, b }: { a: number; b: number }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-medium text-[#c2185b] w-3">A</span>
      <div className="flex-1 h-1.5 rounded-full bg-[#fafaf9] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#f47b9b]"
          style={{ width: `${a}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="text-[10px] font-mono tabular-nums text-[#6b6b6b] w-8 text-right">
        {a}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-medium text-[#2c5282] w-3">B</span>
      <div className="flex-1 h-1.5 rounded-full bg-[#fafaf9] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#6b9bd8]"
          style={{ width: `${b}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="text-[10px] font-mono tabular-nums text-[#6b6b6b] w-8 text-right">
        {b}
      </span>
    </div>
  </div>
)

export default CategoryBreakdownTable
