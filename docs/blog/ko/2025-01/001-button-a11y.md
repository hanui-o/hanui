# Button 접근성 완벽 가이드

> 클릭 가능한 요소를 만드는 3가지 방법과 그 차이점

---

## 들어가며

프론트엔드 개발을 하다 보면 "클릭할 수 있는 요소"를 만들 때 `<div>`, `<button>`, `<a>` 중 무엇을 써야 할지 고민한 적 있으신가요?

"어차피 `onClick` 이벤트만 붙이면 다 똑같이 동작하는데 뭐가 다르지?"라고 생각할 수 있지만, **접근성 관점에서는 완전히 다른 이야기**입니다.

이 글에서는:

- ❌ 잘못된 구현이 초래하는 문제
- ⚠️ 수동으로 접근성을 구현하는 방법
- ✅ HANUI가 자동으로 해결하는 방법

을 실제 코드와 함께 살펴보겠습니다.

---

## 문제 상황: 흔히 보는 잘못된 구현

### ❌ Case 1: `<div>`를 버튼처럼 사용

```tsx
<div className="button" onClick={handleSubmit}>
  제출하기
</div>
```

**문제점**:

1. **키보드 접근 불가**: Tab 키로 포커스 불가능
2. **스크린 리더 인식 불가**: "제출하기"라는 텍스트만 읽힘
3. **의미(Semantic) 없음**: 버튼인지 알 수 없음
4. **Enter/Space 키 미작동**: 클릭만 가능

**결과**:

- 키보드만 사용하는 사용자는 아예 이 요소에 접근 불가
- 스크린 리더 사용자는 이게 버튼인지 알 수 없음

---

### ❌ Case 2: `<a>` 태그를 버튼처럼 사용

```tsx
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
>
  제출하기
</a>
```

**문제점**:

1. **의미적 혼란**: 링크인지 버튼인지 불분명
2. **스크린 리더 혼란**: "제출하기 링크"로 읽힘 (실제로는 버튼인데)
3. **키보드 동작 부자연스러움**: Enter만 작동 (Space는 미작동)
4. **불필요한 `href`**: 빈 링크 또는 `#` 사용

**결과**:

- 스크린 리더 사용자가 "이게 링크인가? 버튼인가?" 혼란
- 키보드 사용자가 Space 키를 눌러도 반응 없음

---

## WCAG/KRDS 기준

### WCAG 2.2 관련 기준

| 기준                        | 레벨 | 설명                                                   |
| --------------------------- | ---- | ------------------------------------------------------ |
| **2.1.1 Keyboard**          | A    | 모든 기능이 키보드로 조작 가능해야 함                  |
| **4.1.2 Name, Role, Value** | A    | 모든 UI 컴포넌트는 역할(role)과 이름(name)이 있어야 함 |

### KRDS 관련 기준

- **2.1.1 키보드 사용 보장**: 모든 기능은 키보드만으로 사용 가능해야 함
- **3.3.1 마크업 오류 방지**: 시작 태그와 종료 태그 정확히 사용

---

## ⚠️ 수동으로 올바르게 구현하기

### 방법 1: Native `<button>` 사용 (권장)

```tsx
<button type="button" onClick={handleSubmit} aria-label="회원가입 양식 제출">
  제출하기
</button>
```

**장점**:

- ✅ 자동으로 `role="button"` 부여
- ✅ Tab 키로 포커스 가능
- ✅ Enter + Space 키 모두 작동
- ✅ 스크린 리더가 "제출하기 버튼"으로 읽음

**단점**:

- ⚠️ 기본 스타일 제거 필요
- ⚠️ `type` 속성 명시 필요 (기본값이 `submit`이라 form 제출됨)

---

### 방법 2: `<div>`에 ARIA 추가 (비권장)

```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleSubmit}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSubmit();
    }
  }}
  aria-label="회원가입 양식 제출"
>
  제출하기
</div>
```

**필수 속성**:

1. `role="button"` - 버튼 역할 명시
2. `tabIndex={0}` - Tab 키로 포커스 가능하게
3. `onKeyDown` - Enter/Space 키 이벤트 처리
4. `aria-label` - 명확한 레이블 제공

**문제점**:

- ⚠️ 코드가 복잡함 (10줄 → 1줄로 줄일 수 있음)
- ⚠️ 개발자가 실수하기 쉬움
- ⚠️ 유지보수 어려움

**결론**: **그냥 `<button>` 쓰세요.**

---

## ✅ HANUI의 자동 해결 방법

HANUI Button 컴포넌트는 모든 접근성 요구사항을 자동으로 처리합니다.

### HANUI Button 사용

```tsx
import { Button } from '@hanui/react';

<Button onClick={handleSubmit}>제출하기</Button>;
```

**자동 포함되는 기능**:

```tsx
// 내부적으로 다음이 자동 적용됨
<button
  type="button" // ✅ 자동
  role="button" // ✅ 자동
  tabIndex={0} // ✅ 자동
  onClick={handleSubmit}
  onKeyDown={(e) => {
    // ✅ 자동
    if (e.key === 'Enter' || e.key === ' ') {
      handleSubmit();
    }
  }}
  aria-pressed={false} // ✅ 자동 (toggle 버튼인 경우)
>
  제출하기
</button>
```

---

## 비교표: 3가지 방법

| 구현 방법           | 키보드 접근 | 스크린 리더 | 코드 복잡도   | 유지보수      | 추천도 |
| ------------------- | ----------- | ----------- | ------------- | ------------- | ------ |
| ❌ `<div>`          | ✗           | ✗           | 낮음          | 어려움        | ✗      |
| ⚠️ `<div>` + ARIA   | ✓           | ✓           | 매우 높음     | 매우 어려움   | △      |
| ⚠️ `<button>`       | ✓           | ✓           | 보통          | 보통          | ○      |
| ✅ **HANUI Button** | ✓           | ✓           | **매우 낮음** | **매우 쉬움** | **◎**  |

---

## 실전 예제: 로그인 버튼

### ❌ 잘못된 구현

```tsx
function LoginForm() {
  return (
    <form>
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />

      {/* ❌ 문제 1: div를 버튼처럼 사용 */}
      <div className="login-button" onClick={handleLogin}>
        로그인
      </div>

      {/* ❌ 문제 2: a 태그를 버튼처럼 사용 */}
      <a href="#" onClick={handleForgotPassword}>
        비밀번호 찾기
      </a>
    </form>
  );
}
```

---

### ✅ HANUI로 해결

```tsx
import { Button } from '@hanui/react';

function LoginForm() {
  return (
    <form>
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />

      {/* ✅ 자동으로 모든 접근성 처리됨 */}
      <Button variant="primary" onClick={handleLogin}>
        로그인
      </Button>

      {/* ✅ 보조 버튼도 동일하게 접근 가능 */}
      <Button variant="ghost" onClick={handleForgotPassword}>
        비밀번호 찾기
      </Button>
    </form>
  );
}
```

---

## 자주 묻는 질문 (FAQ)

### Q1. "디자인 때문에 `<button>` 기본 스타일 제거하기 귀찮은데요?"

**A**: HANUI Button은 기본 스타일을 완전히 제거하고 커스터마이징 가능합니다.

```tsx
<Button className="your-custom-class">버튼</Button>
```

---

### Q2. "`type="button"` 왜 써야 하나요?"

**A**: `<button>`의 기본 `type`은 `submit`입니다. form 안에서 의도치 않은 제출을 방지하려면 반드시 `type="button"` 명시해야 합니다.

```tsx
// ❌ form이 제출됨
<button onClick={handleClick}>클릭</button>

// ✅ form 제출 안 됨
<button type="button" onClick={handleClick}>클릭</button>
```

HANUI Button은 자동으로 `type="button"` 처리합니다.

---

### Q3. "Icon 버튼은 어떻게 만드나요?"

**A**: `aria-label`을 반드시 제공해야 합니다.

```tsx
import { Button } from '@hanui/react';
import { IconTrash } from '@hanui/icons';

<Button variant="icon" aria-label="삭제" onClick={handleDelete}>
  <IconTrash />
</Button>;
```

HANUI는 `children`이 텍스트가 아닌 경우 `aria-label` 누락 시 경고를 표시합니다.

---

## 체크리스트

버튼을 만들 때 다음을 확인하세요:

- [ ] Tab 키로 포커스 가능한가?
- [ ] Enter 키로 동작하는가?
- [ ] Space 키로 동작하는가?
- [ ] 스크린 리더가 "버튼"이라고 읽는가?
- [ ] 버튼의 역할이 명확한가?
- [ ] Icon 버튼인 경우 `aria-label`이 있는가?

**HANUI Button을 사용하면 위 모든 항목이 자동으로 ✅ 처리됩니다.**

---

## 마무리

버튼 하나 만드는데도 생각보다 많은 접근성 고려사항이 있습니다.

- ❌ `<div>` + `onClick`은 절대 사용하지 마세요
- ⚠️ `<button>`을 사용하되, `type="button"` 잊지 마세요
- ✅ **HANUI Button을 사용하면 모든 게 자동입니다**

다음 글에서는 **"Modal 접근성의 6가지 함정"**을 다룹니다. Focus Trap, ESC 키 처리 등 Modal의 복잡한 접근성 이슈를 살펴보겠습니다.

---

**시리즈**:

- ✅ [001] Button 접근성 완벽 가이드 (현재 글)
- ⏳ [002] Modal 접근성의 6가지 함정
- ⏳ [003] Select/Combobox의 ARIA 구조
- ⏳ [004] Form 접근성 체크리스트

---

**태그**: `#accessibility` `#a11y` `#react` `#button` `#wcag` `#krds` `#hanui`

**작성일**: 2025-01-15
**작성자**: HANUI Team
**발행**: Velog (@hanui)
