interface IDialogue {
  topic: string
  personA: string
  personB: string
}

const DIALOGUES: IDialogue[] = [
  {
    topic: '청소',
    personA: '나는 청소 매일 해야 하는데, 쟤는 일주일에 한 번도 많다는 거야.',
    personB: '깔끔한 거 좋은데 너무 자주 청소하는 거 아냐?',
  },
  {
    topic: '설거지',
    personA: '밥 먹고 바로 설거지 안 하면 불안해.',
    personB: '오늘 피곤한데 내일 하면 안 되나?',
  },
  {
    topic: '수건',
    personA: '수건은 한 번 쓰면 빨아야지!',
    personB: '한 번만 쓰고 왜 빨아, 낭비 아니야?',
  },
  {
    topic: '취침',
    personA: '12시 넘기면 다음날 힘든데.',
    personB: '아직 할 거 있는데 왜 자야 해?',
  },
]

export const ProblemSection = () => {
  return (
    <section className="bg-[#fff0e8] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">01</span>
          <span className="text-[#6b6b6b]"> — 문제</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-12">
          결혼하면 사소한 게
          <br />
          문제가 돼요.
        </h2>
        <div className="flex flex-col gap-8">
          {DIALOGUES.map((d) => (
            <article key={d.topic} className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#a0a0a0] uppercase tracking-wide mb-1">
                {d.topic}
              </p>
              <div className="bg-white/60 rounded-2xl px-4 py-3 self-start max-w-[85%]">
                <p className="text-[15px] text-[#1a1a1a] leading-relaxed">{d.personA}</p>
              </div>
              <div className="bg-[#ffeef3]/80 rounded-2xl px-4 py-3 self-end max-w-[85%]">
                <p className="text-[15px] text-[#1a1a1a] leading-relaxed">{d.personB}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
