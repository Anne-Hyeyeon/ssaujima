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
