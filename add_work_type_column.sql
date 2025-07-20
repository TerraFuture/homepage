-- 업무 형태 컬럼 추가
-- 기존 talents 테이블에 work_type 컬럼 추가

ALTER TABLE talents ADD COLUMN work_type VARCHAR(20);

-- 기본값 설정 (선택사항)
UPDATE talents SET work_type = '프리랜서' WHERE work_type IS NULL;

-- 코멘트 추가
COMMENT ON COLUMN talents.work_type IS '선호하는 업무 형태 (프리랜서, 단기 알바, 정규직, 계약직)';

-- 인덱스 추가 (검색 성능 향상)
CREATE INDEX idx_talents_work_type ON talents(work_type); 