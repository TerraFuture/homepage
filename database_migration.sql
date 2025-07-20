-- TerraFuture 인재 등록 테이블 스키마 업데이트
-- 기존 talents 테이블을 새로운 구조로 마이그레이션

-- 1. 기존 테이블 백업 (선택사항)
-- CREATE TABLE talents_backup AS SELECT * FROM talents;

-- 2. 기존 테이블 삭제 후 재생성 (또는 ALTER TABLE로 점진적 수정 가능)
DROP TABLE IF EXISTS talents;

-- 3. 새로운 테이블 생성
CREATE TABLE talents (
  -- 시스템 필드
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 기본 정보 (필수)
  nickname VARCHAR(100),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  region VARCHAR(50),
  region_other VARCHAR(100),
  
  -- 커뮤니케이션
  communication TEXT[], -- 배열: ['카카오톡', '이메일' 등]
  communication_other VARCHAR(100),
  
  -- 경력 정보
  career_years VARCHAR(50), -- '5-10년' 형태
  
  -- 업무 형태
  work_type VARCHAR(20), -- '프리랜서', '단기 알바', '정규직', '계약직'
  
  -- 희망 역할/포지션
  preferred_roles TEXT[], -- 배열: ['프론트엔드 개발자', 'AI/ML 엔지니어' 등]
  preferred_industries TEXT[], -- 배열: ['핀테크/금융', '헬스케어/의료' 등]
  
  -- 관심 분야
  interests TEXT[], -- 배열: ['AI 응용 프로그램 개발', '웹 프론트엔드 개발' 등]
  
  -- 기술 스택
  tech_stack TEXT, -- 쉼표로 구분된 기술 목록
  
  -- 기술 숙련도
  ai_level VARCHAR(20), -- '없음', '입문', '중급', '고급'
  web_level VARCHAR(20),
  design_level VARCHAR(20),
  pm_level VARCHAR(20), -- '불가능', '보조 가능', '가능'
  
  -- 언어 능력
  english_level VARCHAR(20), -- '없음', '초급', '중급', '고급', '원어민'
  japanese_level VARCHAR(20),
  chinese_level VARCHAR(20),
  
  -- 자격증
  certifications TEXT, -- 텍스트 형태로 저장
  
  -- 학력
  education_level VARCHAR(50), -- '고등학교 졸업', '대학교 졸업' 등
  education_major VARCHAR(100), -- 전공 분야
  
  -- 프로젝트 참여 조건
  available_days TEXT[], -- 배열: ['월', '화', '수' 등]
  day_preference TEXT[], -- 배열: ['주중만 가능', '주말만 가능' 등]
  available_times TEXT[], -- 배열: ['오전 (9시~12시)' 등]
  available_times_custom VARCHAR(200), -- 직접 입력 시간대
  max_duration VARCHAR(50), -- '1주 이내', '상시 가능' 등
  work_environment TEXT[], -- 배열: ['본인 노트북/PC' 등]
  
  -- 가용성
  availability_status VARCHAR(50), -- '즉시 가능', '1주 후 가능' 등
  contact_hours TEXT[], -- 배열: ['오전 (9시~12시)' 등]
  
  -- 작업 스타일
  work_style TEXT[], -- 배열: ['지시가 명확한 업무를 선호' 등]
  work_style_other TEXT, -- 기타 작업 스타일 설명
  
  -- 지원 동기 (필수)
  motivation TEXT NOT NULL
);

-- 4. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_talents_phone ON talents(phone);
CREATE INDEX idx_talents_email ON talents(email);
CREATE INDEX idx_talents_created_at ON talents(created_at);
CREATE INDEX idx_talents_career_years ON talents(career_years);
CREATE INDEX idx_talents_work_type ON talents(work_type);
CREATE INDEX idx_talents_availability_status ON talents(availability_status);

-- 5. RLS (Row Level Security) 설정
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;

-- 6. 정책 생성 (모든 사용자가 INSERT 가능, 관리자만 SELECT/UPDATE/DELETE)
CREATE POLICY "Anyone can insert talents" ON talents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view talents" ON talents
  FOR SELECT USING (auth.role() = 'authenticated');

-- 7. updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_talents_updated_at 
  BEFORE UPDATE ON talents 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 8. 코멘트 추가
COMMENT ON TABLE talents IS 'TerraFuture 인재 등록 정보';
COMMENT ON COLUMN talents.nickname IS '프로젝트용 닉네임';
COMMENT ON COLUMN talents.name IS '실명 (비공개)';
COMMENT ON COLUMN talents.phone IS '휴대폰 번호 (비공개, 고유값)';
COMMENT ON COLUMN talents.email IS '이메일 주소 (비공개)';
COMMENT ON COLUMN talents.work_type IS '선호하는 업무 형태 (프리랜서, 단기 알바, 정규직, 계약직)';
COMMENT ON COLUMN talents.motivation IS '지원 동기 및 각오'; 