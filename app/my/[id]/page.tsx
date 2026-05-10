'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getReportById } from '../../../lib/saved-reports'
import type { SavedReport, SimpleResult, ProResult } from '../../../lib/types'
import SimpleResultView from '../../result/_components/SimpleResultView'
import ProResultView from '../../result/_components/ProResultView'

export default function SavedReportPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<SavedReport | null>(null)

  useEffect(() => {
    const id = params.id as string
    const found = getReportById(id)
    if (!found) {
      router.push('/my')
      return
    }
    setReport(found)
  }, [params.id, router])

  if (!report) return null

  return (
    <main>
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => router.push('/my')}
            className="text-sm text-[#a0a0a0] hover:text-[#1a1a1a]"
          >
            ← 마이페이지
          </button>
          <span className="text-[#e8e8e6]">|</span>
          <p className="text-sm text-[#a0a0a0]">
            {new Date(report.createdAt).toLocaleDateString('ko-KR')} 저장
          </p>
        </div>
      </div>

      {report.type === 'simple' ? (
        <SimpleResultView
          computed={report.computed as SimpleResult}
          answersA={report.answersA}
          answersB={report.answersB}
        />
      ) : (
        <ProResultView
          computed={report.computed as ProResult}
          answersA={report.answersA}
          answersB={report.answersB}
        />
      )}
    </main>
  )
}
