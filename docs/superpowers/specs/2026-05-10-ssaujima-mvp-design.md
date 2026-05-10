# 싸우지마 MVP — 설계 문서

> 결혼 전 부부 생활습관 궁합 진단 서비스의 해커톤용 MVP 설계
> 작성일: 2026-05-10
> 원본 기획서: `docs/ssaujima-project.md`

---

## 1. 컨텍스트 및 목표

### 무엇을 만드는가
- 두 사람의 생활습관을 4지선다 문항으로 진단해 다툼 가능성과 궁합을 보여주는 웹 앱
- 무료(15문항, 룰 기반) + 유료(64문항, AI 분석) 두 트랙
- 해커톤 시연 + 발표가 1차 목표. 결제는 목업

### 성공 기준
- 발표 5분 안에 핵심 플로우(랜딩 → 테스트 → 결과)를 라이브로 보여줄 수 있다
- 라이브 실패 시 demo 데이터로 즉시 결과 페이지 진입 가능
- 셀링 포인트인 "레이더 차트(핑크 vs 블루) + 다툼 TOP 5 + AI 맞춤 조언"이 정상 작동한다
- 디자인 토큰(컬러·타이포·CTA 형태)이 기획서 스펙대로 적용되어 있다

### 비목표 (Out of scope)
- 실제 결제 연동 (PG 미연동, 화면만 목업)
- 실제 두 사람 동시 입력 인프라 (DB·세션 관리 없이 URL 인코딩으로 처리)
- 모바일 앱
- 회원가입·로그인 (해커톤에서는 익명 사용)
- 다국어
- 분석/로깅 시스템

### 원본 기획서와 다른 결정
| 항목 | 원본 기획서 | 본 설계 | 이유 |
|---|---|---|---|
| 프레임워크 | Vite + React 18 + React Router | **Next.js 16 + React 19 (App Router)** | 이미 셋업된 repo 그대로 활용 |
| 폴더 구조 | `src/components/`, `src/pages/` | **App Router colocation** (`app/test/_components/`) | Next.js 자연스러운 패턴, 해커톤 속도 ↑ |
| AI 호출 | `fetch`로 Anthropic 직접 | **Vercel AI Gateway + AI SDK** | 키 노출 방지, Vercel 표준 |
| 부모 CLAUDE.md FSD | 강제 | **본 프로젝트만 예외** | 사용자 합의 — App Router 자연 구조 우선 |

---

## 2. 사용자 흐름

### 메인 플로우
1. 랜딩 → "시작하기" CTA → **`/test/simple` 직행** (별도 선택 화면 없음, 무료 우선)
2. 15문항 진행 → 결과 (`/result/simple?a=...`) — 룰 기반, 즉시 표시
3. 심플 결과 하단 "프로 리포트 받기" CTA → `/pay` (결제 목업, **2,900원 표시**)
4. 결제 목업 "결제하기" → `/test/pro` (64문항)
5. 64문항 완료 → `/result/pro?a=...` 으로 navigation → `loading.tsx`가 navigation suspend 동안 노출 (AI 분석 화면) → 결과 렌더
6. 프로 결과: 종합 점수 + 레이더 차트(11축) + 카테고리 막대 + 다툼 TOP 5 + AI 조언

### 마이페이지 플로우 (목업)
1. 헤더 "로그인" → `/login` (이름 1개만 입력하는 목업 폼)
2. 로그인 후 헤더의 "마이페이지" 또는 결과 화면의 "리포트 저장" 버튼으로 진입
3. `/my` 진입: 저장된 리포트 목록 + 현재 구독 플랜 카드(무료/프로) + 플랜 변경 버튼(목업)
4. 저장 리포트 카드 클릭 → `/my/[id]` 에서 저장 시점 데이터 그대로 렌더 (재계산·재호출 없음)

### 시연 보조 플로우
- 랜딩 하단에 "예시 결과 보기" 보조 링크 → `/result/pro?demo=1` 즉시 진입
- 테스트 페이지에서 URL에 `?demo=1` 있으면 "건너뛰기 (시연)" 버튼 노출 (NODE_ENV 무관, 배포 데모에서도 사용 가능)
- 결과 페이지에서 `?demo=1` 감지 시 mock 데이터로 즉시 렌더 (a/b 파라미터 무시)

### 두 사람 입력 처리 (해커톤 단순화)
- 정식 시스템: A 답변 → 링크 공유 → B 답변 → 결과
- MVP: 사용자 답변은 A로 간주, B는 `lib/mock-data.ts`의 가상 답변 사용
- URL 쿼리(`?a=base64&b=base64`)로 답변 전달 → 백엔드 DB 불필요

---

## 3. 아키텍처

### 폴더 구조
```
app/
├── page.tsx                       # 랜딩
├── layout.tsx                     # 글로벌 레이아웃 (Pretendard CDN 로드)
├── globals.css                    # Tailwind + CSS 변수
│
├── _components/                   # 랜딩 전용 (Hero, ProblemSection 등 — landing-only)
│
├── test/
│   ├── simple/page.tsx            # 15문항
│   ├── pro/page.tsx               # 64문항
│   ├── _components/               # QuestionCard, ProgressBar, OptionRadio
│   └── _data/
│       ├── questions-simple.ts
│       └── questions-pro.ts
│
├── result/
│   ├── simple/page.tsx
│   ├── pro/
│   │   ├── page.tsx               # async Server Component — AI 호출 직접
│   │   └── loading.tsx            # navigation suspend 동안 노출됨
│   └── _components/               # RadarChart, CategoryBar, ConflictCard ('use client')
│
├── pay/
│   └── page.tsx                   # 결제 목업 (2,900원 표시)
│
├── login/
│   └── page.tsx                   # 목업 로그인 (이름만 입력)
│
└── my/
    ├── page.tsx                   # 마이페이지 (저장 리포트 목록 + 구독 카드)
    ├── _components/               # SavedReportCard, PlanCard
    └── [id]/page.tsx              # 저장된 리포트 상세 (저장 시점 데이터 그대로 렌더)

lib/                               # ★ project root — App Router 영향 없음
├── calculator.ts                  # 룰 기반 점수/유형/TOP5 계산
├── types.ts                       # 공통 TypeScript 타입 (CategoryKey 포함)
├── ai-advice.ts                   # generateObject 호출 + Zod schema + fallback
├── ai-prompt.ts                   # 프롬프트 빌더
├── mock-data.ts                   # 데모용 A·B 답변 + AI 조언 fallback
├── url-codec.ts                   # 답변 ↔ base64 인코딩
├── mock-auth.ts                   # 목업 로그인 (localStorage에 user 저장)
└── saved-reports.ts               # 저장 리포트 CRUD (localStorage 기반)

components/ui/                     # ★ project root
├── Button.tsx
├── Badge.tsx
├── Divider.tsx
└── ProgressBar.tsx
```

**중요한 변경 (리뷰 반영)**:
- `app/lib/`, `app/components/`는 Next.js App Router에서 라우트로 인식되므로 **프로젝트 루트**로 이동
- API Route(`/api/ai-advice`) **제거** — Server Component에서 직접 AI 호출 → `loading.tsx`가 navigation suspend 동안 자동 노출
- `_components/`, `_data/` 같은 underscore-prefix만 라우트 제외

### 컴포넌트 경계 원칙
- `app/components/ui/`: 도메인 모르는 순수 프리미티브 (Button, Badge…)
- `app/<route>/_components/`: 그 라우트에서만 쓰는 컴포넌트 (QuestionCard, RadarChart…)
- `app/lib/`: 순수 함수 + 도메인 타입 (UI 의존성 없음 → 단위 테스트 가능)
- 도메인 데이터(`questions-*.ts`)는 사용처 가까이 colocation

### 서버/클라이언트 컴포넌트 분리
- 기본 = Server Component
- `'use client'`: 테스트 페이지(`useState`, `sessionStorage`), 차트 컴포넌트(`RadarChart`, `CategoryBar`)
- **결과 페이지(`/result/pro/page.tsx`)는 async Server Component**:
  - `searchParams`에서 답변 디코딩 → 룰 기반 계산 → `lib/ai-advice.ts`의 `getAdvice()` 직접 await
  - 페이지가 서스펜드되는 동안 `loading.tsx`가 자동으로 노출 (= AI 분석 화면)
  - 차트는 `'use client'` 자식 컴포넌트로 분리 (계산 결과를 props로 전달)
- AI Gateway 키는 Server Component 환경에서만 읽힘 → 클라이언트 노출 없음

---

## 4. 데이터 모델

### 핵심 타입 (`lib/types.ts`)
```ts
type AnswerValue = 1 | 2 | 3 | 4;
type Answers = AnswerValue[];           // 길이: simple=15, pro=64

// 11개 카테고리 키 — 레이더 차트 축 순서도 이 순서로 고정
type CategoryKey =
  | 'cleaning' | 'laundry' | 'organizing' | 'food'
  | 'rhythm'   | 'money'   | 'family'     | 'social'
  | 'communication' | 'future' | 'digital';

const CATEGORY_ORDER: CategoryKey[] = [
  'cleaning', 'laundry', 'organizing', 'food', 'rhythm',
  'money', 'family', 'social', 'communication', 'future', 'digital',
];

interface Question {
  id: number;
  category: CategoryKey;
  text: string;
  options: [string, string, string, string];
  isPro?: boolean;                      // 자물쇠 표시 (랜딩의 카테고리 리스트용)
}

interface SimpleResult {
  score: number;                        // 0~100
  type: TypeKey;                        // 8가지 유형 키
  goodMatches: Insight[];
  conflicts: Insight[];
}

interface ProResult extends SimpleResult {
  categoryScores: Record<CategoryKey, { a: number; b: number }>;  // 두 사람 각각의 점수
  top5Conflicts: ConflictDetail[];
  aiAdvice: AIAdvice;                   // AI 생성 결과
}

interface AIAdvice {
  perConflict: { conflictId: number; reason: string; compromise: string; cultural: string }[];
  conclusion: string;
  isFallback?: boolean;                 // mock 사용 시 true (개발자 디버깅용)
}
```

### 답변 직렬화 (`lib/url-codec.ts`)
- `[1,3,2,4,...]` → 각 값을 2비트로 인코딩 → base64url
- 64문항 → 16바이트 → base64url 약 22자 → URL 안전
- `encodeAnswers(answers, expectedLength)` / `decodeAnswers(str, expectedLength)`

**디코딩 정책**:
| 입력 | 처리 |
|---|---|
| `?a=...` 만 (b 없음) | A는 디코딩, **B는 `mock-data.ts`의 정적 답변 사용** (싱글 입력 흐름) |
| `?b=` 길이 ≠ 기대 길이 | `redirect('/test/<track>')` |
| `?a=` 디코딩 실패 (잘못된 base64) | `redirect('/test/<track>')` |
| `?demo=1` | `searchParams.a/b` 무시하고 mock 풀세트 사용 |
| 전부 누락 | `redirect('/test/<track>')` |

---

## 5. 룰 기반 계산 로직 (`lib/calculator.ts`)

원본 기획서 코드를 TypeScript로 포팅하되 다음 추가:
- **카테고리별 점수** (프로): 11개 카테고리 각각의 답변 차이 합계 → 0~100
- **TOP 5 추출**: 차이 ≥ 2인 항목 중 카테고리 가중치 적용해 정렬
  - 가중치 예: 돈/가족/사생활 = 1.5x, 위생/리듬 = 1.0x, 식생활/여가 = 0.8x
- **유형 분류**: 청결·계획성·아침저녁 3축으로 8가지 유형
- **순수 함수**: 모든 함수가 입력만으로 출력 결정 → 테스트 용이

---

## 6. AI 통합

### Server Component에서 직접 호출
```ts
// lib/ai-advice.ts
import { generateObject } from 'ai';
import { z } from 'zod';

const AdviceSchema = z.object({
  perConflict: z.array(z.object({
    conflictId: z.number(),
    reason: z.string(),
    compromise: z.string(),
    cultural: z.string(),
  })),
  conclusion: z.string(),
});

export async function getAdvice(
  answersA: Answers, answersB: Answers, top5: ConflictDetail[]
): Promise<AIAdvice> {
  try {
    const { object } = await generateObject({
      model: 'anthropic/claude-sonnet-4-6',
      schema: AdviceSchema,
      prompt: buildAdvicePrompt(answersA, answersB, top5),
    });
    return object;
  } catch (err) {
    console.error('[ai-advice] falling back to mock', err);
    return { ...MOCK_ADVICE, isFallback: true };
  }
}
```

```ts
// app/result/pro/page.tsx
export default async function ProResultPage({ searchParams }: { searchParams: Promise<{ a?: string; b?: string; demo?: string }> }) {
  const { a, b, demo } = await searchParams;
  const { answersA, answersB } = resolveAnswers({ a, b, demo });    // demo 분기 + 폴백
  const computed = computePro(answersA, answersB);                   // 룰 기반
  const advice = await getAdvice(answersA, answersB, computed.top5Conflicts);
  return <ProResultView computed={computed} advice={advice} />;     // 'use client' child
}
```

**핵심**:
- `generateObject` + Zod 스키마 사용 → JSON.parse 실패 클래스 자체 제거
- try/catch로 AI 실패 시 mock 조언 반환 (시연 안전망)
- API Route 불필요 — Server Component가 곧 백엔드. `loading.tsx`가 navigation 동안 자동 노출

### 프롬프트 전략 (`lib/ai-prompt.ts`)
- 시스템 메시지: "당신은 결혼·커플 상담 전문가" + 톤 가이드 (따뜻하지만 현실적, 한국 정서, "~해요" 체)
- 사용자 메시지: A·B 답변 요약 + TOP5 충돌 항목
- Zod 스키마가 출력 형태를 보장하므로 프롬프트는 자연어로 명료하게만

### 환경변수
- `AI_GATEWAY_API_KEY` — `.env.local`에 (Vercel 배포 시 OIDC로 자동 주입 가능)
- `.env.example` 생성하여 키 이름 문서화

### 비용 / 남용 안전장치 (해커톤 수준)
- 답변 길이 서버 측 검증 (정확히 64개, 1~4 값만)
- **공개 데모 URL의 남용은 의도적으로 미대응** — 해커톤 발표 끝나면 Vercel 환경변수 제거하면 끝
- 추후 운영 시: Vercel Firewall 레이트 리밋 + 답변 해시 dedup 캐시

---

## 7. 디자인 시스템 구현

### Tailwind 토큰 (`tailwind.config` 또는 `globals.css` `@theme`)
- 컬러: `--pink`, `--pink-dark`, `--pink-pastel`, 동일하게 blue, pastel-{peach,lavender,mint,beige}, accent
- 폰트: Pretendard (Pretendard Variable CDN 또는 next/font)
- 텍스트 위계: display(44px) / h1(32px) / h2(20px) / body(16-17px) / caption(13px)
- letter-spacing 토큰: tightest(-0.025em)

### 반복 패턴
- CTA 버튼: `bg-black text-white rounded-full px-7 py-3.5 text-[15px]` + 화살표
- 배지: `bg-pink-pastel text-pink-dark rounded-full px-3.5 py-1 text-xs`
- 구분선: `h-px bg-[#E8E8E6]` (Tailwind 기본 border-color 대신 토큰 사용)
- 섹션 라벨: `01 — 문제` (숫자 핑크, 텍스트 회색)

### 결과 화면 핑크 vs 블루
- A = 핑크, B = 블루 고정 (사용자 성별 입력은 MVP에서 생략)
- 레이더 차트도 동일 컬러로 두 폴리곤 겹쳐 그림

---

## 8. 시연 안전망

| # | 장치 | 구현 위치 |
|---|---|---|
| 1 | mock A·B 풀세트 답변 | `lib/mock-data.ts` — 의도적으로 충돌 많은 답변 셋 (시각적 임팩트) |
| 2 | `/result/pro?demo=1` 즉시 진입 | `result/pro/page.tsx`에서 `searchParams` 분기 |
| 3 | 테스트 페이지 "건너뛰기" 버튼 | URL에 `?demo=1` 있으면 노출 (배포 데모 URL에서도 사용 가능) |
| 4 | AI 분석 화면 | `result/pro/loading.tsx` — 3단계 텍스트 애니메이션. Server Component가 `getAdvice()` await 동안 자동 노출 |
| 5 | 랜딩 "예시 결과 보기" | 랜딩 하단 보조 링크 |
| 6 | AI 호출 실패 fallback | `lib/ai-advice.ts`의 try/catch → mock 조언 반환 (네트워크/할당량 사고 대비). 결과에 `isFallback: true` 마킹 |

---

## 8.5. 마이페이지 (목업)

### 데이터 모델
```ts
// lib/types.ts (추가)
interface MockUser {
  id: string;            // crypto.randomUUID() — 로그인 시 발급
  name: string;          // 사용자가 입력한 이름
  plan: 'free' | 'pro';  // 결제 목업 완료 시 'pro'로 변경
  createdAt: string;
}

interface SavedReport {
  id: string;
  userId: string;
  type: 'simple' | 'pro';
  createdAt: string;
  // 저장 시점 데이터 스냅샷 — 재계산 안 함
  answersA: Answers;
  answersB: Answers;
  computed: SimpleResult | ProResult;
}
```

### localStorage 스키마
- `ssaujima:user` → `MockUser | null`
- `ssaujima:reports` → `SavedReport[]` (최신순)

### 컴포넌트
- `app/login/page.tsx`: 이름 입력 폼 → `mock-auth.ts`의 `signIn(name)` 호출 → `/my`로 이동
- `app/my/page.tsx`: `'use client'` — localStorage 읽어 리포트 목록 + 플랜 카드 렌더
- `app/my/[id]/page.tsx`: `'use client'` — id로 SavedReport 찾아 결과 화면 재렌더 (`/result/*` 컴포넌트 재사용)
- 결과 화면(`/result/simple`, `/result/pro`)에 **"리포트 저장" 버튼** 추가:
  - 비로그인 시: `/login`으로 리다이렉트 후 돌아오기 (returnTo 쿼리)
  - 로그인 시: `saved-reports.ts`의 `saveReport()` → 토스트 "저장됨" 후 `/my`로 이동 (선택)

### 헤더 통합
- 글로벌 헤더에 user 상태에 따라 "로그인" ↔ "마이페이지 / 로그아웃" 토글
- 헤더는 `'use client'` 컴포넌트로 layout에 마운트 (localStorage 접근 필요)

### 구독 플랜 카드 (마이페이지 내부)
- 무료 사용자: "프로 플랜" 카드 + "업그레이드" 버튼 → `/pay`
- 프로 사용자: "프로 플랜 이용 중" + 결제일·다음 결제일 더미 표시 + "해지" 버튼 (클릭 시 plan을 free로 되돌리는 목업)

### 결제 → 플랜 전환
- `/pay`의 "결제하기" 버튼 클릭 시 (목업) → `mock-auth.ts`의 `upgradeToPro()` 호출 → user.plan을 'pro'로 → `/test/pro`로 이동

---

## 9. 단계별 빌드 우선순위

| Phase | 결과물 | 완료 기준 |
|---|---|---|
| **P1 — 토대** | 디자인 토큰 + UI 프리미티브 + 글로벌 레이아웃 + Pretendard CDN | 토큰을 사용한 임시 페이지 1장이 스펙처럼 보임 |
| **P2 — 랜딩** | 히어로 + 01·02·03·04 섹션 + 푸터 | 기획서 스펙대로 렌더링 |
| **P3 — 심플 트랙 + 계산기 풀세트** | `/test/simple` + `/result/simple` + `lib/calculator.ts` **전체** (점수·유형·카테고리·TOP5 — P4에서도 재사용) + `lib/url-codec.ts` + `lib/mock-data.ts` | 15문항 풀어 결과 보기 + URL 라운드트립 동작 |
| **P4 — 프로 트랙** | `/pay` 목업 + `/test/pro` + `/result/pro` async Server Component + `lib/ai-advice.ts` + 레이더/막대 차트 (Recharts) + `loading.tsx` | 64문항 풀어 AI 결과까지 |
| **P5 — 시연 보조** | demo URL 분기, "건너뛰기" 버튼, "예시 결과 보기" 링크, AI fallback 검증 | 발표 라이브 실패해도 진행 가능 |
| **P6 — 마이페이지 (목업)** | `/login` + `/my` + `/my/[id]` + 헤더 통합 + 결과 화면 "저장" 버튼 + 결제 → 플랜 전환 + `lib/mock-auth.ts` + `lib/saved-reports.ts` | 로그인 → 결과 저장 → 마이페이지에서 다시 보기 → 구독 플랜 카드 표시 까지 동작 |
| **P7 — 디테일 (시간 남으면)** | 양쪽 입력 링크 공유, PDF 다운로드, 마이크로 인터랙션 | 우선순위 낮음 |

P1~P6이 해커톤 필수. P7은 시간 따라.

**계산기 분리 안 함**: P3에서 `calculator.ts` 전체를 작성. P4의 `/result/pro`는 같은 함수를 64문항에 적용할 뿐이므로 P3·P4 간 카테고리/TOP5 코드 중복이나 재작업 없음.

---

## 10. 테스트 전략

해커톤 일정상 풀 TDD는 비현실적. 다음 최소 셋만:
- `lib/calculator.ts`: 단위 테스트 (Vitest 또는 Node 내장 `node:test`) — 점수 계산, 유형 분류, TOP5 추출. 룰 기반이라 기대값 명확
- `lib/url-codec.ts`: 라운드트립 테스트 (encode → decode 후 동일)
- 수동 E2E: 발표 시나리오대로 1회 클릭 통과 (랜딩 → 심플 → 프로 → demo URL)

테스트 러너 셋업이 시간 소모 크면 calculator만 `lib/calculator.test.ts`로 두고 `node --test` 실행.

---

## 11. 에러 처리 정책

| 위치 | 정책 |
|---|---|
| 답변 디코딩 실패 | `/test/<track>` 으로 리다이렉트 |
| AI Route 에러 | 500 대신 mock 조언 + `aiFallback: true` 플래그 응답 (시연 안전망) |
| 네트워크 끊김 | 결과 페이지에 "잠시 후 다시 시도" + mock fallback |
| sessionStorage 손실 | 처음부터 다시 시작 안내 (해커톤 수준에서 OK) |

---

## 12. 결정 사항 (이전 미해결 항목 확정)

- **Pretendard**: CDN 방식 채택. `app/layout.tsx`에서 `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css">` 한 줄. 해커톤 속도 우선
- **Recharts**: P4 시작 시 React 19 + Tailwind v4 환경에서 빌드 검증. 30분 안에 안 되면 수동 SVG로 폴백 (레이더 차트 11축은 SVG로도 100줄 이내)
- **AI 모델**: `anthropic/claude-sonnet-4-6` 기본. 비용 우려 시 환경변수로 모델 키 외부화하여 `anthropic/claude-haiku-4-5`로 핫스왑 가능

---

## 13. 의존성 추가 예정

```
ai                          # Vercel AI SDK
zod                         # generateObject schema
recharts                    # 레이더 차트 (P4에서 빌드 검증)
clsx                        # 조건부 클래스
```

`@ai-sdk/anthropic` 등 provider 패키지는 **불필요** — AI Gateway 문자열로 동작.
