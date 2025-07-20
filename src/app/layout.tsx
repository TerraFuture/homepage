import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '회사명 | 공식 홈페이지',
  description: '회사 소개 및 서비스 안내',
  keywords: '회사명, 서비스, 기업',
  openGraph: {
    title: '회사명',
    description: '회사 소개',
    url: 'https://company.com',
    siteName: '회사명',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
