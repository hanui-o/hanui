# React Server Components in Practice - When and How to Use Them

---

react, nextjs, performance, webdev, javascript

React Server Components have been around for a while, but knowing when to use them in real projects can be confusing.

"How is this different from SSR?" - I had the same question at first.

## Server Components vs Client Components

Quick comparison:

|                     | Server Components | Client Components |
| ------------------- | ----------------- | ----------------- |
| Runs on             | Server only       | Browser           |
| useState, useEffect | Not available     | Available         |
| onClick events      | Not available     | Available         |
| Direct DB access    | Possible          | Not possible      |
| Bundle size         | Not included      | Included          |

The key is **bundle size**. Server Components code never reaches the browser.

## When to Use Server Components

**Good for Server Components:**

- Components that only fetch and display data
- Markdown rendering (libraries are heavy)
- Static UI (headers, footers, sidebars)

**Good for Client Components:**

- User interactions (button clicks, form inputs)
- Browser APIs (localStorage, window)
- State management (useState, useReducer)

## Pattern 1: Data Fetching on Server

```tsx
// app/users/page.tsx (Server Component)
async function UsersPage() {
  // Direct DB query on server
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
}
```

No need to create API routes, fetch data, handle loading states with useEffect.

## Pattern 2: Isolate Interactions to Client

```tsx
// components/UserList.tsx (Server Component)
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}

// components/UserCard.tsx
('use client');

function UserCard({ user }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li onClick={() => setIsExpanded(!isExpanded)}>
      {user.name}
      {isExpanded && <UserDetails user={user} />}
    </li>
  );
}
```

Only add `'use client'` to the expandable part.

## Pattern 3: Heavy Libraries on Server

```tsx
// app/blog/[slug]/page.tsx (Server Component)
import { marked } from 'marked'; // 32KB
import hljs from 'highlight.js'; // 180KB

async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  const html = marked(post.content, {
    highlight: (code) => hljs.highlightAuto(code).value,
  });

  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}
```

marked + highlight.js = over 200KB that never reaches the browser.

## Pattern 4: Composition

```tsx
// app/dashboard/page.tsx (Server Component)
import { Suspense } from 'react';

async function DashboardPage() {
  return (
    <div>
      <Sidebar /> {/* Server */}
      <main>
        <Suspense fallback={<Loading />}>
          <Stats /> {/* Server - data fetching */}
        </Suspense>
        <InteractiveChart /> {/* Client - chart interaction */}
      </main>
    </div>
  );
}
```

Mix Server and Client, but minimize the Client parts.

## Common Mistakes

### 1. Adding 'use client' at the top level

```tsx
// ❌ All child components become Client
'use client';

export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

### 2. Passing functions as props to Server Components

```tsx
// ❌ Functions can't be serialized
<ServerComponent onClick={() => console.log('hi')} />
```

### 3. Using async in Client Components

```tsx
// ❌ Client Components can't be async
'use client';

async function MyComponent() {  // Error!
  const data = await fetch(...);
}
```

## Setting Boundaries

My rules of thumb:

1. **Page components** → Server by default
2. **Display only** → Server
3. **Clicks/inputs needed** → Client
4. **Charts, editors** → Client
5. **Heavy libraries** → Server when possible

## Performance Impact

Real measurements:

- **Before** (all Client): Bundle 450KB, LCP 2.8s
- **After** (using Server): Bundle 180KB, LCP 1.2s

Moving markdown rendering and syntax highlighting to Server makes a noticeable difference.

## Summary

- Server Components = smaller bundles + server resources
- Isolate only interactive parts to Client
- Process heavy libraries on Server
- Setting the right boundaries is key

If you're not sure, start with everything as Server and convert to Client only when you get errors.
