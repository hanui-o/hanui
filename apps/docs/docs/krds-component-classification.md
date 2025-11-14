# KRDS 컴포넌트 분류 체계

KRDS(Korean Design System)에서 정의한 공식 컴포넌트 분류 체계입니다.

## 1. 컴포넌트 소개 (Component Summary)

전체 컴포넌트에 대한 개요 및 소개

## 2. 아이덴티티 (Identity)

정부/공공기관의 공식 아이덴티티를 표현하는 컴포넌트

- **공식 배너 (Masthead)** - 정부 공식 사이트임을 나타내는 배너
- **운영기관 식별자 (Identifier)** - 운영 기관 정보 표시
- **헤더 (Header)** - 사이트 상단 헤더
- **푸터 (Footer)** - 사이트 하단 푸터

## 3. 탐색 (Navigation)

사용자가 콘텐츠를 탐색하고 이동하는 데 사용하는 컴포넌트

- **건너뛰기 링크 (Skip link)** - 접근성을 위한 콘텐츠 바로가기 링크
- **메인 메뉴 (Main menu)** - 주요 네비게이션 메뉴
- **브레드크럼 (Breadcrumb)** - 현재 페이지 위치 경로 표시
- **사이드 메뉴 (Side navigation)** - 측면 네비게이션
- **콘텐츠 내 탐색 (In-page navigation)** - 페이지 내부 섹션 이동
- **페이지네이션 (Pagination)** - 페이지 번호 매김
- **탭바 (Tab bars)** - 탭 네비게이션 바

## 4. 레이아웃 및 표현 (Layout & Presentation)

콘텐츠를 구조화하고 표현하는 컴포넌트

- **구조화 목록 (Structured list)** - 체계적으로 정리된 목록
- **긴급 공지 (Critical alerts)** - 긴급한 알림 메시지
- **달력 (Calendar)** - 날짜 선택 및 표시
- **디스클로저 (Disclosure)** - 접고 펼치기 가능한 콘텐츠
- **모달 (Modal)** - 오버레이 대화상자
- **배지 (Badge)** - 상태나 개수를 나타내는 작은 표시
- **아코디언 (Accordion)** - 접고 펼치는 콘텐츠 패널
- **이미지 (Image)** - 이미지 표시
- **캐러셀 (Carousel)** - 슬라이드 형태의 콘텐츠
- **탭 (Tab)** - 탭 패널
- **표 (Table)** - 데이터 테이블
- **스플래시 스크린 (Splash screen)** - 초기 로딩 화면
- **텍스트 목록 (Text list)** - 텍스트 기반 목록

## 5. 액션 (Action)

사용자 행동을 유도하는 상호작용 컴포넌트

- **링크 (Link)** - 하이퍼링크
- **버튼 (Button)** - 클릭 가능한 버튼

## 6. 선택 (Selection)

사용자가 옵션을 선택하는 데 사용하는 입력 컴포넌트

- **라디오 버튼 (Radio button)** - 단일 선택 버튼
- **체크박스 (Checkbox)** - 다중 선택 박스
- **셀렉트 (Select)** - 드롭다운 선택
- **태그 (Tag)** - 선택 가능한 태그
- **토글 스위치 (Toggle switch)** - 켜기/끄기 스위치

## 7. 피드백 (Feedback)

시스템 상태나 진행 상황을 사용자에게 알리는 컴포넌트

- **단계 표시기 (Step indicator)** - 진행 단계 표시
- **스피너 (Spinner)** - 로딩 인디케이터

## 8. 도움 (Help)

사용자에게 도움말과 가이드를 제공하는 컴포넌트

- **도움 패널 (Help panel)** - 도움말 패널
- **따라하기 패널 (Tutorial panel)** - 튜토리얼 패널
- **맥락적 도움말 (Contextual help)** - 문맥에 맞는 도움말
- **코치마크 (Coach mark)** - 기능 안내 마크
- **툴팁 (Tooltip)** - 짧은 설명 툴팁

## 9. 입력 (Input)

사용자로부터 데이터를 입력받는 폼 컴포넌트

- **날짜 입력 필드 (Date input)** - 날짜 입력
- **텍스트 영역 (Textarea)** - 여러 줄 텍스트 입력
- **텍스트 입력 필드 (Text input)** - 한 줄 텍스트 입력
- **파일 업로드 (File upload)** - 파일 업로드

## 10. 설정 (Settings)

사용자 환경 설정 관련 컴포넌트

- **언어 변경 (Language switcher)** - 언어 전환
- **화면 크기 조정 (Resize)** - 화면 크기 조절

## 11. 콘텐츠 (Content)

특수한 콘텐츠 표시 및 접근성 관련 컴포넌트

- **접근 가능한 미디어 (Accessible multimedia)** - 접근 가능한 멀티미디어
- **숨긴 콘텐츠 (Visually hidden)** - 시각적으로 숨겨진 콘텐츠 (스크린 리더용)

---

## HANUI 구현 현황

### 구현 완료

- ✅ Button (액션)
- ✅ Input (입력)
- ✅ Label (입력)
- ✅ Select (선택)
- ✅ Card (레이아웃)
- ✅ Table (레이아웃)
- ✅ Modal (레이아웃)
- ✅ Masthead (아이덴티티)
- ✅ Identifier (아이덴티티)
- ✅ SkipLink (탐색)
- ✅ Breadcrumb (탐색)
- ✅ Pagination (탐색)
- ✅ File Upload (입력)
- ✅ Tooltip (도움)
- ✅ Tabs (레이아웃)
- ✅ Accordion (레이아웃)

### 구현 예정

- 🔲 Header (아이덴티티)
- 🔲 Footer (아이덴티티)
- 🔲 Main menu (탐색)
- 🔲 Side navigation (탐색)
- 🔲 In-page navigation (탐색)
- 🔲 Tab bars (탐색)
- 🔲 Badge (레이아웃)
- 🔲 Disclosure (레이아웃)
- 🔲 Carousel (레이아웃)
- 🔲 Critical alerts (레이아웃)
- 🔲 Calendar (레이아웃)
- 🔲 Structured list (레이아웃)
- 🔲 Radio button (선택)
- 🔲 Checkbox (선택)
- 🔲 Tag (선택)
- 🔲 Toggle switch (선택)
- 🔲 Step indicator (피드백)
- 🔲 Spinner (피드백)
- 🔲 Link (액션)
- 🔲 Textarea (입력)
- 🔲 Date input (입력)

## 참고 자료

- [KRDS 공식 웹사이트](https://www.design.go.kr)
- [KRDS 컴포넌트 가이드](https://uiux.egovframe.go.kr/guide/component/component_summary.html)
