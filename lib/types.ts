export type AnswerValue = 1 | 2 | 3 | 4;
export type Answers = AnswerValue[];

export type CategoryKey =
  | 'cleaning' | 'laundry' | 'organizing' | 'food'
  | 'rhythm' | 'money' | 'family' | 'social'
  | 'communication' | 'future' | 'digital';

export const CATEGORY_ORDER: CategoryKey[] = [
  'cleaning', 'laundry', 'organizing', 'food', 'rhythm',
  'money', 'family', 'social', 'communication', 'future', 'digital',
];

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  cleaning: '청소 & 위생',
  laundry: '빨래',
  organizing: '정리정돈',
  food: '식생활',
  rhythm: '생활 리듬',
  money: '돈 & 소비',
  family: '가족 & 친척',
  social: '사회생활',
  communication: '소통 & 갈등',
  future: '자녀 & 미래',
  digital: '디지털 & 사생활',
};

export interface Question {
  id: number;
  category: CategoryKey;
  text: string;
  options: [string, string, string, string];
  isPro?: boolean;
}

export type TypeKey =
  | 'tidy-planner-morning'
  | 'tidy-planner-night'
  | 'tidy-spontaneous-morning'
  | 'tidy-spontaneous-night'
  | 'relaxed-planner-morning'
  | 'relaxed-planner-night'
  | 'relaxed-spontaneous-morning'
  | 'relaxed-spontaneous-night';

export const TYPE_NAMES: Record<TypeKey, string> = {
  'tidy-planner-morning': '새벽의 정리왕',
  'tidy-planner-night': '야행성 깔끔러',
  'tidy-spontaneous-morning': '자유로운 청결러',
  'tidy-spontaneous-night': '밤의 결벽주의자',
  'relaxed-planner-morning': '부지런한 자유러',
  'relaxed-planner-night': '계획적인 게으름러',
  'relaxed-spontaneous-morning': '햇살 자유러',
  'relaxed-spontaneous-night': '느긋한 야행성',
};

export interface Insight {
  index: number;
  category: CategoryKey;
  text: string;
  diff: number;
}

export interface ConflictDetail {
  id: number;
  questionId: number;
  category: CategoryKey;
  title: string;
  diff: number;
  weight: number;
}

export interface SimpleResult {
  score: number;
  type: TypeKey;
  typeName: string;
  goodMatches: Insight[];
  conflicts: Insight[];
}

export interface ProResult extends SimpleResult {
  categoryScores: Record<CategoryKey, { a: number; b: number }>;
  top5Conflicts: ConflictDetail[];
  aiAdvice: AIAdvice;
}

export interface AIAdvice {
  perConflict: {
    conflictId: number;
    reason: string;
    compromise: string;
    cultural: string;
  }[];
  conclusion: string;
  isFallback?: boolean;
}

export type Gender = 'female' | 'male';

export interface MockUser {
  id: string;
  name: string;
  gender: Gender;
  partnerId: string | null;
  plan: 'free' | 'pro';
  createdAt: string;
}

export type TestTrack = 'simple' | 'pro';

export interface PartnerTestRecord {
  userId: string;
  type: TestTrack;
  answers: AnswerValue[];
  submittedAt: string;
}

export interface SavedReport {
  id: string;
  userId: string;
  type: 'simple' | 'pro';
  createdAt: string;
  answersA: Answers;
  answersB: Answers;
  computed: SimpleResult | ProResult;
}
