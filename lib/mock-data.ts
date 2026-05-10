// Shared lib: mock data for development and demo mode

import type { Answers, AnswerValue, AIAdvice } from './types'

// Person A: clean, morning, minimal, save money
export const MOCK_ANSWERS_A: AnswerValue[] = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 4,
] as AnswerValue[]

// Person B: relaxed, night owl, maximal, spend money
export const MOCK_ANSWERS_B: AnswerValue[] = [
  4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 1, 3, 1,
] as AnswerValue[]

// Person A PRO (64 items): extend A's pattern — mostly 1s with some 2s for middle items
export const MOCK_ANSWERS_A_PRO: Answers = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 4, // 1-15 same as simple
  1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, // 16-30
  1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, // 31-45
  1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, // 46-60
  1, 1, 1, 2,                                    // 61-64
] as AnswerValue[]

// Person B PRO (64 items): extend B's pattern — mostly 4s with some 3s
export const MOCK_ANSWERS_B_PRO: Answers = [
  4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 1, 3, 1, // 1-15 same as simple
  4, 4, 3, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 3, 4, // 16-30
  4, 4, 3, 4, 4, 4, 3, 4, 4, 3, 4, 4, 4, 3, 4, // 31-45
  4, 4, 4, 3, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 3, // 46-60
  4, 4, 4, 3,                                    // 61-64
] as AnswerValue[]

export const MOCK_AI_ADVICE: AIAdvice = {
  perConflict: [
    {
      conflictId: 0,
      reason:
        '두 분은 청소 빈도와 기준에서 큰 차이를 보여요. 한 분은 매일 청소를 당연하게 여기는 반면, 다른 분은 더러워질 때만 청소하는 편이라 매일 부딪힐 가능성이 높아요.',
      compromise:
        '청소 담당 구역을 나눠보세요. 욕실은 깔끔함을 중시하는 분이, 거실은 청소를 덜 자주 해도 되는 분이 담당하는 식으로요. \'청소 기준 합의서\'를 함께 작성해보는 커플도 많아요.',
      cultural: '한국 부부들은 주로 \'청소 당번제\'나 구역 분리로 이 문제를 해결해요.',
    },
    {
      conflictId: 1,
      reason:
        '설거지 타이밍에 대한 견해 차이가 커요. 바로 하는 것과 나중에 하는 것은 서로에게 상대방이 \'게으르다\' 또는 \'강박적이다\'로 느껴질 수 있어요.',
      compromise:
        '식사 후 30분 이내라는 타임리밋을 정해보세요. 또는 요리한 사람은 설거지를 안 하는 규칙도 효과적이에요. 식기세척기 구입도 좋은 해결책이에요.',
      cultural: '한국 가정에서는 요리와 설거지를 분담하는 방식이 많이 자리 잡고 있어요.',
    },
    {
      conflictId: 2,
      reason:
        '수건 사용 습관의 차이는 위생 기준의 차이를 반영해요. 이 부분은 협상하기 어려운 \'신체적 감각\'의 문제라 더 민감할 수 있어요.',
      compromise:
        '각자 선반을 따로 두거나, 수건 세트를 구분하는 방법이 있어요. 빨래 빈도를 조금씩 맞춰가다 보면 자연스럽게 중간 지점을 찾게 되기도 해요.',
      cultural: '개인 위생용품은 각자 기준을 존중하는 추세로 변하고 있어요.',
    },
    {
      conflictId: 3,
      reason:
        '아침형과 저녁형의 차이는 수면 습관 자체의 차이라 서로를 배려하기 어려울 수 있어요. 한 분이 자려고 하면 다른 분은 한창 활동 중일 수 있어요.',
      compromise:
        '취침 시간보다 \'소음·빛 규칙\'을 정하는 게 더 현실적이에요. 자려는 분이 불편하지 않도록 이어폰 사용, 조명 조절 등을 합의해보세요.',
      cultural: '한국 맞벌이 부부들도 수면 시간이 달라 \'각방\' 사용이 늘어나고 있어요.',
    },
    {
      conflictId: 4,
      reason:
        '저축과 소비 성향의 차이는 돈 문제로 이어져 장기적으로 큰 갈등이 될 수 있어요. 가치관의 차이이기 때문에 어느 쪽이 맞고 틀린 게 아니에요.',
      compromise:
        '생활비 통장을 따로 만들고 각자 일정 금액을 넣는 방식을 추천해요. 공동 지출 기준(예: 5만원 이상은 상의)을 미리 정해두면 충돌이 줄어요.',
      cultural: '한국 부부들도 \'각자 통장 + 공동 생활비 통장\' 3통장 시스템이 인기예요.',
    },
  ],
  conclusion:
    '두 분은 생활 패턴에서 여러 차이가 있지만, 이 차이를 미리 알고 있다는 것 자체가 가장 큰 강점이에요. 청소, 수면, 소비에서 의견 차이가 있지만, 각자의 영역과 기준을 존중하는 \'규칙 만들기\'로 충분히 조율할 수 있어요. 완벽하게 같은 생활습관을 가진 커플은 없어요. 중요한 건 차이를 인정하고 서로 맞춰가려는 의지예요. 함께 이 테스트를 해봤다는 것 자체로, 두 분은 이미 좋은 출발점에 서 있어요.',
}
