"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StudentDashboard } from "@/components/student-dashboard";

const user = {
  id: "e4a2c7b8-1f5c-4d9e-9b0a-3c8d1e5f7b2a",
  email: "flim.flam@resilientcoders.org",
  first_name: "Flim",
  last_name: "Flam",
  role: "student",
  cohort: "AI Fellow",
  created_at: "2025-09-27T10:00:00Z",
  updated_at: "2025-09-27T10:00:00Z",
  last_login: "2025-09-27T10:00:00Z",
  is_active: true,
  auth_provider: "supabase",
  provider_id: null
};

const admin = {
  id: "e4a2c7b8-1f5c-4d9e-9b0a-3c8d1e5f7b2a",
  email: "flam.flim@resilientcoders.org",
  first_name: "Flim",
  last_name: "Flam",
  role: "admin",
  cohort: "AI Fellow",
  created_at: "2025-09-27T10:00:00Z",
  updated_at: "2025-09-27T10:00:00Z",
  last_login: "2025-09-27T10:00:00Z",
  is_active: true,
  auth_provider: "supabase",
  provider_id: null
};

export default function Page() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 p-5">
        <StudentDashboard />
      </main>
    </>
  );
}
