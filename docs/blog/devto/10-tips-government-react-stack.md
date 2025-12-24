# Government/Enterprise React Tech Stack 2025

Starting a government React project in 2025? What should you use?

I've thought about this a lot. Air-gapped environments, accessibility audits, strict deadlines... it's different from consumer apps.

Here's what I've learned from years of government SI projects.

## Framework

### Next.js (App Router)

```bash
npx create-next-app@latest my-project
```

Next.js 15 is out in 2025. App Router is stable, Server Components work well.

However, government sites are often static, so `output: 'export'` is common.

```js
// next.config.js
module.exports = {
  output: 'export',
  // Static build, just deploy to nginx
};
```

### Vite (When No SSR Needed)

```bash
npm create vite@latest my-project -- --template react-ts
```

For static files only, Vite is simpler. Fast builds too.

## Styling

### Tailwind CSS 4.x

```bash
npm install tailwindcss @tailwindcss/vite
```

Tailwind 4 is out. CSS-first config, no tailwind.config.js needed.

Why Tailwind for government projects:

- Styles visible from class names (easier handoffs)
- Easy design system tokenization
- Small bundle size (purged)

### Design System Tokens

Government projects often require specific design systems (like KRDS in Korea, or USWDS in the US).

```css
@theme {
  --font-size-body-md: 1rem;
  --font-size-body-lg: 1.125rem;
  --color-primary-base: #005ea2;
}
```

Set up tokens as a Tailwind preset for reuse.

## Component Libraries

### Options

| Library   | Features                               | Government Fit        |
| --------- | -------------------------------------- | --------------------- |
| MUI       | Most components, Material based        | △ (hard to customize) |
| Chakra UI | Good accessibility, easy customization | ○                     |
| shadcn/ui | Full ownership, free to modify         | ◎                     |
| Radix UI  | Headless, accessible primitives        | ◎                     |

Government projects need lots of design modifications. "Change this button color to match the style guide."

Libraries where you own the code work best. shadcn/ui style - copy code into your project.

### shadcn/ui

```bash
npx shadcn@latest init
npx shadcn@latest add button
```

Components copy into your project. Full modification freedom, no update breakage.

Downside: need to customize to match design system.

## State Management

### Zustand

```tsx
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

Simple. 90% less boilerplate than Redux. Great for fast-paced government SI.

### TanStack Query (React Query)

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});
```

Use this for server state. Handles caching, refetching, error handling.

## Form Management

### react-hook-form

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

<input {...register('email', { required: true })} />;
```

Government sites have lots of forms. Registration, applications, complaints...

react-hook-form handles validation, errors, and performance.

### zod (Schema Validation)

```tsx
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

const { register } = useForm({
  resolver: zodResolver(schema),
});
```

Type-safe validation. Perfect with TypeScript.

## Tables

### TanStack Table

```tsx
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

Government sites have lots of list views. Pagination, sorting, filtering... TanStack Table handles it all.

## Dates

### date-fns

```tsx
import { format, parseISO } from 'date-fns';

format(new Date(), 'MMMM dd, yyyy');
// "January 15, 2025"
```

Don't use moment.js anymore. Bundle size too big. date-fns is tree-shakeable.

## Air-Gapped Environments

Many government agencies have air-gapped networks. No `npm install`.

### Option 1: Package Mirroring

Internal Nexus or Verdaccio mirroring. Request from IT department.

### Option 2: Bundle node_modules

```bash
npm install --production
tar -czvf node_modules.tar.gz node_modules/
```

Compress installed node_modules and transfer. Primitive but reliable.

### Option 3: Build Files Only

```bash
npm run build
```

Transfer only built files. Cleanest approach.

## Accessibility

Government sites must meet WCAG 2.2. Failing audits delays everything.

### Checklist

- [ ] All images have alt text
- [ ] Form elements have connected labels
- [ ] All functionality works with keyboard
- [ ] Focus indicators visible
- [ ] Color contrast 4.5:1 or higher
- [ ] Error messages reach screen readers

## 2025 Recommended Stack Summary

```
Framework:     Next.js 15 (App Router) or Vite
Styling:       Tailwind CSS 4
Components:    shadcn/ui or Radix-based custom
State:         Zustand + TanStack Query
Form:          react-hook-form + zod
Table:         TanStack Table
Date:          date-fns
Type:          TypeScript 5
```

Project requirements vary. But this combination covers most government/enterprise SI work.

---

React, government, techstack, NextJS, TailwindCSS, 2025, enterprise, frontend
