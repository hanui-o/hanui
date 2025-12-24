# Implementing Dark Mode with CSS Variables

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

Adding `.dark` branches to every component doubles your CSS.

CSS variables make it much cleaner.

## Basic Structure

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

One `.card` style. Mode switch just changes variable values.

## Semantic Tokens

Name colors by purpose for better clarity:

```css
:root {
  /* Light mode */
  --color-surface: #ffffff; /* cards, modals */
  --color-background: #f5f5f5; /* page background */
  --color-text-primary: #1a1a1a; /* main text */
  --color-text-secondary: #666666; /* secondary text */
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

`--color-surface` is clearer than `--color-gray-100`. No need to look up what it means.

## Using with Tailwind

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

No `dark:` prefix needed. It switches automatically.

## Mode Toggle Logic

```tsx
// theme-toggle.tsx
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect system preference
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

Key is adding/removing `dark` from `document.documentElement.classList`.

## Preventing Flash

SSR or Next.js has a flash problem on page load. Solution:

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

This script runs before render, no flash.

## Color Palette Tips

Don't just invert for dark mode:

```
❌ Light: #ffffff → Dark: #000000
   Too much contrast, hurts eyes

✅ Light: #ffffff → Dark: #1a1a1a
   Slightly lighter black is comfortable
```

Same for text:

```
❌ Light: #000000 → Dark: #ffffff
   Pure white causes eye strain

✅ Light: #1a1a1a → Dark: #f5f5f5
   Slightly darker white is better
```

## Proven Color Set

Battle-tested combinations:

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

Primary colors should be brighter in dark mode for visibility.

## Watch Out For

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
  /* Darker shadows in dark mode */
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
```

### 3. No Hardcoded Colors

```tsx
/* ❌ Dark mode won't work */
<div className="bg-white text-black">

/* ✅ Use variables */
<div className="bg-surface text-text-primary">
```

## Summary

1. Define colors as CSS variables
2. Change only variable values in `.dark`
3. Components reference only variables
4. Use semantic names (`surface`, `text-primary`, etc.)
5. Add flash prevention script for SSR

This makes dark mode maintenance much easier.

---

CSS, darkmode, CSSvariables, TailwindCSS, React, frontend
