import Link from "next/link";

interface IAudienceCard {
  tag: string;
  emoji: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
  bg: string;
  tagColor: string;
}

const AUDIENCES: IAudienceCard[] = [
  {
    tag: "예비 부부",
    emoji: "💍",
    title: "결혼 앞두고\n걱정되는 게 있나요?",
    description:
      '설레는 마음 뒤로 "우리 진짜 잘 맞을까?" 하는 의문이 드는 건 자연스러운 일이에요. 지금 미리 확인해두면, 신혼 첫날부터 덜 싸울 수 있어요.',
    cta: "",
    href: "/test/simple",
    accent: "text-[#f47b9b]",
    bg: "bg-[#fff5f8]",
    tagColor: "text-[#f47b9b] bg-[#ffeef3]",
  },
  {
    tag: "결혼한 부부",
    emoji: "🏠",
    title: "같은 것 때문에\n자꾸 싸우진 않나요?",
    description:
      '"왜 이것 때문에 항상 싸우지?" 하는 게 있다면, 서로 다른 기준이 원인일 수 있어요. 문제를 진단하고 절충점을 찾는 것만으로도 많이 달라져요.',
    cta: "",
    href: "/test/simple",
    accent: "text-[#6b9bd8]",
    bg: "bg-[#f0f7ff]",
    tagColor: "text-[#4b7bb8] bg-[#e8f0fb]",
  },
];

export const GetStartedSection = () => {
  return (
    <section className="bg-[#fafaf9] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sm tracking-wide mb-6">
          <span className="text-[#f47b9b]">00</span>
          <span className="text-[#6b6b6b]"> — 이런 분들께</span>
        </p>
        <h2 className="text-[32px] font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1a1a] mb-4">
          예비 부부도,
          <br />
          결혼한 부부도 추천해요.
        </h2>
        <p className="text-[15px] text-[#6b6b6b] leading-relaxed mb-10 max-w-sm">
          싸우기 전에 알아두거나, 싸우고 난 후 원인을 찾거나.
          <br />
          어떤 단계에 있든 도움이 돼요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AUDIENCES.map((card) => (
            <div
              key={card.tag}
              className={`${card.bg} rounded-2xl p-6 flex flex-col gap-4`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {card.emoji}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.tagColor}`}
                >
                  {card.tag}
                </span>
              </div>

              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#1a1a1a] leading-snug whitespace-pre-line">
                {card.title}
              </h3>

              <p className="text-[14px] text-[#6b6b6b] leading-relaxed flex-1">
                {card.description}
              </p>

              <Link
                href={card.href}
                className={`text-[14px] font-semibold ${card.accent} hover:opacity-70 transition-opacity`}
              >
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
