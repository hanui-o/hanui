# TypeScript 타입 가드 패턴 총정리

tags : TypeScript, 타입가드, React, 프론트엔드, 타입스크립트

TypeScript 쓰다 보면 `as` 캐스팅 남발하게 되죠.

"일단 돌아가니까..." 하면서요.

근데 이러면 런타임에 터져요. 타입 가드 제대로 쓰면 이런 문제 없어요.

## 타입 가드가 뭔데

런타임에 타입을 좁혀주는 코드예요.

```tsx
function process(value: string | number) {
  if (typeof value === 'string') {
    // 여기서 value는 string
    console.log(value.toUpperCase());
  } else {
    // 여기서 value는 number
    console.log(value.toFixed(2));
  }
}
```

`typeof` 체크 덕분에 TypeScript가 타입을 알아서 좁혀줘요.

## 패턴 1: typeof 가드

원시 타입 체크할 때 씀:

```tsx
function format(value: string | number | boolean) {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  return value ? 'Yes' : 'No';
}
```

## 패턴 2: instanceof 가드

클래스 인스턴스 체크할 때:

```tsx
class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

function handleError(error: Error) {
  if (error instanceof ApiError) {
    // ApiError 타입으로 좁혀짐
    console.log(`API Error ${error.statusCode}: ${error.message}`);
  } else {
    console.log(`Error: ${error.message}`);
  }
}
```

## 패턴 3: in 연산자 가드

객체에 특정 프로퍼티 있는지 체크:

```tsx
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function makeSound(animal: Dog | Cat) {
  if ('bark' in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

## 패턴 4: 사용자 정의 타입 가드 (핵심)

`is` 키워드로 직접 타입 가드 만들기:

```tsx
interface User {
  type: 'user';
  name: string;
  email: string;
}

interface Admin {
  type: 'admin';
  name: string;
  permissions: string[];
}

// 사용자 정의 타입 가드
function isAdmin(person: User | Admin): person is Admin {
  return person.type === 'admin';
}

function greet(person: User | Admin) {
  if (isAdmin(person)) {
    // person은 Admin
    console.log(
      `Admin ${person.name} with ${person.permissions.length} permissions`
    );
  } else {
    // person은 User
    console.log(`User ${person.name} (${person.email})`);
  }
}
```

`person is Admin` 이 부분이 핵심이에요. 이게 있어야 TypeScript가 타입을 좁혀줘요.

## 패턴 5: Discriminated Union

가장 추천하는 패턴:

```tsx
type Result<T> = { success: true; data: T } | { success: false; error: string };

function handleResult(result: Result<User>) {
  if (result.success) {
    // result.data 접근 가능 (User 타입)
    console.log(result.data.name);
  } else {
    // result.error 접근 가능 (string 타입)
    console.log(result.error);
  }
}
```

공통 프로퍼티(`success`)로 타입 구분하는 패턴이에요. API 응답 처리할 때 많이 씀.

## 패턴 6: Array 타입 가드

```tsx
function processItems(items: string | string[]) {
  if (Array.isArray(items)) {
    // items는 string[]
    items.forEach((item) => console.log(item));
  } else {
    // items는 string
    console.log(items);
  }
}
```

## 패턴 7: null/undefined 가드

```tsx
function getLength(value: string | null | undefined) {
  // null과 undefined 제거
  if (value == null) {
    return 0;
  }
  // value는 string
  return value.length;
}

// 또는 optional chaining + nullish coalescing
function getLengthV2(value: string | null | undefined) {
  return value?.length ?? 0;
}
```

## 실무 예시: API 응답 처리

```tsx
interface ApiResponse<T> {
  status: 'loading' | 'success' | 'error';
  data?: T;
  error?: string;
}

function isSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { status: 'success'; data: T } {
  return response.status === 'success' && response.data !== undefined;
}

function isError<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { status: 'error'; error: string } {
  return response.status === 'error' && response.error !== undefined;
}

function handleResponse<T>(response: ApiResponse<T>) {
  if (isSuccess(response)) {
    // response.data 안전하게 접근
    processData(response.data);
  } else if (isError(response)) {
    // response.error 안전하게 접근
    showError(response.error);
  } else {
    // loading 상태
    showSpinner();
  }
}
```

## 흔한 실수

### 1. as 캐스팅 남발

```tsx
// ❌ 런타임에 터질 수 있음
const user = data as User;
console.log(user.name);

// ✅ 타입 가드로 안전하게
if (isUser(data)) {
  console.log(data.name);
}
```

### 2. 타입 가드 반환 타입 빼먹기

```tsx
// ❌ 그냥 boolean 반환 - 타입 좁히기 안 됨
function isAdmin(person: User | Admin): boolean {
  return person.type === 'admin';
}

// ✅ is 키워드 사용 - 타입 좁히기 됨
function isAdmin(person: User | Admin): person is Admin {
  return person.type === 'admin';
}
```

### 3. 불필요한 타입 가드

```tsx
// ❌ 이미 타입이 확정됨
function greet(name: string) {
  if (typeof name === 'string') {
    // 불필요
    console.log(name);
  }
}
```

## 정리

| 패턴                | 사용 시점            |
| ------------------- | -------------------- |
| typeof              | 원시 타입 체크       |
| instanceof          | 클래스 인스턴스 체크 |
| in                  | 객체 프로퍼티 체크   |
| is 키워드           | 커스텀 타입 가드     |
| Discriminated Union | API 응답, 상태 관리  |

`as` 캐스팅 쓰고 싶어지면, 타입 가드로 바꿀 수 있는지 먼저 생각해보세요.
