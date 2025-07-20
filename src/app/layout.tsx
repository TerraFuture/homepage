import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TerraFuture | 공식 홈페이지',
  description: 'Terra Future Inc. 공식 홈페이지',
  keywords: 'TerraFuture, Terra Future, 테라퓨처, 기업',
  openGraph: {
    title: 'TerraFuture',
    description: 'Terra Future Inc. 공식 홈페이지',
    url: 'https://terrafuture.co.kr',
    siteName: 'TerraFuture',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
  themeColor: '#2563eb',
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
