# HANUI 디자인 & 기획 레퍼런스

> **스타일(shadcn/ui) + 기획(Radix UI) + 표준(KRDS)**  
> 업데이트: 2025-11-10

---

## 🎯 레퍼런스 구분

### 1. shadcn/ui - 스타일/디자인 레퍼런스 ⭐⭐⭐
**URL**: https://ui.shadcn.com/

**역할**: "어떻게 **보일** 것인가" (Visual Design)

**참고 사항**:
- 문서 사이트 전체 디자인
- 컴포넌트 시각적 스타일
- 색상 톤, 그림자, 라운딩
- 다크모드 스타일
- 애니메이션, 트랜지션

**캡처 이미지**:
- `docs/reference/main.png` - 메인 페이지 디자인
- `docs/reference/sub1.png` - 서브 페이지 1
- `docs/reference/sub2.png` - 서브 페이지 2

**예시**:
```
shadcn/ui의 Button은 이렇게 생김:
- 둥근 모서리 (rounded-md)
- 부드러운 그림자 (shadow-sm)
- 깔끔한 호버 효과
- 다크모드 색상 반전
```

---

### 2. Radix UI - 기획/구성/Props 레퍼런스 ⭐⭐⭐
**URL**: https://www.radix-ui.com/

**역할**: "어떻게 **동작**할 것인가" (API Design)

**참고 사항**:
- 컴포넌트 Props 구조
- 복합 컴포넌트 패턴 (Dialog.Title, Dialog.Content 등)
- 접근성 자동 처리 방식
- 키보드 네비게이션
- ARIA 속성 설계

**예시**:
```tsx
// Radix UI의 Dialog API 구조를 참고
<Dialog>
  <Dialog.Trigger>열기</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>제목</Dialog.Title>
      <Dialog.Description>설명</Dialog.Description>
      <Dialog.Close>닫기</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

---

### 3. KRDS - 표준/규격 레퍼런스 ⭐⭐⭐⭐⭐ (최우선)
**URL**: https://www.krds.go.kr/

**역할**: "무엇을 **준수**해야 하는가" (Standards)

**절대 우선 순위**: KRDS > shadcn/ui > Radix UI

**필수 준수 사항**:
- 컬러 팔레트 (Primary #0066CC 등)
- 버튼 높이 (40px 권장)
- 폰트 (Noto Sans KR, Malgun Gothic)
- 8px Grid 시스템
- 접근성 (WCAG 2.1 AA)

---

## 📊 우선순위 및 충돌 해결

```
충돌 시 우선순위:
KRDS (법적 표준) > shadcn/ui (디자인) > Radix UI (기획)

예시:
- KRDS: 버튼 높이 40px
- shadcn/ui: 버튼 높이 36px
→ 결과: KRDS 우선, 40px 사용
```

---

## 🎨 적용 방법

### 문서 사이트 디자인

**참고 순서**:
1. **KRDS** - 컬러, 폰트, 간격 확정
2. **shadcn/ui** - 레이아웃, 스타일 톤 차용
3. 최종 조합: "KRDS 규격 안에서 shadcn/ui처럼 세련되게"

**예시: 문서 사이트 헤더**
```tsx
// KRDS 컬러 + shadcn/ui 스타일
<header className="
  border-b border-gray-200           // shadcn/ui 스타일
  bg-white                           // shadcn/ui 스타일
  backdrop-blur                      // shadcn/ui 스타일
  text-primary-600                   // KRDS 컬러 (#0066CC)
">
```

### 컴포넌트 디자인

**참고 순서**:
1. **Radix UI** - API 구조 참고 (Props, 복합 패턴)
2. **KRDS** - 크기, 컬러 확정
3. **shadcn/ui** - 시각적 스타일 차용

**예시: Button 컴포넌트**
```tsx
// API 구조: Radix UI 참고
interface ButtonProps {
  size?: 'small' | 'medium' | 'large'    // Props 기반
  variant?: 'primary' | 'secondary'      // Props 기반
}

// 크기: KRDS 준수
const sizes = {
  medium: 'h-10 px-4',  // 40px (KRDS 권장)
}

// 스타일: shadcn/ui 차용
const styles = {
  rounded: 'rounded-md',           // shadcn/ui
  shadow: 'shadow-sm',             // shadcn/ui
  transition: 'transition-colors', // shadcn/ui
}

// 컬러: KRDS 우선
const colors = {
  primary: 'bg-[#0066CC]',  // KRDS 공식
}
```

---

## 🖼️ 디자인 레퍼런스 이미지

### shadcn/ui 스타일 캡처

#### 1. 메인 페이지 (main.png)
![메인 페이지](../reference/main.png)

**참고 요소**:
- Hero Section 레이아웃
- Gradient 배경
- CTA 버튼 스타일
- 코드 프리뷰 디자인
- 그림자 효과

#### 2. 서브 페이지 1 (sub1.png)
![서브 페이지 1](../reference/sub1.png)

**참고 요소**:
- 사이드바 네비게이션
- 컴포넌트 프리뷰 영역
- 탭 디자인
- 코드 블록 스타일

#### 3. 서브 페이지 2 (sub2.png)
![서브 페이지 2](../reference/sub2.png)

**참고 요소**:
- Props 테이블 디자인
- Breadcrumb 스타일
- "On This Page" 사이드바
- Typography 계층

---

## 📐 구체적 적용 예시

### 1. 문서 사이트 메인 페이지

```tsx
// Hero Section: shadcn/ui 스타일 + KRDS 컬러
<section className="
  relative                           // shadcn/ui
  flex min-h-screen items-center    // shadcn/ui
  bg-gradient-to-br                 // shadcn/ui
  from-white to-gray-50             // shadcn/ui (톤만 차용)
">
  <h1 className="
    text-6xl font-bold               // shadcn/ui
    text-primary-600                 // KRDS #0066CC
  ">
    공공 웹사이트, 30초 만에 시작
  </h1>
  
  <Button 
    size="large"                     // Radix UI Props 패턴
    variant="primary"                // Radix UI Props 패턴
    className="
      shadow-lg                      // shadcn/ui
      hover:shadow-xl                // shadcn/ui
    "
  >
    시작하기
  </Button>
</section>
```

### 2. 컴포넌트 문서 페이지

```tsx
// Layout: shadcn/ui 참고
<div className="flex">
  {/* Sidebar: shadcn/ui 스타일 */}
  <aside className="
    w-60                             // shadcn/ui
    border-r border-gray-200         // shadcn/ui
    bg-white                         // shadcn/ui
  ">
    <SidebarNav />
  </aside>
  
  {/* Content: shadcn/ui 스타일 */}
  <main className="
    flex-1 max-w-4xl                 // shadcn/ui
    px-8 py-12                       // shadcn/ui
  ">
    {/* Component Preview: shadcn/ui 탭 스타일 */}
    <Tabs defaultValue="preview">
      <TabsList className="
        rounded-md                   // shadcn/ui
        bg-gray-100                  // shadcn/ui
        p-1                          // shadcn/ui
      ">
        <TabsTrigger 
          value="preview"
          className="
            data-[state=active]:bg-white      // shadcn/ui
            data-[state=active]:text-primary  // KRDS
          "
        >
          미리보기
        </TabsTrigger>
        <TabsTrigger value="code">
          코드
        </TabsTrigger>
      </TabsList>
    </Tabs>
    
    {/* Props Table: Radix UI 구조 + shadcn/ui 스타일 */}
    <table className="
      w-full                         // shadcn/ui
      border-collapse                // shadcn/ui
    ">
      <thead className="
        border-b border-gray-200     // shadcn/ui
        text-left                    // shadcn/ui
      ">
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr className="
          border-b border-gray-100   // shadcn/ui
          hover:bg-gray-50           // shadcn/ui
        ">
          <td className="font-mono text-sm text-primary-600">
            size
          </td>
          <td className="font-mono text-sm text-gray-600">
            "small" | "medium" | "large"
          </td>
          <td className="text-sm text-gray-500">
            "medium"
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</div>
```

### 3. CodeBlock 컴포넌트

```tsx
// shadcn/ui 스타일 완전 차용
<div className="
  relative                           // shadcn/ui
  rounded-lg                         // shadcn/ui
  border border-gray-200             // shadcn/ui
  bg-zinc-950                        // shadcn/ui (다크 코드블록)
">
  <Button 
    onClick={copy}
    className="
      absolute right-4 top-4         // shadcn/ui
      hover:bg-zinc-800              // shadcn/ui
    "
  >
    {isCopied ? <Check /> : <Copy />}
  </Button>
  
  <pre className="
    overflow-x-auto                  // shadcn/ui
    p-4                              // shadcn/ui
    text-sm                          // shadcn/ui
  ">
    <code>{children}</code>
  </pre>
</div>
```

---

## 🎨 shadcn/ui에서 차용할 디자인 요소

### 색상 톤 (KRDS 기반으로 조정)
```css
/* shadcn/ui의 Gray 톤 차용 */
--gray-50: #F9FAFB;    /* shadcn/ui */
--gray-100: #F3F4F6;   /* shadcn/ui */
--gray-200: #E5E7EB;   /* shadcn/ui */

/* KRDS Primary 적용 */
--primary-50: #E6F0FF;
--primary-600: #0066CC;  /* KRDS 공식 */
```

### 그림자 (shadcn/ui 차용)
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

### 라운딩 (shadcn/ui 차용)
```css
--radius: 0.5rem;  /* 8px, KRDS 8px grid와 일치 */
```

### 트랜지션 (shadcn/ui 차용)
```css
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🧩 Radix UI에서 차용할 기획 요소

### 1. 복합 컴포넌트 패턴

```tsx
// Radix UI Dialog 패턴 차용
<Modal>
  <Modal.Trigger />
  <Modal.Content>
    <Modal.Header>
      <Modal.Title />
      <Modal.Description />
    </Modal.Header>
    <Modal.Body />
    <Modal.Footer />
  </Modal.Content>
</Modal>
```

### 2. Props 네이밍

```tsx
// Radix UI 네이밍 컨벤션
open: boolean         // 열림/닫힘 상태
onOpenChange: (open) => void
defaultOpen: boolean  // 초기 열림 상태
asChild: boolean      // Slot 패턴
```

### 3. 접근성 자동화

```tsx
// Radix UI 방식: 자동 ARIA 속성
<Dialog>
  {/* 자동으로 추가됨:
    role="dialog"
    aria-modal="true"
    aria-labelledby={titleId}
    aria-describedby={descId}
  */}
</Dialog>
```

---

## ✅ 체크리스트

### 문서 사이트 디자인 시
- [ ] KRDS 컬러 팔레트 확정
- [ ] KRDS 폰트 설정
- [ ] shadcn/ui 메인 페이지 레퍼런스 확인 (main.png)
- [ ] shadcn/ui 컴포넌트 페이지 레퍼런스 확인 (sub1.png, sub2.png)
- [ ] 레이아웃, 그림자, 라운딩 shadcn/ui 차용
- [ ] 최종 체크: KRDS 규격 위반 없는지 확인

### 컴포넌트 개발 시
- [ ] Radix UI API 문서 확인 (Props 구조)
- [ ] KRDS 크기/컬러 확정
- [ ] shadcn/ui 시각적 스타일 차용
- [ ] 최종 체크: 접근성 WCAG 2.1 AA 통과

---

## 🚀 다음 단계

### Issue #18 (문서 사이트 초기 설정) 시작 시
1. `docs/reference/*.png` 이미지 확인
2. shadcn/ui 레이아웃 구조 분석
3. KRDS 컬러로 Tailwind config 작성
4. shadcn/ui 스타일 컴포넌트 작성 시작

### Issue #7-15 (컴포넌트 개발) 시작 시
1. Radix UI 해당 컴포넌트 API 문서 확인
2. Props 구조 설계
3. KRDS 크기/컬러 적용
4. shadcn/ui 시각적 스타일 차용

---

**작성자**: @odada-o  
**업데이트**: 2025-11-10  
**Status**: ✅ 디자인 레퍼런스 명확화 완료  

**Next**: 
- 문서 사이트: shadcn/ui 스타일 분석
- 컴포넌트: Radix UI API + shadcn/ui 디자인 조합
