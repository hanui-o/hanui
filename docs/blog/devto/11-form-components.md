# Building Accessible Form Components in React - Auto-Connected Labels, Errors, and ARIA

What's the most annoying part of building forms?

For me, it's connecting labels to inputs. Write `htmlFor`, generate `id`, wire up `aria-describedby`... the same boilerplate every time.

Error messages too. Turn it red, add `aria-invalid`, add `role="alert"`. Skip any of these and fail the accessibility audit.

So we automated it.

## FormField - The Container That Connects Everything

```tsx
import { FormField, FormLabel, FormError, FormHelperText, Input } from 'hanui';

<FormField id="email" required status="error">
  <FormLabel>Email</FormLabel>
  <Input type="email" placeholder="example@email.com" />
  <FormError>Invalid email format</FormError>
</FormField>;
```

This renders:

```html
<div class="flex flex-col gap-2">
  <label for=":r1:" class="...">
    Email
    <span aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </label>
  <input
    id=":r1:"
    aria-invalid="true"
    aria-required="true"
    aria-describedby=":r1:-error :r1:-helper"
    ...
  />
  <div id=":r1:-error" role="alert" aria-live="polite">
    Invalid email format
  </div>
</div>
```

`React.useId()` generates unique IDs automatically. Label connects to input. Error message connects via `aria-describedby`. Everything wired up.

## The `status` Prop

```tsx
// Error state
<FormField status="error">
  <FormLabel>Password</FormLabel>
  <Input type="password" />
  <FormError>Must be at least 8 characters</FormError>
</FormField>

// Success state
<FormField status="success">
  <FormLabel>Username</FormLabel>
  <Input />
  <FormHelperText>Username is available</FormHelperText>
</FormField>

// Info state
<FormField status="info">
  <FormLabel>Referral Code</FormLabel>
  <Input />
  <FormHelperText>Optional</FormHelperText>
</FormField>
```

Colors change automatically based on status:

- `error`: Red + X icon
- `success`: Green + check icon
- `info`: Blue + info icon

## Input Component

### Sizes

```tsx
<Input size="sm" /> // 40px height
<Input size="md" /> // 48px height (default)
<Input size="lg" /> // 56px height
```

### Variants

```tsx
<Input variant="default" /> // bordered (default)
<Input variant="filled" />  // filled background
```

### Clearable

```tsx
<Input clearable onClear={() => setValue('')} />
```

X button appears when there's a value. Useful on mobile.

### Password Toggle

```tsx
<Input type="password" />
```

Eye icon automatically appears for password inputs. Click to show/hide.

### Addons

```tsx
<Input
  leftAddon={<SearchIcon className="w-5 h-5" />}
  placeholder="Search..."
/>

<Input
  rightAddon={<span className="text-gray-500">USD</span>}
  type="number"
/>
```

For icons or units.

## Select Component

```tsx
import { Select } from 'hanui';

const cities = [
  { value: 'seoul', label: 'Seoul' },
  { value: 'busan', label: 'Busan' },
  { value: 'daegu', label: 'Daegu' },
];

<Select
  options={cities}
  value={city}
  onChange={setCity}
  placeholder="Select city"
/>;
```

Built on Radix UI, so keyboard navigation and screen reader support just work.

### With FormField

```tsx
<FormField id="city" required status={errors.city ? 'error' : undefined}>
  <FormLabel>City</FormLabel>
  <Select options={cities} value={city} onChange={setCity} />
  {errors.city && <FormError>{errors.city}</FormError>}
</FormField>
```

Put it inside FormField and id, status, disabled all connect automatically.

## Real Example: Registration Form

```tsx
import {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
  Input,
  Select,
  Button,
} from 'hanui';

function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="email"
        required
        status={errors.email ? 'error' : undefined}
      >
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="example@email.com"
        />
        {errors.email && <FormError>{errors.email}</FormError>}
      </FormField>

      <FormField
        id="password"
        required
        status={errors.password ? 'error' : undefined}
      >
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <FormHelperText>At least 8 characters</FormHelperText>
        {errors.password && <FormError>{errors.password}</FormError>}
      </FormField>

      <FormField id="name" required>
        <FormLabel>Name</FormLabel>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          clearable
          onClear={() => setForm({ ...form, name: '' })}
        />
      </FormField>

      <FormField id="city">
        <FormLabel>City</FormLabel>
        <Select
          options={[
            { value: 'seoul', label: 'Seoul' },
            { value: 'busan', label: 'Busan' },
          ]}
          value={form.city}
          onChange={(value) => setForm({ ...form, city: value })}
          placeholder="Select..."
        />
      </FormField>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
```

## With react-hook-form

```tsx
import { useForm } from 'react-hook-form';
import { FormField, FormLabel, FormError, Input, Button } from 'hanui';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id="email"
        required
        status={errors.email ? 'error' : undefined}
      >
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </FormField>

      <Button type="submit">Login</Button>
    </form>
  );
}
```

`register()` works directly. No wrappers needed.

## Summary

| Component      | Purpose                          |
| -------------- | -------------------------------- |
| FormField      | Container, provides Context      |
| FormLabel      | Label, auto-connects htmlFor     |
| FormError      | Error message, auto role="alert" |
| FormHelperText | Helper text, auto status colors  |
| Input          | Input field, multiple features   |
| Select         | Dropdown, Radix-based            |

Don't worry about accessibility attributes. Wrap with FormField and everything connects automatically.

## Try It

```bash
npx hanui add form-field input select
```

**Documentation**: https://hanui.io/components/form-field

---

Tags: #react #forms #accessibility #webdev #frontend
