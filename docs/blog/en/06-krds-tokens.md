# Using KRDS Design Tokens with Tailwind CSS

Ever tried using a design system with a different base font size than Tailwind?

Tailwind CSS uses 16px as its base. The Korean Government Design System (KRDS) uses 17px.

"Just set `html { font-size: 17px; }`, right?"

Nope. That breaks everything. Tailwind's spacing system is rem-based. `p-4` becomes 17px instead of 16px. Your entire layout shifts.

Here's how we solved it in HANUI.

## The Problem

Tailwind default:

```css
html {
  font-size: 16px;
}
/* 1rem = 16px */
/* p-4 = 1rem = 16px */
```

KRDS requirement:

```css
/* Body text base: 17px */
/* Body MD = 17px */
```

If you change the root font size, all rem-based values break.

## The Solution: Separate Concerns

HANUI handles this by separating spacing and typography:

- **Spacing**: Keep 16px base (Tailwind default)
- **Font size**: Use fixed px values for KRDS typography

```css
/* variables.css */
:root {
  /* Spacing stays rem-based (16px) */
  /* Typography uses fixed px values */

  --krds-body-lg: 19px;
  --krds-body-md: 17px; /* KRDS base body */
  --krds-body-sm: 15px;
  --krds-body-xs: 13px;
}
```

In the Tailwind preset:

```ts
// tailwind.preset.ts
fontSize: {
  'krds-body-lg': ['19px', { lineHeight: '150%' }],
  'krds-body-md': ['17px', { lineHeight: '150%' }],
  'krds-body-sm': ['15px', { lineHeight: '150%' }],
  'krds-body-xs': ['13px', { lineHeight: '150%' }],
}
```

Usage:

```tsx
<p className="text-krds-body-md">Body text (17px)</p>
<p className="text-krds-body-sm">Small text (15px)</p>
```

Spacing stays intact. `p-4 = 16px`, `m-8 = 32px`. No layout breaks.

## KRDS Color System

KRDS uses a numeric scale from 5 to 95:

```
primary-5  → lightest (surface/background)
primary-50 → base color
primary-60 → darker (text)
primary-95 → darkest
```

But remembering "which number is for what" is tedious.

## Semantic Tokens

HANUI supports both approaches:

### 1. Numeric Scale (Exact Colors)

```tsx
<div className="bg-krds-primary-50">Primary 50</div>
<div className="bg-krds-gray-90">Gray 90</div>
<div className="text-krds-danger-60">Danger 60</div>
```

### 2. Semantic Tokens (Purpose-based)

```tsx
<div className="bg-krds-primary-base">Base primary</div>
<div className="bg-krds-primary-surface">Primary background</div>
<div className="text-krds-primary-text">Primary text</div>
<div className="border-krds-primary-border">Primary border</div>
```

Semantic token mapping:

| Token   | Light Mode | Dark Mode |
| ------- | ---------- | --------- |
| base    | 50         | 50        |
| surface | 5          | 95        |
| text    | 60         | 20        |
| border  | 20         | 80        |

Dark mode just works. `krds-primary-text` automatically picks the right shade.

## Implementation

```
CSS Variables (variables.css)
    ↓
Tailwind Preset (tailwind.preset.ts)
    ↓
Components
```

### 1. CSS Variables

```css
/* variables.css */
:root {
  /* Numeric scale */
  --krds-color-light-primary-5: #eef2f7;
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #0b50d0;

  /* Semantic tokens */
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-primary-text: var(--krds-color-light-primary-60);
  --krds-primary-surface: var(--krds-color-light-primary-5);
}

.dark {
  /* Inverted for dark mode */
  --krds-color-light-primary-5: #020f27;
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #4c87f6;
}
```

### 2. Tailwind Preset

```ts
// tailwind.preset.ts
colors: {
  'krds-primary': {
    DEFAULT: 'var(--krds-primary-base)',
    base: 'var(--krds-primary-base)',
    text: 'var(--krds-primary-text)',
    surface: 'var(--krds-primary-surface)',
    5: 'var(--krds-color-light-primary-5)',
    50: 'var(--krds-color-light-primary-50)',
    60: 'var(--krds-color-light-primary-60)',
  },
}
```

### 3. Usage

```tsx
// Exact color
<Button className="bg-krds-primary-50 hover:bg-krds-primary-60">

// Semantic
<Button className="bg-krds-primary-base text-white">
```

## Responsive Typography

KRDS has different font sizes for mobile and desktop:

| Token      | Mobile | Desktop (1024px+) |
| ---------- | ------ | ----------------- |
| display-lg | 44px   | 60px              |
| display-md | 32px   | 44px              |
| heading-xl | 28px   | 40px              |
| heading-lg | 24px   | 32px              |

CSS variables + media queries handle this:

```css
:root {
  --krds-fs-display-lg: 44px;
  --krds-fs-heading-xl: 28px;
}

@media (min-width: 1024px) {
  :root {
    --krds-fs-display-lg: 60px;
    --krds-fs-heading-xl: 40px;
  }
}
```

```tsx
<h1 className="text-krds-display-lg">Auto-responsive heading</h1>;
{
  /* Mobile: 44px, Desktop: 60px */
}
```

No need for `lg:text-6xl` breakpoint classes.

## Quick Setup

```bash
npx hanui init
```

This copies the variables and configures Tailwind:

```ts
// tailwind.config.ts
import hanuiPreset from '@hanui/react/tailwind.preset';

export default {
  presets: [hanuiPreset],
};
```

```css
/* globals.css */
@import '@hanui/react/variables.css';
```

Done.

## Summary

- **Spacing**: 16px base (Tailwind default)
- **Typography**: Fixed px values (KRDS 17px base)
- **Colors**: Numeric scale + semantic tokens
- **Dark mode**: CSS variables handle it automatically
- **Responsive**: CSS variables + media queries

Setting this up manually takes half a day.

```bash
npx hanui init
```

One command. Done.

---

**GitHub**: https://github.com/hanui-o/hanui
**Docs**: https://hanui.io

---

Tags: #react #tailwindcss #designsystem #opensource #webdev
