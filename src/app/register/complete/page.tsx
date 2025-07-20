import Image from 'next/image'
import Link from 'next/link'

export default function RegisterCompletePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex flex-col justify-center min-h-screen max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tighter">
              등록이 완료되었습니다!
            </h1>
            <p className="text-sm text-gray-600 mt-2 tracking-tight">
              이제 테라퓨처와 함께할 준비가 되셨습니다!
            </p>
          </div>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="TerraFuture"
              width={60}
              height={60}
              className="md:w-16 md:h-16 flex-shrink-0"
              priority
            />
          </Link>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-300 mb-12"></div>

        {/* 완료 안내 메시지와 버튼 */}
        <div className="space-y-8 mb-16">
          {/* 완료 안내 메시지 */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-6 py-3 bg-black rounded-full">
                <span className="text-white font-semibold tracking-tight">✓ 등록 완료</span>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed tracking-tight">
                등록하신 정보를 바탕으로 향후 프로젝트에 참여 요청이 전달될 수 있습니다.
              </p>
              <p className="text-sm text-gray-500 tracking-tight">
                등록 정보는 추후 본인 인증(현재 작업 중)을 통해 언제든 수정하실 수 있습니다.
              </p>
            </div>
          </div>

          {/* 메인으로 돌아가기 */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 py-4 px-2 text-sm font-medium hover:text-gray-800 transition duration-200"
            >
              ← 메인으로 돌아가기
            </Link>
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
            <span className="text-xs text-gray-600 font-medium tracking-tight">
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