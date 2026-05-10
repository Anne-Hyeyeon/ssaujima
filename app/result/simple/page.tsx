// Page: Simple compatibility result (Server Component)

import { redirect } from 'next/navigation'
import { decodeAnswers } from '../../../lib/url-codec'
import { computeSimple } from '../../../lib/calculator'
import { MOCK_ANSWERS_A, MOCK_ANSWERS_B } from '../../../lib/mock-data'
import { QUESTIONS_SIMPLE } from '../../test/_data/questions-simple'
import SimpleResultView from '../_components/SimpleResultView'
import type { AnswerValue } from '../../../lib/types'

export default async function SimpleResultPage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; demo?: string }>
}) {
  const { a, demo } = await searchParams

  let answersA: AnswerValue[]
  let answersB: AnswerValue[]

  if (demo === '1') {
    answersA = MOCK_ANSWERS_A
    answersB = MOCK_ANSWERS_B
  } else if (!a) {
    redirect('/test/simple')
  } else {
    const decoded = decodeAnswers(a, 15)
    if (!decoded) redirect('/test/simple')
    answersA = decoded as AnswerValue[]
    answersB = MOCK_ANSWERS_B
  }

  const computed = computeSimple(answersA!, answersB!, QUESTIONS_SIMPLE)

  return (
    <SimpleResultView
      computed={computed}
      answersA={answersA!}
      answersB={answersB!}
    />
  )
}
