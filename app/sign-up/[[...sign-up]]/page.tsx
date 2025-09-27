import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      fallbackRedirectUrl="/post-auth"
      appearance={{
        elements: {
          formButtonPrimary: "bg-red-600 hover:bg-red-700"
        }
      }}
    />
  )
}
