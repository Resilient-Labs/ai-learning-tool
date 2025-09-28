import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/post-auth"
      appearance={{
        elements: {
          formButtonPrimary: "bg-red-600 hover:bg-red-700"
        }
      }}
    />
  )
}
