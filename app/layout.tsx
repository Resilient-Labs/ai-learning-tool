import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import type React from "react"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Resilient Coders Dashboard",
  description: "AI Learning Platform Dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} antialiased`}>
        {clerkKey ? (
          <ClerkProvider publishableKey={clerkKey}>
            <Suspense fallback={null}>
                <Header />
                {children}
                <Toaster />
              <Analytics />
            </Suspense>
          </ClerkProvider>
        ) : (
          <Suspense fallback={null}>
              <Header />
              {children}
              <Toaster />
            <Analytics />
          </Suspense>
        )}
      </body>
    </html>
  );
}

