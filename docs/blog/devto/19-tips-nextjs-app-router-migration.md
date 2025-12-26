# Next.js App Router Migration - A Practical Guide

---

nextjs, react, javascript, webdev, frontend

Dreading the Pages Router to App Router migration?

I felt the same way. But it's more manageable than you'd think.

## Why Migrate

- **Server Components** - Smaller bundles
- **Streaming** - Progressive rendering
- **Nested Layouts** - Layout reusability
- **New Features** - Parallel Routes, Intercepting Routes

Pages Router is still supported, but new features only come to App Router.

## Migration Strategy

Don't try to migrate everything at once. Go incrementally.

```
pages/           # Keep existing
app/             # Add new
├── layout.tsx
├── page.tsx     # New pages go here
└── ...
```

Next.js supports both, so you can coexist and migrate one page at a time.

## Step 1: Create app Folder + Root Layout

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

This combines `pages/_app.tsx` and `pages/_document.tsx`.

## Step 2: Migrate \_app.tsx Content

```tsx
// pages/_app.tsx (old)
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

// app/layout.tsx (new)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
```

If providers are client-only, separate them:

```tsx
// app/providers.tsx
'use client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Step 3: Migrate Pages One by One

```tsx
// pages/about.tsx (old)
export default function AboutPage() {
  return <div>About</div>;
}

export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// app/about/page.tsx (new)
async function AboutPage() {
  const data = await fetchData(); // Direct call
  return <div>About</div>;
}

export default AboutPage;
```

No more `getStaticProps` or `getServerSideProps` - just fetch in async functions.

## Step 4: Dynamic Routes

```tsx
// pages/posts/[id].tsx (old)
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
}

// app/posts/[id]/page.tsx (new)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return <article>{post.title}</article>;
}

export default PostPage;
```

`getStaticPaths` → `generateStaticParams`

## Step 5: API Routes

```tsx
// pages/api/users.ts (old)
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ users: [] });
  }
}

// app/api/users/route.ts (new)
export async function GET() {
  return Response.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ created: body });
}
```

Separate functions per HTTP method is cleaner.

## Step 6: Metadata

```tsx
// pages/about.tsx (old)
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="About page" />
      </Head>
      <div>About</div>
    </>
  );
}

// app/about/page.tsx (new)
export const metadata = {
  title: 'About Us',
  description: 'About page',
};

export default function AboutPage() {
  return <div>About</div>;
}
```

`Head` component → `metadata` export.

## Gotchas

### 1. Don't Overuse 'use client'

```tsx
// ❌ Entire page as client
'use client';

export default function Page() {
  const [state, setState] = useState();
  return <div>...</div>;
}

// ✅ Isolate interactive parts
export default function Page() {
  return (
    <div>
      <StaticContent />
      <InteractiveWidget /> {/* Only this is 'use client' */}
    </div>
  );
}
```

### 2. useRouter Changes

```tsx
// pages router
import { useRouter } from 'next/router';
const router = useRouter();
router.query.id;
router.push('/about');

// app router
import { useRouter } from 'next/navigation';
import { useParams, useSearchParams } from 'next/navigation';

const router = useRouter();
const params = useParams();
const searchParams = useSearchParams();

params.id;
router.push('/about');
```

### 3. Cookies and Headers

```tsx
// In app router
import { cookies, headers } from 'next/headers';

async function Page() {
  const cookieStore = cookies();
  const headersList = headers();

  const token = cookieStore.get('token');
  const userAgent = headersList.get('user-agent');
}
```

## Checklist

- [ ] Create app/layout.tsx
- [ ] Migrate \_app.tsx content
- [ ] Migrate \_document.tsx content
- [ ] Separate Providers ('use client')
- [ ] Migrate pages one by one
- [ ] getStaticProps → async components
- [ ] getServerSideProps → async components
- [ ] getStaticPaths → generateStaticParams
- [ ] API routes → route handlers
- [ ] Head → metadata export
- [ ] useRouter → next/navigation

## Recommended Migration Order

1. Create new pages in app
2. Start with simple static pages (about, contact)
3. Migrate dynamic routes
4. Migrate complex pages (heavy interactions)
5. Delete pages folder

Don't rush it. Taking a few weeks is fine.
