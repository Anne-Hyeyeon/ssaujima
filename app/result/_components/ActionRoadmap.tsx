// Pro-only: 3-phase action roadmap — short-term / mid-term / long-term recommendations.
// Pattern: timeline with numbered milestones.

interface IPhase {
  range: string
  title: string
  bullets: string[]
}

interface IActionRoadmapProps {
  phases?: IPhase[]
}

const DEFAULT_PHASES: IPhase[] = [
  {
    range: '1주차',
    title: '대화 규칙 합의',
    bullets: [
      'TOP 1·2 갈등 항목을 함께 읽고 서로 입장을 이야기해요',
      '"청소 기준 합의서" 초안을 만들어 보세요',
      '잘 맞는 부분 3가지를 적어 서로에게 보여주세요',
    ],
  },
  {
    range: '1개월차',
    title: '생활 시스템 정착',
    bullets: [
      '청소·설거지·빨래 담당 영역을 분리해 시범 운영해요',
      '소비 합의 기준선을 정해 보세요 (예: 5만원 이상은 상의)',
      '일주일에 한 번 “룰 점검” 시간을 갖기로 약속해요',
    ],
  },
  {
    range: '3개월 이후',
    title: '장기 가치관 정렬',
    bullets: [
      '돈·자녀·가족 항목에 대해 시간을 두고 깊은 대화를 나눠요',
      '주기적으로 본 리포트를 다시 풀어 변화를 비교해 보세요',
      '필요 시 전문 상담사의 도움을 받는 것도 좋은 선택이에요',
    ],
  },
]

export const ActionRoadmap = ({ phases = DEFAULT_PHASES }: IActionRoadmapProps) => {
  return (
    <ol className="space-y-3">
      {phases.map((phase, idx) => (
        <li
          key={phase.range}
          className="border border-[#e8e8e6] rounded-2xl p-5 bg-white relative"
        >
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
              <span className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white text-[13px] font-semibold flex items-center justify-center tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                <span className="text-[11px] tracking-[0.08em] uppercase text-[#c2185b] font-semibold">
                  {phase.range}
                </span>
                <h4 className="text-[16px] font-semibold text-[#1a1a1a] tracking-[-0.01em]">
                  {phase.title}
                </h4>
              </div>
              <ul className="space-y-1.5">
                {phase.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[14px] text-[#6b6b6b] leading-relaxed"
                  >
                    <span className="text-[#bcb9b6] mt-0.5" aria-hidden="true">
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default ActionRoadmap
