import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
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
              {/* <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              > */}
                <Header />
                {children}
                <Toaster />
              {/* </ThemeProvider> */}
              <Analytics />
            </Suspense>
          </ClerkProvider>
        ) : (
          <Suspense fallback={null}>
            {/* <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            > */}
              <Header />
              {children}
              <Toaster />
            {/* </ThemeProvider> */}
            <Analytics />
          </Suspense>
        )}
      </body>
    </html>
  );
}