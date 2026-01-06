# Mastering KRDS MegaMenu - Building Government Website Navigation

---

react, navigation, designsystem, webdev, accessibility

Building that complex header menu for government websites is a headache, right?

Keyboard navigation, focus management, ARIA attributes... so many details to handle.

## KRDS Navigation Types

Navigation patterns used in Korean Government Design System (KRDS):

| Component            | Use Case      | Complexity |
| -------------------- | ------------- | ---------- |
| Header               | Basic top bar | ⭐         |
| HeaderWithNavigation | Simple menu   | ⭐⭐       |
| HeaderWithMegaMenu   | Large menu    | ⭐⭐⭐     |
| HeaderWithPanelMenu  | Side panel    | ⭐⭐⭐     |

Most sites use HeaderWithMegaMenu.

## Basic Header

```tsx
import { Header } from '@hanui/react';

function App() {
  return (
    <Header
      siteName="Our Service"
      logo="/logo.svg"
      onLogoClick={() => router.push('/')}
    />
  );
}
```

Simple header with just a logo.

## HeaderWithNavigation (Simple Menu)

```tsx
import { HeaderWithNavigation } from '@hanui/react';

const menuItems = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Support', href: '/support' },
  { label: 'Notice', href: '/notice' },
];

function App() {
  return (
    <HeaderWithNavigation
      siteName="Our Service"
      logo="/logo.svg"
      menuItems={menuItems}
    />
  );
}
```

Use this for single-level menus.

## HeaderWithMegaMenu (Key Pattern)

For multi-level menus:

```tsx
import { HeaderWithMegaMenu } from '@hanui/react';

const megaMenuItems = [
  {
    label: 'About Us',
    subItems: [
      {
        category: 'Organization',
        items: [
          { label: 'Greeting', href: '/about/greeting' },
          { label: 'Org Chart', href: '/about/org' },
          { label: 'History', href: '/about/history' },
        ],
      },
      {
        category: 'Location',
        items: [
          { label: 'Main Building', href: '/location/main' },
          { label: 'Annex', href: '/location/annex' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    subItems: [
      {
        category: 'Main Services',
        items: [
          { label: 'Overview', href: '/business/intro' },
          { label: 'Current Projects', href: '/business/current' },
        ],
      },
    ],
  },
  {
    label: 'Support',
    subItems: [
      {
        category: 'Contact',
        items: [
          { label: 'FAQ', href: '/support/faq' },
          { label: 'Inquiry', href: '/support/qna' },
        ],
      },
    ],
  },
];

function App() {
  return (
    <HeaderWithMegaMenu
      siteName="Our Agency"
      logo="/logo.svg"
      menuItems={megaMenuItems}
    />
  );
}
```

This is the most common pattern in government websites.

## Menu Structure Tips

### 1. Maximum 3 Depth Levels

```
1st level: About Us
  └ 2nd level (category): Organization
      └ 3rd level (items): Greeting, Org Chart, History
```

Beyond 4 levels gets confusing for users.

### 2. Use Categories to Group Items

```tsx
{
  label: 'Information',
  subItems: [
    {
      category: 'Pre-Disclosure',
      items: [
        { label: 'Disclosure List', href: '/info/list' },
        { label: 'Request', href: '/info/request' },
      ],
    },
    {
      category: 'Post-Disclosure',
      items: [
        { label: 'Results', href: '/info/result' },
      ],
    },
  ],
}
```

## Automatic Accessibility

HANUI MegaMenu handles these automatically:

### Keyboard Navigation

- `Tab`: Move to next menu
- `Shift + Tab`: Move to previous menu
- `Enter` / `Space`: Expand submenu
- `Esc`: Close submenu
- `Arrow`: Navigate within submenu

### ARIA Attributes

```html
<!-- Auto-generated -->
<button aria-expanded="false" aria-haspopup="true" aria-controls="submenu-1">
  About Us
</button>
```

Essential for accessibility compliance.

### Focus Management

- Opening menu focuses first item
- Esc returns focus to original button
- Clicking outside auto-closes

## Mobile Responsive

```tsx
<HeaderWithMegaMenu
  siteName="Our Agency"
  logo="/logo.svg"
  menuItems={megaMenuItems}
  mobileBreakpoint="md"
/>
```

Automatic responsive handling - shows hamburger menu on mobile.

## Real-World Example

```tsx
import { HeaderWithMegaMenu, Button } from '@hanui/react';
import { useRouter } from 'next/navigation';

export function SiteHeader() {
  const router = useRouter();

  const menuItems = [
    {
      label: 'About',
      subItems: [
        {
          category: 'Organization',
          items: [
            { label: 'Greeting', href: '/about/greeting' },
            { label: 'Org Chart', href: '/about/org' },
            { label: 'History', href: '/about/history' },
          ],
        },
      ],
    },
    {
      label: 'Policy',
      subItems: [
        {
          category: 'Main Policies',
          items: [
            { label: 'Overview', href: '/policy/intro' },
            { label: 'Progress', href: '/policy/status' },
          ],
        },
      ],
    },
    {
      label: 'News',
      subItems: [
        {
          category: 'Updates',
          items: [
            { label: 'Notices', href: '/notice' },
            { label: 'Press', href: '/press' },
          ],
        },
      ],
    },
  ];

  return (
    <HeaderWithMegaMenu
      siteName="Public Service Portal"
      logo="/logo.svg"
      onLogoClick={() => router.push('/')}
      menuItems={menuItems}
      actions={
        <>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">Sign Up</Button>
        </>
      }
    />
  );
}
```

## Summary

1. **Simple menu** → HeaderWithNavigation
2. **Complex menu** → HeaderWithMegaMenu
3. **Side menu** → HeaderWithPanelMenu

Accessibility is handled automatically - just structure your data properly.

Check out more examples at [hanui.io/components/header](https://hanui.io/components/header).
