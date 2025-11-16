# HANUI Portal Template

> KRDS 기반 공공 웹 민원 포털 스타터 템플릿

## 📋 소개

공공기관의 대국민 서비스를 위한 민원 포털 템플릿입니다. KRDS(Korea Republic Design System)를 준수하며, 웹 접근성 지침(WCAG 2.1 AA)을 따릅니다.

프로덕션 레벨의 완전한 민원 포털 애플리케이션으로, 6개의 주요 페이지와 공통 레이아웃을 포함합니다.

## 🚀 시작하기

```bash
# 개발 서버 실행 (http://localhost:5173)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프리뷰
pnpm preview

# 린팅
pnpm lint
```

## 📄 페이지 구조

### 1. 메인 페이지 (`/`)

- Hero 섹션 (환영 메시지, CTA 버튼)
- 주요 서비스 Quick Links (민원 신청, 조회, 공지사항, FAQ)
- 최근 공지사항 목록
- 민원 처리 통계 현황

### 2. 공지사항 목록 (`/notice`)

- 공지사항 테이블 (번호, 제목, 등록일, 조회수)
- 검색 기능 (제목 검색)
- 페이지네이션 (10건씩 표시)
- 반응형 테이블 레이아웃

### 3. 공지사항 상세 (`/notice/:id`)

- 공지사항 제목, 등록일, 조회수
- 공지사항 본문 내용
- 이전/다음 글 네비게이션
- 목록으로 돌아가기 버튼

### 4. 민원 신청 (`/civil-complaint`)

- 신청자 정보 입력 (이름, 이메일, 연락처)
- 민원 내용 입력 (카테고리, 제목, 내용)
- 파일 첨부 기능 (다중 파일 업로드)
- 폼 유효성 검사 (실시간 에러 표시)

### 5. 로그인 (`/login`)

- 이메일/비밀번호 입력
- 폼 유효성 검사
- 비밀번호 찾기/회원가입 링크
- 중앙 정렬 레이아웃

### 6. 공통 레이아웃

**Header**

- 로고 및 GNB (홈, 공지사항, 민원신청)
- 검색 입력창 및 버튼
- 로그인 버튼
- 반응형 햄버거 메뉴 (모바일)

**Footer**

- Sitemap (서비스, 안내, 정책)
- Copyright 및 연락처 정보
- 웹접근성 인증 마크

**Breadcrumb**

- 모든 페이지에 현재 위치 표시
- 클릭 가능한 경로 네비게이션

## 🎨 포함된 기능

### HANUI 컴포넌트 사용

- **Button** - Primary/Secondary variant, 다양한 size
- **Card** - 콘텐츠 카드 레이아웃
- **Input** - 텍스트/이메일/비밀번호 입력
- **Breadcrumb** - 페이지 경로 표시 (커스텀 구현)
- **Pagination** - 페이지 네비게이션 (커스텀 구현)
- **Form Components** - Select, Textarea, File Input

### 디자인 시스템

- KRDS 컬러 팔레트 (Blue 계열)
- KRDS 타이포그래피 (Noto Sans KR)
- 8px Grid 시스템
- 반응형 디자인 (Mobile-first)
- 프린트 최적화 CSS

### 접근성 기능

- Skip Navigation Link (본문 바로가기)
- 시맨틱 HTML5 태그 사용
- ARIA 속성 (labels, required, invalid, describedby)
- 키보드 네비게이션 지원
- Focus-visible 스타일링
- 스크린 리더 전용 텍스트 (.sr-only)

### 반응형 디자인

- Desktop (1280px+): 풀 레이아웃
- Tablet (768px-1023px): 적응형 그리드
- Mobile (~767px): 스택 레이아웃, 햄버거 메뉴

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Layout.tsx      # 공통 레이아웃 (Header, Footer)
│   ├── Layout.css
│   ├── Breadcrumb.tsx  # 경로 네비게이션
│   └── Breadcrumb.css
├── pages/              # 페이지 컴포넌트
│   ├── MainPage.tsx           # 메인 페이지
│   ├── MainPage.css
│   ├── NoticeListPage.tsx     # 공지사항 목록
│   ├── NoticeListPage.css
│   ├── NoticeDetailPage.tsx   # 공지사항 상세
│   ├── NoticeDetailPage.css
│   ├── CivilComplaintPage.tsx # 민원 신청 폼
│   ├── CivilComplaintPage.css
│   ├── LoginPage.tsx          # 로그인
│   └── LoginPage.css
├── mock/               # 목업 데이터
│   └── notices.json    # 25개의 샘플 공지사항
├── types/              # TypeScript 타입 정의
│   └── index.ts        # Notice, CivilComplaint 등
├── main.tsx            # 앱 진입점 (React Router 설정)
├── App.tsx             # 라우팅 구조
├── App.css
└── index.css           # 글로벌 스타일 (반응형, 프린트)
```

## 🛠 기술 스택

- **프레임워크**: React 18
- **라우팅**: React Router v6
- **언어**: TypeScript
- **빌드 도구**: Vite 6
- **컴포넌트**: @hanui/react
- **스타일**: CSS (KRDS 준수)

## 사용 가이드

### 개발 서버 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 http://localhost:5173 으로 접속하면 메인 페이지를 확인할 수 있습니다.

### 라우팅 구조

React Router v6를 사용하여 다음과 같은 라우트가 설정되어 있습니다:

```tsx
// src/App.tsx
<Routes>
  <Route
    path="/"
    element={
      <Layout>
        <MainPage />
      </Layout>
    }
  />
  <Route
    path="/notice"
    element={
      <Layout>
        <NoticeListPage />
      </Layout>
    }
  />
  <Route
    path="/notice/:id"
    element={
      <Layout>
        <NoticeDetailPage />
      </Layout>
    }
  />
  <Route
    path="/civil-complaint"
    element={
      <Layout>
        <CivilComplaintPage />
      </Layout>
    }
  />
  <Route path="/login" element={<LoginPage />} />
</Routes>
```

### 목업 데이터 활용

`src/mock/notices.json` 파일에 25개의 샘플 공지사항이 포함되어 있습니다. 실제 API 연동 시 이 부분을 수정하세요:

```tsx
// 현재 (Mock Data)
import noticesData from '../mock/notices.json';
const notices = noticesData as Notice[];

// API 연동 후
const { data: notices } = await fetch('/api/notices');
```

### 폼 유효성 검사

민원 신청 폼과 로그인 폼에는 클라이언트 측 유효성 검사가 구현되어 있습니다:

```tsx
// 이메일 검사
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.email = '유효한 이메일 주소를 입력해주세요.';
}

// 실시간 에러 표시
<Input
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>;
```

## 🎯 커스터마이징

### 새 페이지 추가하기

1. `src/pages/` 에 새 페이지 컴포넌트 생성
2. `src/App.tsx` 에 라우트 추가
3. 필요시 Header의 GNB에 링크 추가

```tsx
// src/pages/NewPage.tsx
export default function NewPage() {
  return (
    <div className="new-page">
      <Breadcrumb
        items={[{ label: '홈', path: '/' }, { label: '새 페이지' }]}
      />
      <div className="page-container">
        <h1>새 페이지</h1>
      </div>
    </div>
  );
}

// src/App.tsx
<Route
  path="/new"
  element={
    <Layout>
      <NewPage />
    </Layout>
  }
/>;
```

### 스타일 커스터마이징

각 페이지와 컴포넌트는 독립적인 CSS 파일을 가지고 있습니다. KRDS 컬러를 유지하면서 커스터마이징하세요:

```css
/* 주요 색상 */
--primary: #3b82f6;
--secondary: #6b7280;
--text: #1f2937;
--border: #e5e7eb;
--background: #f9fafb;
```

### 백엔드 API 연동

현재는 목업 데이터를 사용하지만, 실제 API와 연동할 수 있습니다:

```tsx
// API 유틸리티 생성
// src/utils/api.ts
export async function fetchNotices() {
  const response = await fetch('/api/notices');
  return response.json();
}

// 페이지에서 사용
const [notices, setNotices] = useState<Notice[]>([]);
useEffect(() => {
  fetchNotices().then(setNotices);
}, []);
```

## 📚 문서 및 리소스

- [HANUI Documentation](https://hanui.io)
- [KRDS Design System](https://uiux.egovframe.go.kr/)
- [KRDS GitHub](https://github.com/KRDS-uiux/krds-uiux)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)

## 🔧 개발 팁

### 개발 서버 포트 변경

`vite.config.ts`에서 포트를 변경할 수 있습니다:

```ts
export default defineConfig({
  server: {
    port: 3000,
  },
});
```

### 프로덕션 빌드 최적화

Vite는 자동으로 코드 분할, 트리 쉐이킹, 압축을 수행합니다.

## 📝 라이선스

MIT

---

**Created with** [create-hanui-app](https://www.npmjs.com/package/create-hanui-app)
