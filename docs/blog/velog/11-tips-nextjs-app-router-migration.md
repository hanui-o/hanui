# Next.js App Router 마이그레이션 실전 가이드

tags : Next.js, AppRouter, React, 마이그레이션, 프론트엔드

Pages Router에서 App Router로 넘어가야 하는데 엄두가 안 나시죠?

저도 처음엔 그랬어요. 근데 한번 해보니까 생각보다 할만했어요.

## 왜 마이그레이션 해야 하나

- **Server Components** - 번들 크기 감소
- **Streaming** - 점진적 렌더링
- **Nested Layouts** - 레이아웃 재사용
- **새 기능들** - Parallel Routes, Intercepting Routes 등

Pages Router도 계속 지원하긴 하는데, 새 기능은 App Router에만 추가돼요.

## 마이그레이션 전략

한 번에 다 바꾸면 망해요. 점진적으로 가야 해요.

```
pages/           # 기존 유지
app/             # 새로 추가
├── layout.tsx
├── page.tsx     # 새 페이지부터 여기에
└── ...
```

Next.js가 둘 다 지원하니까, 공존시키면서 하나씩 옮기면 돼요.

## Step 1: app 폴더 생성 + Root Layout

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

이게 `pages/_app.tsx`와 `pages/_document.tsx` 역할을 합쳐요.

## Step 2: \_app.tsx 내용 옮기기

```tsx
// pages/_app.tsx (기존)
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

// app/layout.tsx (새로)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
```

Provider가 클라이언트 전용이면 별도 컴포넌트로 분리:

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
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Step 3: 페이지 하나씩 옮기기

```tsx
// pages/about.tsx (기존)
export default function AboutPage() {
  return <div>About</div>;
}

export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// app/about/page.tsx (새로)
async function AboutPage() {
  const data = await fetchData(); // 직접 호출
  return <div>About</div>;
}

export default AboutPage;
```

`getStaticProps`, `getServerSideProps` 없어지고 그냥 async 함수에서 fetch 하면 돼요.

## Step 4: Dynamic Routes

```tsx
// pages/posts/[id].tsx (기존)
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false,
  };
}

// app/posts/[id]/page.tsx (새로)
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
// pages/api/users.ts (기존)
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ users: [] });
  }
}

// app/api/users/route.ts (새로)
export async function GET() {
  return Response.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ created: body });
}
```

메서드별로 함수 분리하는 게 더 깔끔해요.

## Step 6: Metadata

```tsx
// pages/about.tsx (기존)
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

// app/about/page.tsx (새로)
export const metadata = {
  title: 'About Us',
  description: 'About page',
};

export default function AboutPage() {
  return <div>About</div>;
}
```

`Head` 컴포넌트 대신 `metadata` export.

## 주의사항

### 1. 'use client' 남발 금지

```tsx
// ❌ 전체 페이지에 use client
'use client';

export default function Page() {
  const [state, setState] = useState();
  return <div>...</div>;
}

// ✅ 인터랙티브 부분만 분리
export default function Page() {
  return (
    <div>
      <StaticContent />
      <InteractiveWidget /> {/* 이것만 'use client' */}
    </div>
  );
}
```

### 2. useRouter 변경

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

### 3. cookies, headers

```tsx
// app router에서
import { cookies, headers } from 'next/headers';

async function Page() {
  const cookieStore = cookies();
  const headersList = headers();

  const token = cookieStore.get('token');
  const userAgent = headersList.get('user-agent');
}
```

## 체크리스트

- [ ] app/layout.tsx 생성
- [ ] \_app.tsx 내용 옮기기
- [ ] \_document.tsx 내용 옮기기
- [ ] Providers 분리 ('use client')
- [ ] 페이지 하나씩 옮기기
- [ ] getStaticProps → async 컴포넌트
- [ ] getServerSideProps → async 컴포넌트
- [ ] getStaticPaths → generateStaticParams
- [ ] API routes → route handlers
- [ ] Head → metadata export
- [ ] useRouter → next/navigation

## 마이그레이션 순서 추천

1. 새 페이지는 app에 생성
2. 간단한 정적 페이지부터 옮기기 (about, contact)
3. 동적 라우트 옮기기
4. 복잡한 페이지 (인터랙션 많은) 옮기기
5. pages 폴더 삭제

한 번에 다 하려고 하지 마세요. 몇 주에 걸쳐서 천천히 해도 돼요.
