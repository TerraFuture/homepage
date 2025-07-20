# 📊 TerraFuture DB 스키마 마이그레이션 가이드

## 🎯 개요
등록 폼이 확장되면서 기존 `talents` 테이블의 스키마를 업데이트해야 합니다.

## 🔍 변경사항 요약

### 추가된 필드들
- **기본 정보**: `nickname`, `region`, `region_other`
- **커뮤니케이션**: `communication`, `communication_other`  
- **관심 분야**: `interests`
- **기술**: `tech_stack`, `ai_level`, `web_level`, `design_level`, `pm_level`
- **언어**: `english_level`, `japanese_level`, `chinese_level`
- **자격증**: `certifications` (구조 변경: 배열 → 텍스트)
- **학력**: `education_level`, `education_major` (구조 변경: 객체 → 개별 필드)
- **참여 조건**: `available_days`, `day_preference`, `available_times`, `available_times_custom`, `max_duration`, `work_environment`
- **가용성**: `availability_status`, `contact_hours`
- **작업 스타일**: `work_style`, `work_style_other`
- **지원 동기**: `motivation` (필수)

### 제거된 필드들
- `availability` → `availability_status`로 대체
- `language_skills` → 개별 언어 필드로 분리

## 🚀 마이그레이션 방법

### Option 1: Supabase Dashboard 사용 (권장)

1. **Supabase Dashboard 접속**
   ```
   https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]
   ```

2. **SQL Editor 열기**
   - 좌측 메뉴에서 "SQL Editor" 클릭

3. **마이그레이션 SQL 실행**
   - `database_migration.sql` 파일의 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

### Option 2: 점진적 마이그레이션 (데이터 보존)

기존 데이터가 있다면 다음 단계로 진행:

```sql
-- 1. 기존 데이터 백업
CREATE TABLE talents_backup AS SELECT * FROM talents;

-- 2. 새 컬럼들 추가
ALTER TABLE talents ADD COLUMN nickname VARCHAR(100);
ALTER TABLE talents ADD COLUMN region VARCHAR(50);
ALTER TABLE talents ADD COLUMN region_other VARCHAR(100);
ALTER TABLE talents ADD COLUMN communication TEXT[];
ALTER TABLE talents ADD COLUMN communication_other VARCHAR(100);
ALTER TABLE talents ADD COLUMN interests TEXT[];
ALTER TABLE talents ADD COLUMN tech_stack TEXT;
ALTER TABLE talents ADD COLUMN ai_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN web_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN design_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN pm_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN english_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN japanese_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN chinese_level VARCHAR(20);
ALTER TABLE talents ADD COLUMN education_level VARCHAR(50);
ALTER TABLE talents ADD COLUMN education_major VARCHAR(100);
ALTER TABLE talents ADD COLUMN available_days TEXT[];
ALTER TABLE talents ADD COLUMN day_preference TEXT[];
ALTER TABLE talents ADD COLUMN available_times TEXT[];
ALTER TABLE talents ADD COLUMN available_times_custom VARCHAR(200);
ALTER TABLE talents ADD COLUMN max_duration VARCHAR(50);
ALTER TABLE talents ADD COLUMN work_environment TEXT[];
ALTER TABLE talents ADD COLUMN availability_status VARCHAR(50);
ALTER TABLE talents ADD COLUMN contact_hours TEXT[];
ALTER TABLE talents ADD COLUMN work_style TEXT[];
ALTER TABLE talents ADD COLUMN work_style_other TEXT;
ALTER TABLE talents ADD COLUMN motivation TEXT;

-- 3. 필수 제약조건 추가
ALTER TABLE talents ALTER COLUMN email SET NOT NULL;
ALTER TABLE talents ALTER COLUMN motivation SET NOT NULL;

-- 4. 기존 데이터 마이그레이션 (필요시)
UPDATE talents SET 
  availability_status = availability,
  motivation = '기존 등록자'
WHERE motivation IS NULL;

-- 5. 구형 컬럼 제거 (선택사항)
ALTER TABLE talents DROP COLUMN availability;
ALTER TABLE talents DROP COLUMN language_skills;
ALTER TABLE talents DROP COLUMN education;
```

## 🔧 환경변수 확인

다음 환경변수들이 `.env.local`에 설정되어 있는지 확인:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🧪 테스트 방법

1. **등록 테스트**
   ```bash
   cd homepage
   npm run dev
   ```
   - `http://localhost:3000/register` 접속
   - 폼 작성 후 제출
   - 에러 없이 완료되는지 확인

2. **데이터 확인**
   - Supabase Dashboard > Table Editor > talents
   - 새로 등록된 데이터가 모든 필드와 함께 저장되었는지 확인

## ⚠️ 주의사항

- **기존 데이터 백업**: 마이그레이션 전 반드시 백업
- **RLS 정책**: 보안 정책이 올바르게 설정되었는지 확인
- **인덱스**: 성능 최적화를 위한 인덱스 생성
- **타입 안전성**: TypeScript 타입 정의 업데이트 완료

## 🔄 롤백 방법

문제 발생시 다음으로 롤백:

```sql
-- 백업에서 복원
DROP TABLE talents;
ALTER TABLE talents_backup RENAME TO talents;
```

## 📞 지원

마이그레이션 중 문제가 발생하면:
1. Supabase Dashboard의 로그 확인
2. 브라우저 개발자 도구 콘솔 확인
3. API 응답 에러 메시지 확인

---

**✅ 마이그레이션 완료 후 등록 시스템이 정상 작동할 것입니다!** 