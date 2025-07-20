import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tighter">
              인재 등록
            </h1>
            <p className="text-sm text-gray-600 mt-2 tracking-tight">
              테라퓨처 프로젝트에 참여하기 위한<br className="md:hidden" />정보를 입력해주세요
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

        {/* 등록 폼 */}
        <form className="space-y-12">
          
          {/* 기본 정보 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                당신을 알고 싶어요!
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  닉네임
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="프로젝트에서 사용할 닉네임"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  실명(비공개)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="본명"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  이메일(비공개)
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  휴대폰 번호(비공개)
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                거주 지역
              </label>
              <div className="flex flex-wrap gap-4">
                {['서울', '경기', '지방', '해외'].map((region) => (
                  <label key={region} className="flex items-center">
                    <input type="radio" name="region" value={region} className="mr-2" />
                    <span className="text-sm text-gray-700">{region}</span>
                  </label>
                ))}
                <div className="flex items-center">
                  <input type="radio" name="region" value="기타" className="mr-2" />
                  <span className="text-sm text-gray-700 mr-2">기타:</span>
                  <input
                    type="text"
                    className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
                    placeholder="직접입력"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 연락 / 커뮤니케이션 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                어떻게 업무 진행 할까요?
              </span>
            </div>
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  선호 커뮤니케이션 도구 (복수 선택 가능)
                </label>
                <div className="flex flex-wrap gap-4">
                  {['휴대폰', '카카오톡', 'Zoom/Meet', '이메일'].map((tool) => (
                    <label key={tool} className="flex items-center">
                      <input type="checkbox" name="communication" value={tool} className="mr-2" />
                      <span className="text-sm text-gray-700">{tool}</span>
                    </label>
                  ))}
                  <div className="flex items-center">
                    <input type="checkbox" name="communication" value="기타" className="mr-2" />
                    <span className="text-sm text-gray-700 mr-2">기타:</span>
                    <input
                      type="text"
                      className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
                      placeholder="직접입력"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
 {/* 구분선 */}
 <div className="w-full h-px bg-gray-300 mb-12"></div>

          {/* 경력 정보 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                얼마나 오래 일을 해오셨어요?
              </span>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                총 경력 년수
              </label>
              <div className="flex flex-wrap gap-4">
                {['신입', '1년 미만', '1-3년', '3-5년', '5-10년', '10-15년', '20년 이상'].map((experience) => (
                  <label key={experience} className="flex items-center py-1">
                    <input type="radio" name="experience_years" value={experience} className="mr-3" />
                    <span className="text-sm text-gray-700">{experience}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>


          {/* 희망 조건 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                선호하는 역할이 있으세요?
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  희망 역할/포지션 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    '프론트엔드 개발자',
                    '백엔드 개발자',
                    '풀스택 개발자', 
                    'AI/ML 엔지니어',
                    '데이터 분석가',
                    'UI/UX 디자이너',
                    '그래픽 디자이너',
                    '프로젝트 매니저',
                    '기술 컨설턴트',
                    '문서 작성자',
                    '마케터',
                    '강사/멘토'
                  ].map((role) => (
                    <label key={role} className="flex items-center py-1">
                      <input type="checkbox" name="preferred_roles" value={role} className="mr-3" />
                      <span className="text-sm text-gray-700">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  선호 산업/도메인 (최대 3개)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    '핀테크/금융',
                    '헬스케어/의료',
                    '교육/에듀테크',
                    '커머스/이커머스',
                    '게임/엔터테인먼트',
                    '여행/숙박',
                    '푸드테크',
                    '부동산/프롭테크',
                    '모빌리티/교통',
                    '소셜/커뮤니티',
                    '미디어/콘텐츠',
                    '정부/공공기관',
                    '스타트업',
                    '대기업',
                    '상관없음'
                  ].map((industry) => (
                    <label key={industry} className="flex items-center py-1">
                      <input type="checkbox" name="preferred_industries" value={industry} className="mr-3" />
                      <span className="text-sm text-gray-700">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 구분선 */}
          <div className="w-full h-px bg-gray-300 mb-12"></div>

          {/* 관심 분야 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                참여하고 싶은 업무 분야를 알고 싶어요!
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 tracking-tight">최대 5개까지 선택 가능합니다</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'AI 응용 프로그램 개발',
                '웹 프론트엔드 개발',
                '웹 백엔드 개발',
                '모바일 앱 개발',
                '데스크탑 응용프로그램 개발',
                '데이터 분석',
                'UI/UX 디자인',
                '영상 제작 (AI 포함)',
                'BI / CI 디자인',
                '웹/서비스 기획',
                '기술 제안서 / 문서 작성',
                '사업계획서 작성',
                '프로젝트 매니지먼트 (PM)',
                '운영 / 회계 / 정산',
                '퍼포먼스 마케팅 / SNS',
                'KDT 과정 강사 (초보 가능)',
                '메타버스 구현 (ENgage 등)'
              ].map((field) => (
                <label key={field} className="flex items-center py-1">
                  <input type="checkbox" name="interests" value={field} className="mr-3" />
                  <span className="text-sm text-gray-700">{field}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 보유 기술 스택 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                보유 기술 스택을 적어주세요
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                기술 태그 입력
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                placeholder="예시: Python, FastAPI, React, Docker, OpenAI API, Figma"
              />
                             <p className="text-xs text-gray-500 mt-2 tracking-tight">쉼표(,)로 구분하여 입력해주세요</p>
            </div>
          </section>

          {/* 기술 숙련도 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                기술 숙련도를 알려주세요!
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'AI 개발', name: 'ai_level' },
                { label: '웹 개발', name: 'web_level' },
                { label: '디자인', name: 'design_level' }
              ].map((skill) => (
                <div key={skill.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                    {skill.label}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['없음', '입문', '중급', '고급'].map((level) => (
                      <label key={level} className="flex items-center">
                        <input type="radio" name={skill.name} value={level} className="mr-2" />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  PM 역할
                </label>
                <div className="flex flex-wrap gap-3">
                  {['불가능', '보조 가능', '가능'].map((level) => (
                    <label key={level} className="flex items-center">
                      <input type="radio" name="pm_level" value={level} className="mr-2" />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 구분선 */}
          <div className="w-full h-px bg-gray-300 mb-12"></div>

          {/* 전문성 검증 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                당신의 전문성에 대해 알려주세요!
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  언어 능력
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    
                    { lang: '영어', name: 'english_level' },
                    { lang: '일본어', name: 'japanese_level' },
                    { lang: '중국어', name: 'chinese_level' }
                  ].map((language) => (
                    <div key={language.name} className="space-y-2">
                      <span className="text-sm font-semibold text-gray-700">{language.lang}</span>
                      <div className="flex flex-wrap gap-3">
                        {['없음', '초급', '중급', '고급', '원어민'].map((level) => (
                          <label key={level} className="flex items-center">
                            <input type="radio" name={language.name} value={level} className="mr-2" />
                            <span className="text-sm text-gray-700">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  보유 자격증/인증 (선택)
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  rows={3}
                  placeholder="예시: AWS Solutions Architect, Google Cloud Professional, 정보처리기사, Adobe Certified Expert 등"
                />
              </div>
            </div>
          </section>


          {/* 개인 상세 정보 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                조금 더 알고 싶어요!
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  최종 학력
                </label>
                <div className="flex flex-wrap gap-4">
                  {['고등학교 졸업', '전문대 졸업', '대학교 졸업', '대학원 석사', '대학원 박사', '기타'].map((education) => (
                    <label key={education} className="flex items-center">
                      <input type="radio" name="education_level" value={education} className="mr-2" />
                      <span className="text-sm text-gray-700">{education}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  전공 분야 (선택)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="예시: 컴퓨터공학과, 시각디자인학과, 경영학과 등"
                />
              </div>
            </div>
          </section>

 {/* 구분선 */}
 <div className="w-full h-px bg-gray-300 mb-12"></div>
          {/* 프로젝트 참여 조건 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                당신과 함께 프로젝트를 하려면?
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  참여 가능 요일
                </label>
                <div className="flex flex-wrap gap-4">
                  {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                    <label key={day} className="flex items-center">
                      <input type="checkbox" name="days" value={day} className="mr-2" />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  {['주중만 가능', '주말만 가능', '상관 없음'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input type="checkbox" name="day_preference" value={option} className="mr-2" />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  참여 가능 시간대
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    '오전 (9시~12시)',
                    '오후 (12시~6시)',
                    '저녁 (6시~11시)',
                    '심야 (자정 이후)',
                    '시간대 상관 없음'
                  ].map((time) => (
                    <label key={time} className="flex items-center">
                      <input type="checkbox" name="times" value={time} className="mr-2" />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                    placeholder="또는 직접 입력 (예: 평일 오후 2시~6시)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  최대 참여 가능 기간
                </label>
                <div className="flex flex-wrap gap-4">
                  {['1주 이내', '1~4주', '1개월 이상', '상시 가능', '미정 / 협의 가능'].map((period) => (
                    <label key={period} className="flex items-center">
                      <input type="radio" name="duration" value={period} className="mr-2" />
                      <span className="text-sm text-gray-700">{period}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  사용 가능한 작업 환경
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    '본인 노트북/PC',
                    '게임용 그래픽카드(GPU)',
                    '모바일만 가능',
                    '외부 협업 공간 필요',
                    '상관 없음'
                  ].map((env) => (
                    <label key={env} className="flex items-center">
                      <input type="checkbox" name="environment" value={env} className="mr-2" />
                      <span className="text-sm text-gray-700">{env}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 구분선 */}
          <div className="w-full h-px bg-gray-300 mb-12"></div>

          {/* 가용성 정보 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                언제부터 시작하실 수 있으세요?
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  현재 상태
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    '즉시 가능',
                    '1주 후 가능', 
                    '2주 후 가능',
                    '1개월 후 가능',
                    '협의 필요',
                    '현재 불가능'
                  ].map((status) => (
                    <label key={status} className="flex items-center">
                      <input type="radio" name="availability_status" value={status} className="mr-2" />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                  연락 가능 시간대 (복수 선택 가능)
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    '오전 (9시~12시)',
                    '오후 (12시~6시)',
                    '저녁 (6시~10시)',
                    '주말',
                    '언제든지'
                  ].map((time) => (
                    <label key={time} className="flex items-center">
                      <input type="checkbox" name="contact_hours" value={time} className="mr-2" />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 작업 스타일 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                당신은 어떤 작업 스타일인가요?
              </span>
            </div>
            <div className="space-y-3">
              {[
                '지시가 명확한 업무를 선호',
                '스스로 정리하며 진행하는 것을 선호',
                '문서화가 잘된 업무를 선호',
                '작은 단위로 분리된 업무를 선호'
              ].map((style) => (
                <label key={style} className="flex items-center">
                  <input type="checkbox" name="work_style" value={style} className="mr-3" />
                  <span className="text-sm text-gray-700">{style}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                기타 설명 (선택)
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                rows={3}
                placeholder="추가로 설명하고 싶은 작업 스타일이 있다면 입력해주세요"
              />
            </div>
          </section>

        
 {/* 구분선 */}
 <div className="w-full h-px bg-gray-300 mb-12"></div>  

          {/* 지원 동기 / 각오 */}
          <section>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black rounded-full text-sm font-semibold text-white tracking-tight">
                지원하신 동기 또는 각오를 알려주시면 좋겠어요!
              </span>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                지원 동기나 각오 (선택 입력)
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                rows={4}
                placeholder="테라퓨처 프로젝트에 참여하고 싶은 이유나 각오를 자유롭게 작성해주세요"
              />
            </div>
          </section>


          {/* 버튼 영역 */}
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            <Link
              href="/"
              className="flex-1 md:flex-none text-gray-600 py-4 px-2 text-sm font-medium hover:text-gray-800 transition duration-200 flex items-center"
            >
              ← 메인으로 돌아가기
            </Link>
            <Link
              href="/register/complete"
              className="flex-1 md:flex-none bg-black text-white py-4 px-8 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200 text-center"
            >
              등록 완료
            </Link>
          </div>
        </form>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-300 my-8"></div>

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

        {/* 하단 여백 */}
        <div className="h-16"></div>
      </div>
    </main>
  )
} 