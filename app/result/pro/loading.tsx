export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f0ebf8]">
      <div className="text-center max-w-md px-6">
        <p className="text-[#c2185b] text-sm font-medium tracking-wide mb-8">AI 분석 중</p>
        <h1 className="text-[32px] font-medium tracking-[-0.02em] mb-12">
          두 사람의 생활습관을<br />분석하고 있어요.
        </h1>
        <div className="space-y-4 text-left">
          <LoadingStep text="64개 항목 비교 중..." done={false} />
          <LoadingStep text="11개 영역 계산 중..." done={false} />
          <LoadingStep text="맞춤 조언 생성 중..." done={false} />
        </div>
        <p className="text-[#a0a0a0] text-sm mt-12">보통 5~10초 걸려요.</p>
      </div>
    </main>
  )
}

function LoadingStep({ text, done }: { text: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full border border-[#c2185b] flex items-center justify-center flex-shrink-0">
        {done && <div className="w-2 h-2 rounded-full bg-[#c2185b]" />}
      </div>
      <p className="text-[#6b6b6b] text-[15px]">{text}</p>
    </div>
  )
}
