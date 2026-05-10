import Link from 'next/link'

export default function PayPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#fafaf9]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-[#a0a0a0] text-sm mb-2">프로 리포트</p>
          <h1 className="text-[44px] font-medium tracking-[-0.025em]">2,900원</h1>
          <p className="text-[#6b6b6b] mt-2">결제 후 64문항 심층 분석 시작</p>
        </div>

        <div className="border border-[#e8e8e6] rounded-2xl p-6 mb-6 space-y-3">
          <h2 className="font-medium">프로 리포트 포함 항목</h2>
          {[
            '11개 영역별 레이더 차트',
            '다툼 가능성 TOP 5 분석',
            'AI 맞춤 절충안 제안',
            '종합 궁합 결론',
            '저장 및 재열람 가능',
          ].map((item) => (
            <p key={item} className="flex items-center gap-2 text-[15px] text-[#6b6b6b]">
              <span className="text-[#f47b9b]">✓</span> {item}
            </p>
          ))}
        </div>

        <Link
          href="/test/pro"
          className="block w-full text-center bg-[#1a1a1a] text-white rounded-full py-3.5 text-[15px] font-medium"
        >
          결제하기 →
        </Link>
        <p className="text-center text-[#a0a0a0] text-xs mt-4">해커톤 데모 — 실제 결제가 이루어지지 않습니다</p>
        <Link href="/test/simple" className="block text-center text-[#a0a0a0] text-sm mt-3 underline">
          무료 심플 버전으로 먼저 해볼게요
        </Link>
      </div>
    </main>
  )
}
