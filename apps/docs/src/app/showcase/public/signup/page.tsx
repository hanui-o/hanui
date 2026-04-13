'use client';

import { SignupForm } from '@hanui/react';

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <SignupForm
        onSubmit={(data) => {
          alert(`회원가입: ${data.name}`);
        }}
      />
    </div>
  );
}
