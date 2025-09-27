// api/tests/helpers/dbTestUtils.ts
// -----------------------------------------------------------------------------
// Helpers for seeding/cleaning profiles table in tests
// Sprint-1: Mock DB for API route testing without real DB dependency
// -----------------------------------------------------------------------------

import { Claims } from "../../lib/auth";

// Mock client interface
interface MockClient {
  query: (sql: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
  release: () => void;
}

// Profile interface for type safety
interface MockProfile {
  user_id: string;
  clerk_user_id: string;
  role: "student" | "admin";
  full_name: string;
  email: string;
  cohort: string | null;
  session_count: number;
  total_time_seconds: number;
  created_at: string;
  updated_at: string;
  last_session_ended_at: string | null;
  avatar_url: string | null;
  auth_provider: string;
  external_auth_id: string | null;
  total_topics: string[];
  achievements: unknown[];
}

// Mock data store for tests
let mockProfiles: MockProfile[] = [];

export async function clearProfiles() {
  mockProfiles = [];
}

export async function seedProfiles() {
  mockProfiles = [
    {
      user_id: "uuid-1",
      clerk_user_id: "student-1",
      role: "student",
      full_name: "Student One",
      email: "student1@example.com",
      cohort: "2026A",
      session_count: 5,
      total_time_seconds: 300,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_session_ended_at: null,
      avatar_url: null,
      auth_provider: "clerk",
      external_auth_id: null,
      total_topics: [],
      achievements: []
    },
    {
      user_id: "uuid-2", 
      clerk_user_id: "student-2",
      role: "student",
      full_name: "Student Two",
      email: "student2@example.com",
      cohort: "2026A",
      session_count: 3,
      total_time_seconds: 180,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_session_ended_at: null,
      avatar_url: null,
      auth_provider: "clerk",
      external_auth_id: null,
      total_topics: [],
      achievements: []
    },
    {
      user_id: "uuid-3",
      clerk_user_id: "admin-1",
      role: "admin",
      full_name: "Admin One", 
      email: "admin@example.com",
      cohort: null,
      session_count: 0,
      total_time_seconds: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_session_ended_at: null,
      avatar_url: null,
      auth_provider: "clerk",
      external_auth_id: null,
      total_topics: [],
      achievements: []
    }
  ];
  return mockProfiles;
}

export async function withClaims(claims: Claims, cb: (client: MockClient) => Promise<unknown>) {
  // Mock client for testing
  const mockClient = {
    query: async (sql: string, params?: unknown[]) => {
      // Mock RLS behavior based on claims
      if (sql.includes("jwt_user_id()")) {
        // Student self-read
        const profile = mockProfiles.find(p => p.clerk_user_id === claims.sub);
        return { rows: profile ? [profile] : [] };
      } else if (sql.includes("select * from public.profiles order by created_at desc")) {
        // Admin read all
        if (claims.role === "admin") {
          return { rows: mockProfiles };
        } else {
          return { rows: [] };
        }
      } else if (sql.includes("update public.profiles")) {
        // Student self-update
        const profileIndex = mockProfiles.findIndex(p => p.clerk_user_id === claims.sub);
        if (profileIndex >= 0 && params && params.length >= 2) {
          const sessionIncrement = params[0] as number;
          const timeIncrement = params[1] as number;
          mockProfiles[profileIndex] = {
            ...mockProfiles[profileIndex],
            session_count: mockProfiles[profileIndex].session_count + sessionIncrement,
            total_time_seconds: mockProfiles[profileIndex].total_time_seconds + timeIncrement,
            last_session_ended_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          return { rows: [mockProfiles[profileIndex]] };
        }
        return { rows: [] };
      }
      return { rows: [] };
    },
    release: () => {}
  };
  
  return await cb(mockClient);
}
