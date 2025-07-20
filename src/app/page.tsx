import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero 섹션 */}
      <section className="container mx-auto px-4 py-20 text-center">
        {/* 로고 */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="TerraFuture 로고"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          TerraFuture
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Terra Future Inc.<br />
          더 나은 미래를 위한 혁신적인 솔루션을 제공합니다.
        </p>
        
        {/* Coming Soon 메시지 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2Z"/>
              <path d="M19 15L20.09 17.26L23 18L20.09 18.74L19 21L17.91 18.74L15 18L17.91 17.26L19 15Z"/>
              <path d="M5 9L6.09 11.26L9 12L6.09 12.74L5 15L3.91 12.74L1 12L3.91 11.26L5 9Z"/>
            </svg>
            <h2 className="text-2xl font-semibold text-blue-900">
              Coming Soon
            </h2>
          </div>
          <p className="text-blue-700 mb-6">
            새로운 서비스를 준비 중입니다.<br />
            런칭 소식을 가장 먼저 받아보세요!
          </p>
          
          {/* 이메일 수집 폼 */}
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              알림 신청
            </button>
          </div>
        </div>
      </section>

      {/* About 섹션 */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            TerraFuture는 미래 지향적인 기술과 혁신적인 아이디어로<br />
            더 나은 세상을 만들어가는 기업입니다.
          </p>
          
          {/* 특징 카드들 */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">글로벌 비전</h3>
              <p className="text-gray-600">세계적 수준의 서비스와 솔루션을 제공합니다.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">혁신 기술</h3>
              <p className="text-gray-600">최신 기술을 활용한 창의적인 솔루션을 개발합니다.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16.5A1.5 1.5 0 0 0 15 9.5v7c0 1.1.9 2 2 2h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V22h-2zm-7 0v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V22H8v-7.5A1.5 1.5 0 0 0 6.5 13H4.46A1.5 1.5 0 0 0 3 14.37L.46 22H3v-6h2.5l-1.04-3.12A1.5 1.5 0 0 1 5.88 11h2.24A1.5 1.5 0 0 1 9.5 12.5V22H13z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">신뢰 파트너</h3>
              <p className="text-gray-600">고객과 함께 성장하는 믿을 수 있는 파트너입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact</h2>
          <div className="space-y-4 text-gray-600 text-lg">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:contact@terrafuture.co.kr" className="hover:text-blue-600 transition">
                contact@terrafuture.co.kr
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 4.72L16 11.59V8c0-.55.45-1 1-1s1 .45 1 1v4.59l1.17 1.17c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L15 13.41l-5.59 5.59c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L13.41 12 8.59 7.17c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 7.59l-1.41-1.41z"/>
              </svg>
              <a href="https://terrafuture.co.kr" className="hover:text-blue-600 transition">
                www.terrafuture.co.kr
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Seoul, South Korea</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="TerraFuture"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-xl font-semibold">TerraFuture</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Terra Future Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
