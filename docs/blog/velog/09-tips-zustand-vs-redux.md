# Zustand vs Redux, 2025년엔 뭘 써야 할까

tags : Zustand, Redux, 상태관리, React, 프론트엔드, 2025

"상태관리 라이브러리 뭐 쓰세요?"

이 질문 받으면 예전엔 Redux 아니면 MobX였는데, 요즘은 Zustand 얘기가 많이 나와요.

근데 Redux도 RTK 나오면서 많이 좋아졌거든요. 그래서 뭘 써야 할지 헷갈리죠.

## 한눈에 비교

|                | Zustand   | Redux (RTK)            |
| -------------- | --------- | ---------------------- |
| 번들 크기      | 1.1KB     | 11KB+                  |
| 보일러플레이트 | 거의 없음 | 있긴 한데 RTK가 줄여줌 |
| 러닝커브       | 낮음      | 높음 (개념 많음)       |
| DevTools       | 있음      | 있음 (더 강력)         |
| 미들웨어       | 있음      | 있음 (더 풍부)         |
| 타입스크립트   | 좋음      | 좋음                   |

## Zustand가 더 나은 경우

### 1. 작은~중간 규모 프로젝트

```tsx
// store.ts - 이게 끝이에요
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

```tsx
// 컴포넌트에서 사용
function Counter() {
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>{count}</button>;
}
```

Provider 감쌀 필요도 없어요.

### 2. 빠르게 시작하고 싶을 때

Redux는 store 설정, slice 만들고, Provider 감싸고...
Zustand는 create 하나로 끝.

### 3. 번들 크기가 중요할 때

Zustand 1.1KB vs Redux 11KB+
10배 차이 나요.

## Redux가 더 나은 경우

### 1. 대규모 팀 프로젝트

Redux의 명확한 패턴이 팀 협업에 유리해요:

- Actions, Reducers, Selectors 분리
- 누가 봐도 상태 흐름 추적 가능

### 2. 복잡한 비동기 로직

```tsx
// RTK Query - API 캐싱, 재요청, 낙관적 업데이트 등
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      // 낙관적 업데이트
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        const patch = dispatch(
          api.util.updateQueryData('getUsers', undefined, (draft) => {
            draft.push(user);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});
```

RTK Query는 진짜 강력해요. React Query랑 비슷한데 Redux 생태계 안에서 돌아가니까 상태 통합이 쉬워요.

### 3. 시간여행 디버깅이 필요할 때

Redux DevTools의 시간여행 기능은 복잡한 버그 잡을 때 진짜 유용해요.

## 실무에서 내 선택 기준

**Zustand 선택:**

- 빠르게 MVP 만들 때
- 상태가 단순할 때 (로그인 여부, UI 상태)
- 번들 크기 중요할 때
- 혼자 또는 소규모 팀

**Redux 선택:**

- 대규모 팀 협업
- 복잡한 비동기 로직 많을 때
- 상태 히스토리 추적 필요할 때
- 이미 Redux 쓰고 있는 프로젝트

## 2025년 트렌드

솔직히 말하면 Zustand 많이 써요.

npm 트렌드 보면 Zustand가 Redux 따라잡고 있고, 새 프로젝트는 Zustand로 시작하는 경우가 많아요.

근데 Redux가 죽은 건 아니에요. RTK가 보일러플레이트 문제 많이 해결했고, RTK Query는 진짜 좋거든요.

## 같이 쓰면 안 되나요?

됩니다. 근데 굳이?

상태관리 라이브러리 두 개 쓰면 팀원들 혼란스러워요. 하나로 통일하는 게 좋아요.

## 마이그레이션

Redux → Zustand 마이그레이션은 생각보다 쉬워요:

```tsx
// Redux slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

// Zustand로 변환
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

거의 1:1 대응돼요.

## 결론

- **2025년 새 프로젝트** → Zustand 추천
- **대규모 팀/복잡한 비동기** → Redux (RTK)
- **기존 Redux 프로젝트** → 굳이 바꿀 필요 없음

뭘 쓰든 상관없어요. 둘 다 좋은 라이브러리예요.
중요한 건 팀에서 하나로 통일하는 거.
