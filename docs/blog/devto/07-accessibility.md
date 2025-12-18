# Building Accessible React Components - What We Learned from WCAG Compliance

Ever failed an accessibility audit?

I have. Multiple times.

Missing aria attributes, no keyboard navigation, invisible focus indicators... when you're rushing to meet deadlines, these get overlooked. Then the audit fails and your timeline implodes.

So when we built HANUI (a React component library), we baked accessibility in from day one.

## What's WCAG/KWCAG?

WCAG (Web Content Accessibility Guidelines) is the international standard. KWCAG is the Korean version, largely based on WCAG 2.1/2.2.

The core principles:

| Principle      | What It Means                     |
| -------------- | --------------------------------- |
| Perceivable    | Alt text, color contrast          |
| Operable       | Keyboard access, focus indicators |
| Understandable | Labels, error messages            |
| Robust         | Valid markup, proper ARIA usage   |

## How We Handle Button Accessibility

```tsx
// HANUI Button with loading state
<Button loading>Saving...</Button>
```

Renders as:

```html
<button aria-busy="true" aria-disabled="true" disabled>
  <svg class="animate-spin" aria-hidden="true">...</svg>
  Saving...
</button>
```

What's automatic:

- `aria-busy`: Tells screen readers something is loading
- `aria-disabled`: Communicates disabled state
- `aria-hidden` on spinner: Decorative elements shouldn't be read

### Icon Button Warnings

```tsx
// This triggers a dev mode warning
<Button size="icon" iconLeft={<Search />} />
// ⚠️ Console: Icon-only buttons must have an aria-label

// Correct usage
<Button size="icon" iconLeft={<Search />} aria-label="Search" />
```

Buttons without text are meaningless to screen readers. We warn developers before it becomes an audit failure.

## Form Accessibility

```tsx
<FormField status="error" required>
  <FormLabel>Email</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  <FormError>Invalid email format</FormError>
</FormField>
```

Renders as:

```html
<div>
  <label for=":r1:">
    Email
    <span aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </label>
  <input
    id=":r1:"
    type="email"
    aria-invalid="true"
    aria-required="true"
    aria-describedby=":r1:-error"
  />
  <div id=":r1:-error" role="alert" aria-live="polite">
    Invalid email format
  </div>
</div>
```

What's automatic:

- `id`/`htmlFor` connection via React.useId()
- `aria-describedby` links input to error message
- `aria-invalid` signals error state
- `role="alert"` makes screen readers announce errors immediately
- Required indicator: visual `*` + screen reader text "(required)"

## Modal Accessibility

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>
    <ModalTitle>Confirm Delete</ModalTitle>
  </ModalHeader>
  <ModalBody>Are you sure you want to delete this?</ModalBody>
  <ModalFooter>
    <Button variant="tertiary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="danger">Delete</Button>
  </ModalFooter>
</Modal>
```

What HANUI Modal handles automatically:

### 1. Focus Trap

When modal opens, Tab cycles only within the modal. Can't escape to page behind.

### 2. Focus Return

When modal closes, focus returns to the element that opened it.

### 3. Escape Key

Pressing Escape closes the modal.

### 4. ARIA Attributes

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Delete</h2>
  ...
</div>
```

Building this manually is complex. We use Radix UI primitives which handle it correctly.

## Select/Dropdown Accessibility

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="seoul">Seoul</SelectItem>
    <SelectItem value="busan">Busan</SelectItem>
  </SelectContent>
</Select>
```

Keyboard behavior:

- `Enter`/`Space`: Open dropdown
- `↑`/`↓`: Navigate options
- `Enter`: Select
- `Escape`: Close
- Typing: Jump to matching option

ARIA attributes:

- `aria-haspopup="listbox"`
- `aria-expanded`
- `role="listbox"`, `role="option"`
- `aria-selected`

## Focus Indicators

```css
/* HANUI default focus style */
focus:outline-none
focus:ring-2
focus:ring-primary
focus:ring-offset-2
```

Never just `outline: none`. Always provide alternative focus styling. Keyboard users need to see where they are.

## Color Contrast

Design system colors should meet WCAG contrast requirements:

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

KRDS color tokens are designed to meet these requirements. Use them and you're covered.

## Common Accessibility Checklist

HANUI handles most of these, but always verify:

- [ ] All images have alt text
- [ ] Icon buttons have aria-label
- [ ] Lighthouse accessibility score 90+
- [ ] All functionality works with keyboard only

## Why Build It In?

We could have shipped components faster without accessibility. But:

1. **Retrofitting is painful** - Adding accessibility after the fact means touching every component
2. **Developers forget** - When rushing, aria attributes get skipped
3. **Audits are expensive** - Failed audits mean rework and delayed launches
4. **It's the right thing to do** - The web should be usable by everyone

## Try It

```bash
npx hanui add button form-field modal select
```

aria attributes, keyboard navigation, focus management - all included.

Pass your accessibility audit on the first try.

---

**GitHub**: https://github.com/hanui-o/hanui
**Documentation**: https://hanui.io

---

Tags: #accessibility #react #a11y #webdev #wcag
