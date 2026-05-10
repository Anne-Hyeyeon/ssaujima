import { redirect } from 'next/navigation'
import { decodeAnswers } from '../../../lib/url-codec'
import { computePro } from '../../../lib/calculator'
import { getAdvice } from '../../../lib/ai-advice'
import { MOCK_ANSWERS_A_PRO, MOCK_ANSWERS_B_PRO } from '../../../lib/mock-data'
import { QUESTIONS_PRO } from '../../test/_data/questions-pro'
import ProResultView from '../_components/ProResultView'
import type { AnswerValue, ProResult } from '../../../lib/types'

export default async function ProResultPage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string; demo?: string }>
}) {
  const { a, b, demo } = await searchParams

  let answersA: AnswerValue[]
  let answersB: AnswerValue[]

  if (demo === '1') {
    answersA = MOCK_ANSWERS_A_PRO
    answersB = MOCK_ANSWERS_B_PRO
  } else if (!a) {
    redirect('/test/pro')
  } else {
    const decoded = decodeAnswers(a, 64)
    if (!decoded) redirect('/test/pro')
    answersA = decoded as AnswerValue[]
    if (b) {
      const decodedB = decodeAnswers(b, 64)
      answersB = decodedB ?? MOCK_ANSWERS_B_PRO
    } else {
      answersB = MOCK_ANSWERS_B_PRO
    }
  }

  const computed = computePro(answersA!, answersB!, QUESTIONS_PRO)
  const advice = await getAdvice(answersA!, answersB!, computed.top5Conflicts)

  const fullResult: ProResult = { ...computed, aiAdvice: advice }

  return <ProResultView computed={fullResult} />
}
