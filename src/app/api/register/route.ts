import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // 필수 필드 검증
    if (!data.nickname || data.nickname.trim() === '' || 
        !data.name || !data.phone || 
        !data.email || data.email.trim() === '' ||
        !data.motivation || data.motivation.trim() === '') {
      return NextResponse.json(
        { error: '닉네임, 실명, 이메일, 휴대폰 번호, 지원 동기는 필수입니다.' },
        { status: 400 }
      )
    }

    // 휴대폰 번호 형식 검증 (한국 휴대폰 번호 체계)
    const phoneRegex = /^010[0-9]{8}$|^01[1-9][0-9]{7,8}$/
    if (!phoneRegex.test(data.phone)) {
      return NextResponse.json(
        { error: '올바른 한국 휴대폰 번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증 (필수)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 휴대폰 번호 중복 체크
    const { data: existingTalent } = await supabaseAdmin
      .from('talents')
      .select('id')
      .eq('phone', data.phone)
      .single()

    if (existingTalent) {
      return NextResponse.json(
        { error: '이미 등록된 휴대폰 번호입니다.' },
        { status: 400 }
      )
    }

    // 데이터 정리
    const talentData = {
      // 기본 정보
      nickname: data.nickname?.trim() || null,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      region: data.region?.trim() || null,
      region_other: data.region_other?.trim() || null,
      
      // 커뮤니케이션
      communication: data.communication || [],
      communication_other: data.communication_other?.trim() || null,
      
      // 경력 정보
      career_years: data.career_years || null,
      
      // 희망 역할/포지션
      preferred_roles: data.preferred_roles || [],
      preferred_industries: data.preferred_industries || [],
      
      // 관심 분야
      interests: data.interests || [],
      
      // 기술 스택
      tech_stack: data.tech_stack?.trim() || null,
      
      // 기술 숙련도
      ai_level: data.ai_level || null,
      web_level: data.web_level || null,
      design_level: data.design_level || null,
      pm_level: data.pm_level || null,
      
      // 언어 능력
      english_level: data.english_level || null,
      japanese_level: data.japanese_level || null,
      chinese_level: data.chinese_level || null,
      
      // 자격증
      certifications: data.certifications?.trim() || null,
      
      // 학력
      education_level: data.education_level || null,
      education_major: data.education_major?.trim() || null,
      
      // 프로젝트 참여 조건
      available_days: data.available_days || [],
      day_preference: data.day_preference || [],
      available_times: data.available_times || [],
      available_times_custom: data.available_times_custom?.trim() || null,
      max_duration: data.max_duration || null,
      work_environment: data.work_environment || [],
      
      // 가용성
      availability_status: data.availability_status || null,
      contact_hours: data.contact_hours || [],
      
      // 작업 스타일
      work_style: data.work_style || [],
      work_style_other: data.work_style_other?.trim() || null,
      
      // 지원 동기
      motivation: data.motivation?.trim() || null
    }

    // Supabase에 저장
    const { data: savedTalent, error: dbError } = await supabaseAdmin
      .from('talents')
      .insert(talentData)
      .select()
      .single()

    if (dbError) {
      console.error('DB 저장 오류:', dbError)
      return NextResponse.json(
        { error: '등록 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // SMS 전송
    try {
      await sendSMS(data.phone, data.name)
    } catch (smsError) {
      console.error('SMS 전송 실패:', smsError)
      // SMS 실패해도 등록은 성공으로 처리
    }

    return NextResponse.json({
      success: true,
      message: '등록이 완료되었습니다.',
      data: savedTalent
    })

  } catch (error) {
    console.error('등록 API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// SMS 전송 함수 (닷홈 서버 경유)
async function sendSMS(phone: string, name: string) {
  const smsApiUrl = process.env.SMS_API_URL || 'http://shaunkim.me/sms/api/send_talent_sms.php';

  const message = `[테라퓨처 인재등록 완료]
새소식은 카톡으로 공지예정
terrafuture.co.kr`

  // 닷홈 SMS API 호출 (등록자에게 직접 발송)
  const response = await fetch(smsApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      message: message,
      type: 'talent_registration' // 등록 완료 SMS임을 표시
    })
  })

  if (!response.ok) {
    throw new Error(`SMS API 오류: ${response.status}`)
  }

  const result = await response.json()
  if (!result.success) {
    throw new Error(`SMS 전송 실패: ${result.error}`)
  }

  return result
} 