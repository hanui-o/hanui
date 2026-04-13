'use client';

import { LoginForm } from '@hanui/react';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-8">
      <LoginForm
        onSubmit={(data) => {
          alert(`로그인: ${data.username}`);
        }}
        showForgotPassword
        forgotPasswordHref="/showcase/public"
        showSignupLink
        signupHref="/showcase/public/signup"
      />
    </div>
  );
}
