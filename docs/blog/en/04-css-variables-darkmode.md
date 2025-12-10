# CSS Variables for Dark Mode - The Clean Way

How do you implement dark mode?

```css
/* Like this? */
.dark .card {
  background: #1a1a1a;
  color: #ffffff;
}

.light .card {
  background: #ffffff;
  color: #1a1a1a;
}
```

Adding `.dark` variants to every component doubles your CSS.

CSS variables make it much cleaner.

## The Basic Pattern

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-border: #e5e5e5;
}

.dark {
  --color-bg: #1a1a1a;
  --color-text: #ffffff;
  --color-border: #333333;
}
```

```css
.card {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
```

One `.card` style. Mode toggle just changes variable values.

## Semantic Token Naming

Name colors by purpose, not appearance:

```css
:root {
  /* Light mode */
  --color-surface: #ffffff; /* Cards, modals */
  --color-background: #f5f5f5; /* Page background */
  --color-text-primary: #1a1a1a; /* Main text */
  --color-text-secondary: #666666; /* Secondary text */
  --color-border: #e5e5e5;
}

.dark {
  --color-surface: #262626;
  --color-background: #1a1a1a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a3a3a3;
  --color-border: #404040;
}
```

`--color-surface` is clearer than `--color-gray-100`. No looking up "which gray was that?"

## With Tailwind CSS

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
      },
    },
  },
};
```

```tsx
<div className="bg-surface text-text-primary border-border">
  <p className="text-text-secondary">Secondary text</p>
</div>
```

No `dark:` prefix needed. Variables handle it.

## The Toggle Logic

```tsx
// theme-toggle.tsx
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    // Check saved preference
    const saved = localStorage.getItem('theme');

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  function toggle() {
    const newValue = !isDark;
    setIsDark(newValue);

    if (newValue) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <button onClick={toggle}>{isDark ? 'Light Mode' : 'Dark Mode'}</button>
  );
}
```

Key: Toggle `dark` class on `document.documentElement`.

## Preventing Flash

SSR/Next.js apps flash light mode before hydration. Fix with inline script:

```html
<!-- layout.tsx or _document.tsx -->
<head>
  <script dangerouslySetInnerHTML={{
    __html: `
      (function() {
        var theme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (theme === 'dark' || (!theme && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      })();
    `
  }} />
</head>
```

This runs before render. No flash.

## Color Palette Tips

Don't just invert colors:

```
❌ Light: #ffffff → Dark: #000000
   Too much contrast. Eye strain.

✅ Light: #ffffff → Dark: #1a1a1a
   Slightly lighter black is easier on eyes.
```

Same for text:

```
❌ Light: #000000 → Dark: #ffffff
   Pure white is harsh.

✅ Light: #1a1a1a → Dark: #f5f5f5
   Slightly off-white is better.
```

## Production-Ready Color Set

Tested and balanced:

```css
:root {
  /* Surface */
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;

  /* Background */
  --color-background: #f5f5f5;

  /* Text */
  --color-text-primary: #171717;
  --color-text-secondary: #525252;
  --color-text-tertiary: #a3a3a3;

  /* Border */
  --color-border: #e5e5e5;
  --color-border-strong: #d4d4d4;

  /* Primary */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
}

.dark {
  --color-surface: #262626;
  --color-surface-elevated: #333333;

  --color-background: #171717;

  --color-text-primary: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-text-tertiary: #737373;

  --color-border: #404040;
  --color-border-strong: #525252;

  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
}
```

Note: Primary color is lighter in dark mode for visibility.

## Common Gotchas

### 1. Images

```css
/* Invert logo in dark mode */
.dark .logo {
  filter: invert(1);
}

/* Or prepare two versions */
```

### 2. Shadows

```css
:root {
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark {
  /* Darker shadow in dark mode */
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
```

### 3. Hardcoded Colors

```tsx
/* ❌ Breaks dark mode */
<div className="bg-white text-black">

/* ✅ Use variables */
<div className="bg-surface text-text-primary">
```

## Summary

1. Define colors as CSS variables
2. Override in `.dark` class
3. Components reference variables only
4. Use semantic names (`surface`, `text-primary`)
5. Add flash-prevention script for SSR

Clean, maintainable, automatic dark mode.

---

**Example implementation**: [HANUI](https://hanui.io) uses this pattern with KRDS (Korean Government Design System) tokens.

---

Tags: #css #darkmode #tailwindcss #react #webdev
