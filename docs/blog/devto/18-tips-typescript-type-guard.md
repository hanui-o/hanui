# TypeScript Type Guard Patterns - A Complete Guide

---

typescript, javascript, webdev, react, programming

Using TypeScript and finding yourself sprinkling `as` casts everywhere?

"It works, so whatever..." - until it crashes at runtime.

Type guards prevent these issues. Here's how to use them properly.

## What Are Type Guards

Code that narrows types at runtime:

```tsx
function process(value: string | number) {
  if (typeof value === 'string') {
    // value is string here
    console.log(value.toUpperCase());
  } else {
    // value is number here
    console.log(value.toFixed(2));
  }
}
```

The `typeof` check lets TypeScript narrow the type automatically.

## Pattern 1: typeof Guard

For primitive type checks:

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

## Pattern 2: instanceof Guard

For class instance checks:

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
    // Narrowed to ApiError
    console.log(`API Error ${error.statusCode}: ${error.message}`);
  } else {
    console.log(`Error: ${error.message}`);
  }
}
```

## Pattern 3: in Operator Guard

Check if property exists on object:

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

## Pattern 4: User-Defined Type Guards (Key Pattern)

Create custom type guards with `is` keyword:

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

// User-defined type guard
function isAdmin(person: User | Admin): person is Admin {
  return person.type === 'admin';
}

function greet(person: User | Admin) {
  if (isAdmin(person)) {
    // person is Admin
    console.log(
      `Admin ${person.name} with ${person.permissions.length} permissions`
    );
  } else {
    // person is User
    console.log(`User ${person.name} (${person.email})`);
  }
}
```

The `person is Admin` return type is crucial - it tells TypeScript to narrow the type.

## Pattern 5: Discriminated Unions

Most recommended pattern:

```tsx
type Result<T> = { success: true; data: T } | { success: false; error: string };

function handleResult(result: Result<User>) {
  if (result.success) {
    // result.data accessible (User type)
    console.log(result.data.name);
  } else {
    // result.error accessible (string type)
    console.log(result.error);
  }
}
```

Discriminate types by a common property (`success`). Great for API responses.

## Pattern 6: Array Type Guard

```tsx
function processItems(items: string | string[]) {
  if (Array.isArray(items)) {
    // items is string[]
    items.forEach((item) => console.log(item));
  } else {
    // items is string
    console.log(items);
  }
}
```

## Pattern 7: null/undefined Guard

```tsx
function getLength(value: string | null | undefined) {
  // Remove null and undefined
  if (value == null) {
    return 0;
  }
  // value is string
  return value.length;
}

// Or use optional chaining + nullish coalescing
function getLengthV2(value: string | null | undefined) {
  return value?.length ?? 0;
}
```

## Real-World Example: API Response Handling

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
    // response.data safely accessible
    processData(response.data);
  } else if (isError(response)) {
    // response.error safely accessible
    showError(response.error);
  } else {
    // loading state
    showSpinner();
  }
}
```

## Common Mistakes

### 1. Overusing as Casts

```tsx
// ❌ Can crash at runtime
const user = data as User;
console.log(user.name);

// ✅ Safe with type guard
if (isUser(data)) {
  console.log(data.name);
}
```

### 2. Forgetting Return Type

```tsx
// ❌ Just returns boolean - no narrowing
function isAdmin(person: User | Admin): boolean {
  return person.type === 'admin';
}

// ✅ Uses is keyword - enables narrowing
function isAdmin(person: User | Admin): person is Admin {
  return person.type === 'admin';
}
```

### 3. Unnecessary Type Guards

```tsx
// ❌ Type is already known
function greet(name: string) {
  if (typeof name === 'string') {
    // Unnecessary
    console.log(name);
  }
}
```

## Summary

| Pattern             | Use Case              |
| ------------------- | --------------------- |
| typeof              | Primitive types       |
| instanceof          | Class instances       |
| in                  | Object property check |
| is keyword          | Custom type guards    |
| Discriminated Union | API responses, state  |

When you're tempted to use `as`, ask yourself if a type guard would be better.
