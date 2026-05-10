// Shared lib: rich personality data for each lifestyle type.
// Used by Simple and Pro reports to add color and credibility.

import type { TypeKey } from './types'

export interface TypeDescription {
  short: string
  oneLiner: string
  traits: string[]
  strengths: string[]
  cautions: string[]
  bestMatchTypes: TypeKey[]
}

export const TYPE_DESCRIPTIONS: Record<TypeKey, TypeDescription> = {
  'tidy-planner-morning': {
    short: '계획적 깔끔러',
    oneLiner: '아침 햇살과 함께 하루를 설계하고, 정돈된 공간에서 안정감을 얻어요.',
    traits: ['깔끔 추구', '계획형', '아침형'],
    strengths: [
      '집을 항상 정돈된 상태로 유지하는 능력',
      '일정과 약속을 빈틈없이 지켜요',
      '꾸준한 루틴으로 일상에 안정감을 줘요',
    ],
    cautions: [
      '계획이 어긋나면 스트레스를 크게 받을 수 있어요',
      '상대의 자유로운 리듬에 답답함을 느낄 수 있어요',
    ],
    bestMatchTypes: ['tidy-planner-morning', 'tidy-spontaneous-morning'],
  },
  'tidy-planner-night': {
    short: '야행성 깔끔러',
    oneLiner: '밤이 깊을수록 집중력이 살아나는, 정돈을 사랑하는 야행성이에요.',
    traits: ['깔끔 추구', '계획형', '저녁형'],
    strengths: [
      '늦은 시간까지 차분하게 정리·계획을 마무리해요',
      '깊은 사고와 디테일에 강해요',
      '주말 아침의 휴식을 소중히 여겨요',
    ],
    cautions: [
      '아침형 파트너와 생활 리듬이 어긋날 수 있어요',
      '취침 직전에도 정리가 안 끝나면 잠을 못 잘 수 있어요',
    ],
    bestMatchTypes: ['tidy-planner-night', 'relaxed-planner-night'],
  },
  'tidy-spontaneous-morning': {
    short: '자유로운 청결러',
    oneLiner: '깔끔하지만 일정에는 얽매이지 않는, 가볍고 단정한 사람이에요.',
    traits: ['깔끔 추구', '즉흥형', '아침형'],
    strengths: [
      '일찍 일어나 그날그날 필요한 정돈을 해내요',
      '돌발 상황에 유연하게 대응해요',
      '집을 답답하지 않게 깔끔하게 유지해요',
    ],
    cautions: [
      '계획적 파트너에겐 즉흥적 결정이 불안하게 느껴질 수 있어요',
      '본인 기준 깔끔함이 상대 눈엔 부족해 보일 수 있어요',
    ],
    bestMatchTypes: ['tidy-spontaneous-morning', 'tidy-planner-morning'],
  },
  'tidy-spontaneous-night': {
    short: '밤의 결벽주의자',
    oneLiner: '내키는 대로 움직이지만 위생만큼은 양보하지 않는 야행성이에요.',
    traits: ['깔끔 추구', '즉흥형', '저녁형'],
    strengths: [
      '한 번 청소하면 끝까지 몰입해서 깨끗하게 만들어요',
      '즉흥적인 데이트·여행을 즐길 줄 알아요',
      '자기 영역에 대한 기준이 명확해요',
    ],
    cautions: [
      '청소 타이밍이 들쑥날쑥해 파트너가 예측하기 어려워요',
      '아침형 파트너의 활동 시간과 충돌할 수 있어요',
    ],
    bestMatchTypes: ['tidy-spontaneous-night', 'relaxed-spontaneous-night'],
  },
  'relaxed-planner-morning': {
    short: '부지런한 자유러',
    oneLiner: '아침엔 부지런하지만, 청결 강박 없이 마음 편하게 사는 타입이에요.',
    traits: ['느긋함', '계획형', '아침형'],
    strengths: [
      '일찍 일어나 하루를 잘 시작해요',
      '큰 그림 위주로 계획하고 디테일은 유연해요',
      '과한 청결 강박이 없어 함께 살기 편안해요',
    ],
    cautions: [
      '깔끔러 파트너에겐 위생 기준이 너무 낮아 보일 수 있어요',
      '“좀 있다 하면 되지” 가 쌓이면 큰 정리 부담이 돼요',
    ],
    bestMatchTypes: ['relaxed-planner-morning', 'relaxed-spontaneous-morning'],
  },
  'relaxed-planner-night': {
    short: '계획적인 게으름러',
    oneLiner: '큰 틀은 잘 짜두고, 디테일한 정리는 미루는 야행성 계획러예요.',
    traits: ['느긋함', '계획형', '저녁형'],
    strengths: [
      '여행·이벤트 같은 큰 계획을 잘 세워요',
      '늦게까지 집중해서 일을 처리해요',
      '아침 시간을 천천히 시작할 줄 알아요',
    ],
    cautions: [
      '청소·정리는 자주 미뤄져요',
      '아침형 파트너와 생활 리듬을 맞추는 게 과제예요',
    ],
    bestMatchTypes: ['relaxed-planner-night', 'tidy-planner-night'],
  },
  'relaxed-spontaneous-morning': {
    short: '햇살 자유러',
    oneLiner: '아침은 밝게, 하루는 즉흥적으로 — 자유롭게 살아가는 사람이에요.',
    traits: ['느긋함', '즉흥형', '아침형'],
    strengths: [
      '일찍 일어나서 활동량이 많아요',
      '돌발 상황에 스트레스를 거의 받지 않아요',
      '관계에 무거운 규칙을 강요하지 않아요',
    ],
    cautions: [
      '계획과 정리를 동시에 어려워해 파트너가 짊어질 수 있어요',
      '약속·기념일 같은 디테일이 종종 빠질 수 있어요',
    ],
    bestMatchTypes: ['relaxed-spontaneous-morning', 'relaxed-planner-morning'],
  },
  'relaxed-spontaneous-night': {
    short: '느긋한 야행성',
    oneLiner: '늦게까지 즐기고, 정리는 “나중에” — 자유롭게 흐르는 사람이에요.',
    traits: ['느긋함', '즉흥형', '저녁형'],
    strengths: [
      '밤이 길어지는 일정·취미를 즐겨요',
      '돌발 변수에도 흔들리지 않아요',
      '관계에서 권위적 규칙을 거의 만들지 않아요',
    ],
    cautions: [
      '청소·계획·아침 일정 모두에서 파트너 의존도가 높아질 수 있어요',
      '리듬이 다른 아침형 파트너와 자주 충돌할 수 있어요',
    ],
    bestMatchTypes: ['relaxed-spontaneous-night', 'tidy-spontaneous-night'],
  },
}

export const getTypeDescription = (type: TypeKey): TypeDescription => TYPE_DESCRIPTIONS[type]
