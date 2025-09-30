'use client';
import { SignIn } from '@clerk/nextjs';

export default function MainSignInPage() {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
    />
  );
}
