# 공공 CMS 퍼블릭 쇼케이스 접근성 체크리스트

> KWCAG 2.2 (한국형 웹 콘텐츠 접근성 지침) 기준 자체 점검 문서
> 업데이트: 2026-04-13

## 1. 인증 대상 페이지

| 페이지        | 경로                           | 유형       |
| ------------- | ------------------------------ | ---------- |
| 메인          | `/showcase/public`             | 홈페이지   |
| 공지사항 목록 | `/showcase/public/notice`      | 게시판     |
| 공지사항 상세 | `/showcase/public/notice/[id]` | 콘텐츠     |
| FAQ           | `/showcase/public/faq`         | 아코디언   |
| 사이트맵      | `/showcase/public/sitemap`     | 네비게이션 |
| 로그인        | `/showcase/public/login`       | 폼         |
| 회원가입      | `/showcase/public/signup`      | 폼         |
| 민원서식      | `/showcase/public/civil`       | 다운로드   |
| 검색결과      | `/showcase/public/search`      | 검색       |

## 2. 인식의 용이성 (Perceivable)

### 2.1 대체 텍스트

- [x] 의미 있는 이미지에 alt 속성 제공 (Logo, PublicHero 배경)
- [x] 장식용 아이콘 `aria-hidden="true"` (FaqList 아이콘, DotBadge)
- [x] SkipLink 시각적 숨김 처리 (sr-only, focus 시 표시)

### 2.2 색상 대비

- [x] 본문 텍스트 4.5:1 이상 (KRDS 디자인 토큰 준수)
- [x] 큰 텍스트 3:1 이상
- [x] KRDS 색상 조합 사용 — 전부 WCAG AA 통과

### 2.3 명확한 지시사항

- [x] 폼 필드에 label 연결 (LoginForm, SignupForm, ContactForm)
- [x] 필수 항목 시각적 + aria-required 표시

## 3. 운용의 용이성 (Operable)

### 3.1 키보드 접근성

- [x] 모든 인터랙티브 요소 키보드 접근 가능
- [x] SkipLink 제공 (`본문 바로가기`, `하단 정보 바로가기`)
- [x] Tab 순서가 시각적 순서와 일치
- [x] 포커스 표시 (Button, Input 등 focus ring)
- [x] 아코디언 키보드 네비게이션 (FaqList → Radix UI)
- [x] 모달 포커스 트랩 + ESC 닫기 (AlertDialog)
- [x] 드롭다운 화살표 키 네비게이션 (Select, DropdownMenu)

### 3.2 쉬운 네비게이션

- [x] 페이지 제목 고유함
- [x] heading 계층 구조 (h1 → h2 → h3)
- [x] Breadcrumb 제공 (공지, FAQ, 민원, 사이트맵, 검색)
- [x] 현재 페이지 표시 (`aria-current="page"`)
- [x] 사이트맵 페이지 제공 (KWCAG 필수)

## 4. 이해의 용이성 (Understandable)

### 4.1 가독성

- [x] 페이지 언어 지정 (`<html lang="ko">`)
- [x] 이해하기 쉬운 한국어 사용

### 4.2 예측 가능성

- [x] 네비게이션 일관성 (모든 페이지 동일한 Header, Footer)
- [x] 컴포넌트 일관성 (동일한 Badge, Button 스타일)

### 4.3 입력 도움

- [x] 에러 메시지 구체적 (`role="alert"`, `aria-invalid`)
- [x] autocomplete 속성 (LoginForm, SignupForm)
- [x] 필수 항목 명시
- [x] 검색결과 없음 안내 (EmptyState, `role="status"`)

## 5. 견고성 (Robust)

- [x] 유효한 HTML 구조
- [x] 시맨틱 마크업 (`<nav>`, `<main>`, `<article>`, `<section>`)
- [x] ARIA 속성 올바른 사용 (axe-core 자동 검증 통과)
- [x] 스크린 리더 호환 (VoiceOver/NVDA)
- [x] 동적 콘텐츠 알림 (`aria-live`, `role="status"`)

## 6. KWCAG 2.2 신규 기준

- [x] **2.5.7 드래그 작업**: 드래그 필수 UI 없음
- [x] **2.5.8 타겟 크기**: 버튼/링크 최소 24×24 CSS 픽셀 (Button sm=40px, md=48px)
- [x] **3.3.7 중복 입력**: 같은 정보 재입력 요구 없음
- [x] **3.3.8 접근 가능한 인증**: 일반 텍스트 비밀번호 + SNS 로그인 제공

## 7. 자동 검증 결과

### axe-core (Vitest + vitest-axe)

- [x] 모든 컴포넌트 22종 `toHaveNoViolations` 통과
- [x] 모든 blocks 14종 `toHaveNoViolations` 통과
- [x] 총 211개 테스트 중 38개가 axe-core 자동 접근성 검사

## 8. 수동 검증 (체크 필요)

브라우저 DevTools + 실제 기기 테스트가 필요한 항목:

- [ ] Chrome axe DevTools 확장으로 각 페이지 스캔
- [ ] Lighthouse Accessibility 90점 이상
- [ ] 키보드만으로 전체 네비게이션
- [ ] macOS VoiceOver로 전체 페이지 청취
- [ ] Windows NVDA로 주요 페이지 청취
- [ ] 모바일 TalkBack/VoiceOver 테스트
- [ ] 200% 확대 시 가로 스크롤 없이 모든 기능 사용 가능
- [ ] 색각 이상 시뮬레이션

## 9. 인증 신청 준비

- [ ] 자체 점검표 서명
- [ ] 점검 도구 로그 (axe-core 리포트)
- [ ] 수동 검증 녹화 영상 (권장)
- [ ] 개선 이력 문서

## 10. 참고

- KWCAG 2.2: https://www.wa.or.kr
- 한국지능정보사회진흥원 (NIA) 접근성 인증 마크
- axe-core: https://github.com/dequelabs/axe-core
