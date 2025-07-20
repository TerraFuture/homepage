'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    phone: ''
  })
  const [formData, setFormData] = useState({
    // 기본 정보
    nickname: '',
    name: '',
    phone: '',
    email: '',
    email_id: '',
    email_domain: 'gmail.com', // 기본값 설정
    region: '서울', // 기본값 설정
    region_other: '',
    
    // 커뮤니케이션
    communication: ['카카오톡'], // 기본값 설정
    communication_other: '',
    
    // 경력 정보
    career_years: '5-10년', // 기본값 설정
    
    // 업무 형태
    work_type: '프리랜서', // 기본값 설정
    
    // 희망 역할/포지션
    preferred_roles: [] as string[],
    preferred_industries: [] as string[],
    
    // 관심 분야
    interests: [] as string[],
    
    // 기술 스택
    tech_stack: '',
    
    // 기술 숙련도
    ai_level: '중급', // 기본값 설정
    web_level: '중급', // 기본값 설정
    design_level: '입문', // 기본값 설정
    pm_level: '보조 가능', // 기본값 설정
    
    // 언어 능력
    english_level: '초급', // 기본값 설정
    japanese_level: '없음', // 기본값 설정
    chinese_level: '없음', // 기본값 설정
    
    // 자격증
    certifications: '',
    
    // 학력
    education_level: '',
    education_major: '',
    
    // 프로젝트 참여 조건
    available_days: ['월', '화', '수', '목', '금'], // 기본값 설정 (월~금)
    day_preference: ['주중만 가능'], // 기본값 설정
    available_times: ['시간대 상관 없음'], // 기본값 설정
    available_times_custom: '',
    max_duration: '상시 가능', // 기본값 설정
    work_environment: ['상관 없음'], // 기본값 설정
    
    // 가용성
    availability_status: '즉시 가능', // 기본값 설정
    contact_hours: ['언제든지'], // 기본값 설정
    
    // 작업 스타일
    work_style: ['지시가 명확한 업무를 선호'], // 기본값 설정
    work_style_other: '',
    
    // 지원 동기
    motivation: ''
  })

  // 컴포넌트 마운트시 기본 이메일 설정
  useEffect(() => {
    if (formData.email_domain && !formData.email) {
      setFormData(prev => ({
        ...prev,
        email: prev.email_id ? `${prev.email_id}@${prev.email_domain}` : ''
      }))
    }
  }, [])

  // 이메일 정규식 검증
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  // 휴대폰 번호 정규식 검증 (한국 휴대폰 번호 체계)
  const validatePhone = (phone: string): boolean => {
    // 010으로 시작하는 11자리 또는 011,016,017,018,019로 시작하는 10-11자리
    const phoneRegex = /^010[0-9]{8}$|^01[1-9][0-9]{7,8}$/
    return phoneRegex.test(phone)
  }

  // 휴대폰 번호 입력 처리 (숫자만 허용)
  const handlePhoneChange = (value: string) => {
    // 숫자만 추출
    const numbersOnly = value.replace(/[^0-9]/g, '')
    
    // 11자리까지만 허용
    const limitedNumbers = numbersOnly.slice(0, 11)
    
    setFormData(prev => ({ ...prev, phone: limitedNumbers }))
    
    // 실시간 검증
    if (limitedNumbers.length >= 10) {
      const isValid = validatePhone(limitedNumbers)
      setValidationErrors(prev => ({
        ...prev,
        phone: isValid ? '' : '올바른 한국 휴대폰 번호를 입력해주세요 (예: 01012345678)'
      }))
    } else if (limitedNumbers.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        phone: '휴대폰 번호는 10-11자리여야 합니다'
      }))
    } else {
      setValidationErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  // 이메일 검증 처리
  const handleEmailValidation = (email: string) => {
    if (email.length > 0) {
      const isValid = validateEmail(email)
      setValidationErrors(prev => ({
        ...prev,
        email: isValid ? '' : '올바른 이메일 형식을 입력해주세요'
      }))
    } else {
      setValidationErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 최종 검증
    const nicknameValid = formData.nickname && formData.nickname.trim() !== ''
    const emailValid = formData.email && validateEmail(formData.email)
    const phoneValid = validatePhone(formData.phone)
    const motivationValid = formData.motivation && formData.motivation.trim() !== ''
    
    if (!nicknameValid || !emailValid || !phoneValid || !motivationValid) {
      alert('모든 필수 필드를 올바르게 입력해주세요:\n- 닉네임\n- 실명\n- 이메일\n- 휴대폰 번호\n- 지원 동기')
      return
    }
    
    setValidationErrors({
      email: !emailValid ? '올바른 이메일 형식을 입력해주세요' : '',
      phone: !phoneValid ? '올바른 한국 휴대폰 번호를 입력해주세요' : ''
    })
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        router.push('/register/complete')
      } else {
        alert(result.error || '등록 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('등록 오류:', error)
      alert('등록 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 다양한 폼 타입 처리를 위한 핸들러
  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 체크박스 배열 처리 핸들러
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof typeof prev] as string[] || []
      let newState = { ...prev }
      
      if (checked) {
        (newState as any)[name] = [...currentArray, value]
      } else {
        (newState as any)[name] = currentArray.filter(item => item !== value)
      }

      // 요일 선택 자동화 로직
      if (name === 'day_preference') {
        if (value === '주중만 가능' && checked) {
          // 주중만 가능 선택시 월~금 자동 선택
          newState.available_days = ['월', '화', '수', '목', '금']
          // 다른 옵션들 해제
          newState.day_preference = ['주중만 가능']
        } else if (value === '주말만 가능' && checked) {
          // 주말만 가능 선택시 토~일 자동 선택
          newState.available_days = ['토', '일']
          // 다른 옵션들 해제
          newState.day_preference = ['주말만 가능']
        } else if (value === '상관 없음' && checked) {
          // 상관 없음 선택시 월~일 자동 선택
          newState.available_days = ['월', '화', '수', '목', '금', '토', '일']
          // 다른 옵션들 해제
          newState.day_preference = ['상관 없음']
        }
      }

      return newState
    })
  }

  // 라디오 버튼 처리 핸들러
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 이메일 조합 핸들러
  const handleEmailChange = (field: 'email_id' | 'email_domain', value: string) => {
    setFormData(prev => {
      const newEmailId = field === 'email_id' ? value : prev.email_id
      const newEmailDomain = field === 'email_domain' ? value : prev.email_domain
      const fullEmail = newEmailId && newEmailDomain ? `${newEmailId}@${newEmailDomain}` : ''
      
      // 완성된 이메일이 있으면 검증 실행
      if (fullEmail) {
        handleEmailValidation(fullEmail)
      } else {
        setValidationErrors(prev => ({ ...prev, email: '' }))
      }
      
      return {
        ...prev,
        [field]: value,
        email: fullEmail
      }
    })
  }
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-8 md:py-16 break-words">
        
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
        <form className="space-y-12" onSubmit={handleSubmit}>
          
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
                  닉네임 (필수)
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="프로젝트에서 사용할 닉네임"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  실명(필수)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  placeholder="본명"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  이메일(필수)
                </label>
                <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-2">
                  <input
                    type="text"
                    value={formData.email_id}
                    onChange={(e) => handleEmailChange('email_id', e.target.value)}
                    className={`w-full md:flex-1 px-4 py-3 border rounded-md text-sm focus:outline-none ${
                      validationErrors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="이메일 아이디"
                    required
                  />
                  <div className="flex items-center justify-center md:hidden py-1">
                    <span className="text-gray-400 text-xs">@</span>
                  </div>
                  <span className="hidden md:inline text-gray-500 text-sm">@</span>
                  <div className="relative w-full md:flex-1">
                    <select
                      value={formData.email_domain}
                      onChange={(e) => handleEmailChange('email_domain', e.target.value)}
                      className={`w-full px-4 py-3 pr-10 border rounded-md text-sm focus:outline-none bg-white appearance-none cursor-pointer ${
                        validationErrors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-gray-400'
                      }`}
                      style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
                      required
                    >
                      <option value="gmail.com">gmail.com</option>
                      <option value="naver.com">naver.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="kakao.com">kakao.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="nate.com">nate.com</option>
                      <option value="outlook.com">outlook.com</option>
                      <option value="hotmail.com">hotmail.com</option>
                      <option value="yahoo.com">yahoo.com</option>
                      <option value="icloud.com">icloud.com</option>
                      <option value="direct">직접입력</option>
                    </select>
                    {/* 커스텀 드롭다운 화살표 */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg 
                        className="w-4 h-4 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                {formData.email_domain === 'direct' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={formData.email_domain === 'direct' ? '' : formData.email_domain}
                      onChange={(e) => handleEmailChange('email_domain', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none ${
                        validationErrors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-gray-400'
                      }`}
                      placeholder="도메인을 직접 입력하세요 (예: company.com)"
                    />
                  </div>
                )}
                {formData.email && (
                  <p className="text-xs text-gray-500 mt-1">완성된 이메일: {formData.email}</p>
                )}
                {validationErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                )}
                {formData.email && !validationErrors.email && formData.email.length > 0 && (
                  <p className="text-green-600 text-xs mt-1">✓ 올바른 이메일 형식입니다</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                  휴대폰 번호(필수 - 숫자만 입력)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-md text-sm focus:outline-none ${
                    validationErrors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-gray-400'
                  }`}
                  placeholder="01012345678 (숫자만 입력)"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                )}
                {formData.phone && !validationErrors.phone && formData.phone.length >= 10 && (
                  <p className="text-green-600 text-xs mt-1">✓ 올바른 휴대폰 번호입니다</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                거주 지역
              </label>
              <div className="flex flex-wrap gap-4">
                {['서울', '경기', '지방', '해외'].map((region) => (
                  <label key={region} className="flex items-center">
                    <input 
                      type="radio" 
                      name="region" 
                      value={region} 
                      checked={formData.region === region}
                      onChange={(e) => handleRadioChange('region', e.target.value)}
                      className="mr-2" 
                    />
                    <span className="text-sm text-gray-700">{region}</span>
                  </label>
                ))}
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="region" 
                    value="기타" 
                    checked={formData.region === '기타'}
                    onChange={(e) => handleRadioChange('region', e.target.value)}
                    className="mr-2" 
                  />
                  <span className="text-sm text-gray-700 mr-2">기타:</span>
                  <input
                    type="text"
                    value={formData.region_other}
                    onChange={(e) => handleInputChange('region_other', e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm min-w-[80px] flex-1 max-w-[120px]"
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
                      <input 
                        type="checkbox" 
                        name="communication" 
                        value={tool} 
                        checked={formData.communication.includes(tool)}
                        onChange={(e) => handleCheckboxChange('communication', tool, e.target.checked)}
                        className="mr-2" 
                      />
                      <span className="text-sm text-gray-700">{tool}</span>
                    </label>
                  ))}
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="communication" 
                      value="기타" 
                      checked={formData.communication.includes('기타')}
                      onChange={(e) => handleCheckboxChange('communication', '기타', e.target.checked)}
                      className="mr-2" 
                    />
                    <span className="text-sm text-gray-700 mr-2">기타:</span>
                    <input
                      type="text"
                      value={formData.communication_other}
                      onChange={(e) => handleInputChange('communication_other', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-sm min-w-[80px] flex-1 max-w-[120px]"
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
                    <input 
                      type="radio" 
                      name="career_years" 
                      value={experience} 
                      checked={formData.career_years === experience}
                      onChange={(e) => handleRadioChange('career_years', e.target.value)}
                      className="mr-3" 
                    />
                    <span className="text-sm text-gray-700">{experience}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* 업무 형태 */}
            <div className="mt-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-tight">
                선호하는 업무 형태
              </label>
              <div className="flex flex-wrap gap-4">
                {['프리랜서', '단기 알바', '정규직', '계약직'].map((type) => (
                  <label key={type} className="flex items-center py-1">
                    <input 
                      type="radio" 
                      name="work_type" 
                      value={type} 
                      checked={formData.work_type === type}
                      onChange={(e) => handleRadioChange('work_type', e.target.value)}
                      className="mr-3" 
                    />
                    <span className="text-sm text-gray-700">{type}</span>
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
                      <input 
                        type="checkbox" 
                        name="preferred_roles" 
                        value={role} 
                        checked={formData.preferred_roles.includes(role)}
                        onChange={(e) => handleCheckboxChange('preferred_roles', role, e.target.checked)}
                        className="mr-3" 
                      />
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
                      <input 
                        type="checkbox" 
                        name="preferred_industries" 
                        value={industry} 
                        checked={formData.preferred_industries.includes(industry)}
                        onChange={(e) => handleCheckboxChange('preferred_industries', industry, e.target.checked)}
                        className="mr-3" 
                      />
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
                  <input 
                    type="checkbox" 
                    name="interests" 
                    value={field} 
                    checked={formData.interests.includes(field)}
                    onChange={(e) => handleCheckboxChange('interests', field, e.target.checked)}
                    className="mr-3" 
                  />
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
                value={formData.tech_stack}
                onChange={(e) => handleInputChange('tech_stack', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                placeholder="예시: Python, React, Docker, Figma"
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
                        <input 
                          type="radio" 
                          name={skill.name} 
                          value={level} 
                          checked={formData[skill.name as keyof typeof formData] === level}
                          onChange={(e) => handleRadioChange(skill.name, e.target.value)}
                          className="mr-2" 
                        />
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
                      <input 
                        type="radio" 
                        name="pm_level" 
                        value={level} 
                        checked={formData.pm_level === level}
                        onChange={(e) => handleRadioChange('pm_level', e.target.value)}
                        className="mr-2" 
                      />
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
                            <input 
                              type="radio" 
                              name={language.name} 
                              value={level} 
                              checked={formData[language.name as keyof typeof formData] === level}
                              onChange={(e) => handleRadioChange(language.name, e.target.value)}
                              className="mr-2" 
                            />
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
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                  rows={3}
                  placeholder="예시: 정보처리기사, AWS 자격증 등"
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
                      <input 
                        type="radio" 
                        name="education_level" 
                        value={education} 
                        checked={formData.education_level === education}
                        onChange={(e) => handleRadioChange('education_level', e.target.value)}
                        className="mr-2" 
                      />
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
                  value={formData.education_major}
                  onChange={(e) => handleInputChange('education_major', e.target.value)}
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
                      <input 
                        type="checkbox" 
                        name="available_days" 
                        value={day} 
                        checked={formData.available_days.includes(day)}
                        onChange={(e) => handleCheckboxChange('available_days', day, e.target.checked)}
                        className="mr-2" 
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  {['주중만 가능', '주말만 가능', '상관 없음'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="day_preference" 
                        value={option} 
                        checked={formData.day_preference.includes(option)}
                        onChange={(e) => handleCheckboxChange('day_preference', option, e.target.checked)}
                        className="mr-2" 
                      />
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
                      <input 
                        type="checkbox" 
                        name="available_times" 
                        value={time} 
                        checked={formData.available_times.includes(time)}
                        onChange={(e) => handleCheckboxChange('available_times', time, e.target.checked)}
                        className="mr-2" 
                      />
                      <span className="text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    value={formData.available_times_custom}
                    onChange={(e) => handleInputChange('available_times_custom', e.target.value)}
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
                      <input 
                        type="radio" 
                        name="max_duration" 
                        value={period} 
                        checked={formData.max_duration === period}
                        onChange={(e) => handleRadioChange('max_duration', e.target.value)}
                        className="mr-2" 
                      />
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
                      <input 
                        type="checkbox" 
                        name="work_environment" 
                        value={env} 
                        checked={formData.work_environment.includes(env)}
                        onChange={(e) => handleCheckboxChange('work_environment', env, e.target.checked)}
                        className="mr-2" 
                      />
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
                      <input 
                        type="radio" 
                        name="availability_status" 
                        value={status} 
                        checked={formData.availability_status === status}
                        onChange={(e) => handleRadioChange('availability_status', e.target.value)}
                        className="mr-2" 
                      />
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
                      <input 
                        type="checkbox" 
                        name="contact_hours" 
                        value={time} 
                        checked={formData.contact_hours.includes(time)}
                        onChange={(e) => handleCheckboxChange('contact_hours', time, e.target.checked)}
                        className="mr-2" 
                      />
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
                  <input 
                    type="checkbox" 
                    name="work_style" 
                    value={style} 
                    checked={formData.work_style.includes(style)}
                    onChange={(e) => handleCheckboxChange('work_style', style, e.target.checked)}
                    className="mr-3" 
                  />
                  <span className="text-sm text-gray-700">{style}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                기타 설명 (선택)
              </label>
              <textarea
                value={formData.work_style_other}
                onChange={(e) => handleInputChange('work_style_other', e.target.value)}
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
                지원 동기나 각오 (필수)
              </label>
              <textarea
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:border-gray-400 focus:outline-none"
                rows={4}
                placeholder="테라퓨처 프로젝트에 참여하고 싶은 이유나 각오를 자유롭게 작성해주세요"
                required
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-none bg-black text-white py-4 px-8 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '등록 중...' : '등록 완료'}
            </button>
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