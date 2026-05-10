# Landing Page & UI Primitives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete landing page and shared UI primitive components for 싸우지마, a Korean pre-marriage lifestyle compatibility test service.

**Architecture:** Collocated App Router components — landing page sections live in `app/_components/`, reusable primitives in `components/ui/`. The Header (client component) is placed in `app/layout.tsx` so it renders on every route. All landing sections are composed in `app/page.tsx`.

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, clsx, next/link.

---

## File Map

### New Files (create)
| File | Responsibility |
|------|---------------|
| `components/ui/Button.tsx` | Primary/outline/ghost button variants in 3 sizes |
| `components/ui/Badge.tsx` | Pink pill badge |
| `components/ui/Divider.tsx` | 0.5px horizontal rule |
| `components/ui/ProgressBar.tsx` | Thin progress bar with n/m label |
| `app/_components/Header.tsx` | Sticky nav: logo + auth state from localStorage |
| `app/_components/HeroSection.tsx` | Hero: badge, title, subtitle, CTA, stat, demo link |
| `app/_components/ProblemSection.tsx` | 4 couple dialogue speech bubbles |
| `app/_components/HowSection.tsx` | 3-step horizontal flow |
| `app/_components/DifferenceSection.tsx` | 11-category menu list with PRO badges |
| `app/_components/PricingSection.tsx` | Two plan cards (free + pro) |
| `app/_components/BottomCtaSection.tsx` | Dark CTA band |
| `app/_components/Footer.tsx` | Logo, copyright, disclaimer |

### Modified Files
| File | Change |
|------|--------|
| `app/layout.tsx` | Import and render `<Header />` before `{children}` |
| `app/page.tsx` | Compose all landing sections (no Header, it's in layout) |

---

## Task 1: UI Primitives — Button, Badge, Divider, ProgressBar

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/Divider.tsx`
- Create: `components/ui/ProgressBar.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```tsx
import clsx from 'clsx'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center justify-center font-medium tracking-[-0.01em] transition-opacity disabled:opacity-50 cursor-pointer',
        'rounded-full',
        {
          'bg-[#1a1a1a] text-white hover:opacity-90': variant === 'primary',
          'border border-[#e8e8e6] text-[#1a1a1a] hover:bg-[#fafaf9]': variant === 'outline',
          'text-[#1a1a1a] hover:opacity-70': variant === 'ghost',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-7 py-3.5 text-[15px]': size === 'md',
          'px-8 py-4 text-base': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create `components/ui/Badge.tsx`**

```tsx
import clsx from 'clsx'

interface IBadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge = ({ children, className }: IBadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center bg-[#ffeef3] text-[#c2185b] rounded-full px-3.5 py-1 text-xs font-medium',
        className,
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Create `components/ui/Divider.tsx`**

```tsx
import clsx from 'clsx'

interface IDividerProps {
  className?: string
}

export const Divider = ({ className }: IDividerProps) => {
  return <hr className={clsx('h-[0.5px] bg-[#e8e8e6] border-none', className)} />
}
```

- [ ] **Step 4: Create `components/ui/ProgressBar.tsx`**

```tsx
import clsx from 'clsx'

interface IProgressBarProps {
  current: number
  total: number
  color?: 'pink' | 'blue'
  className?: string
}

export const ProgressBar = ({ current, total, color = 'pink', className }: IProgressBarProps) => {
  const pct = Math.min(100, Math.round((current / total) * 100))
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div className="flex-1 h-1 bg-[#e8e8e6] rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-300', {
            'bg-[#f47b9b]': color === 'pink',
            'bg-[#6b9bd8]': color === 'blue',
          })}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#a0a0a0] tabular-nums shrink-0">
        {current}/{total}
      </span>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/Button.tsx components/ui/Badge.tsx components/ui/Divider.tsx components/ui/ProgressBar.tsx
git commit -m "feat: add UI primitive components (Button, Badge, Divider, ProgressBar)"
```

---

## Task 2: Header Component

**Files:**
- Create: `app/_components/Header.tsx`

- [ ] **Step 1: Create `app/_components/Header.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import type { MockUser } from '@/lib/types'

export const Header = () => {
  const [user, setUser] = useState<MockUser | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('ssaujima:user')
    setUser(raw ? (JSON.parse(raw) as MockUser) : null)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('ssaujima:user')
    window.location.reload()
  }

  return (
    <header className="border-b border-[#e8e8e6] py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-medium tracking-tight text-[#1a1a1a] text-[17px]"
        >
          싸우지마
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/my"
                className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
              >
                마이페이지
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-[#a0a0a0] hover:text-[#1a1a1a] transition-colors cursor-pointer"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
```

- [ ] **Step 2: Update `app/layout.tsx` to include Header**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from './_components/Header'

export const metadata: Metadata = {
  title: '싸우지마 — 결혼 전 생활습관 궁합 진단',
  description: '두 사람의 생활습관 64가지 항목으로 다툼 가능성과 궁합을 AI가 분석해 리포트로 제공하는 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/_components/Header.tsx app/layout.tsx
git commit -m "feat: add Header component with auth state, integrate into layout"
```

---

## Task 3: HeroSection

**Files:**
- Create: `app/_components/HeroSection.tsx`

- [ ] **Step 1: Create `app/_components/HeroSection.tsx`**

```tsx
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

export const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center max-w-2xl mx-auto py-24 md:py-32 px-6">
      <Badge className="mb-6">결혼 전 필수 진단</Badge>
      <h1 className="text-[44px] font-medium tracking-[-0.025em] leading-[1.15] text-[#1a1a1a] mb-4">
        우리,
        <br />
        정말 안 싸울까?
      </h1>
      <p className="text-[17px] text-[#6b6b6b] leading-relaxed mb-8">
        생활습관 64가지로 알아보는 진짜 부부 궁합
      </p>
      <Link
        href="/test/simple"
        className="inline-flex items-center justify-center bg-[#1a1a1a] text-white rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
      >
        시작하기 →
      </Link>
      <p className="text-[#a0a0a0] text-sm mt-3">12,847쌍이 진단했어요</p>
      <Link
        href="/result/pro?demo=1"
        className="text-[#a0a0a0] text-sm underline mt-2 hover:text-[#6b6b6b] transition-colors"
      >
        예시 결과 보기
      </Link>
    </section>
  )
}

export default HeroSection
```

- [ ] **Step 2: Commit**

```bash
git add app/_components/HeroSection.tsx
git commit -m "feat: add HeroSection landing component"
```

---

## Task 4: ProblemSection

**Files:**
- Create: `app/_components/ProblemSection.tsx`

- [ ] **Step 1: Create `app/_components/ProblemSection.tsx`**

```tsx
interface IDialogue {
  topic: string
  personA: string
  personB: string
}

const DIALOGUES: IDialogue[] = [
  {
    topic: '청소',
    personA: '나는 청소 매일 해야 하는데, 쟤는 일주일에 한 번도 많다는 거야.',
    personB: '깔끔한 거 좋은데 너무 자주 청소하는 거 아냐?',
  },
  {
    topic: '설거지',
    personA: '밥 먹고 바로 설거지 안 하면 불안해.',
    personB: '오늘 피곤한데 내일 하면 안 되나?',
  },
  {
    topic: '수건',
    personA: '수건은 한 번 쓰면 빨아야지!',
    personB: '한 번만 쓰고 왜 빨아, 낭비 아니야?',
  },
  {
    topic: '취침',
    personA: '12시 넘기면 다음날 힘든데.',
    personB: '아직 할 거 있는데 왜 자야 해?',
  },
]

export const ProblemSection = () => {
  return (
    <section className="bg-[#fff0e8] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">01</span>
          <span className="text-[#6b6b6b]"> — 문제</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-12">
          결혼하면 사소한 게
          <br />
          문제가 돼요.
        </h2>
        <div className="flex flex-col gap-8">
          {DIALOGUES.map((d) => (
            <article key={d.topic} className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#a0a0a0] uppercase tracking-wide mb-1">
                {d.topic}
              </p>
              <div className="bg-white/60 rounded-2xl px-4 py-3 self-start max-w-[85%]">
                <p className="text-[15px] text-[#1a1a1a] leading-relaxed">{d.personA}</p>
              </div>
              <div className="bg-[#ffeef3]/80 rounded-2xl px-4 py-3 self-end max-w-[85%]">
                <p className="text-[15px] text-[#1a1a1a] leading-relaxed">{d.personB}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
```

- [ ] **Step 2: Commit**

```bash
git add app/_components/ProblemSection.tsx
git commit -m "feat: add ProblemSection with couple dialogue examples"
```

---

## Task 5: HowSection

**Files:**
- Create: `app/_components/HowSection.tsx`

- [ ] **Step 1: Create `app/_components/HowSection.tsx`**

```tsx
interface IStep {
  number: string
  title: string
  description: string
}

const STEPS: IStep[] = [
  {
    number: '1',
    title: '각자 답함',
    description: '두 사람이 따로 15~64가지 질문에 답해요.',
  },
  {
    number: '2',
    title: 'AI 분석',
    description: 'Claude AI가 11개 영역별 차이를 분석해요.',
  },
  {
    number: '3',
    title: '맞춤 리포트',
    description: '다툼 가능성 TOP 5와 절충안을 알려드려요.',
  },
]

export const HowSection = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">02</span>
          <span className="text-[#6b6b6b]"> — 방법</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-12">
          각자 답하고
          <br />
          AI가 분석해요.
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex md:flex-row items-start md:items-center gap-6 md:gap-0 flex-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#f47b9b] text-white text-xs font-medium flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-medium tracking-[-0.01em] leading-[1.3] text-[#1a1a1a]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[15px] text-[#6b6b6b] leading-relaxed pl-8">
                  {step.description}
                </p>
              </div>
              {idx < STEPS.length - 1 && (
                <span className="text-[#a0a0a0] text-lg md:px-6 hidden md:block" aria-hidden>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowSection
```

- [ ] **Step 2: Commit**

```bash
git add app/_components/HowSection.tsx
git commit -m "feat: add HowSection with 3-step flow"
```

---

## Task 6: DifferenceSection

**Files:**
- Create: `app/_components/DifferenceSection.tsx`

- [ ] **Step 1: Create `app/_components/DifferenceSection.tsx`**

```tsx
import { Badge } from '@/components/ui/Badge'
import { Divider } from '@/components/ui/Divider'

interface ICategory {
  label: string
  count?: number
  isPro?: boolean
}

const CATEGORIES: ICategory[] = [
  { label: '청소 & 위생', count: 15 },
  { label: '빨래', count: 5 },
  { label: '정리정돈', count: 4 },
  { label: '식생활', count: 5 },
  { label: '생활 리듬', count: 5 },
  { label: '돈 & 소비', isPro: true },
  { label: '가족 & 친척', isPro: true },
  { label: '사회생활', count: 5 },
  { label: '소통 & 갈등', count: 5 },
  { label: '자녀 & 미래', isPro: true },
  { label: '디지털 & 사생활', isPro: true },
]

export const DifferenceSection = () => {
  return (
    <section className="bg-[#f0ebf8] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">03</span>
          <span className="text-[#6b6b6b]"> — 차별점</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-10">
          11개 영역,
          <br />
          전부 다룹니다.
        </h2>
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          {CATEGORIES.map((cat, idx) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[15px] text-[#1a1a1a] font-medium">{cat.label}</span>
                {cat.isPro ? (
                  <Badge>PRO</Badge>
                ) : (
                  <span className="text-sm text-[#a0a0a0]">{cat.count}문항</span>
                )}
              </div>
              {idx < CATEGORIES.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DifferenceSection
```

- [ ] **Step 2: Commit**

```bash
git add app/_components/DifferenceSection.tsx
git commit -m "feat: add DifferenceSection with 11-category menu list"
```

---

## Task 7: PricingSection

**Files:**
- Create: `app/_components/PricingSection.tsx`

- [ ] **Step 1: Create `app/_components/PricingSection.tsx`**

```tsx
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

interface IPlanFeature {
  text: string
}

interface IPlan {
  name: string
  price: string
  duration: string
  features: IPlanFeature[]
  ctaLabel: string
  ctaHref: string
  recommended?: boolean
}

const PLANS: IPlan[] = [
  {
    name: '심플',
    price: '무료',
    duration: '15문항 · 2분',
    features: [
      { text: '궁합 점수' },
      { text: '유형 진단' },
      { text: '잘 맞는 부분' },
      { text: '부딪힐 수 있는 부분' },
    ],
    ctaLabel: '무료로 시작',
    ctaHref: '/test/simple',
  },
  {
    name: '프로',
    price: '2,900원',
    duration: '64문항 · 7~10분',
    features: [
      { text: '심플 전체 포함' },
      { text: '11개 영역별 분석' },
      { text: '레이더 차트' },
      { text: 'AI 맞춤 조언' },
      { text: '다툼 TOP 5' },
    ],
    ctaLabel: '프로 시작하기',
    ctaHref: '/pay',
    recommended: true,
  },
]

export const PricingSection = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">04</span>
          <span className="text-[#6b6b6b]"> — 가격</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-10">
          딱 2,900원으로
          <br />
          싸울 일 줄여요.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="border border-[#e8e8e6] rounded-2xl p-6 flex flex-col gap-5"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-[#1a1a1a]">
                    {plan.name}
                  </h3>
                  {plan.recommended && <Badge>추천</Badge>}
                </div>
                <p className="text-[#a0a0a0] text-sm">{plan.duration}</p>
              </div>
              <p className="text-[28px] font-medium tracking-[-0.02em] text-[#1a1a1a]">
                {plan.price}
              </p>
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-[15px] text-[#6b6b6b]">
                    <span className="text-[#f47b9b]" aria-hidden>✓</span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className="inline-flex items-center justify-center border border-[#e8e8e6] text-[#1a1a1a] rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:bg-[#fafaf9] transition-colors"
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
```

- [ ] **Step 2: Commit**

```bash
git add app/_components/PricingSection.tsx
git commit -m "feat: add PricingSection with free/pro plan cards"
```

---

## Task 8: BottomCtaSection + Footer

**Files:**
- Create: `app/_components/BottomCtaSection.tsx`
- Create: `app/_components/Footer.tsx`

- [ ] **Step 1: Create `app/_components/BottomCtaSection.tsx`**

```tsx
import Link from 'next/link'

export const BottomCtaSection = () => {
  return (
    <section className="bg-[#1a1a1a] py-24 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-xl font-medium tracking-[-0.01em] leading-[1.3] text-white mb-8">
          우리, 진짜 괜찮을까?
        </h2>
        <Link
          href="/test/simple"
          className="inline-flex items-center justify-center bg-white text-[#1a1a1a] rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] hover:opacity-90 transition-opacity"
        >
          지금 확인하기 →
        </Link>
      </div>
    </section>
  )
}

export default BottomCtaSection
```

- [ ] **Step 2: Create `app/_components/Footer.tsx`**

```tsx
export const Footer = () => {
  return (
    <footer className="bg-[#fafaf9] border-t border-[#e8e8e6] py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-medium tracking-tight text-[#1a1a1a] text-[15px]">싸우지마</span>
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center">
          <p className="text-sm text-[#a0a0a0]">© 2026 싸우지마</p>
          <p className="text-xs text-[#a0a0a0]">
            해커톤 프로젝트입니다. 결제는 목업입니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 3: Commit**

```bash
git add app/_components/BottomCtaSection.tsx app/_components/Footer.tsx
git commit -m "feat: add BottomCtaSection and Footer components"
```

---

## Task 9: Compose app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with full landing page composition**

```tsx
import HeroSection from './_components/HeroSection'
import ProblemSection from './_components/ProblemSection'
import HowSection from './_components/HowSection'
import DifferenceSection from './_components/DifferenceSection'
import PricingSection from './_components/PricingSection'
import BottomCtaSection from './_components/BottomCtaSection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ProblemSection />
        <HowSection />
        <DifferenceSection />
        <PricingSection />
        <BottomCtaSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No TypeScript or build errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose landing page from all sections"
```
