# The Complete Guide to Button Accessibility

> Three ways to create clickable elements and why it matters

---

## Introduction

As a frontend developer, have you ever wondered whether to use `<div>`, `<button>`, or `<a>` when creating a clickable element?

You might think, "They all work the same with an `onClick` handler, right?" But from an **accessibility perspective, they're completely different**.

In this guide, we'll explore:

- Common mistakes and their consequences
- Manual accessibility implementation
- How HANUI automates everything

Let's dive in with real code examples.

---

## The Problem: Common Mistakes

### Case 1: Using `<div>` as a Button

```tsx
<div className="button" onClick={handleSubmit}>
  Submit
</div>
```

**Problems**:

1. **Not keyboard accessible**: Cannot be focused with Tab
2. **Screen reader can't identify it**: Only reads "Submit" text
3. **No semantic meaning**: No indication it's a button
4. **Enter/Space keys don't work**: Only mouse clicks work

**Result**:

- Keyboard-only users cannot access this element at all
- Screen reader users don't know it's a button

---

### Case 2: Using `<a>` as a Button

```tsx
<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
>
  Submit
</a>
```

**Problems**:

1. **Semantic confusion**: Is it a link or a button?
2. **Screen reader confusion**: Announces as "Submit link" (but it's a button!)
3. **Unnatural keyboard behavior**: Enter works, but Space doesn't
4. **Unnecessary `href`**: Using empty link or `#`

**Result**:

- Screen reader users are confused: "Is this a link or a button?"
- Keyboard users expect Space key to work, but it doesn't

---

## WCAG/KRDS Standards

### WCAG 2.2 Related Criteria

| Criterion                   | Level | Description                                     |
| --------------------------- | ----- | ----------------------------------------------- |
| **2.1.1 Keyboard**          | A     | All functionality must be operable via keyboard |
| **4.1.2 Name, Role, Value** | A     | All UI components must have a role and name     |

### KRDS Related Criteria

- **2.1.1 Keyboard Accessibility**: All functionality must be usable with keyboard only
- **3.3.1 Markup Error Prevention**: Proper use of start and end tags

---

## Manual Implementation (The Right Way)

### Method 1: Native `<button>` (Recommended)

```tsx
<button
  type="button"
  onClick={handleSubmit}
  aria-label="Submit registration form"
>
  Submit
</button>
```

**Advantages**:

- Automatically gets `role="button"`
- Focusable with Tab key
- Both Enter and Space keys work
- Screen reader announces "Submit button"

**Disadvantages**:

- Need to remove default styles
- Must specify `type` attribute (default is `submit` which submits forms)

---

### Method 2: `<div>` with ARIA (Not Recommended)

```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleSubmit}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSubmit();
    }
  }}
  aria-label="Submit registration form"
>
  Submit
</div>
```

**Required Attributes**:

1. `role="button"` - Defines button role
2. `tabIndex={0}` - Makes it focusable with Tab
3. `onKeyDown` - Handles Enter/Space key events
4. `aria-label` - Provides clear label

**Problems**:

- Too complex (10 lines → can be reduced to 1)
- Error-prone for developers
- Hard to maintain

**Conclusion**: **Just use `<button>`.**

---

## HANUI's Automated Solution

HANUI Button automatically handles all accessibility requirements.

### Using HANUI Button

```tsx
import { Button } from '@hanui/react';

<Button onClick={handleSubmit}>Submit</Button>;
```

**Automatically included features**:

```tsx
// Internally applies:
<button
  type="button" // Automatic
  role="button" // Automatic
  tabIndex={0} // Automatic
  onClick={handleSubmit}
  onKeyDown={(e) => {
    // Automatic
    if (e.key === 'Enter' || e.key === ' ') {
      handleSubmit();
    }
  }}
  aria-pressed={false} // Automatic (for toggle buttons)
>
  Submit
</button>
```

---

## Comparison: Three Approaches

| Implementation   | Keyboard Access | Screen Reader | Code Complexity | Maintenance    | Recommendation |
| ---------------- | --------------- | ------------- | --------------- | -------------- | -------------- |
| `<div>`          | ✗               | ✗             | Low             | Difficult      | ✗              |
| `<div>` + ARIA   | ✓               | ✓             | Very High       | Very Difficult | △              |
| `<button>`       | ✓               | ✓             | Medium          | Medium         | ○              |
| **HANUI Button** | ✓               | ✓             | **Very Low**    | **Very Easy**  | **◎**          |

---

## Real Example: Login Button

### Wrong Implementation

```tsx
function LoginForm() {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      {/* Problem 1: Using div as button */}
      <div className="login-button" onClick={handleLogin}>
        Login
      </div>

      {/* Problem 2: Using anchor as button */}
      <a href="#" onClick={handleForgotPassword}>
        Forgot Password
      </a>
    </form>
  );
}
```

---

### Fixed with HANUI

```tsx
import { Button } from '@hanui/react';

function LoginForm() {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      {/* All accessibility handled automatically */}
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>

      {/* Secondary button also accessible */}
      <Button variant="ghost" onClick={handleForgotPassword}>
        Forgot Password
      </Button>
    </form>
  );
}
```

---

## FAQ

### Q1. "Removing default `<button>` styles is annoying for design purposes?"

**A**: HANUI Button completely removes default styles and is fully customizable.

```tsx
<Button className="your-custom-class">Button</Button>
```

---

### Q2. "Why do I need `type="button"`?"

**A**: The default `type` for `<button>` is `submit`. To prevent unintended form submissions, you must specify `type="button"`.

```tsx
// Form will submit
<button onClick={handleClick}>Click</button>

// Form won't submit
<button type="button" onClick={handleClick}>Click</button>
```

HANUI Button automatically handles `type="button"`.

---

### Q3. "How to create Icon buttons?"

**A**: You must provide `aria-label`.

```tsx
import { Button } from '@hanui/react';
import { IconTrash } from '@hanui/icons';

<Button variant="icon" aria-label="Delete" onClick={handleDelete}>
  <IconTrash />
</Button>;
```

HANUI warns you when `aria-label` is missing for non-text children.

---

## Checklist

When creating a button, verify:

- [ ] Focusable with Tab key?
- [ ] Works with Enter key?
- [ ] Works with Space key?
- [ ] Screen reader announces "button"?
- [ ] Button's purpose is clear?
- [ ] Has `aria-label` for icon buttons?

**Using HANUI Button automatically checks all boxes ✅**

---

## Conclusion

Creating a button involves more accessibility considerations than you might think.

- Never use `<div>` + `onClick`
- Use `<button>`, but don't forget `type="button"`
- **HANUI Button automates everything**

Next up: **"6 Modal Accessibility Pitfalls"** - We'll explore complex accessibility issues like Focus Trap, ESC key handling, and more.

---

**Series**:

- [001] The Complete Guide to Button Accessibility (Current)
- ⏳ [002] 6 Modal Accessibility Pitfalls
- ⏳ [003] Select/Combobox ARIA Structure
- ⏳ [004] Form Accessibility Checklist

---

**Tags**: `#accessibility` `#a11y` `#react` `#button` `#wcag` `#webdev` `#hanui`

**Published**: January 15, 2025
**Author**: HANUI Team
**Platform**: Dev.to (@hanui)
