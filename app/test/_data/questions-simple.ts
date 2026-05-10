// Test data: 15 simple-track questions for the 싸우지마 compatibility test

import type { Question } from '../../../lib/types'

export const QUESTIONS_SIMPLE: Question[] = [
  {
    id: 1,
    category: 'cleaning',
    text: '샤워는 보통 얼마나 자주 하세요?',
    options: ['하루 2번 이상', '매일 1번', '2~3일에 1번', '가끔'],
  },
  {
    id: 2,
    category: 'cleaning',
    text: '외출복 입고 침대에 올라가도 OK?',
    options: ['절대 안 됨', '옷은 갈아입고', '상의만 갈아입으면', '상관없음'],
  },
  {
    id: 3,
    category: 'cleaning',
    text: '청소는 얼마나 자주 해요?',
    options: ['매일 조금씩', '주 2~3회', '주 1회', '더러워지면'],
  },
  {
    id: 4,
    category: 'laundry',
    text: '설거지는 언제 해요?',
    options: ['먹자마자 바로', '그날 안에는', '며칠 모아서', '식기세척기가 다 함'],
  },
  {
    id: 5,
    category: 'laundry',
    text: '식기세척기에 넣기 전 애벌세척은?',
    options: ['수세미질까지', '물로 헹굼', '그냥 넣음', '식기세척기 안 씀'],
  },
  {
    id: 6,
    category: 'laundry',
    text: '수건 한 장 며칠 써요?',
    options: ['1번 쓰고 빨래', '2~3일', '일주일', '그 이상'],
  },
  {
    id: 7,
    category: 'organizing',
    text: '정리 스타일은?',
    options: ['모든 물건은 제자리에', '자주 쓰는 건 꺼내둠', '쓴 자리에 그냥', '어디 있는지만 알면'],
  },
  {
    id: 8,
    category: 'organizing',
    text: '미니멀 vs 맥시멀?',
    options: ['미니멀', '약간 미니멀', '약간 맥시멀', '맥시멀'],
  },
  {
    id: 9,
    category: 'rhythm',
    text: '아침형 vs 저녁형?',
    options: ['완전 아침형', '약간 아침형', '약간 저녁형', '완전 저녁형'],
  },
  {
    id: 10,
    category: 'rhythm',
    text: '집에서 옷차림은?',
    options: ['잠옷·실내복', '편한 외출복', '외출복 그대로', '속옷 차림도 OK'],
  },
  {
    id: 11,
    category: 'money',
    text: '저축 vs 소비 성향?',
    options: ['저축형', '약간 저축형', '약간 소비형', '소비형'],
  },
  {
    id: 12,
    category: 'communication',
    text: '다툼이 생기면?',
    options: ['바로 풀어야 잠이 옴', '그날 안에', '시간 두고', '혼자 있고 싶음'],
  },
  {
    id: 13,
    category: 'communication',
    text: '애정표현 빈도는?',
    options: ['매우 자주', '적당히', '가끔', '거의 안 함'],
  },
  {
    id: 14,
    category: 'future',
    text: '자녀 계획 있어요?',
    options: ['원함', '모름', '안 원함', '상황 따라'],
  },
  {
    id: 15,
    category: 'future',
    text: '양가 부모님과의 거리감은?',
    options: ['매우 친밀', '적당히', '거리 두고', '최소한만'],
  },
]
