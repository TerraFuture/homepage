export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          회사명
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          회사 홈페이지를 준비 중입니다.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            🚀 Coming Soon
          </h2>
          <p className="text-blue-700">
            새로운 서비스를 준비 중입니다.
          </p>
        </div>
      </div>
    </main>
  )
}
