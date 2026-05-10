interface IStep {
  number: string
  title: string
  description: string
}

const STEPS: IStep[] = [
  {
    number: '1',
    title: '각자 답해요',
    description: '두 사람이 따로따로 15~64가지 질문에 솔직하게 답해요. 상대방의 답을 모르는 상태로 진행해요.',
  },
  {
    number: '2',
    title: 'AI가 분석해요',
    description: 'Claude AI가 11개 영역별로 두 사람의 차이를 정밀하게 분석해요. 어디서 부딪힐지 미리 알 수 있어요.',
  },
  {
    number: '3',
    title: '리포트를 받아요',
    description: '다툼 가능성 TOP 5와 맞춤형 절충안을 알려드려요. 결혼 전 대화의 시작점이 돼요.',
  },
]

export const HowSection = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">02</span>
          <span className="text-[#6b6b6b]"> — 방법</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-4">
          각자 답하면
          <br />
          AI가 정리해줘요.
        </h2>
        <p className="text-[15px] text-[#6b6b6b] leading-relaxed mb-14 max-w-sm">
          같이 답하면 눈치 보게 되니까, 따로따로 답해요.<br />
          솔직한 응답일수록 정확한 결과가 나와요.
        </p>

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex md:flex-row items-stretch flex-1">
              {/* Step card */}
              <div className="flex-1 flex flex-col gap-3 p-5 rounded-2xl hover:bg-[#fafaf9] transition-colors">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f47b9b, #e05e85)' }}
                >
                  {step.number}
                </div>
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#6b6b6b] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow */}
              {idx < STEPS.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-2 text-[#d0d0d0] text-lg select-none" aria-hidden="true">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowSection
