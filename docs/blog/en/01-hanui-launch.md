# HANUI - Copy-Paste React Components for Korean Government Design System

Building a Korean government website? You need to follow KRDS (Korean Government Design System).

The problem: KRDS provides a 200+ page PDF guide. Colors, spacing, typography, components - all specified in detail. But no code. You have to implement everything yourself.

That's where HANUI comes in.

## What is HANUI?

HANUI is a React component library that implements KRDS. Copy-paste style, like shadcn/ui.

```bash
npx hanui init
npx hanui add button
```

That's it. Button component with KRDS styling is now in your project.

## Why "Copy-Paste"?

Traditional component libraries (MUI, Chakra) give you pre-built components. You install them, import them, use them.

The problem? Customization is painful. You fight against the library's opinions.

HANUI copies the actual source code into your project. You own it. Change anything you want.

```
your-project/
├── components/
│   └── ui/
│       ├── button.tsx      ← Your code now
│       ├── input.tsx
│       └── modal.tsx
```

## What's Included

### Components (20+)

- Button, Input, Textarea, Select
- Modal, Drawer, Toast
- Tabs, Accordion
- Table, Pagination
- Form validation with react-hook-form + zod
- And more...

### Design Tokens

- KRDS color palette (primary, secondary, gray, danger, warning, success, info)
- Typography scale (display, heading, body, label)
- Spacing system (8px grid)
- Responsive breakpoints

### Accessibility

- KWCAG 2.2 compliant (Korean Web Content Accessibility Guidelines)
- Keyboard navigation
- Screen reader support
- Focus management

## Tech Stack

- **React 18+**
- **TypeScript**
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Headless accessible primitives
- **class-variance-authority** - Type-safe variants

## Quick Start

```bash
# Initialize in your project
npx hanui init

# Add components you need
npx hanui add button input modal

# Use them
```

```tsx
import { Button } from '@/components/ui/button';

function App() {
  return (
    <Button variant="primary" size="md">
      Submit
    </Button>
  );
}
```

## Who is This For?

- **Korean government/public sector projects** - Need KRDS compliance
- **SI developers** - Tight deadlines, need ready-to-use components
- **Korean startups** - Want Korean-style design without building from scratch

## What HANUI is NOT

- Not a full design system documentation
- Not a replacement for understanding KRDS guidelines
- Not production-ready for all edge cases (yet - it's beta)

We're honest: this is an early-stage open source project. But it's already saving hours of work for developers who need KRDS-compliant React components.

## Get Started

```bash
npx hanui init
```

**GitHub**: https://github.com/hanui-o/hanui
**Documentation**: https://hanui.io

---

Tags: #react #opensource #designsystem #tailwindcss #webdev
