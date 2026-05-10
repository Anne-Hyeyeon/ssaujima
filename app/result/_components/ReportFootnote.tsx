// Methodology + disclaimer block — adds credibility to the report.

interface IReportFootnoteProps {
  reportId: string
  isFallback?: boolean
}

export const ReportFootnote = ({ reportId, isFallback }: IReportFootnoteProps) => {
  return (
    <div className="mt-4 pt-8 border-t border-[#e8e8e6] text-[12px] text-[#a0a0a0] leading-relaxed space-y-3">
      <div>
        <p className="font-semibold text-[#6b6b6b] mb-1.5 tracking-[0.04em] uppercase text-[11px]">
          분석 방법
        </p>
        <p>
          답변 차이의 절댓값을 0–3 스케일로 환산해 가중치를 적용한 후, 11개 영역 평균과
          상위 갈등 항목을 추출합니다. AI 조언은 익명화된 답변 패턴만 입력으로 사용해요.
        </p>
      </div>
      <div>
        <p className="font-semibold text-[#6b6b6b] mb-1.5 tracking-[0.04em] uppercase text-[11px]">
          유의 사항
        </p>
        <p>
          본 리포트는 통계적 패턴 기반의 참고 자료로, 의학·심리학적 진단을 대체하지
          않습니다. 두 사람의 가치관과 합의가 결과보다 우선해요.
        </p>
      </div>
      {isFallback && (
        <p className="text-[11px] text-[#e07020]">
          * AI 연결 실패로 예시 조언이 표시되고 있어요.
        </p>
      )}
      <div className="flex items-center justify-between pt-3 text-[11px] font-mono tabular-nums text-[#a0a0a0]">
        <span>{reportId}</span>
        <span>SSAUJIMA · LIFESTYLE COMPATIBILITY</span>
      </div>
    </div>
  )
}

export default ReportFootnote
