import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col justify-center min-h-screen px-4 md:px-8 py-8 md:py-16 max-w-4xl mx-auto">
        
        {/* 상단: 제목과 로고 */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight tracking-tighter flex-1 pr-4">
            인재 매칭을 위한<br className="md:hidden" />
            프로젝트 허브
          </h1>
          <Image
            src="/logo.png"
            alt="TerraFuture"
            width={60}
            height={60}
            className="md:w-24 md:h-24 flex-shrink-0"
            priority
          />
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-300 mb-12"></div>

        {/* 버튼들과 설명 */}
        <div className="space-y-8 mb-16">
          {/* 인재 등록하기 */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <button className="bg-black text-white py-4 px-8 rounded-md text-base font-medium hover:bg-gray-800 transition duration-200 w-full md:min-w-48 md:w-auto">
              인재 등록하기
            </button>
            <p className="text-sm text-gray-500 text-center md:text-left">
              누구든 등록할 수 있습니다
            </p>
          </div>

          {/* 내 정보 조회 · 수정 */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <button className="border border-gray-300 text-gray-700 py-4 px-8 rounded-md text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition duration-200 w-full md:min-w-48 md:w-auto">
              내 정보 조회 · 수정
            </button>
            <p className="text-sm text-gray-400 leading-relaxed text-center md:text-left">
              본인의 휴대폰 번호로 인증 후 정보 열람 및 수정 가능
            </p>
          </div>

          {/* 관리자 로그인 */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
            <button className="border border-gray-300 text-gray-700 py-4 px-8 rounded-md text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition duration-200 w-full md:min-w-48 md:w-auto">
              관리자 로그인
            </button>
            <p className="text-sm text-gray-500 text-center md:text-left">
              {/* 빈 공간 */}
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-300 mb-8"></div>

        {/* 하단: em_logo + 문구와 카피라이트 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
            <Image
              src="/em_logo.png"
              alt="TerraFuture 앰블럼"
              width={120}
              height={40}
              className="h-5 w-auto md:h-6 mx-auto md:mx-0"
            />
            <span className="text-sm text-gray-600 font-medium">
              더 나은 미래를 위한 혁신적인 AI 솔루션을 제공합니다.
            </span>
          </div>
          <p className="text-xs text-gray-400 text-center md:text-right">
            2025 ⓒTerra Future Inc.
          </p>
        </div>
      </div>
    </main>
  )
}
