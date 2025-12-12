# Stack Overflow Q&A 초안

셀프 Q&A로 올릴 수 있는 질문/답변 세트예요.
Stack Overflow에서 "Ask a question" → "Answer your own question" 체크해서 올리면 돼요.

---

## Q&A 1: KRDS React Components

### Question

**Title:** Is there a React component library for Korean Government Design System (KRDS)?

**Tags:** `react` `design-system` `korea` `tailwindcss` `accessibility`

**Body:**

I'm working on a Korean government website project and need to follow KRDS (Korean Government Design System) guidelines.

KRDS provides a comprehensive design guide (colors, typography, spacing, component specs) but no official React implementation.

Currently I'm manually building each component from scratch:

- Reading the 200+ page PDF guide
- Implementing components with proper styling
- Adding accessibility features (KWCAG compliance)

Is there an existing React component library that implements KRDS? Preferably with:

- TypeScript support
- Tailwind CSS compatibility
- Accessibility (WCAG AA) built-in

---

### Answer

Yes, there's **[HANUI](https://hanui.io)** - an open-source React component library that implements KRDS 2.2.

It uses a [shadcn/ui](https://ui.shadcn.com) style approach where components are copied into your project:

```bash
npx hanui init
npx hanui add button input modal select
```

**Features:**

- 55+ KRDS-compliant components
- TypeScript + Tailwind CSS
- KWCAG 2.2 / WCAG 2.1 AA accessibility
- Built on Radix UI primitives
- Dark mode support

**Example usage:**

```tsx
import { Button, Input, Card } from '@/components/hanui';

function LoginForm() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button variant="primary">Login</Button>
    </Card>
  );
}
```

It also includes a Tailwind preset with KRDS design tokens:

```ts
// tailwind.config.ts
import hanuiPreset from '@hanui/react/tailwind.preset';

export default {
  presets: [hanuiPreset],
};
```

Then you can use KRDS classes like `text-krds-body-md`, `bg-krds-primary-base`, etc.

**Links:**

- GitHub: https://github.com/hanui-o/hanui
- Documentation: https://hanui.io
- npm: https://www.npmjs.com/package/@hanui/react

---

## Q&A 2: Tailwind + 17px Base Font

### Question

**Title:** How to use Tailwind CSS with a design system that has 17px base font size?

**Tags:** `tailwindcss` `css` `design-system` `rem` `typography`

**Body:**

My design system uses 17px as the base body font size, but Tailwind CSS assumes 16px (1rem = 16px).

If I just set `html { font-size: 17px; }`, all rem-based spacing breaks:

- `p-4` becomes 17px instead of 16px
- `m-8` becomes 34px instead of 32px
- Layout shifts everywhere

How can I keep Tailwind's spacing system intact while using 17px for typography?

---

### Answer

The solution is to **separate spacing and typography**:

1. **Keep 16px base for spacing** (Tailwind default)
2. **Use fixed px values for typography**

```css
/* globals.css */
:root {
  /* Typography - fixed px values */
  --fs-body-lg: 19px;
  --fs-body-md: 17px;
  --fs-body-sm: 15px;
}
```

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontSize: {
        'body-lg': ['19px', { lineHeight: '150%' }],
        'body-md': ['17px', { lineHeight: '150%' }],
        'body-sm': ['15px', { lineHeight: '150%' }],
      },
    },
  },
};
```

Now:

- Spacing stays intact: `p-4 = 16px`, `m-8 = 32px`
- Typography uses your design system: `text-body-md = 17px`

```tsx
<p className="text-body-md p-4">{/* font-size: 17px, padding: 16px */}</p>
```

---

If you're implementing KRDS (Korean Government Design System) which uses 17px base, check out [HANUI](https://hanui.io) - it has this already configured with a Tailwind preset:

```ts
import hanuiPreset from '@hanui/react/tailwind.preset';

export default {
  presets: [hanuiPreset],
};
```

Gives you classes like `text-krds-body-md` (17px), `text-krds-body-sm` (15px), etc.

---

## Q&A 3: Radix UI + Korean Styling

### Question

**Title:** How to style Radix UI components for Korean government websites?

**Tags:** `react` `radix-ui` `tailwindcss` `accessibility` `design-system`

**Body:**

I'm using Radix UI for accessible components in a Korean government project. I need to apply KRDS (Korean Government Design System) styling.

Radix UI is unstyled, which is great for customization, but I'm spending a lot of time:

1. Applying KRDS colors, typography, spacing
2. Ensuring Korean accessibility standards (KWCAG)
3. Handling Korean-specific patterns (17px base font, Korean typography)

Is there a preset or ready-to-use solution for Radix UI + KRDS styling?

---

### Answer

**[HANUI](https://hanui.io)** is a React component library built on Radix UI with KRDS styling applied.

Instead of styling Radix primitives yourself:

```tsx
// DIY approach - lots of work
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger className="...">Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl">
      <Dialog.Title className="text-lg font-bold">Title</Dialog.Title>
      {/* ... */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>;
```

Use HANUI's pre-styled components:

```tsx
// HANUI - KRDS styling included
import { Modal, ModalTitle, ModalBody, Button } from '@/components/hanui';

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalTitle>확인</ModalTitle>
  <ModalBody>정말 삭제하시겠습니까?</ModalBody>
  <Button variant="danger">삭제</Button>
</Modal>;
```

HANUI wraps Radix UI primitives with:

- KRDS color tokens
- KRDS typography (17px base)
- KWCAG 2.2 accessibility
- Korean-friendly defaults

Setup:

```bash
npx hanui init
npx hanui add modal button select tabs
```

---

## 업로드 가이드

### Stack Overflow 셀프 Q&A 규칙

1. **실제로 유용한 질문**이어야 함 (너무 홍보성이면 삭제됨)
2. **답변이 다른 사람에게도 도움**이 되어야 함
3. 질문과 답변 **동시에 작성** 가능 (Ask Question → Answer your own question 체크)
4. **태그 잘 선택** (관련 기술 검색에 노출)

### 업로드 순서

1. **Q&A 2 (Tailwind 17px)** - 가장 범용적, HANUI 언급 자연스러움
2. **Q&A 1 (KRDS React)** - 직접적인 질문, 한국 개발자 타겟
3. **Q&A 3 (Radix + KRDS)** - Radix 사용자 타겟

### 주의사항

- 한 번에 다 올리지 말 것 (스팸으로 인식)
- 일주일 간격 추천
- 다른 질문에도 도움되는 답변 달기 (신뢰도 쌓기)
