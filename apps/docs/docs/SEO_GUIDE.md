# SEO & 소셜 미디어 공유 설정 가이드

## 📋 완료된 설정 항목

### 1. Open Graph (OG) 메타 태그

카카오톡, 페이스북, 링크드인 등에서 링크 공유 시 사용됩니다.

```html
<!-- layout.tsx에 자동 생성됨 -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="ko_KR" />
<meta property="og:url" content="https://hanui.io" />
<meta property="og:site_name" content="HANUI" />
<meta
  property="og:title"
  content="HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리"
/>
<meta property="og:description" content="..." />
<meta property="og:image" content="https://hanui.io/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### 2. Twitter Card

트위터/X에서 링크 공유 시 사용됩니다.

```html
<meta name="twitter:card" content="summary_large_image" />
<meta
  name="twitter:title"
  content="HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리"
/>
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://hanui.io/og-image.png" />
<meta name="twitter:creator" content="@odada_o" />
```

### 3. 검색 엔진 최적화 (SEO)

#### 기본 메타 태그

- title, description, keywords
- authors, creator, publisher
- robots (검색 엔진 크롤링 설정)

#### 구조화된 데이터 (JSON-LD)

- Schema.org 표준에 따른 SoftwareApplication 타입
- 검색 결과에서 더 풍부한 정보 표시

#### Sitemap

- 자동 생성: `/sitemap.xml`
- 모든 컴포넌트 페이지 포함
- 검색 엔진이 사이트 구조 파악

#### robots.txt

- 검색 엔진 크롤링 허용 설정
- Sitemap 위치 명시

---

## 🧪 테스트 방법

### 1. 카카오톡 공유 테스트

#### A. 로컬에서 테스트 (배포 전)

1. 개발 서버 실행

   ```bash
   pnpm --filter docs dev
   ```

2. ngrok으로 임시 공개 URL 생성

   ```bash
   ngrok http 3000
   ```

3. [카카오 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 ngrok URL 입력

#### B. 배포 후 테스트

1. [카카오 디버거](https://developers.kakao.com/tool/debugger/sharing) 접속
2. `https://hanui.io` 입력
3. "미리보기" 버튼 클릭
4. 이미지와 제목, 설명 확인

**주의**: 첫 테스트 시 이미지가 안 보이면 "캐시 삭제" 버튼을 눌러주세요.

#### C. 실제 카카오톡에서 테스트

1. 본인에게 메시지로 `https://hanui.io` 전송
2. 링크 미리보기 확인

### 2. 페이스북/링크드인 테스트

#### 페이스북

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- URL 입력 후 "Debug" 클릭
- 문제가 있으면 "Scrape Again" 클릭

#### 링크드인

- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- URL 입력 후 "Inspect" 클릭

### 3. 트위터/X 테스트

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- URL 입력 후 "Preview card" 클릭

### 4. 검색 엔진 최적화 테스트

#### Google Search Console

1. [Google Search Console](https://search.google.com/search-console) 접속
2. 사이트 등록
3. "URL 검사" → `https://hanui.io` 입력
4. "색인 생성 요청" 클릭

#### 구조화된 데이터 테스트

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- URL 입력 후 테스트

#### 일반 SEO 검사

- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
  ```bash
  # Chrome DevTools > Lighthouse 탭 > SEO 체크
  ```

---

## 📊 현재 설정된 SEO 정보

### 메타 정보

- **제목**: HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리
- **설명**: KRDS(Korea Republic Design System)를 준수하는 공공 웹사이트용 React 컴포넌트 라이브러리. 접근성 AA 등급, TypeScript 지원, 9개 핵심 컴포넌트 제공.
- **키워드**: HANUI, KRDS, 공공 웹, React, 컴포넌트 라이브러리, UI 라이브러리, 접근성, TypeScript, 디자인 시스템, Korean Design System

### 소셜 미디어 이미지

- **경로**: `/og-image.png`
- **크기**: 1200 x 630 픽셀
- **포맷**: PNG
- **내용**:
  - HANUI 로고
  - 심볼 (4개 사각형 그리드)
  - 주요 기능 6가지
  - KRDS 기반 타이틀

### Sitemap

- **URL**: `https://hanui.io/sitemap.xml`
- **포함 페이지**:
  - 홈페이지 (우선순위: 1.0)
  - 컴포넌트 목록 (우선순위: 0.9)
  - 9개 컴포넌트 페이지 (우선순위: 0.8)

---

## 🔧 배포 시 체크리스트

### Vercel 배포 후

- [ ] `https://hanui.io`로 접속 확인
- [ ] `/og-image.png` 이미지 로드 확인
- [ ] `/sitemap.xml` 생성 확인
- [ ] `/robots.txt` 확인
- [ ] 카카오톡 디버거 테스트
- [ ] Facebook Sharing Debugger 테스트
- [ ] Google Search Console URL 검사

### Google Search Console 설정

1. 사이트 소유권 확인
2. `layout.tsx`의 `verification.google` 값 업데이트
   ```ts
   verification: {
     google: 'google-site-verification-code', // 여기에 실제 코드 입력
   }
   ```

### Naver Search Advisor (선택사항)

1. [Naver Search Advisor](https://searchadvisor.naver.com/) 가입
2. 사이트 등록
3. 소유권 확인 메타 태그를 `layout.tsx`에 추가
   ```ts
   verification: {
     google: 'google-site-verification-code',
     naver: 'naver-site-verification-code', // 추가
   }
   ```

---

## 📱 카카오톡 공유 예시

배포 후 카카오톡에서 다음과 같이 표시됩니다:

```
┌─────────────────────────────────┐
│  [HANUI 로고 이미지]            │
│                                 │
│  HANUI                          │
│  KRDS 기반 공공 웹 UI           │
│  컴포넌트 라이브러리            │
│                                 │
│  ✓ KRDS 100% 준수              │
│  ✓ 접근성 AA 등급              │
│  ✓ TypeScript 지원             │
│                                 │
│  hanui.io                       │
└─────────────────────────────────┘
```

---

## 🐛 문제 해결

### 카카오톡에서 이미지가 안 보일 때

1. 카카오 디버거에서 "캐시 삭제" 클릭
2. 이미지 URL 직접 접속 확인: `https://hanui.io/og-image.png`
3. 이미지 크기 확인 (1200x630 필수)
4. 이미지 포맷 확인 (PNG 권장)

### 검색 결과에 안 나올 때

1. Google Search Console에서 색인 상태 확인
2. robots.txt에서 크롤링 차단 여부 확인
3. Sitemap 제출 확인
4. 일반적으로 첫 색인까지 며칠~몇 주 소요

### OG 이미지가 깨질 때

1. 이미지 크기 확인: 최소 1200x630
2. 파일 크기 확인: 8MB 이하 권장
3. HTTPS 사용 확인
4. CDN 캐시 문제일 수 있음 → 버전 쿼리 추가: `/og-image.png?v=2`

---

## 📚 참고 자료

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [카카오톡 링크 가이드](https://developers.kakao.com/docs/latest/ko/message/common)
