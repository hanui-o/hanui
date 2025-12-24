# React Accessibility Checklist - Pass Government Audits First Time

Ever failed an accessibility audit?

"Non-compliant with WCAG" - seeing that label is painful. Fix it, resubmit, fix again... deadlines slip.

Here are the accessibility issues that commonly fail in React projects. Check these before the audit.

## Top 5 Common Failures

### 1. Image Alt Text

```tsx
// ❌ Wrong
<img src="/logo.png" />

// ✅ Correct
<img src="/logo.png" alt="Company logo" />

// ✅ Decorative images get empty alt
<img src="/decoration.png" alt="" />
```

Screen readers can't see images, so alt text describes them.

### 2. Form Label Connection

```tsx
// ❌ Label not connected to input
<label>Email</label>
<input type="email" />

// ✅ Connected with htmlFor
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Or wrap with label
<label>
  Email
  <input type="email" />
</label>
```

Clicking the label should focus the input.

### 3. Button Text

```tsx
// ❌ Icon-only button without label
<button>
  <SearchIcon />
</button>

// ✅ Add aria-label
<button aria-label="Search">
  <SearchIcon />
</button>

// ✅ Or add visually hidden text
<button>
  <SearchIcon />
  <span className="sr-only">Search</span>
</button>
```

Without text, screen readers just say "button". Tell users what it does.

### 4. Keyboard Accessibility

```tsx
// ❌ div as button - not keyboard accessible
<div onClick={handleClick}>Click me</div>

// ✅ Use actual button
<button onClick={handleClick}>Click me</button>

// ✅ If you must use div
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

Must be reachable with Tab and activatable with Enter/Space.

### 5. Focus Indicator

```css
/* ❌ Don't remove focus outline without replacement */
button {
  outline: none;
}

/* ✅ If removing, provide alternative */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #0a5eca;
}
```

Keyboard users need to see where they are.

## Component Checklists

### Modal/Dialog

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
  {/* content */}
</div>
```

- [ ] `role="dialog"` or `<dialog>` element
- [ ] `aria-modal="true"`
- [ ] Title connected with `aria-labelledby`
- [ ] Focus moves inside on open
- [ ] Focus returns to trigger on close
- [ ] Escape key closes it
- [ ] Focus trap (can't tab outside)

### Dropdown/Select

```tsx
<button
  aria-haspopup="listbox"
  aria-expanded={isOpen}
  aria-controls="dropdown-list"
>
  Select...
</button>
<ul id="dropdown-list" role="listbox">
  <li role="option" aria-selected={selected}>Option 1</li>
</ul>
```

- [ ] `aria-haspopup="listbox"` or `"menu"`
- [ ] `aria-expanded` state management
- [ ] Arrow keys navigate options
- [ ] Enter to select
- [ ] Escape to close

### Tabs

```tsx
<div role="tablist">
  <button role="tab" aria-selected={activeTab === 0} aria-controls="panel-0">
    Tab 1
  </button>
</div>
<div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
  Panel content
</div>
```

- [ ] `role="tablist"`, `role="tab"`, `role="tabpanel"`
- [ ] `aria-selected` state
- [ ] Arrow keys switch tabs
- [ ] Tab and panel connected (`aria-controls`, `aria-labelledby`)

## Automated Testing Tools

### eslint-plugin-jsx-a11y

```bash
npm install -D eslint-plugin-jsx-a11y
```

```js
// .eslintrc.js
module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
};
```

Catches accessibility issues while coding.

### axe DevTools

Chrome extension. Scan any page for accessibility issues.

### Lighthouse

Chrome DevTools > Lighthouse > Accessibility. Score of 100 means basics are covered.

## The Easy Way

Honestly, tracking all this while developing is hard.

That's why using a component library with built-in accessibility helps.

[HANUI](https://hanui.io) is a KRDS-based React component library with all the above accessibility features built in.

```bash
npx hanui add button modal select
```

Button aria-label warnings, modal focus traps, select keyboard navigation... all included.

## Pre-Audit Checklist

- [ ] All images have alt text
- [ ] All form elements have connected labels
- [ ] All functionality works with keyboard only
- [ ] Focus indicators are visible
- [ ] Color contrast is 4.5:1 or higher
- [ ] Modal/dropdown keyboard behavior works
- [ ] No eslint-plugin-jsx-a11y errors
- [ ] Lighthouse accessibility score 90+

Check all these before the audit and pass first time.

---

React, accessibility, WCAG, a11y, aria, screenreader, frontend
