# Next.js + HANUI Project Setup Guide

---

nextjs, react, tailwindcss, designsystem, webdev

Want to use HANUI in your Next.js project but not sure where to start?

Here's a step-by-step guide to get you up and running quickly.

## 1. Create Next.js Project

```bash
npx create-next-app@latest my-krds-project
```

Configuration options:

```
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like your code inside a `src/` directory? Yes
✔ Would you like to use App Router? Yes
✔ Would you like to use Turbopack? Yes
✔ Would you like to customize the import alias? Yes (@/*)
```

Tailwind CSS is **required** since HANUI is built on Tailwind.

## 2. Install HANUI

```bash
cd my-krds-project
npx hanui init
```

The CLI handles:

- Installing `@hanui/react` package
- Configuring `tailwind.config.ts` with KRDS settings
- Setting up `globals.css` styles
- Creating `lib/utils.ts` with cn utility
- Generating `components.json` config

## 3. Add Components

```bash
# Add individual components
npx hanui add button
npx hanui add input
npx hanui add card

# Or add multiple at once
npx hanui add button input card alert badge
```

Components are installed to `src/components/ui/`:

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
└── ...
```

## 4. Use Components

```tsx
// app/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>KRDS Components</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="mb-4">Built quickly with HANUI</p>
          <Button>Get Started</Button>
        </CardBody>
      </Card>
    </main>
  );
}
```

## 5. Font Configuration

KRDS uses Pretendard GOV font. Add to `app/layout.tsx`:

```tsx
// app/layout.tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../fonts/PretendardGOV-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PretendardGOV-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/PretendardGOV-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/PretendardGOV-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

Or use CDN:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-gov.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 6. Tailwind Configuration

`npx hanui init` sets this up automatically, but for manual setup:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { hanuiPreset } from '@hanui/react/preset';

const config: Config = {
  presets: [hanuiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@hanui/react/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
```

The `hanuiPreset` includes all KRDS colors, typography, and spacing.

## 7. Common Layout Structure

Standard Korean Government Design System (KRDS) layout:

```tsx
// app/layout.tsx
import { Masthead, Header, Footer, SkipLink } from '@hanui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SkipLink />
        <Masthead />
        <Header siteName="My Service" logo="/logo.svg" />
        <main id="main-content">{children}</main>
        <Footer siteName="My Service" copyright="© 2025" />
      </body>
    </html>
  );
}
```

`SkipLink` is required for accessibility - it lets keyboard users skip to main content.

## 8. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` to see your app.

## Recommended Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/           # HANUI components
│   └── common/       # Project-specific components
├── lib/
│   └── utils.ts      # cn utility
└── fonts/            # Local fonts (optional)
```

## Troubleshooting

### Tailwind Classes Not Working

Check `content` paths in `tailwind.config.ts`:

```ts
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  './node_modules/@hanui/react/**/*.{js,ts,jsx,tsx}', // Required
],
```

### Font Not Applied

Add to `globals.css`:

```css
body {
  font-family: var(--font-pretendard), 'Pretendard', sans-serif;
}
```

### TypeScript Errors

Check `tsconfig.json` paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Summary

1. `create-next-app` (with Tailwind)
2. `npx hanui init`
3. `npx hanui add [component]`
4. Configure fonts
5. Set up layout

5 minutes to a fully configured KRDS-based project.

Check out [hanui.io](https://hanui.io) for more details.
