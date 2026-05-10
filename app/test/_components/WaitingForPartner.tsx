'use client'

// Waiting screen — listens for the partner's submission via storage events
// and a low-frequency poll, then redirects automatically.

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { getCurrentUser, getUserById } from '../../../lib/mock-auth'
import {
  bothFinished,
  buildPairedResultUrl,
  getMyAnswers,
  getPartnerAnswers,
  submitAnswers,
  subscribeToPartnerSubmissions,
} from '../../../lib/partner-tests'
import { generateDemoAnswers } from '../../../lib/mock-data'
import type { MockUser, TestTrack } from '../../../lib/types'

interface IWaitingProps {
  track: TestTrack
  resultPath: string
}

type State = { kind: 'loading' } | { kind: 'no-user' } | { kind: 'no-mine' } | { kind: 'waiting'; user: MockUser; partner: MockUser | null } | { kind: 'ready' }

export const WaitingForPartner = ({ track, resultPath }: IWaitingProps) => {
  const router = useRouter()
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const evaluate = () => {
      const user = getCurrentUser()
      if (!user) {
        setState({ kind: 'no-user' })
        return
      }
      const mine = getMyAnswers(user.id, track)
      if (!mine) {
        setState({ kind: 'no-mine' })
        return
      }
      if (user.partnerId && bothFinished(user.id, user.partnerId, track)) {
        const partner = user.partnerId ? getUserById(user.partnerId) : null
        const url = buildPairedResultUrl(
          resultPath,
          user.id,
          user.gender,
          user.partnerId,
          partner?.gender ?? (user.gender === 'female' ? 'male' : 'female'),
          track,
        )
        if (url) {
          setState({ kind: 'ready' })
          router.push(url)
          return
        }
      }
      const partner = user.partnerId ? getUserById(user.partnerId) : null
      setState({ kind: 'waiting', user, partner })
    }

    evaluate()
    const unsub = subscribeToPartnerSubmissions(evaluate)
    return unsub
  }, [router, resultPath, track, tick])

  // Heartbeat for elapsed counter
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (state.kind === 'loading' || state.kind === 'ready') {
    return <FullScreenStatus message="잠시만요…" />
  }

  if (state.kind === 'no-user') {
    return (
      <FullScreenStatus
        message="로그인이 필요해요"
        cta={{ label: '로그인하러 가기', href: '/login' }}
      />
    )
  }

  if (state.kind === 'no-mine') {
    return (
      <FullScreenStatus
        message="아직 본인 검사를 시작하지 않았어요"
        cta={{
          label: '검사 시작하기',
          href: track === 'simple' ? '/test/simple' : '/test/pro',
        }}
      />
    )
  }

  return <WaitingPanel user={state.user} partner={state.partner} track={track} />
}

const WaitingPanel = ({
  user,
  partner,
  track,
}: {
  user: MockUser
  partner: MockUser | null
  track: TestTrack
}) => {
  const router = useRouter()
  const partnerHas = !!getPartnerAnswers(user.partnerId, track)

  const handleSkipToResult = () => {
    if (!user.partnerId) return
    const length = track === 'simple' ? 15 : 64
    const partnerGender = partner?.gender ?? (user.gender === 'female' ? 'male' : 'female')
    if (!partnerHas) {
      const auto = generateDemoAnswers(length, partnerGender)
      submitAnswers(user.partnerId, track, auto)
    }
    const url = buildPairedResultUrl(
      track === 'simple' ? '/result/simple' : '/result/pro',
      user.id,
      user.gender,
      user.partnerId,
      partnerGender,
      track,
    )
    router.push(url ?? (track === 'simple' ? '/result/simple' : '/result/pro'))
  }

  const isPink = user.gender === 'female'
  const accent = isPink ? '#f47b9b' : '#6b9bd8'
  const accentDark = isPink ? '#c2185b' : '#2c5282'

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[#fafaf9]">
      <div className="max-w-md w-full bg-white border border-[#e8e8e6] rounded-2xl p-7 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <UserDot tone={isPink ? 'pink' : 'blue'} initial={user.name[0]} status="done" />
          <DotConnector accent={accent} />
          <UserDot
            tone={isPink ? 'blue' : 'pink'}
            initial={partner?.name?.[0] ?? '?'}
            status={partnerHas ? 'done' : 'waiting'}
          />
        </div>

        <p
          className="text-[11px] tracking-[0.08em] uppercase font-semibold mb-2"
          style={{ color: accentDark }}
        >
          {track === 'simple' ? '심플 검사' : '프로 검사'} · 대기 중
        </p>
        <h1 className="text-[22px] sm:text-[24px] font-semibold tracking-[-0.015em] text-[#1a1a1a] mb-2 leading-snug">
          파트너{' '}
          <span style={{ color: accentDark }}>
            &lsquo;{partner?.name ?? user.partnerId ?? '—'}&rsquo;
          </span>{' '}
          님의
          <br />
          테스트가 모두 끝나지 않았어요!
        </h1>
        <p className="text-[14px] text-[#6b6b6b] leading-relaxed mb-6">
          본인 답변은 안전하게 저장됐어요. 파트너가 검사를 마치는 순간 리포트가 자동으로 열려요.
        </p>

        <div className="border border-[#e8e8e6] rounded-xl p-4 bg-[#fafaf9] text-left mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold">
              진행 상황
            </span>
            <span className="text-[11px] font-mono text-[#a0a0a0]">live</span>
          </div>
          <ul className="space-y-2 text-[13px]">
            <li className="flex items-center gap-2">
              <CheckIcon done />
              <span>
                나{' '}
                <span className="text-[#a0a0a0]">@{user.id}</span> 답변 제출
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon done={partnerHas} />
              <span>
                파트너{' '}
                <span className="text-[#a0a0a0]">
                  @{user.partnerId ?? '—'}
                </span>{' '}
                답변 {partnerHas ? '도착' : '대기'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon done={false} />
              <span className="text-[#a0a0a0]">리포트 자동 공개</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSkipToResult}
            className="w-full text-center bg-[#1a1a1a] text-white rounded-full px-4 py-3 text-[13px] font-semibold hover:bg-[#333] transition-colors flex items-center justify-center gap-1.5"
          >
            <span
              className="text-[10px] tracking-[0.08em] uppercase font-bold px-1.5 py-0.5 rounded bg-white/15"
              aria-hidden="true"
            >
              demo
            </span>
            시연용 스킵하기
            <span aria-hidden="true">→</span>
          </button>
          <Link
            href="/my"
            className="w-full text-center border border-[#e8e8e6] rounded-full px-4 py-2.5 text-[13px] text-[#6b6b6b] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
          >
            마이페이지에서 기다리기
          </Link>
        </div>

        <p className="text-[11px] text-[#a0a0a0] mt-3 leading-relaxed">
          시연용 스킵을 누르면 파트너 답변이 자동 생성되어 바로 리포트가 열려요.
          <br />
          실제 시연 시에는 다른 창에서 파트너 ID로 로그인해 검사를 마치면 자동 연결돼요.
        </p>
      </div>
    </main>
  )
}

const FullScreenStatus = ({
  message,
  cta,
}: {
  message: string
  cta?: { label: string; href: string }
}) => (
  <main className="min-h-screen flex items-center justify-center px-6 bg-[#fafaf9]">
    <div className="max-w-sm w-full bg-white border border-[#e8e8e6] rounded-2xl p-6 text-center">
      <p className="text-[14px] text-[#1a1a1a] mb-4">{message}</p>
      {cta && (
        <Link
          href={cta.href}
          className="inline-block bg-[#1a1a1a] text-white rounded-full px-5 py-2.5 text-[13px] font-semibold"
        >
          {cta.label}
        </Link>
      )}
    </div>
  </main>
)

const CheckIcon = ({ done }: { done: boolean }) => (
  <span
    aria-hidden="true"
    className={clsx(
      'inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold',
      done ? 'bg-[#2d8a57] text-white' : 'bg-[#e8e8e6] text-[#a0a0a0]',
    )}
  >
    {done ? '✓' : '·'}
  </span>
)

const UserDot = ({
  tone,
  initial,
  status,
}: {
  tone: 'pink' | 'blue'
  initial: string
  status: 'done' | 'waiting'
}) => {
  const isPink = tone === 'pink'
  const isDone = status === 'done'
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={clsx(
          'w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-semibold border-2 transition-all',
          isPink
            ? 'border-[#f47b9b] bg-[#fff5f8] text-[#c2185b]'
            : 'border-[#6b9bd8] bg-[#f0f7ff] text-[#2c5282]',
          !isDone && 'opacity-50 animate-pulse',
        )}
        aria-hidden="true"
      >
        {initial}
      </div>
      <span
        className={clsx(
          'text-[10px] tracking-[0.04em] uppercase font-semibold',
          isDone ? 'text-[#2d8a57]' : 'text-[#a0a0a0]',
        )}
      >
        {isDone ? '완료' : '대기'}
      </span>
    </div>
  )
}

const DotConnector = ({ accent }: { accent: string }) => (
  <div className="flex items-center gap-1" aria-hidden="true">
    <span
      className="w-1.5 h-1.5 rounded-full animate-pulse"
      style={{ backgroundColor: accent }}
    />
    <span
      className="w-1.5 h-1.5 rounded-full animate-pulse"
      style={{ animationDelay: '0.2s', backgroundColor: accent }}
    />
    <span
      className="w-1.5 h-1.5 rounded-full animate-pulse"
      style={{ animationDelay: '0.4s', backgroundColor: accent }}
    />
  </div>
)

export default WaitingForPartner
