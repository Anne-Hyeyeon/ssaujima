'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from '../../lib/mock-auth'

function LoginPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') ?? '/my'

  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    signIn(name.trim())
    router.push(returnTo)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[#a0a0a0] text-sm mb-2">싸우지마</p>
          <h1 className="text-[32px] font-medium tracking-[-0.02em]">이름을 알려주세요</h1>
          <p className="text-[#6b6b6b] text-[15px] mt-3">
            리포트를 저장하기 위해 이름만 입력해요.<br />
            비밀번호나 이메일은 필요 없어요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">이름</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 또는 닉네임"
              className="w-full border border-[#e8e8e6] rounded-xl px-4 py-3.5 text-[15px] outline-none focus:border-[#f47b9b] transition-colors"
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-medium disabled:opacity-40"
          >
            시작하기 →
          </button>
        </form>

        <p className="text-center text-[#a0a0a0] text-xs mt-6">
          해커톤 데모 — 입력 정보는 이 기기에만 저장됩니다
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  )
}
