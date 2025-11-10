# HANUI 스타터 템플릿 - 페이지 구성안

> **"최소한이지만 실용적인" 페이지 구성**
> 작성일: 2025-01-08

---

## 🎯 템플릿 페이지 설계 원칙

### 1. 최소주의 (Minimalism)
```
목표: Phase 1 배포에 집중
- 너무 많은 페이지 = 개발 지연
- 너무 적은 페이지 = 실용성 부족

→ "바로 커스터마이징 가능한 최소 페이지"
```

### 2. 실무 반영
```
공공 프로젝트 필수 패턴만 포함
- 포털: 게시판 + 민원 + 정보 페이지
- 어드민: CRUD + 대시보드

→ "복붙 후 수정만 하면 되는 수준"
```

### 3. 컴포넌트 활용 극대화
```
9개 컴포넌트를 모두 활용한 페이지
- Button, Input, Table, Pagination, Breadcrumb
- FileUpload, Select, Card, Modal

→ "컴포넌트 사용법 학습용"
```

---

## 📱 Portal Template (Next.js) - 대국민 포털

### 페이지 구성: 총 8페이지 (+ 레이아웃)

#### 0. 공통 레이아웃
```
app/
├── layout.tsx              # Root Layout
│   ├── Header              # GNB, 검색, 로그인
│   ├── {children}          # 페이지 콘텐츠
│   └── Footer              # 사이트맵, 저작권
```

**Header (GNB)**
```tsx
- 로고
- 메뉴 (소개, 알림마당, 민원서비스, 정보공개)
- 검색창
- 로그인/회원가입 버튼
- 반응형 햄버거 메뉴 (모바일)
```

**Footer**
```tsx
- 사이트맵
- 개인정보처리방침
- 저작권 정보
- 웹 접근성 인증 마크
```

---

#### 1. 메인 페이지 (/)
```
목적: 포털 랜딩 페이지
경로: app/page.tsx

섹션:
├─ Hero Section
│  ├─ 기관명/슬로건
│  ├─ 주요 서비스 바로가기 (Card 4개)
│  └─ 검색창
│
├─ 주요 공지사항 (Table 미리보기, 3건)
│  └─ "더보기" 버튼
│
├─ 주요 서비스 소개 (Card Grid)
│  ├─ 민원 신청
│  ├─ 정보 공개
│  ├─ 알림마당
│  └─ 자료실
│
└─ 배너 슬라이더 (선택)

사용 컴포넌트:
- Card, Button, Table (간단한 목록)
```

---

#### 2. 공지사항 목록 (/notice)
```
목적: 게시판 목록 페이지 (가장 많이 쓰임)
경로: app/notice/page.tsx

레이아웃:
├─ Breadcrumb (홈 > 알림마당 > 공지사항)
├─ 페이지 제목
├─ 검색 영역
│  ├─ Select (검색 조건: 제목, 내용, 작성자)
│  ├─ Input (검색어)
│  └─ Button (검색)
│
├─ Table (게시글 목록)
│  ├─ 번호, 제목, 작성자, 작성일, 조회수
│  └─ 10개씩 표시
│
└─ Pagination (하단)

사용 컴포넌트:
- Breadcrumb, Select, Input, Button, Table, Pagination
```

---

#### 3. 공지사항 상세 (/notice/[id])
```
목적: 게시글 상세 페이지
경로: app/notice/[id]/page.tsx

레이아웃:
├─ Breadcrumb
├─ 게시글 정보
│  ├─ 제목
│  ├─ 작성자, 작성일, 조회수
│  └─ 첨부파일 다운로드 링크
│
├─ 본문 내용 (Card)
│
├─ 이전글/다음글 네비게이션
│
└─ 하단 버튼
   ├─ 목록으로 (Button)
   └─ 프린트 (Button)

사용 컴포넌트:
- Breadcrumb, Card, Button

추가 기능:
- 프린트 최적화 CSS
- 소셜 공유 버튼 (선택)
```

---

#### 4. 자료실 (/library)
```
목적: 파일 다운로드 게시판
경로: app/library/page.tsx

레이아웃:
├─ Breadcrumb
├─ 검색 영역 (공지사항과 동일)
├─ Table
│  ├─ 번호, 제목, 첨부파일, 작성일, 다운로드
│  └─ 파일 아이콘 + 파일명 표시
└─ Pagination

사용 컴포넌트:
- Breadcrumb, Select, Input, Button, Table, Pagination

차이점:
- 파일 다운로드 버튼 (각 행)
- 파일 크기 표시
```

---

#### 5. 민원 신청 (/civil-complaint)
```
목적: 복잡한 폼 페이지 (실무 필수)
경로: app/civil-complaint/page.tsx

레이아웃:
├─ Breadcrumb
├─ 안내 문구 (Card)
│
├─ 신청 폼
│  ├─ 기본 정보
│  │  ├─ 이름 (Input)
│  │  ├─ 연락처 (Input)
│  │  ├─ 이메일 (Input)
│  │  └─ 주소 (Input + 우편번호 검색)
│  │
│  ├─ 민원 정보
│  │  ├─ 민원 유형 (Select)
│  │  ├─ 제목 (Input)
│  │  ├─ 내용 (Textarea)
│  │  └─ 첨부파일 (FileUpload)
│  │
│  └─ 개인정보 수집 동의
│     └─ Checkbox
│
└─ 하단 버튼
   ├─ 제출 (Button - primary)
   └─ 취소 (Button - secondary)

사용 컴포넌트:
- Breadcrumb, Card, Input, Select, FileUpload, Button

폼 검증:
- 필수 입력 체크
- 이메일 형식 검증
- 파일 크기 제한
```

---

#### 6. FAQ (/faq)
```
목적: 자주 묻는 질문
경로: app/faq/page.tsx

레이아웃:
├─ Breadcrumb
├─ 카테고리 탭 (Button 그룹)
│  └─ 전체, 민원, 접수, 조회 등
│
└─ Accordion 리스트
   ├─ 질문 (클릭 시 답변 펼침)
   └─ 답변 (Card)

사용 컴포넌트:
- Breadcrumb, Button, Card

구현:
- 아코디언 (자체 구현 or Headless UI)
- 검색 기능 (선택)
```

---

#### 7. 로그인 (/login)
```
목적: 로그인 페이지
경로: app/login/page.tsx

레이아웃:
├─ 중앙 정렬 Card
│  ├─ 로고
│  ├─ 로그인 폼
│  │  ├─ 아이디 (Input)
│  │  ├─ 비밀번호 (Input - type password)
│  │  └─ 로그인 유지 (Checkbox)
│  │
│  ├─ 로그인 버튼 (Button - full width)
│  │
│  └─ 링크
│     ├─ 회원가입
│     ├─ 아이디 찾기
│     └─ 비밀번호 찾기

사용 컴포넌트:
- Card, Input, Button

스타일:
- 중앙 정렬 레이아웃
- 반응형 (모바일 최적화)
```

---

#### 8. 소개 (/about)
```
목적: 기관 소개 페이지
경로: app/about/page.tsx

레이아웃:
├─ Breadcrumb
├─ 페이지 제목
├─ 소개 내용 (Card 여러 개)
│  ├─ 인사말
│  ├─ 조직도
│  ├─ 연혁
│  └─ 오시는 길
│
└─ 지도 (선택 - Kakao Map API)

사용 컴포넌트:
- Breadcrumb, Card
```

---

### Portal 페이지 우선순위

#### P0 (필수):
```
1. 메인 페이지 (/)
2. 공지사항 목록 (/notice)
3. 공지사항 상세 (/notice/[id])
4. 민원 신청 (/civil-complaint)
5. 로그인 (/login)
6. 레이아웃 (Header, Footer)

→ 6개 페이지 (핵심)
```

#### P1 (있으면 좋음):
```
7. 자료실 (/library)
8. FAQ (/faq)
9. 소개 (/about)

→ 3개 페이지 (부가)
```

---

## 💼 Admin Template (React + Vite) - 관리자 페이지

### 페이지 구성: 총 7페이지 (+ 레이아웃)

#### 0. 공통 레이아웃
```
src/
├── layouts/
│   └── AdminLayout.tsx
│       ├── Sidebar (좌측)
│       │  ├── 로고
│       │  └── 메뉴 (2-depth)
│       │
│       ├── TopBar (상단)
│       │  ├── 페이지 제목
│       │  ├── 알림 아이콘
│       │  └── 사용자 정보 (드롭다운)
│       │
│       └── Content (우측)
│          └── {children}
```

**Sidebar 메뉴 구조:**
```
📊 대시보드
📝 게시물 관리
   └─ 공지사항
   └─ 자료실
👥 사용자 관리
📁 파일 관리
⚙️ 설정
```

---

#### 1. 대시보드 (/admin/dashboard)
```
목적: 관리자 홈 (통계 및 최근 활동)
경로: /admin/dashboard

레이아웃:
├─ 통계 위젯 (Card 4개)
│  ├─ 전체 게시물 수
│  ├─ 오늘 방문자 수
│  ├─ 대기 중인 민원
│  └─ 신규 회원 수
│
├─ 차트 (Card 2개)
│  ├─ 방문자 추이 (Line Chart)
│  └─ 게시물 현황 (Bar Chart)
│
└─ 최근 활동 (Card + Table)
   └─ 최근 게시물, 최근 민원

사용 컴포넌트:
- Card, Table
- Chart (Chart.js or Recharts)
```

---

#### 2. 공지사항 관리 - 목록 (/admin/notice)
```
목적: 게시물 CRUD의 목록
경로: /admin/notice

레이아웃:
├─ 상단 액션 바
│  ├─ 검색 (Select + Input)
│  └─ 신규 등록 버튼 (Button)
│
├─ Table
│  ├─ 체크박스 (전체 선택)
│  ├─ 번호, 제목, 작성자, 작성일, 상태
│  └─ 액션 (수정, 삭제 버튼)
│
├─ 선택 항목 액션
│  └─ 선택 삭제 (Button)
│
└─ Pagination

사용 컴포넌트:
- Select, Input, Button, Table, Pagination, Modal (삭제 확인)

기능:
- 정렬 (컬럼 클릭)
- 필터 (검색)
- 일괄 선택/삭제
```

---

#### 3. 공지사항 관리 - 등록/수정 (/admin/notice/new, /admin/notice/[id]/edit)
```
목적: 게시물 등록 및 수정 폼
경로:
- /admin/notice/new (등록)
- /admin/notice/[id]/edit (수정)

레이아웃:
├─ 폼 (Card)
│  ├─ 제목 (Input)
│  ├─ 카테고리 (Select)
│  ├─ 내용 (Textarea or WYSIWYG)
│  ├─ 첨부파일 (FileUpload)
│  ├─ 공개 여부 (Radio or Toggle)
│  └─ 공개 일시 (DatePicker - 선택)
│
└─ 하단 버튼
   ├─ 저장 (Button - primary)
   ├─ 미리보기 (Button)
   └─ 취소 (Button - secondary)

사용 컴포넌트:
- Card, Input, Select, FileUpload, Button

검증:
- 필수 입력 체크
- 제목 길이 제한
- 파일 크기 제한
```

---

#### 4. 사용자 관리 (/admin/users)
```
목적: 회원 관리
경로: /admin/users

레이아웃:
├─ 상단 액션
│  ├─ 검색 (이름, 이메일, 상태)
│  └─ 신규 등록 (Button)
│
├─ Table
│  ├─ 번호, 이름, 이메일, 권한, 가입일, 상태
│  └─ 액션 (수정, 삭제)
│
├─ 일괄 액션
│  ├─ 권한 변경 (Modal)
│  └─ 계정 정지/해제
│
└─ Pagination

사용 컴포넌트:
- Select, Input, Button, Table, Pagination, Modal

기능:
- 권한 관리 (일반, 관리자)
- 계정 상태 변경 (활성, 정지)
- 엑셀 다운로드 (선택)
```

---

#### 5. 파일 관리 (/admin/files)
```
목적: 업로드된 파일 관리
경로: /admin/files

레이아웃:
├─ 상단 액션
│  ├─ 파일 업로드 (Button → Modal)
│  └─ 검색/필터 (파일명, 확장자, 날짜)
│
├─ Table or Grid View
│  ├─ 썸네일 (이미지인 경우)
│  ├─ 파일명, 크기, 업로드일, 사용처
│  └─ 액션 (다운로드, 삭제)
│
├─ 일괄 선택 삭제
│
└─ Pagination

사용 컴포넌트:
- Button, FileUpload, Table, Card, Pagination, Modal

기능:
- 파일 미리보기 (Modal)
- 파일 다운로드
- 사용처 확인 (어느 게시물에 첨부됐는지)
```

---

#### 6. 설정 (/admin/settings)
```
목적: 시스템 설정
경로: /admin/settings

레이아웃:
├─ 탭 메뉴 (Button 그룹)
│  ├─ 기본 설정
│  ├─ 사이트 정보
│  └─ 관리자 정보
│
└─ 설정 폼 (Card)
   ├─ 사이트명 (Input)
   ├─ 로고 업로드 (FileUpload)
   ├─ 관리자 이메일 (Input)
   ├─ 페이지당 게시물 수 (Select)
   └─ 기타 설정들

하단 버튼:
   └─ 저장 (Button)

사용 컴포넌트:
- Button, Card, Input, Select, FileUpload
```

---

#### 7. 로그인 (/admin/login)
```
목적: 관리자 로그인
경로: /admin/login

레이아웃:
├─ 중앙 정렬 Card
│  ├─ 관리자 로고
│  ├─ 로그인 폼
│  │  ├─ 아이디 (Input)
│  │  └─ 비밀번호 (Input)
│  │
│  └─ 로그인 버튼 (Button)

사용 컴포넌트:
- Card, Input, Button

스타일:
- 포털보다 더 심플
- 보안 강조 메시지
```

---

### Admin 페이지 우선순위

#### P0 (필수):
```
1. 로그인 (/admin/login)
2. 대시보드 (/admin/dashboard)
3. 공지사항 목록 (/admin/notice)
4. 공지사항 등록/수정 (/admin/notice/new, /edit)
5. 사용자 관리 (/admin/users)
6. 레이아웃 (Sidebar, TopBar)

→ 6개 페이지 (핵심 CRUD 완성)
```

#### P1 (있으면 좋음):
```
7. 파일 관리 (/admin/files)
8. 설정 (/admin/settings)

→ 2개 페이지 (부가 기능)
```

---

## 📊 개발 시간 재산정

### Portal Template (P0 기준)

```
1. 레이아웃 (Header, Footer): 3h
2. 메인 페이지: 2h
3. 공지사항 목록: 2h
4. 공지사항 상세: 1.5h
5. 민원 신청: 3h
6. 로그인: 1h

P0 총 시간: 12.5h (≈ 13h)

P1 추가 시:
7. 자료실: 1.5h
8. FAQ: 1.5h
9. 소개: 1h

P1 총 시간: 4h

Portal 전체: 17h (P0 + P1)
→ 현실적으로 15h로 산정 (재사용 효율)
```

### Admin Template (P0 기준)

```
1. 레이아웃 (Sidebar, TopBar): 3h
2. 로그인: 1h
3. 대시보드 (차트 포함): 3h
4. 공지사항 목록: 2h
5. 공지사항 등록/수정: 2.5h
6. 사용자 관리: 2.5h

P0 총 시간: 14h

P1 추가 시:
7. 파일 관리: 2h
8. 설정: 1h

P1 총 시간: 3h

Admin 전체: 17h (P0 + P1)
→ 현실적으로 15h로 산정
```

### 총 개발 시간 (템플릿 2개)

```
Portal: 15h (P0 13h + P1 2h 선택)
Admin: 15h (P0 14h + P1 1h 선택)

총 30h
```

---

## 🎯 최종 추천안

### Phase 1 배포 시 (최소)

#### Portal: P0 6개 페이지
```
✅ 레이아웃
✅ 메인
✅ 공지사항 (목록 + 상세)
✅ 민원 신청
✅ 로그인

→ 13h
```

#### Admin: P0 6개 페이지
```
✅ 레이아웃
✅ 로그인
✅ 대시보드
✅ 공지사항 관리 (목록 + 등록/수정)
✅ 사용자 관리

→ 14h
```

**총 27h (약 3.5일)**

---

### Phase 1.5 추가 (있으면 좋음)

#### Portal: P1 3개 페이지
```
✅ 자료실
✅ FAQ
✅ 소개

→ +4h
```

#### Admin: P1 2개 페이지
```
✅ 파일 관리
✅ 설정

→ +3h
```

**추가 7h (약 1일)**

---

## 💡 구현 팁

### 1. 공통 컴포넌트 재사용
```
Portal과 Admin이 공통으로 사용:
- Form 관련 (Input, Select, FileUpload)
- Layout 관련 (Card, Modal)
- Table, Pagination

→ 한쪽에서 만들면 다른쪽은 복사
```

### 2. Mock Data 사용
```
API 없이 개발하기 위해:
- JSON 파일로 Mock Data 준비
- 실제 API 연동은 사용자가 직접

예시:
/mock/notices.json
/mock/users.json
```

### 3. 주석 및 가이드
```
각 페이지에 주석 포함:
// TODO: API 연동 필요
// TODO: 인증 로직 추가
// TODO: 에러 처리

→ 사용자가 커스터마이징할 부분 명시
```

### 4. README 작성
```
각 템플릿에 README 포함:
- 페이지 구조 설명
- API 연동 방법
- 커스터마이징 가이드
- 배포 가이드
```

---

## 📝 결론

### 최종 페이지 수

| 템플릿 | P0 (필수) | P1 (선택) | 합계 |
|--------|-----------|-----------|------|
| **Portal** | 6개 | 3개 | 9개 |
| **Admin** | 6개 | 2개 | 8개 |
| **전체** | **12개** | **5개** | **17개** |

### Phase 1 배포 권장사항

```
✅ P0 12개 페이지만 구현 (27h)
⏳ P1 5개 페이지는 Phase 1.5로 연기

이유:
- 빠른 배포가 우선
- 핵심 기능만으로도 충분히 실용적
- 피드백 받으며 P1 추가하는 게 효율적
```

---

**작성자**: @odada-o
**버전**: v1.0
**Last Updated**: 2025-01-08

**Next Action**: Issue #13 업데이트 (페이지 구성 반영)
