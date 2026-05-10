export const Footer = () => {
  return (
    <footer className="bg-[#fafaf9] border-t border-[#e8e8e6] py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-medium tracking-tight text-[#1a1a1a] text-[15px]">싸우지마</span>
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center">
          <p className="text-sm text-[#a0a0a0]">© 2026 싸우지마</p>
          <p className="text-xs text-[#a0a0a0]">
            해커톤 프로젝트입니다. 결제는 목업입니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
