import { Badge } from '@/components/ui/Badge'
import { Divider } from '@/components/ui/Divider'

interface ICategory {
  label: string
  count?: number
  isPro?: boolean
}

const CATEGORIES: ICategory[] = [
  { label: '청소 & 위생', count: 15 },
  { label: '빨래', count: 5 },
  { label: '정리정돈', count: 4 },
  { label: '식생활', count: 5 },
  { label: '생활 리듬', count: 5 },
  { label: '돈 & 소비', isPro: true },
  { label: '가족 & 친척', isPro: true },
  { label: '사회생활', count: 5 },
  { label: '소통 & 갈등', count: 5 },
  { label: '자녀 & 미래', isPro: true },
  { label: '디지털 & 사생활', isPro: true },
]

export const DifferenceSection = () => {
  return (
    <section className="bg-[#f0ebf8] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">03</span>
          <span className="text-[#6b6b6b]"> — 차별점</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-10">
          11개 영역,
          <br />
          전부 다룹니다.
        </h2>
        <div className="bg-white/50 rounded-2xl overflow-hidden">
          {CATEGORIES.map((cat, idx) => (
            <div key={cat.label}>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-[15px] text-[#1a1a1a] font-medium">{cat.label}</span>
                {cat.isPro ? (
                  <Badge>PRO</Badge>
                ) : (
                  <span className="text-sm text-[#a0a0a0]">{cat.count}문항</span>
                )}
              </div>
              {idx < CATEGORIES.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DifferenceSection
