// Mock auth backed by localStorage.
// Two collections: a registry of all "known" users (so partners resolve by ID)
// and a current-user pointer.

import type { Gender, MockUser } from './types'
import { DEMO_USERS } from './demo-users'

const CURRENT_USER_KEY = 'ssaujima:user'
const USER_REGISTRY_KEY = 'ssaujima:users'
const PARTNER_TESTS_KEY = 'ssaujima:partner-tests'
const MIGRATION_FLAG_KEY = 'ssaujima:migrated:demo-rename-v2'

// Stale demo IDs from before the haeyeon/minjae rename.
// Any browsers that touched the app prior to the rename will still hold these
// in localStorage and surface the old names; clean them up on first load.
const STALE_DEMO_IDS = new Set(['jieun', 'junho'])
const STALE_NAMES = new Set(['지은', '준호'])

type UserRegistry = Record<string, MockUser>

const slugify = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9가-힣\-]/g, '')

let migrationRan = false
const runStaleDemoMigration = (): void => {
  if (typeof window === 'undefined' || migrationRan) return
  migrationRan = true
  try {
    if (localStorage.getItem(MIGRATION_FLAG_KEY) === '1') return

    // Drop stale entries from the user registry.
    const rawReg = localStorage.getItem(USER_REGISTRY_KEY)
    if (rawReg) {
      const reg = JSON.parse(rawReg) as UserRegistry
      let changed = false
      for (const id of Object.keys(reg)) {
        if (STALE_DEMO_IDS.has(id) || STALE_NAMES.has(reg[id]?.name ?? '')) {
          delete reg[id]
          changed = true
        }
      }
      if (changed) localStorage.setItem(USER_REGISTRY_KEY, JSON.stringify(reg))
    }

    // Sign out a user whose stored record is stale.
    const rawCurrent = localStorage.getItem(CURRENT_USER_KEY)
    if (rawCurrent) {
      const cur = JSON.parse(rawCurrent) as Partial<MockUser>
      if (
        (cur?.id && STALE_DEMO_IDS.has(cur.id)) ||
        (cur?.name && STALE_NAMES.has(cur.name)) ||
        (cur?.partnerId && STALE_DEMO_IDS.has(cur.partnerId))
      ) {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    }

    // Drop partner-test answers keyed by stale IDs.
    const rawTests = localStorage.getItem(PARTNER_TESTS_KEY)
    if (rawTests) {
      const tests = JSON.parse(rawTests) as Record<string, unknown>
      let changed = false
      for (const id of Object.keys(tests)) {
        if (STALE_DEMO_IDS.has(id)) {
          delete tests[id]
          changed = true
        }
      }
      if (changed) localStorage.setItem(PARTNER_TESTS_KEY, JSON.stringify(tests))
    }

    localStorage.setItem(MIGRATION_FLAG_KEY, '1')
  } catch {
    // Best-effort migration; never block app startup on stale-data quirks.
  }
}

const readRegistry = (): UserRegistry => {
  if (typeof window === 'undefined') return {}
  runStaleDemoMigration()
  try {
    const raw = localStorage.getItem(USER_REGISTRY_KEY)
    return raw ? (JSON.parse(raw) as UserRegistry) : {}
  } catch {
    return {}
  }
}

const writeRegistry = (registry: UserRegistry): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_REGISTRY_KEY, JSON.stringify(registry))
}

const seedDemoUsers = (registry: UserRegistry): UserRegistry => {
  const next = { ...registry }
  for (const u of DEMO_USERS) {
    if (!next[u.id]) next[u.id] = u
  }
  return next
}

export const upsertUser = (user: MockUser): MockUser => {
  const registry = seedDemoUsers(readRegistry())
  registry[user.id] = user
  writeRegistry(registry)
  return user
}

export const getUserById = (id: string): MockUser | null => {
  const registry = seedDemoUsers(readRegistry())
  writeRegistry(registry)
  return registry[id] ?? null
}

export const getCurrentUser = (): MockUser | null => {
  if (typeof window === 'undefined') return null
  runStaleDemoMigration()
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as Partial<MockUser> & { id: string }
    if (STALE_DEMO_IDS.has(stored.id) || STALE_NAMES.has(stored.name ?? '')) {
      localStorage.removeItem(CURRENT_USER_KEY)
      return null
    }
    // Prefer the registry copy so partner edits made elsewhere are reflected.
    const fromRegistry = getUserById(stored.id)
    return fromRegistry ?? (stored as MockUser)
  } catch {
    return null
  }
}

export const USER_CHANGED_EVENT = 'ssaujima:user-changed'

const dispatchUserChanged = (): void => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(USER_CHANGED_EVENT))
}

const persistCurrent = (user: MockUser): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  dispatchUserChanged()
}

export const signIn = (
  rawName: string,
  gender: Gender,
  partnerId: string | null = null,
): MockUser => {
  const id = slugify(rawName) || 'guest'
  const user: MockUser = {
    id,
    name: rawName.trim(),
    gender,
    partnerId: partnerId ? slugify(partnerId) : null,
    plan: 'free',
    createdAt: new Date().toISOString(),
  }
  upsertUser(user)
  persistCurrent(user)
  return user
}

export const quickSignInDemo = (gender: Gender): MockUser => {
  const target = DEMO_USERS.find((u) => u.gender === gender)
  if (!target) throw new Error(`no demo user for gender=${gender}`)
  upsertUser(target)
  // Also seed the partner so getUserById resolves immediately.
  const partner = DEMO_USERS.find((u) => u.id === target.partnerId)
  if (partner) upsertUser(partner)
  persistCurrent(target)
  return target
}

export const signOut = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CURRENT_USER_KEY)
  dispatchUserChanged()
}

export const setPartnerId = (partnerId: string | null): MockUser | null => {
  const user = getCurrentUser()
  if (!user) return null
  const updated: MockUser = {
    ...user,
    partnerId: partnerId ? slugify(partnerId) : null,
  }
  upsertUser(updated)
  persistCurrent(updated)
  return updated
}

export const upgradeToPro = (): void => {
  const user = getCurrentUser()
  if (!user) return
  const updated: MockUser = { ...user, plan: 'pro' }
  upsertUser(updated)
  persistCurrent(updated)
}

export const downgradeTofree = (): void => {
  const user = getCurrentUser()
  if (!user) return
  const updated: MockUser = { ...user, plan: 'free' }
  upsertUser(updated)
  persistCurrent(updated)
}

export const normalizePartnerId = (input: string): string => slugify(input)
