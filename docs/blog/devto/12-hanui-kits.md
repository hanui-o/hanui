---
title: HANUI Kits - Copy-Paste Ready Feature Patterns for React
published: true
tags: react, typescript, opensource, webdev
cover_image: https://hanui.io/og-image.png
---

Components alone aren't enough.

You copy Button, Input, and Table for a board feature, but what about state management? API calls? Pagination logic? You end up writing it from scratch every time.

That's why I built **HANUI Kits** - feature patterns with components + business logic included.

## What are Kits?

Pre-built patterns for common features in real-world applications:

- **Board Kit**: CRUD operations, comments, search, pagination
- **Auth Kit**: Login, signup, password reset, token refresh
- **Table Kit**: Sorting, filtering, pagination, CSV export
- **Form Kit**: Multi-step forms, file upload, dynamic fields
- **Dashboard Kit**: Stat cards, charts, activity feed

## Tech Stack

All Kits use this consistent stack:

```
Zustand         → Client state (lightweight)
React Query     → Server state (caching, refetching)
Axios           → HTTP client
React Hook Form → Form handling
Zod             → Schema validation
```

## Quick Start

```bash
# Install dependencies
npm install zustand @tanstack/react-query axios react-hook-form zod

# Add Board Kit
npx hanui add kit board
```

## Board Kit Example

Complete board functionality in 9 files:

```
board/
├── types/post.ts       # Type definitions
├── api/posts.ts        # API functions
├── hooks/usePosts.ts   # React Query hooks
├── stores/postStore.ts # Zustand store
├── components/
│   ├── PostCard.tsx    # Card component
│   ├── PostList.tsx    # List + search + filter
│   ├── PostDetail.tsx  # Detail + comments
│   └── PostForm.tsx    # Create/edit form
└── index.ts            # Entry point
```

### Usage

```tsx
import { PostList } from '@/kits/board';

export default function BoardPage() {
  return (
    <PostList
      basePath="/board"
      categories={['Announcements', 'General', 'Q&A']}
    />
  );
}
```

That's it. List, search, filter, pagination - all working.

## Auth Kit Example

```tsx
import { LoginForm, useRequireAuth } from '@/kits/auth';

export default function LoginPage() {
  return <LoginForm />;
}

// Protected pages
function Dashboard() {
  const { isLoading } = useRequireAuth('/login');
  if (isLoading) return <Loading />;
  return <DashboardContent />;
}
```

Login, token storage, auto-refresh, redirect - all handled.

## Why This Approach?

1. **Zero-config**: Just change the API URL and it works
2. **Type-safe**: Written in TypeScript with full autocomplete
3. **Customizable**: Code is copied to your project - modify freely
4. **Accessible**: WCAG 2.1 AA compliant

## Accessibility

All Kits support:

- Keyboard navigation
- Screen reader compatibility (ARIA labels)
- 4.5:1+ color contrast
- Proper form labels

## Installation Options

### CLI (Recommended)

```bash
npx hanui add kit board
```

### Manual

1. Visit [Kits page](https://hanui.io/kits/board)
2. Copy the code
3. Change API URL

```typescript
// api/posts.ts
const API_URL = 'https://your-api.com/api'; // Just change this
```

## Coming Soon

- **Search Kit**: Autocomplete, recent searches, popular searches
- **Notification Kit**: Real-time, read status, grouping
- **Settings Kit**: Profile, password change, notification preferences

---

Check out the full documentation: https://hanui.io/kits

GitHub: https://github.com/hanui-o/hanui
