// Pairing layer: stores per-user test submissions in localStorage and lets
// partners pair up when both finish. Designed for two-window hackathon demos
// (storage events fire across windows of the same browser/origin).

import type { AnswerValue, Gender, PartnerTestRecord, TestTrack } from './types'
import { encodeAnswers } from './url-codec'

const TESTS_KEY = 'ssaujima:partner-tests'

type TestStore = Record<string, Partial<Record<TestTrack, PartnerTestRecord>>>

const readStore = (): TestStore => {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(TESTS_KEY)
    return raw ? (JSON.parse(raw) as TestStore) : {}
  } catch {
    return {}
  }
}

const writeStore = (store: TestStore): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(TESTS_KEY, JSON.stringify(store))
}

export const submitAnswers = (
  userId: string,
  type: TestTrack,
  answers: AnswerValue[],
): PartnerTestRecord => {
  const store = readStore()
  const record: PartnerTestRecord = {
    userId,
    type,
    answers,
    submittedAt: new Date().toISOString(),
  }
  if (!store[userId]) store[userId] = {}
  store[userId][type] = record
  writeStore(store)
  return record
}

export const getMyAnswers = (
  userId: string,
  type: TestTrack,
): PartnerTestRecord | null => readStore()[userId]?.[type] ?? null

export const getPartnerAnswers = (
  partnerId: string | null,
  type: TestTrack,
): PartnerTestRecord | null => {
  if (!partnerId) return null
  return readStore()[partnerId]?.[type] ?? null
}

export const bothFinished = (
  userId: string,
  partnerId: string | null,
  type: TestTrack,
): boolean => Boolean(getMyAnswers(userId, type) && getPartnerAnswers(partnerId, type))

export const clearPair = (
  userId: string,
  partnerId: string | null,
  type: TestTrack,
): void => {
  const store = readStore()
  if (store[userId]) delete store[userId][type]
  if (partnerId && store[partnerId]) delete store[partnerId][type]
  writeStore(store)
}

// Build a result URL with female mapped to ?a, male to ?b.
// Keeps colors stable: pink=female=A, blue=male=B regardless of who's viewing.
export const buildPairedResultUrl = (
  resultPath: string,
  userId: string,
  userGender: Gender,
  partnerId: string,
  partnerGender: Gender,
  type: TestTrack,
): string | null => {
  const myRecord = getMyAnswers(userId, type)
  const partnerRecord = getPartnerAnswers(partnerId, type)
  if (!myRecord || !partnerRecord) return null

  const femaleAnswers =
    userGender === 'female' ? myRecord.answers : partnerRecord.answers
  const maleAnswers =
    userGender === 'male' ? myRecord.answers : partnerRecord.answers

  // Fallback when both partners share gender (rare in this product, but stable).
  const aAnswers = userGender === partnerGender ? myRecord.answers : femaleAnswers
  const bAnswers = userGender === partnerGender ? partnerRecord.answers : maleAnswers

  return `${resultPath}?a=${encodeAnswers(aAnswers)}&b=${encodeAnswers(bAnswers)}`
}

export const subscribeToPartnerSubmissions = (
  cb: () => void,
): (() => void) => {
  if (typeof window === 'undefined') return () => {}
  const handler = (e: StorageEvent) => {
    if (e.key === TESTS_KEY) cb()
  }
  window.addEventListener('storage', handler)
  // Same-window updates won't fire storage event — fall back to a slow poll.
  const interval = window.setInterval(cb, 1500)
  return () => {
    window.removeEventListener('storage', handler)
    window.clearInterval(interval)
  }
}
