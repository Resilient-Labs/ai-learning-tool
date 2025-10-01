"use client";

import { StudentDashboard } from "@/components/student-dashboard";
import React from "react"

interface Props {
  className?: string;
}

const HomePage: React.FC<Props> = () => {
  return (
    <>
      <main className="flex-1 p-5">
        <StudentDashboard />
      </main>
    </>
  );
};

export default HomePage;