import type { Metadata } from 'next'
import './globals.css'
import Header from './_components/Header'

export const metadata: Metadata = {
  title: '싸우지마 — 결혼 전 생활습관 궁합 진단',
  description: '두 사람의 생활습관 64가지 항목으로 다툼 가능성과 궁합을 AI가 분석해 리포트로 제공하는 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <Header />
        {children}
      </body>
    </html>
  )
}
