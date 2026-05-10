'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { quickSignInDemo, signIn } from '../../lib/mock-auth'
import { DEMO_FEMALE, DEMO_MALE } from '../../lib/demo-users'
import type { Gender } from '../../lib/types'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') ?? '/my'

  const [name, setName] = useState('')
  const [gender, setGender] = useState<Gender | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !gender) return
    signIn(name.trim(), gender)
    router.push(returnTo)
  }

  const handleQuickDemo = (g: Gender) => {
    quickSignInDemo(g)
    router.push(returnTo)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-[#fafaf9]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.16em] uppercase text-[#a0a0a0] mb-3">
            싸우지마
          </p>
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#1a1a1a] mb-2">
            먼저 본인 정보를 알려주세요
          </h1>
          <p className="text-[14px] text-[#6b6b6b] leading-relaxed">
            커플 진단 서비스라 두 분 모두 테스트를 마치면 리포트가 공개돼요.
          </p>
        </div>

        {/* Quick demo */}
        <div className="border border-[#e8e8e6] rounded-2xl bg-white p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold">
              데모용 빠른 시작
            </span>
            <span className="text-[10px] text-[#a0a0a0]">창 두 개로 시연</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <DemoButton
              tone="pink"
              name={DEMO_FEMALE.name}
              role="여성"
              partner={DEMO_MALE.name}
              onClick={() => handleQuickDemo('female')}
            />
            <DemoButton
              tone="blue"
              name={DEMO_MALE.name}
              role="남성"
              partner={DEMO_FEMALE.name}
              onClick={() => handleQuickDemo('male')}
            />
          </div>
          <p className="text-[11px] text-[#a0a0a0] mt-3 leading-relaxed">
            두 데모 유저는 서로 파트너로 자동 연결돼 있어요. 서로 다른 창에서 로그인 후 각각 테스트를 끝내면 리포트가 열려요.
          </p>
        </div>

        <p className="text-center text-[11px] tracking-[0.16em] uppercase text-[#a0a0a0] mb-4">
          또는 직접 입력
        </p>

        {/* Manual login */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-[#e8e8e6] rounded-2xl p-5">
          <div>
            <label
              htmlFor="name"
              className="block text-[12px] font-semibold text-[#1a1a1a] mb-1.5"
            >
              닉네임
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 혜연"
              className="w-full border border-[#e8e8e6] rounded-xl px-4 py-3 text-[15px] outline-none focus:border-[#1a1a1a] transition-colors"
              autoFocus
              required
            />
          </div>

          <div>
            <span className="block text-[12px] font-semibold text-[#1a1a1a] mb-1.5">
              성별
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <GenderOption
                tone="pink"
                label="여성"
                selected={gender === 'female'}
                onClick={() => setGender('female')}
              />
              <GenderOption
                tone="blue"
                label="남성"
                selected={gender === 'male'}
                onClick={() => setGender('male')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !gender}
            className="w-full bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-semibold disabled:opacity-30 transition-opacity"
          >
            계속하기 →
          </button>
        </form>

        <p className="text-center text-[#a0a0a0] text-[11px] mt-6 leading-relaxed">
          입력 정보는 브라우저에만 저장됩니다.<br />
          파트너 닉네임은 다음 단계에서 등록할 수 있어요.
        </p>
      </div>
    </main>
  )
}

const GenderOption = ({
  tone,
  label,
  selected,
  onClick,
}: {
  tone: 'pink' | 'blue'
  label: string
  selected: boolean
  onClick: () => void
}) => {
  const isPink = tone === 'pink'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        'rounded-xl border-2 px-3 py-3 text-[14px] font-semibold transition-colors flex items-center justify-center gap-2',
        selected
          ? isPink
            ? 'border-[#f47b9b] bg-[#fff5f8] text-[#c2185b]'
            : 'border-[#6b9bd8] bg-[#f0f7ff] text-[#2c5282]'
          : 'border-[#e8e8e6] bg-white text-[#6b6b6b] hover:border-[#1a1a1a]',
      )}
    >
      <span
        className={clsx(
          'w-2.5 h-2.5 rounded-full',
          isPink ? 'bg-[#f47b9b]' : 'bg-[#6b9bd8]',
        )}
        aria-hidden="true"
      />
      {label}
    </button>
  )
}

const DemoButton = ({
  tone,
  name,
  role,
  partner,
  onClick,
}: {
  tone: 'pink' | 'blue'
  name: string
  role: string
  partner: string
  onClick: () => void
}) => {
  const isPink = tone === 'pink'
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-xl border-2 p-3 text-left transition-colors',
        isPink
          ? 'border-[#f47b9b] bg-[#fff5f8] hover:bg-[#ffeef3]'
          : 'border-[#6b9bd8] bg-[#f0f7ff] hover:bg-[#e8f0fa]',
      )}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className={clsx(
            'w-2 h-2 rounded-full',
            isPink ? 'bg-[#f47b9b]' : 'bg-[#6b9bd8]',
          )}
          aria-hidden="true"
        />
        <span
          className={clsx(
            'text-[10px] font-semibold uppercase tracking-[0.08em]',
            isPink ? 'text-[#c2185b]' : 'text-[#2c5282]',
          )}
        >
          {role}
        </span>
      </div>
      <p className="text-[15px] font-semibold text-[#1a1a1a]">{name}</p>
      <p className="text-[11px] text-[#6b6b6b] mt-0.5">파트너: {partner}</p>
    </button>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  )
}
