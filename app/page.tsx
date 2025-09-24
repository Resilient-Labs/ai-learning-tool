"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <main className='p-5'>
        <h1>Hello, Next.js!</h1>
        <Button onClick={() => router.push("/ui-docs")}>
          To UI Docs
        </Button>
      </main>
    </>
  );
}
