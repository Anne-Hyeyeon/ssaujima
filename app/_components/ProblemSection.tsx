interface IDialogue {
  topic: string
  personA: string
  personB: string
}

const DIALOGUES: IDialogue[] = [
  {
    topic: '청소',
    personA: '나는 매일 청소해야 직성이 풀리는데, 쟤는 일주일에 한 번도 많다잖아.',
    personB: '깔끔한 거 좋은데 너무 자주 아냐? 살면서 먼지 좀 쌓이면 어때.',
  },
  {
    topic: '설거지',
    personA: '밥 먹고 바로 설거지 안 하면 온종일 신경 쓰여. 불안해 죽겠어.',
    personB: '오늘 너무 피곤한데, 내일 하면 안 돼? 뭐가 그렇게 급해.',
  },
  {
    topic: '수면',
    personA: '12시 넘으면 다음날 완전히 망가져. 그냥 자자.',
    personB: '아직 할 거 남았어. 나한테 맞춰달라는 거야?',
  },
  {
    topic: '돈',
    personA: '이번 달 예산 넘겼잖아. 우리 가계부 좀 제대로 써야 할 것 같은데.',
    personB: '그 정도 쓴 거 가지고 뭘 그래. 숨 막혀.',
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
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-4">
          사소한 것들이
          <br />
          쌓이면 폭발해요.
        </h2>
        <p className="text-[15px] text-[#6b6b6b] leading-relaxed mb-12 max-w-sm">
          청소 주기, 수면 시간, 돈 씀씀이…<br />
          결혼 전에는 몰랐던 차이들이 매일 부딪혀요.<br />
          다 알고 시작했다면 덜 싸웠을 텐데.
        </p>
        <div className="flex flex-col gap-10">
          {DIALOGUES.map((d) => (
            <article key={d.topic}>
              <p className="text-[11px] font-semibold text-[#c2884d] uppercase tracking-[0.1em] mb-3">
                {d.topic}
              </p>
              <div className="flex flex-col gap-2">
                {/* Person A bubble */}
                <div
                  className="self-start max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3"
                  style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}
                >
                  <p className="text-[15px] text-[#1a1a1a] leading-[1.6]">{d.personA}</p>
                </div>
                {/* Person B bubble */}
                <div
                  className="self-end max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3"
                  style={{ background: 'rgba(255,238,243,0.85)', backdropFilter: 'blur(4px)' }}
                >
                  <p className="text-[15px] text-[#1a1a1a] leading-[1.6]">{d.personB}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="text-sm text-[#a08060] mt-12 text-center leading-relaxed">
          이런 대화, 낯설지 않죠?<br />
          결혼 후 이런 충돌이 반복될수록 마음이 멀어져요.
        </p>
      </div>
    </section>
  )
}

export default ProblemSection
