'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import {
  getCurrentUser,
  signOut,
  USER_CHANGED_EVENT,
} from '../../lib/mock-auth'
import type { MockUser } from '../../lib/types'

export const Header = () => {
  const [user, setUser] = useState<MockUser | null>(null)

  const refresh = useCallback(() => {
    setUser(getCurrentUser())
  }, [])

  useEffect(() => {
    refresh()

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ssaujima:user' || e.key === 'ssaujima:users' || e.key === null) {
        refresh()
      }
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener(USER_CHANGED_EVENT, refresh)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(USER_CHANGED_EVENT, refresh)
    }
  }, [refresh])

  const handleLogout = () => {
    signOut()
    setUser(null)
    window.location.href = '/'
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
              <span className="text-sm text-[#a0a0a0] hidden sm:inline">
                {user.name}님
              </span>
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
