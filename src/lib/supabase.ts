import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 클라이언트용 (브라우저)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 서버용 (SERVICE_ROLE_KEY가 있을 때만)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase

// 타입 정의
export interface TalentData {
  // 시스템 필드
  id?: string
  created_at?: string
  updated_at?: string
  
  // 기본 정보 (필수)
  nickname?: string
  name: string
  phone: string
  email: string
  region?: string
  region_other?: string
  
  // 커뮤니케이션
  communication?: string[]
  communication_other?: string
  
  // 경력 정보
  career_years?: string
  
  // 희망 역할/포지션
  preferred_roles?: string[]
  preferred_industries?: string[]
  
  // 관심 분야
  interests?: string[]
  
  // 기술 스택
  tech_stack?: string
  
  // 기술 숙련도
  ai_level?: string
  web_level?: string
  design_level?: string
  pm_level?: string
  
  // 언어 능력
  english_level?: string
  japanese_level?: string
  chinese_level?: string
  
  // 자격증
  certifications?: string
  
  // 학력
  education_level?: string
  education_major?: string
  
  // 프로젝트 참여 조건
  available_days?: string[]
  day_preference?: string[]
  available_times?: string[]
  available_times_custom?: string
  max_duration?: string
  work_environment?: string[]
  
  // 가용성
  availability_status?: string
  contact_hours?: string[]
  
  // 작업 스타일
  work_style?: string[]
  work_style_other?: string
  
  // 지원 동기 (필수)
  motivation: string
} 