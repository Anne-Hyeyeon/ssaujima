export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f5ff] via-[#f5f0ff] to-[#faf5ff] px-4">
      <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-[0_8px_40px_rgba(107,155,216,0.12)] p-8 text-center">
        <p className="text-xs font-semibold text-[#9b80d0] tracking-widest uppercase mb-6">AI 분석 중</p>
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[#2d2340] leading-snug mb-8">
          두 사람의 생활습관을<br />분석하고 있어요.
        </h1>
        <div className="space-y-3.5 text-left mb-8">
          <LoadingStep text="64개 항목 비교 중..." />
          <LoadingStep text="11개 영역 계산 중..." />
          <LoadingStep text="맞춤 조언 생성 중..." />
        </div>
        <p className="text-[11px] text-[#c0b8d0]">보통 5~10초 걸려요.</p>
      </div>
    </main>
  )
}

function LoadingStep({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 rounded-full border-2 border-[#9b80d0] flex items-center justify-center shrink-0 animate-pulse" />
      <p className="text-[13px] text-[#4a4260]">{text}</p>
    </div>
  )
}
