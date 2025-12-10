# Building a shadcn/ui Style Component Library for Korean Government Design System

shadcn/ui changed how we think about component libraries. Instead of installing a package, you copy the source code into your project. You own it. You customize it.

I built HANUI using the same approach - but for KRDS (Korean Government Design System).

Here's how it works under the hood.

## The Architecture

```
┌─────────────────────────────────────────────┐
│  CLI (npx hanui add button)                 │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  Component Registry (components.json)       │
│  - Component definitions                    │
│  - Dependencies                             │
│  - File paths                               │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  Your Project                               │
│  components/ui/button.tsx  ← copied here    │
└─────────────────────────────────────────────┘
```

## The CLI

The CLI is the entry point. It handles:

1. **init** - Sets up your project
2. **add** - Copies components to your project
3. **diff** - Shows what changed (coming soon)

```bash
npx hanui init
# Creates:
# - components.json (config)
# - Copies variables.css (design tokens)
# - Updates tailwind.config.ts (adds preset)
```

```bash
npx hanui add button modal input
# Copies:
# - components/ui/button.tsx
# - components/ui/modal.tsx
# - components/ui/input.tsx
# - Any dependencies (like cn utility)
```

## Component Structure

Each component follows a consistent pattern:

```tsx
// button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-krds-primary-base text-white hover:bg-krds-primary-60',
        secondary: 'bg-krds-gray-10 text-krds-gray-90 hover:bg-krds-gray-20',
        tertiary:
          'bg-transparent text-krds-primary-base hover:bg-krds-primary-5',
        danger: 'bg-krds-danger-base text-white hover:bg-krds-danger-60',
      },
      size: {
        sm: 'h-8 px-3 text-krds-label-sm',
        md: 'h-10 px-4 text-krds-label-md',
        lg: 'h-12 px-6 text-krds-label-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
      {loading && <Spinner className="mr-2" aria-hidden />}
      {children}
    </button>
  );
}
```

Key patterns:

- **cva** for type-safe variants
- **cn** utility for merging classNames
- **KRDS tokens** in Tailwind classes (`krds-primary-base`, `krds-label-md`)
- **Accessibility** built-in (`aria-busy`)

## Design Token System

KRDS has specific color, typography, and spacing values. We implement them as CSS variables + Tailwind preset.

### CSS Variables (variables.css)

```css
:root {
  /* Colors */
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #0b50d0;

  /* Semantic tokens */
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-primary-text: var(--krds-color-light-primary-60);

  /* Typography */
  --krds-fs-body-md: 17px;
  --krds-fs-heading-lg: 24px;
}

.dark {
  /* Dark mode overrides */
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-primary-text: var(--krds-color-light-primary-40);
}
```

### Tailwind Preset (tailwind.preset.ts)

```ts
const hanuiPreset = {
  theme: {
    extend: {
      colors: {
        'krds-primary': {
          DEFAULT: 'var(--krds-primary-base)',
          base: 'var(--krds-primary-base)',
          text: 'var(--krds-primary-text)',
          50: 'var(--krds-color-light-primary-50)',
          60: 'var(--krds-color-light-primary-60)',
        },
      },
      fontSize: {
        'krds-body-md': ['17px', { lineHeight: '150%' }],
        'krds-heading-lg': [
          'var(--krds-fs-heading-lg)',
          { lineHeight: '150%', fontWeight: '700' },
        ],
      },
    },
  },
};
```

This gives you Tailwind classes that map to KRDS values:

```tsx
<p className="text-krds-body-md text-krds-gray-90">KRDS-compliant text</p>
```

## Radix UI Integration

Complex components (Modal, Select, Tabs) are built on Radix UI primitives.

Why Radix?

- **Accessibility** - WAI-ARIA compliant out of the box
- **Unstyled** - We apply KRDS styling
- **Composable** - Flexible compound component API

```tsx
// modal.tsx
import * as Dialog from '@radix-ui/react-dialog';

export function Modal({ children, ...props }) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const ModalTitle = Dialog.Title;
export const ModalDescription = Dialog.Description;
export const ModalClose = Dialog.Close;
```

We get:

- Focus trap
- Escape key handling
- Screen reader announcements
- Scroll lock

For free. We just add KRDS styling.

## Why This Approach?

### 1. Full Control

You own the code. Need to change how buttons look? Edit `button.tsx`. No fighting with library internals.

### 2. No Runtime Dependency

Components are copied, not imported from `node_modules`. Your bundle only includes what you use.

### 3. Tailwind Native

Everything uses Tailwind. Consistent with modern React projects.

### 4. Type Safety

TypeScript + cva = autocomplete for variants, compile-time checks.

### 5. Accessible by Default

Radix primitives + ARIA attributes. KWCAG compliance built-in.

## Trade-offs

- **No automatic updates** - You have to manually update components
- **Larger initial setup** - More files in your project
- **Learning curve** - Understanding the component structure

For KRDS projects where customization is inevitable, these trade-offs are worth it.

## Get Started

```bash
npx hanui init
npx hanui add button input modal select tabs
```

**GitHub**: https://github.com/hanui-o/hanui
**Documentation**: https://hanui.io

---

Tags: #react #typescript #tailwindcss #designsystem #opensource
