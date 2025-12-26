# React Server Components 실무에서 어떻게 쓰나요

tags : React, RSC, ServerComponents, Next.js, 성능최적화, 프론트엔드

React Server Components 나온 지 좀 됐는데, 실무에서 어떻게 써야 할지 감이 안 잡히시죠?

저도 처음엔 그랬어요. "이거 그냥 SSR이랑 뭐가 다른 거지?" 싶었거든요.

## Server Components vs Client Components

간단하게 정리하면:

|                     | Server Components | Client Components |
| ------------------- | ----------------- | ----------------- |
| 실행 위치           | 서버에서만        | 브라우저에서      |
| useState, useEffect | 못 씀             | 사용 가능         |
| onClick 등 이벤트   | 못 씀             | 사용 가능         |
| DB 직접 접근        | 가능              | 불가능            |
| 번들 크기           | 포함 안 됨        | 포함됨            |

핵심은 **번들 크기**예요. Server Components 코드는 브라우저로 안 내려가요.

## 언제 Server Components 쓰나요

**Server Components가 맞는 경우:**

- 데이터 fetch만 하고 보여주는 컴포넌트
- 마크다운 렌더링 (라이브러리 무거움)
- 정적인 UI (헤더, 푸터, 사이드바)

**Client Components가 맞는 경우:**

- 사용자 인터랙션 (버튼 클릭, 폼 입력)
- 브라우저 API 사용 (localStorage, window)
- 상태 관리 (useState, useReducer)

## 실무 패턴 1: 데이터 fetching은 Server에서

```tsx
// app/users/page.tsx (Server Component)
async function UsersPage() {
  // 서버에서 직접 DB 조회 가능
  const users = await db.user.findMany();

  return (
    <div>
      <h1>사용자 목록</h1>
      <UserList users={users} />
    </div>
  );
}
```

API 라우트 만들고, fetch 하고, useEffect로 받고... 이런 거 안 해도 돼요.

## 실무 패턴 2: 인터랙션만 Client로 분리

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

클릭해서 펼치는 부분만 `'use client'` 붙이면 돼요.

## 실무 패턴 3: 무거운 라이브러리는 Server에서

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

marked + highlight.js = 200KB 넘는데, 이게 브라우저로 안 내려가요.

## 실무 패턴 4: Composition 패턴

```tsx
// app/dashboard/page.tsx (Server Component)
import { Suspense } from 'react';

async function DashboardPage() {
  return (
    <div>
      <Sidebar /> {/* Server */}
      <main>
        <Suspense fallback={<Loading />}>
          <Stats /> {/* Server - 데이터 fetch */}
        </Suspense>
        <InteractiveChart /> {/* Client - 차트 인터랙션 */}
      </main>
    </div>
  );
}
```

Server와 Client를 섞어서 쓰되, Client 부분을 최소화하는 게 포인트예요.

## 흔한 실수들

### 1. 최상위에 'use client' 박기

```tsx
// ❌ 이러면 하위 컴포넌트 전부 Client가 됨
'use client';

export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

### 2. Server Component에 props로 함수 전달

```tsx
// ❌ 함수는 직렬화 안 됨
<ServerComponent onClick={() => console.log('hi')} />
```

### 3. Client Component에서 async 사용

```tsx
// ❌ Client Component는 async 불가
'use client';

async function MyComponent() {  // 에러!
  const data = await fetch(...);
}
```

## 경계 정하기

제가 쓰는 기준:

1. **페이지 컴포넌트** → 기본 Server
2. **데이터 표시만** → Server
3. **클릭/입력 있으면** → Client
4. **차트, 에디터** → Client
5. **라이브러리 무거우면** → 가능하면 Server

## 성능 차이

실제로 측정해보면:

- **Before** (전부 Client): 번들 450KB, LCP 2.8s
- **After** (Server 활용): 번들 180KB, LCP 1.2s

특히 마크다운 렌더링이나 syntax highlighting 같은 거 Server로 옮기면 체감됩니다.

## 정리

- Server Components = 번들 크기 줄이기 + 서버 리소스 활용
- 인터랙션 필요한 부분만 Client로 분리
- 무거운 라이브러리는 Server에서 처리
- 경계 잘 정하는 게 핵심

아직 익숙하지 않으면 일단 다 Server로 시작하고, 에러 나는 부분만 Client로 바꾸는 것도 방법이에요.
