'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { getUserById, normalizePartnerId, setPartnerId } from '../../../lib/mock-auth'
import type { MockUser } from '../../../lib/types'

interface IPartnerCardProps {
  user: MockUser
  onUpdate: (user: MockUser) => void
}

export const PartnerCard = ({ user, onUpdate }: IPartnerCardProps) => {
  const partner = user.partnerId ? getUserById(user.partnerId) : null
  const [editing, setEditing] = useState(!user.partnerId)
  const [input, setInput] = useState(user.partnerId ?? '')
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    const normalized = normalizePartnerId(input)
    if (!normalized) {
      setError('파트너 닉네임을 입력해 주세요')
      return
    }
    if (normalized === user.id) {
      setError('자기 자신은 파트너로 등록할 수 없어요')
      return
    }
    const updated = setPartnerId(normalized)
    if (!updated) return
    setError(null)
    setEditing(false)
    onUpdate(updated)
  }

  const handleClear = () => {
    const updated = setPartnerId(null)
    if (!updated) return
    setInput('')
    setEditing(true)
    onUpdate(updated)
  }

  if (editing) {
    return (
      <div className="border border-[#e8e8e6] rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold">
            파트너 등록
          </span>
        </div>
        <p className="text-[14px] text-[#6b6b6b] leading-relaxed mb-4">
          테스트는 두 분이 같이 진행해요. 파트너의 닉네임을 입력하면, 두 분의 답변이
          모두 모인 후 리포트가 공개됩니다.
        </p>

        <label
          htmlFor="partner-id"
          className="block text-[12px] font-semibold text-[#1a1a1a] mb-1.5"
        >
          파트너 닉네임 또는 ID
        </label>
        <input
          id="partner-id"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError(null)
          }}
          placeholder={user.gender === 'female' ? '예: 민재' : '예: 혜연'}
          className="w-full border border-[#e8e8e6] rounded-xl px-4 py-3 text-[15px] outline-none focus:border-[#1a1a1a] transition-colors"
        />
        {error && <p className="text-[12px] text-[#e07020] mt-2">{error}</p>}

        <div className="flex items-center gap-2 mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-[#1a1a1a] text-white rounded-full py-3 text-[14px] font-semibold disabled:opacity-30"
            disabled={!input.trim()}
          >
            등록하기
          </button>
          {user.partnerId && (
            <button
              type="button"
              onClick={() => {
                setEditing(false)
                setInput(user.partnerId ?? '')
              }}
              className="text-[13px] text-[#a0a0a0] hover:text-[#1a1a1a] px-3 py-2"
            >
              취소
            </button>
          )}
        </div>

        <p className="text-[11px] text-[#a0a0a0] mt-3 leading-relaxed">
          데모용으로 <span className="font-mono">haeyeon</span> 또는{' '}
          <span className="font-mono">minjae</span>를 입력해 보세요.
        </p>
      </div>
    )
  }

  const tone = user.gender === 'female' ? 'pink' : 'blue'
  const partnerTone = tone === 'pink' ? 'blue' : 'pink'

  return (
    <div className="border border-[#e8e8e6] rounded-2xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] tracking-[0.08em] uppercase text-[#a0a0a0] font-semibold">
          연결된 파트너
        </span>
        <span className="inline-flex items-center gap-1.5 bg-[#e8f4ee] text-[#2d8a57] text-[10px] font-semibold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2d8a57]" /> 연결됨
        </span>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <Avatar tone={tone} initial={user.name[0]} />
        <div className="text-[#a0a0a0] text-[18px]">↔</div>
        <Avatar tone={partnerTone} initial={partner?.name?.[0] ?? '?'} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
        <PartnerMeta label="나" name={user.name} id={user.id} />
        <PartnerMeta
          label="파트너"
          name={partner?.name ?? '미등록 유저'}
          id={user.partnerId ?? ''}
        />
      </dl>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-[13px] border border-[#e8e8e6] rounded-full px-4 py-2 hover:border-[#1a1a1a] transition-colors"
        >
          파트너 변경
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="text-[13px] text-[#a0a0a0] hover:text-[#e07020] px-2 py-2"
        >
          연결 해제
        </button>
      </div>
    </div>
  )
}

const Avatar = ({ tone, initial }: { tone: 'pink' | 'blue'; initial: string }) => {
  const isPink = tone === 'pink'
  return (
    <div
      className={clsx(
        'w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-semibold',
        isPink
          ? 'bg-[#fff5f8] text-[#c2185b] border-2 border-[#f47b9b]'
          : 'bg-[#f0f7ff] text-[#2c5282] border-2 border-[#6b9bd8]',
      )}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

const PartnerMeta = ({
  label,
  name,
  id,
}: {
  label: string
  name: string
  id: string
}) => (
  <div>
    <dt className="text-[10px] tracking-[0.08em] uppercase text-[#a0a0a0]">{label}</dt>
    <dd className="text-[14px] font-semibold text-[#1a1a1a]">{name}</dd>
    <dd className="text-[11px] font-mono text-[#a0a0a0]">{id || '—'}</dd>
  </div>
)

export default PartnerCard
