# rem vs px: When to Use Which CSS Unit

---

css, accessibility, responsive, frontend, webdev

Which CSS unit do you use?

```css
/* This? */
font-size: 16px;
padding: 24px;

/* Or this? */
font-size: 1rem;
padding: 1.5rem;
```

"rem is better" "px is more precise" - you've heard it all. The real answer is **it depends on the situation**.

## What's the Difference

### px (pixels)

Absolute unit. 1px is always 1px.

```css
.box {
  width: 200px; /* Always 200px */
  border: 1px solid #ccc; /* Always 1px */
}
```

### rem (root em)

Relative unit. Based on `html` element's `font-size`.

```css
html {
  font-size: 16px; /* Default */
}

.text {
  font-size: 1rem; /* = 16px */
  font-size: 1.5rem; /* = 24px */
  font-size: 0.875rem; /* = 14px */
}
```

## When to Use px

### 1. Borders and Shadows

```css
.card {
  border: 1px solid #e5e5e5; /* ✅ px */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* ✅ px */
}
```

1.5px border? Awkward. It's either 1px or 2px.

### 2. Icon Sizes

```css
.icon {
  width: 24px; /* ✅ px */
  height: 24px;
}
```

Icons look better at fixed sizes. A 24px icon scaling with text size looks weird.

### 3. Media Queries

```css
@media (max-width: 768px) {
  /* ✅ px */
  /* Mobile styles */
}
```

Breakpoints in px are more intuitive.

### 4. Min/Max Constraints

```css
.container {
  max-width: 1200px; /* ✅ px */
  min-height: 100px;
}
```

## When to Use rem

### 1. Font Sizes

```css
.heading {
  font-size: 2rem; /* ✅ rem */
}

.body {
  font-size: 1rem;
}

.caption {
  font-size: 0.875rem;
}
```

When users increase browser font size, rem scales. px doesn't.

**This is crucial for accessibility.**

### 2. Spacing

```css
.section {
  padding: 2rem; /* ✅ rem */
  margin-bottom: 1.5rem;
}
```

When font size increases, spacing should too for better readability.

### 3. Component Gaps

```css
.card {
  padding: 1.5rem;
  gap: 1rem;
}

.button {
  padding: 0.75rem 1.5rem;
}
```

## Accessibility is Key

Why rem matters:

```css
/* Browser setting: 150% font size */

/* Using px */
.text {
  font-size: 16px;
} /* Stays 16px. Doesn't scale */

/* Using rem */
.text {
  font-size: 1rem;
} /* Becomes 24px! */
```

Users with vision impairments increase their browser's base font size. With rem, the entire site scales proportionally. With px, it doesn't.

**Accessibility audits check for this.**

## The 62.5% Trick?

```css
html {
  font-size: 62.5%; /* 16px * 0.625 = 10px */
}

body {
  font-size: 1.6rem; /* = 16px */
}

.heading {
  font-size: 2.4rem; /* = 24px, easy math! */
}
```

Makes calculations easier, but... not recommended.

Problems:

1. Forces a non-standard base font size
2. Can break third-party library styles
3. Confusing for maintenance

Just use the 16px base. It's not that hard once you get used to it.

```
1rem = 16px
0.5rem = 8px
0.75rem = 12px
0.875rem = 14px
1.25rem = 20px
1.5rem = 24px
2rem = 32px
```

## In Tailwind CSS

Tailwind uses rem by default:

```html
<p class="text-base">16px (1rem)</p>
<p class="text-lg">18px (1.125rem)</p>
<p class="text-xl">20px (1.25rem)</p>

<div class="p-4">padding: 1rem</div>
<div class="mt-6">margin-top: 1.5rem</div>
```

But some things use px:

```html
<div class="border">1px border</div>
<div class="rounded-lg">8px border-radius</div>
```

The Tailwind team already figured this out for you.

## Summary

| Use Case       | Unit | Reason                                |
| -------------- | ---- | ------------------------------------- |
| Font size      | rem  | Accessibility, respects user settings |
| Margin/Padding | rem  | Scales with text                      |
| Borders        | px   | 1px looks natural                     |
| Shadows        | px   | Needs fine control                    |
| Icons          | px   | Fixed size looks better               |
| Media queries  | px   | Device-based                          |
| max-width      | px   | Layout constraints                    |

**Rule of thumb**: Text and spacing use rem, everything else uses px.

Keep it simple. Follow this principle and you'll nail both accessibility and responsive design.
