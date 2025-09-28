import { ClerkProvider } from '@clerk/nextjs'

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./global.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Resilient Coders Admin Dashboard",
  description: "AI Learning Platform Administration",
  generator: "v0.app",
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  
  return (
    // ClerkProvider wraps the entire app to provide authentication context
    // The publishableKey prop ensures proper initialization and error handling
    // PublishableKey is still needed.
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;

