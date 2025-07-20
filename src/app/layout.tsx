import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-kr',
})

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
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
