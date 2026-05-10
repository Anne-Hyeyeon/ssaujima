import type { SavedReport, SimpleResult, ProResult } from './types'
import { getCurrentUser } from './mock-auth'

const REPORTS_KEY = 'ssaujima:reports'

function getReports(): SavedReport[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(REPORTS_KEY)
    return raw ? (JSON.parse(raw) as SavedReport[]) : []
  } catch {
    return []
  }
}

function setReports(reports: SavedReport[]): void {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports))
}

export function saveReport(
  type: 'simple' | 'pro',
  answersA: number[],
  answersB: number[],
  computed: SimpleResult | ProResult
): SavedReport | null {
  const user = getCurrentUser()
  if (!user) return null

  const report: SavedReport = {
    id: crypto.randomUUID(),
    userId: user.id,
    type,
    createdAt: new Date().toISOString(),
    answersA: answersA as SavedReport['answersA'],
    answersB: answersB as SavedReport['answersB'],
    computed,
  }

  const reports = getReports()
  setReports([report, ...reports]) // newest first
  return report
}

export function getUserReports(): SavedReport[] {
  const user = getCurrentUser()
  if (!user) return []
  return getReports().filter((r) => r.userId === user.id)
}

export function getReportById(id: string): SavedReport | null {
  return getReports().find((r) => r.id === id) ?? null
}

export function deleteReport(id: string): void {
  setReports(getReports().filter((r) => r.id !== id))
}
