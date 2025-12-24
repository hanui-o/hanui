# How Long Does It Take to Build a Design System Button? Before/After Comparison

"Where's the design system documentation?"

If you've worked on government or enterprise projects, you've heard this. Then you open a 200-page PDF, hunt for color codes, copy spacing values, debate whether the border-radius is 4px or 8px... half a day gone for one button.

Today I'm showing you actual code. Before and after using a component library.

## Case 1: Building a Button

### Before: Implementing from Design System PDF

```tsx
// Step 1: Find color values in design guide (10 min)
// Primary: #0A5ECA, Hover: #0852B2, Active: #064794...

// Step 2: Write CSS (30 min)
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 80px;
  height: 48px;
  padding: 0 20px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  background-color: #0A5ECA;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #0852B2;
}

.btn-primary:active {
  background-color: #064794;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary:focus-visible {
  outline: 2px solid #0A5ECA;
  outline-offset: 2px;
}

// Step 3: Write component (20 min)
function Button({ children, ...props }) {
  return (
    <button className="btn-primary" {...props}>
      {children}
    </button>
  );
}

// Step 4: Add variants? (1 hour)
// secondary, tertiary, danger... find each color, add CSS

// Step 5: Add sizes? (30 min)
// xs, sm, md, lg, xl... calculate height, padding, font-size

// Total time: 2-3 hours
// And next project? Start over.
```

### After: Using HANUI

```bash
npx hanui add button
```

```tsx
import { Button } from '@/components/ui/button';

// Done. Use immediately.
<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger" size="lg">Delete</Button>
<Button loading>Saving...</Button>
<Button iconLeft={<Search />}>Search</Button>
```

**Time: 10 seconds**

8 variants, 6 sizes, loading state, icon support - all included. Accessibility? `aria-busy`, `aria-disabled`, focus ring - all applied.

## Case 2: Form Field

### Before: Manual Implementation

```tsx
function FormField({ label, error, helperText, required, children }) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>

      {/* How do I pass id, aria-describedby to children? */}
      {/* cloneElement? Context? */}
      {children}

      {error && (
        <div id={errorId} className="form-error" role="alert">
          {error}
        </div>
      )}

      {helperText && (
        <div id={helperId} className="form-helper">
          {helperText}
        </div>
      )}
    </div>
  );
}

// aria-describedby connection?
// Input error styling?
// Error icon?
// Screen reader support?
// ... complexity grows
```

### After: Using HANUI

```bash
npx hanui add form-field input
```

```tsx
import { FormField, FormLabel, FormError, FormHelperText } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';

<FormField status="error" required>
  <FormLabel>Email</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  <FormError>Invalid email format</FormError>
</FormField>

<FormField status="success">
  <FormLabel>Username</FormLabel>
  <Input value="hanui" />
  <FormHelperText>Username is available</FormHelperText>
</FormField>
```

Context automatically connects id and aria attributes. Error/success icons auto-display. `role="alert"`, `aria-live="polite"` applied.

## Case 3: Header + Mega Menu

This one takes days to build from scratch.

### Before: Consider All These

- Responsive (mobile hamburger menu)
- Mega menu dropdown
- Keyboard navigation (Tab, Arrow, Escape)
- Focus trap
- Scroll behavior (sticky/hide)
- WAI-ARIA patterns

Honestly, building this properly takes a week.

### After: Using HANUI

```bash
npx hanui add header
```

```tsx
import { HeaderWithMegaMenu } from '@/components/ui/header';

<HeaderWithMegaMenu
  title="Government24"
  navigation={[
    { label: 'Services', items: [...] },
    { label: 'Guide', items: [...] },
  ]}
  stickyBehavior="auto"
/>
```

Mega menu, mobile support, keyboard navigation, scroll behavior - all included.

## Real Comparison

| Task                    | Manual    | With Library |
| ----------------------- | --------- | ------------ |
| Button (with variants)  | 2-3 hours | 10 seconds   |
| Form Field (accessible) | 3-4 hours | 10 seconds   |
| Header + Mega Menu      | 3-5 days  | 10 seconds   |
| Select (search, multi)  | 1-2 days  | 10 seconds   |
| Modal (focus trap)      | Half day  | 10 seconds   |

Things often missed when building manually:

- `aria-describedby` connection
- `aria-expanded`, `aria-haspopup`
- Focus management
- Escape key to close
- Screen reader announcements

## The Hidden Cost

The real problem with manual implementation isn't just time.

**1. Inconsistency**

```css
/* Developer A */
.btn {
  border-radius: 4px;
}

/* Developer B */
.button {
  border-radius: 6px;
}

/* Developer C */
.custom-btn {
  border-radius: 8px;
}
```

**2. Missing Accessibility**

When you're busy, aria attributes get skipped. "I'll add them later" becomes "failed the audit."

**3. Maintenance Hell**

Design system updates? Manually update all components across all projects.

## Summary

Building design system components from scratch: hours to days.
Using a well-built component library: seconds.

If you're working on Korean government projects, [HANUI](https://hanui.io) provides KRDS-compliant React components out of the box.

```bash
npx hanui init
npx hanui add button input select form-field header modal
```

5 minutes to set up. Spend the rest of your time on business logic.

---

**GitHub**: https://github.com/hanui-o/hanui
**Documentation**: https://hanui.io

---

Tags: #react #designsystem #productivity #webdev #frontend
