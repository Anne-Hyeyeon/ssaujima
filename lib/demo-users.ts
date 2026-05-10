// Predefined demo users — used for the "two-window" hackathon demo.
// Pair: haeyeon (female) ↔ minjae (male). Both auto-pair to each other.

import type { MockUser } from './types'

const NOW = '2026-05-10T00:00:00.000Z'

export const DEMO_FEMALE_ID = 'haeyeon'
export const DEMO_MALE_ID = 'minjae'

export const DEMO_FEMALE: MockUser = {
  id: DEMO_FEMALE_ID,
  name: '혜연',
  gender: 'female',
  partnerId: DEMO_MALE_ID,
  plan: 'free',
  createdAt: NOW,
}

export const DEMO_MALE: MockUser = {
  id: DEMO_MALE_ID,
  name: '민재',
  gender: 'male',
  partnerId: DEMO_FEMALE_ID,
  plan: 'free',
  createdAt: NOW,
}

export const DEMO_USERS: MockUser[] = [DEMO_FEMALE, DEMO_MALE]
