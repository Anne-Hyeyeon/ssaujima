// Shared lib: encode/decode answer arrays as compact base64url strings
// 2 bits per answer (1→00, 2→01, 3→10, 4→11), 4 answers packed per byte

import type { Answers, AnswerValue } from './types'

const toBase64Url = (buf: Uint8Array): string => {
  const bytes = Array.from(buf)
  const binary = bytes.map((b) => String.fromCharCode(b)).join('')
  const b64 = btoa(binary)
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

const fromBase64Url = (str: string): Uint8Array | null => {
  try {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - (str.length % 4)) % 4)
    const binary = atob(padded)
    const buf = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      buf[i] = binary.charCodeAt(i)
    }
    return buf
  } catch {
    return null
  }
}

export const encodeAnswers = (answers: Answers): string => {
  const byteCount = Math.ceil(answers.length / 4)
  const buf = new Uint8Array(byteCount)

  for (let i = 0; i < answers.length; i++) {
    const byteIndex = Math.floor(i / 4)
    const bitOffset = (3 - (i % 4)) * 2
    const bits = (answers[i] - 1) & 0b11
    buf[byteIndex] |= bits << bitOffset
  }

  return toBase64Url(buf)
}

export const decodeAnswers = (str: string, expectedLength: number): Answers | null => {
  if (!str || typeof str !== 'string') return null

  const buf = fromBase64Url(str)
  if (!buf) return null

  const requiredBytes = Math.ceil(expectedLength / 4)
  if (buf.length < requiredBytes) return null

  const answers: AnswerValue[] = []
  for (let i = 0; i < expectedLength; i++) {
    const byteIndex = Math.floor(i / 4)
    const bitOffset = (3 - (i % 4)) * 2
    const bits = (buf[byteIndex] >> bitOffset) & 0b11
    const value = (bits + 1) as AnswerValue
    if (value < 1 || value > 4) return null
    answers.push(value)
  }

  return answers
}
