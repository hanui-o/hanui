# Building a Design System with Tailwind CSS

"Tailwind is utility classes. Does it work for design systems?"

Yes. Actually, it works great.

The core of a design system is **consistency**. Colors, spacing, typography following defined rules.

Tailwind enforces that. `p-4` is always 16px. `text-sm` is always 14px. No developer variance.

## Basic Structure

```
Design Tokens (CSS Variables)
    ↓
Tailwind Config (tailwind.config)
    ↓
Utility Classes (bg-primary, text-sm)
    ↓
Components
```

## 1. Color Tokens

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6', // base
          600: '#2563eb', // hover
          700: '#1d4ed8', // active
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          900: '#111827',
        },
      },
    },
  },
};
```

Now you can use `bg-primary-500`, `text-gray-900`.

### CSS Variables Are Better

```css
/* globals.css */
:root {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
}

.dark {
  --color-primary-500: #60a5fa;
  --color-primary-600: #3b82f6;
}
```

```ts
// tailwind.config.ts
colors: {
  primary: {
    500: 'var(--color-primary-500)',
    600: 'var(--color-primary-600)',
  },
}
```

Dark mode switching happens automatically.

## 2. Typography

```ts
// tailwind.config.ts
fontSize: {
  'display-lg': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
  'display-md': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
  'heading-lg': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
  'heading-md': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
  'body-lg': ['18px', { lineHeight: '1.6' }],
  'body-md': ['16px', { lineHeight: '1.6' }],
  'body-sm': ['14px', { lineHeight: '1.6' }],
},
```

```tsx
<h1 className="text-display-lg">Large Title</h1>
<h2 className="text-heading-lg">Medium Title</h2>
<p className="text-body-md">Body text</p>
```

### Responsive Typography

CSS variables make responsive easy:

```css
:root {
  --fs-display-lg: 36px;
}

@media (min-width: 1024px) {
  :root {
    --fs-display-lg: 48px;
  }
}
```

```ts
fontSize: {
  'display-lg': ['var(--fs-display-lg)', { lineHeight: '1.2' }],
}
```

Single `text-display-lg` handles mobile and desktop.

## 3. Spacing

Tailwind's default spacing works, but for custom:

```ts
spacing: {
  'xs': '4px',
  'sm': '8px',
  'md': '16px',
  'lg': '24px',
  'xl': '32px',
  '2xl': '48px',
  '3xl': '64px',
},
```

```tsx
<div className="p-md mb-lg">{/* padding: 16px, margin-bottom: 24px */}</div>
```

Honestly, Tailwind defaults (`p-4`, `mb-6`) are sufficient. It's an 8px grid system.

## 4. Building Components

With tokens set up, build components:

```tsx
// Button.tsx
const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
};

const sizes = {
  sm: 'h-8 px-3 text-body-sm',
  md: 'h-10 px-4 text-body-md',
  lg: 'h-12 px-6 text-body-lg',
};

export function Button({ variant = 'primary', size = 'md', ...props }) {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} rounded-md font-medium`}
      {...props}
    />
  );
}
```

### Type-Safe with cva

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      },
      size: {
        sm: 'h-8 px-3 text-body-sm',
        md: 'h-10 px-4 text-body-md',
        lg: 'h-12 px-6 text-body-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants>;
// { variant?: 'primary' | 'secondary', size?: 'sm' | 'md' | 'lg' }
```

Autocomplete and type checking included.

## 5. Distribute as Preset

For team use or multiple projects, create a preset:

```ts
// my-preset.ts
const myPreset = {
  theme: {
    extend: {
      colors: {
        /* ... */
      },
      fontSize: {
        /* ... */
      },
    },
  },
};

export default myPreset;
```

```ts
// tailwind.config.ts
import myPreset from './my-preset';

export default {
  presets: [myPreset],
  // project-specific additions
};
```

## Design System Checklist

Must-haves:

- [ ] Color tokens (primary, secondary, gray, danger, success)
- [ ] Typography scale (display, heading, body, label)
- [ ] Spacing system (8px grid recommended)
- [ ] Border radius
- [ ] Shadows
- [ ] Base components (Button, Input, Card, etc.)

## For Government Projects

Need to follow KRDS (Korean Design System).

Color codes, font sizes, spacing - all specified. Setting it up manually takes a day.

[HANUI](https://hanui.io) has KRDS tokens pre-applied as a Tailwind preset.

```ts
// tailwind.config.ts
import hanuiPreset from '@hanui/react/tailwind.preset';

export default {
  presets: [hanuiPreset],
};
```

```tsx
<p className="text-krds-body-md text-krds-gray-90">KRDS styled text</p>
<Button className="bg-krds-primary-50">KRDS button</Button>
```

Colors, typography, responsive - all KRDS compliant.

---

TailwindCSS, designsystem, React, CSSvariables, cva, frontend
