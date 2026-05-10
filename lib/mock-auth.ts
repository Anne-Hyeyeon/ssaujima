import type { MockUser } from './types'

const USER_KEY = 'ssaujima:user'

export function signIn(name: string): MockUser {
  const user: MockUser = {
    id: crypto.randomUUID(),
    name,
    plan: 'free',
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export function signOut(): void {
  localStorage.removeItem(USER_KEY)
}

export function getCurrentUser(): MockUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as MockUser) : null
  } catch {
    return null
  }
}

export function upgradeToPro(): void {
  const user = getCurrentUser()
  if (!user) return
  const upgraded: MockUser = { ...user, plan: 'pro' }
  localStorage.setItem(USER_KEY, JSON.stringify(upgraded))
}

export function downgradeTofree(): void {
  const user = getCurrentUser()
  if (!user) return
  const downgraded: MockUser = { ...user, plan: 'free' }
  localStorage.setItem(USER_KEY, JSON.stringify(downgraded))
}
