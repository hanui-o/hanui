# Using shadcn/ui in Korean Projects - What You Need to Know

Have you used shadcn/ui?

It's great. Radix UI based, Tailwind styling, copy-paste approach for full customization freedom.

But for Korean projects, there are a few things to adjust.

## 1. Korean Font Setup

shadcn/ui defaults to Inter. English font, so Korean text looks off.

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
  },
};
```

```css
/* globals.css */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
```

Pretendard recommended. Free and looks great with Korean.

## 2. Color Customization

shadcn/ui default colors are nice and neutral, but Korean projects usually have brand colors.

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A5ECA',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
      },
    },
  },
};
```

Or CSS variables approach:

```css
/* globals.css */
:root {
  --primary: 217 91% 42%; /* HSL values */
  --primary-foreground: 0 0% 100%;
}
```

## 3. For Government Projects

If it's a government project, you need to follow KRDS (Korean Design System).

Colors, spacing, typography - there's a guide for everything. You'd have to modify every shadcn/ui component.

Honestly, at that point it might be easier to start from scratch.

## 4. DatePicker Localization

shadcn/ui DatePicker shows in English.

```tsx
import { ko } from 'date-fns/locale';

<Calendar
  locale={ko}
  formatters={{
    formatCaption: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
  }}
/>;
```

## 5. Select Placeholder

```tsx
// English default
<SelectValue placeholder="Select a fruit" />

// Korean
<SelectValue placeholder="선택하세요" />
```

Small thing but easy to forget.

## 6. Form Error Messages

With react-hook-form:

```tsx
const form = useForm({
  resolver: zodResolver(schema),
});

// Korean messages in zod schema
const schema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력하세요')
    .email('이메일 형식이 올바르지 않습니다'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});
```

## 7. Accessibility

shadcn/ui being Radix-based has good baseline accessibility.

But for Korean government KWCAG compliance, extra work needed:

```tsx
// Add aria-label to icon buttons
<Button size="icon" aria-label="검색">
  <SearchIcon />
</Button>

// Connect error messages to form fields
<Input
  aria-describedby={error ? 'email-error' : undefined}
  aria-invalid={!!error}
/>
{error && <p id="email-error" role="alert">{error}</p>}
```

## 8. Toast Position

shadcn/ui Toast defaults to bottom-right, but Korean sites usually use top-center.

```tsx
// components/ui/toaster.tsx
<ToastViewport className="fixed top-4 left-1/2 -translate-x-1/2" />
```

## Summary

shadcn/ui Korean project checklist:

- [ ] Korean font (Pretendard etc.)
- [ ] Brand color setup
- [ ] DatePicker localization
- [ ] Korean placeholders
- [ ] Korean form error messages
- [ ] Extra accessibility work
- [ ] Toast position adjustment

## For Government SI Projects

Honestly, customizing shadcn/ui takes more time than starting with a KRDS-compliant library.

[HANUI](https://hanui.io) is exactly that. Same copy-paste approach as shadcn/ui, but KRDS design system based.

```bash
npx hanui add button input select
```

Korean fonts, KRDS colors, accessibility - all pre-applied.

For government projects, this saves time.

---

shadcn, React, TailwindCSS, localization, frontend, components
