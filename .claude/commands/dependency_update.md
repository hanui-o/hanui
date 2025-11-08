# Dependency Update and Analysis Command

## Overview
이 명령어는 프로젝트의 루트, 백엔드, 프론트엔드 의존성을 체계적으로 분석하고 최적화합니다.

## Command Usage
```
dependency update
```

## Task Description

당신은 RealWorld 프로젝트의 의존성 관리 전문가입니다. 다음 단계에 따라 전체 프로젝트의 의존성을 분석하고 최적화하세요.

### 1. 현재 상태 분석

**루트 package.json 분석:**
- `/package.json` 파일을 읽고 현재 의존성 목록 확인
- 각 의존성이 실제로 루트 레벨에서 사용되는지 확인
- husky, lint-staged 등 개발 도구의 적절한 배치 확인

**백엔드 의존성 분석:**
- `/backend/go.mod` 파일을 읽고 Go 모듈 의존성 확인
- 사용되지 않는 모듈이나 버전 충돌 확인
- `go mod tidy` 실행으로 정리 필요성 확인

**프론트엔드 package.json 분석:**
- `/frontend/package.json` 파일을 읽고 현재 의존성 목록 확인
- dependencies vs devDependencies 분류의 적절성 확인
- 실제 코드에서 사용되는 패키지와 package.json의 일치성 확인

### 2. 의존성 검증

**실제 사용 여부 확인:**
- 각 패키지가 실제 코드에서 import/require되는지 검색
- `grep -r "import.*package-name" src/` 등으로 사용처 확인
- TypeScript 타입 패키지의 필요성 확인

**중복 의존성 탐지:**
- 루트와 프론트엔드 간 중복되는 패키지 확인
- 같은 기능을 하는 다른 패키지들의 중복 설치 확인
- 버전 불일치로 인한 문제 가능성 확인

**분류 오류 탐지:**
- runtime dependencies가 devDependencies에 있는 경우
- development-only 패키지가 dependencies에 있는 경우
- TypeScript 타입 패키지의 올바른 분류 확인

### 3. 최적화 제안

**제거 대상 식별:**
- 사용되지 않는 패키지 목록 작성
- 대체 가능한 더 가벼운 패키지 제안
- 내장 기능으로 대체 가능한 패키지 식별

**이동 대상 식별:**
- 잘못 분류된 패키지들의 올바른 위치 제안
- 루트에서 개별 프로젝트로 이동할 패키지들
- 공통으로 사용되어 루트로 올려야 할 패키지들

**추가 필요 패키지:**
- 코드에서 사용 중이지만 package.json에 없는 패키지
- 보안 업데이트가 필요한 패키지
- 호환성 개선을 위해 필요한 패키지

### 4. 실행 및 검증

**정리 작업 수행:**
```bash
# 백엔드 Go 모듈 정리
cd backend && go mod tidy

# 프론트엔드 불필요한 패키지 제거
cd frontend && npm uninstall [unnecessary-packages]

# 필요한 패키지 올바른 위치에 설치
npm install --save [runtime-deps]
npm install --save-dev [dev-deps]

# 루트 레벨 정리
cd .. && npm uninstall [duplicated-packages]
```

**검증 테스트:**
```bash
# 백엔드 빌드 및 테스트
cd backend && go build ./... && go test ./...

# 프론트엔드 빌드 및 테스트
cd frontend && npm run test:run && npm run lint && npm run build

# 전체 프로젝트 검증
npm run test && npm run build
```

### 5. 보고서 작성

**분석 결과 요약:**
- 제거된 불필요한 의존성 목록
- 추가된 누락 의존성 목록
- 재분류된 의존성 목록
- 최적화로 인한 패키지 크기 변화

**권장사항 제시:**
- 향후 의존성 관리 가이드라인
- 정기적인 의존성 점검 일정 제안
- 보안 업데이트 모니터링 방법

### 6. 품질 검증

**최종 확인사항:**
- [ ] 모든 테스트가 통과하는가?
- [ ] 빌드가 성공하는가?
- [ ] 린트 검사가 통과하는가?
- [ ] 개발 서버가 정상 실행되는가?
- [ ] 프로덕션 빌드가 정상 동작하는가?

**성능 확인:**
- 설치 시간 개선 여부
- 번들 크기 최적화 여부
- 빌드 시간 개선 여부

## Expected Output

```markdown
# 의존성 분석 및 최적화 보고서

## 📊 현재 상태 분석
- 루트: X개 의존성 (Y개 중복, Z개 미사용)
- 백엔드: A개 Go 모듈 (B개 정리 필요)
- 프론트엔드: C개 패키지 (D개 잘못 분류, E개 미사용)

## 🔧 수행된 최적화
### 제거된 패키지
- package-name@version (이유: 미사용)

### 추가된 패키지
- package-name@version (이유: 코드에서 사용 중이지만 누락)

### 재분류된 패키지
- package-name: dependencies → devDependencies

## 📈 개선 결과
- 패키지 크기: X% 감소
- 설치 시간: Y% 단축
- 빌드 시간: Z% 개선

## ✅ 검증 완료
- [x] 모든 테스트 통과
- [x] 빌드 성공
- [x] 린트 검사 통과
```

## Important Notes

1. **안전한 변경**: 한 번에 하나씩 변경하고 테스트하여 문제 발생 시 롤백 가능하게 함
2. **버전 호환성**: 의존성 업데이트 시 다른 패키지와의 호환성 확인
3. **실제 사용 확인**: 파일 검색으로 실제 사용 여부를 정확히 확인
4. **문서화**: 변경 사유와 영향을 명확히 기록
5. **점진적 개선**: 한 번에 모든 것을 변경하지 말고 단계적으로 개선

이 명령어를 통해 프로젝트의 의존성을 최적화하고 유지보수성을 향상시킬 수 있습니다.