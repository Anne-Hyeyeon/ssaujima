// Shared lib: build Korean prompt for the couples counseling AI

import type { Answers, ConflictDetail } from './types'
import { CATEGORY_LABELS } from './types'

export const buildAdvicePrompt = (
  answersA: Answers,
  answersB: Answers,
  top5: ConflictDetail[],
): string => {
  const summarizeAnswers = (answers: Answers): string =>
    answers.map((v, i) => `Q${i + 1}: ${v}`).join(', ')

  const conflictList = top5
    .map(
      (c, idx) =>
        `${idx + 1}. [${CATEGORY_LABELS[c.category]}] "${c.title}" — 차이 ${c.diff}점 (가중치 ${c.weight})`,
    )
    .join('\n')

  return `당신은 결혼 준비 중인 커플을 돕는 따뜻하고 현실적인 상담사예요.
아래 두 사람의 생활습관 테스트 결과를 바탕으로 갈등 분석과 조율 조언을 작성해주세요.

말투: "~해요" 어체로, 공감적이고 따뜻하게. 이모지 없이.
분량: 각 항목 2~4문장.

[파트너 A 답변]
${summarizeAnswers(answersA)}

[파트너 B 답변]
${summarizeAnswers(answersB)}

[상위 갈등 항목 (가중 점수 높은 순)]
${conflictList}

각 갈등 항목에 대해 다음을 작성해주세요:
- reason: 왜 이 부분이 갈등이 되는지 (심리·생활 습관 관점에서)
- compromise: 실질적인 조율 방법 (구체적인 규칙이나 행동 제안)
- cultural: 한국 부부/커플들이 이 문제를 어떻게 해결하는지

마지막으로 conclusion: 두 사람에 대한 전체적인 응원 메시지 (3~5문장).`
}
