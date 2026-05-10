interface IStep {
  number: string
  title: string
  description: string
}

const STEPS: IStep[] = [
  {
    number: '1',
    title: '각자 답함',
    description: '두 사람이 따로 15~64가지 질문에 답해요.',
  },
  {
    number: '2',
    title: 'AI 분석',
    description: 'Claude AI가 11개 영역별 차이를 분석해요.',
  },
  {
    number: '3',
    title: '맞춤 리포트',
    description: '다툼 가능성 TOP 5와 절충안을 알려드려요.',
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
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-12">
          각자 답하고
          <br />
          AI가 분석해요.
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex md:flex-row items-start md:items-center gap-6 md:gap-0 flex-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#f47b9b] text-white text-xs font-medium flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-medium tracking-[-0.01em] leading-[1.3] text-[#1a1a1a]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[15px] text-[#6b6b6b] leading-relaxed pl-8">
                  {step.description}
                </p>
              </div>
              {idx < STEPS.length - 1 && (
                <span className="text-[#a0a0a0] text-lg md:px-6 hidden md:block" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowSection
