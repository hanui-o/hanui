# HANUI Portal Template

> KRDS 기반 공공 웹 민원 포털 스타터 템플릿

## 📋 소개

공공기관의 대국민 서비스를 위한 민원 포털 템플릿입니다. KRDS(Korea Republic Design System)를 준수하며, 웹 접근성 지침(WCAG 2.1 AA)을 따릅니다.

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

## 🎨 포함된 기능

### HANUI 컴포넌트

- ✅ Button - 다양한 variant와 size
- ✅ Card - 정보 카드 레이아웃
- ✅ Input - 폼 입력 컴포넌트
- ✅ Table - 데이터 테이블
- ✅ Pagination - 페이지네이션
- ✅ Breadcrumb - 네비게이션 경로
- ✅ Modal - 다이얼로그
- ✅ Select - 드롭다운 선택
- ✅ FileUpload - 파일 업로드

### 디자인 시스템

- KRDS 컬러 팔레트
- KRDS 타이포그래피 (Noto Sans KR)
- 8px Grid 시스템
- 반응형 디자인 (모바일 우선)

### 접근성

- 시맨틱 HTML
- ARIA 속성 지원
- 키보드 네비게이션
- 스크린 리더 호환

## 📁 프로젝트 구조

```
src/
├── main.tsx          # 앱 진입점
├── App.tsx           # 메인 컴포넌트
├── App.css           # 스타일시트
└── index.css         # 글로벌 스타일
```

## 🛠 기술 스택

- **프레임워크**: React 18
- **언어**: TypeScript
- **빌드 도구**: Vite 6
- **컴포넌트**: @hanui/react
- **스타일**: CSS (KRDS 준수)

## 📦 HANUI 컴포넌트 사용 예시

```tsx
import { Button, Card, Input } from '@hanui/react';

function MyComponent() {
  return (
    <Card>
      <h2>로그인</h2>
      <Input placeholder="아이디" />
      <Input type="password" placeholder="비밀번호" />
      <Button variant="primary">로그인</Button>
    </Card>
  );
}
```

## 🎯 커스터마이징

### 컬러 변경

KRDS 컬러 토큰을 사용하여 테마를 변경할 수 있습니다.

### 컴포넌트 추가

`@hanui/react`에서 필요한 컴포넌트를 import하여 사용하세요.

### 페이지 추가

`src/` 디렉토리에 새로운 컴포넌트를 추가하고 라우팅을 설정하세요.

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
