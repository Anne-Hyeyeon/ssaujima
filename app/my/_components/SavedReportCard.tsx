'use client'
import Link from 'next/link'
import type { SavedReport } from '../../../lib/types'

interface ISavedReportCardProps {
  report: SavedReport
}

export const SavedReportCard = ({ report }: ISavedReportCardProps) => {
  const date = new Date(report.createdAt)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '')

  return (
    <Link
      href={`/my/${report.id}`}
      className="block border border-[#e8e8e6] rounded-xl p-4 hover:border-[#f47b9b] transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              report.type === 'pro'
                ? 'bg-[#f0ebf8] text-[#6b39b5]'
                : 'bg-[#ffeef3] text-[#c2185b]'
            }`}
          >
            {report.type === 'pro' ? '프로' : '심플'}
          </span>
          <span className="font-medium text-[#1a1a1a]">{report.computed.score}점</span>
          <span className="text-sm text-[#6b6b6b]">{report.computed.typeName}</span>
        </div>
        <span className="text-sm text-[#a0a0a0]">{date}</span>
      </div>
    </Link>
  )
}
