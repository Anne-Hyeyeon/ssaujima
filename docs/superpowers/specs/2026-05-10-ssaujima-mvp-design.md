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
1. 랜딩 → "시작하기" 클릭 → 무료/유료 선택 화면
2. 무료 선택 → 15문항 진행 → 즉시 결과 (룰 기반)
3. 결과 화면 하단 "프로 리포트 받기" → 결제 목업 → 64문항 진행 → AI 분석 로딩 → 프로 결과
4. 프로 결과: 종합 점수 + 레이더 차트 + 카테고리 막대 + 다툼 TOP 5 + AI 조언

### 시연 보조 플로우
- 랜딩에 "예시 결과 보기" 보조 링크 → `/result/pro?demo=1` 즉시 진입
- 테스트 페이지 dev 환경에서 "건너뛰기 (시연)" 버튼 → mock 답변으로 자동 완성 후 다음 단계
- 결과 페이지에서 `?demo=1` 파라미터 감지 시 mock 데이터로 즉시 렌더

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
├── layout.tsx                     # 글로벌 레이아웃 (Pretendard 로딩)
├── globals.css                    # Tailwind + CSS 변수
│
├── _components/                   # 랜딩 전용 (Hero, ProblemSection 등)
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
│   │   ├── page.tsx               # 레이더 차트 + AI 조언
│   │   └── loading.tsx            # AI 분석 로딩 (Next.js 자동 로딩 UI)
│   └── _components/               # RadarChart, CategoryBar, ConflictCard
│
├── pay/
│   └── page.tsx                   # 결제 목업
│
├── api/
│   └── ai-advice/route.ts         # POST: 답변 → AI 맞춤 조언
│
├── lib/
│   ├── calculator.ts              # 룰 기반 점수/유형/TOP5 계산
│   ├── types.ts                   # 공통 TypeScript 타입
│   ├── ai-prompt.ts               # AI 프롬프트 빌더
│   ├── mock-data.ts               # 데모용 A·B 답변 풀세트
│   └── url-codec.ts               # 답변 ↔ base64 인코딩
│
└── components/ui/                 # 재사용 프리미티브
    ├── Button.tsx
    ├── Badge.tsx
    ├── Divider.tsx
    └── ProgressBar.tsx
```

### 컴포넌트 경계 원칙
- `app/components/ui/`: 도메인 모르는 순수 프리미티브 (Button, Badge…)
- `app/<route>/_components/`: 그 라우트에서만 쓰는 컴포넌트 (QuestionCard, RadarChart…)
- `app/lib/`: 순수 함수 + 도메인 타입 (UI 의존성 없음 → 단위 테스트 가능)
- 도메인 데이터(`questions-*.ts`)는 사용처 가까이 colocation

### 서버/클라이언트 컴포넌트 분리
- 기본 = Server Component
- `'use client'`: 테스트 페이지(상태), 결과 페이지(차트·AI 호출), Button 일부
- API Route(`/api/ai-advice`)는 서버 전용 → AI Gateway 키 보호

---

## 4. 데이터 모델

### 핵심 타입 (`lib/types.ts`)
```ts
type AnswerValue = 1 | 2 | 3 | 4;
type Answers = AnswerValue[];           // 길이: simple=15, pro=64

interface Question {
  id: number;
  category: string;
  text: string;
  options: [string, string, string, string];
  isPro?: boolean;                      // 자물쇠 표시
}

interface SimpleResult {
  score: number;                        // 0~100
  type: TypeKey;                        // 8가지 유형 키
  goodMatches: Insight[];
  conflicts: Insight[];
}

interface ProResult extends SimpleResult {
  categoryScores: Record<CategoryKey, number>;
  top5Conflicts: ConflictDetail[];
  aiAdvice: AIAdvice;                   // AI 생성 결과
}

interface AIAdvice {
  perConflict: { conflictId: number; reason: string; compromise: string; cultural: string }[];
  conclusion: string;
}
```

### 답변 직렬화
- `[1,3,2,4,...]` → 각 값을 2비트로 인코딩 → base64
- 64문항 → 16바이트 → base64 약 24자 → URL에 안전
- `lib/url-codec.ts`의 `encodeAnswers / decodeAnswers`

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

### API Route 설계
```ts
// app/api/ai-advice/route.ts
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { answersA, answersB, top5 } = await req.json();
  const { text } = await generateText({
    model: 'anthropic/claude-sonnet-4-6',
    prompt: buildAdvicePrompt(answersA, answersB, top5),
    maxTokens: 2000,
  });
  return Response.json(JSON.parse(text));   // AI에게 JSON 형태로 출력 요청
}
```

### 프롬프트 전략 (`lib/ai-prompt.ts`)
- 시스템 프롬프트: "당신은 결혼·커플 상담 전문가" + 톤 가이드 (따뜻하지만 현실적, 한국 정서)
- 출력은 JSON 강제: `{ perConflict: [...], conclusion: "..." }`
- 실패 시 fallback: `lib/mock-data.ts`의 정적 조언 사용 (시연 안전망)

### 환경변수
- `AI_GATEWAY_API_KEY` — `.env.local`에 (Vercel 배포 시 자동 주입 가능)
- `.env.example` 생성하여 키 이름 문서화

### 비용 안전장치
- 클라이언트에서 호출 횟수 제한 (sessionStorage 플래그)
- API Route에서 답변 길이 검증 (정확히 64개)
- 추후 Vercel Firewall 레이트 리밋 가능 (해커톤 단계는 미적용)

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
| 2 | `/result/pro?demo=1` 즉시 진입 | result/pro/page.tsx에서 searchParams 분기 |
| 3 | 테스트 페이지 "건너뛰기" 버튼 | `process.env.NODE_ENV === 'development'`에서만 노출 |
| 4 | AI 로딩 단계 애니메이션 | `result/pro/loading.tsx` — 3단계 (≈6초) |
| 5 | 랜딩 "예시 결과 보기" | landing 하단 보조 링크 |
| 6 | AI 호출 실패 fallback | API Route에서 mock 조언 반환 (네트워크 사고 대비) |

---

## 9. 단계별 빌드 우선순위

| Phase | 결과물 | 완료 기준 |
|---|---|---|
| **P1 — 토대** | 디자인 토큰 + UI 프리미티브(Button, Badge, ProgressBar, Divider) + 글로벌 레이아웃 + Pretendard | 토큰을 사용한 임시 페이지 1장이 스펙처럼 보임 |
| **P2 — 랜딩** | 히어로 + 01·02·03·04 섹션 + 푸터 | 스크린샷 비교 시 기획서 스펙 준수 |
| **P3 — 심플 트랙** | `/test/simple` + `/result/simple` + `lib/calculator.ts` 기본 함수 | 사용자가 15문항 풀고 점수·유형 결과를 본다 |
| **P4 — 프로 트랙** | `/pay` 목업 + `/test/pro` + `/result/pro` + AI Route + 레이더/막대 차트 + AI 조언 + `loading.tsx` | 사용자가 64문항 풀면 AI 결과까지 본다 |
| **P5 — 시연 보조** | mock-data, demo URL, "건너뛰기", 예시 결과 링크, AI fallback | 라이브 실패해도 발표 진행 가능 |
| **P6 — 디테일 (시간 남으면)** | 링크 공유 인코딩 본격화, PDF 다운로드, 마이크로 인터랙션 | 우선순위 낮음 |

P1~P5가 해커톤 필수. P6는 시간 따라 선택.

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

## 12. 미해결 / 추후 결정

- Recharts와 Tailwind v4의 정확한 호환성 — 빌드 시 문제 생기면 `react-chartjs-2` 또는 직접 SVG 작성으로 대체
- Pretendard 로딩: next/font/local로 셋업할지 CDN으로 갈지 — 빠르면 CDN, 빌드 안정성은 next/font
- AI Gateway 모델 전환: 비용 보면 Haiku 4.5로 다운그레이드 옵션 보유

---

## 13. 의존성 추가 예정

```
ai                          # Vercel AI SDK
recharts                    # 레이더 차트
clsx                        # 조건부 클래스
```

`@ai-sdk/anthropic` 등 provider 패키지는 **불필요** — AI Gateway 문자열로 동작.
