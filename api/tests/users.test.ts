// api/tests/users.test.ts
// -----------------------------------------------------------------------------
// Jest + Supertest tests for users routes - RLS behavior verification
// -----------------------------------------------------------------------------

import request from "supertest";
import { createServer } from "http";
import { clearProfiles, seedProfiles } from "./helpers/dbTestUtils";
import { getMe, getUsers, patchMeProgress } from "../routes/users";
import { setMockClient, clearMockClient } from "../lib/db";

// Wrap handlers in a small HTTP server for Supertest
function makeApp() {
  return createServer(async (req, res) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      let response: Response;
      
      // Add headers to make it behave like a real Request object
      const headers = new Headers();
      Object.entries(req.headers).forEach(([key, value]) => {
        if (typeof value === "string") {
          headers.set(key, value);
        } else if (Array.isArray(value)) {
          headers.set(key, value[0]);
        }
      });

      const mockRequest = {
        headers: {
          get: (name: string) => headers.get(name)
        },
        json: async () => JSON.parse(body || "{}")
      } as Request;

      try {
        if (req.url === "/api/me" && req.method === "GET") {
          response = await getMe(mockRequest);
        } else if (req.url === "/api/users" && req.method === "GET") {
          response = await getUsers(mockRequest);
        } else if (req.url === "/api/me/progress" && req.method === "PATCH") {
          response = await patchMeProgress(mockRequest);
        } else {
          response = new Response("Not found", { status: 404 });
        }
      } catch (error) {
        console.error("Handler error:", error);
        response = new Response("Internal server error", { status: 500 });
      }

      res.writeHead(response.status, Object.fromEntries(response.headers));
      const text = await response.text();
      res.end(text);
    });
  });
}

// Profile interface for type safety
interface TestProfile {
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

describe("Users API Routes - RLS Behavior", () => {
  const app = makeApp();
  let profiles: TestProfile[] = [];

  beforeAll(async () => {
    // Set up mock database for tests
    await clearProfiles();
    profiles = await seedProfiles();
    
    // Create a mock client that simulates RLS behavior
    const mockClient = {
      query: async (sql: string, params?: unknown[]) => {
        // Mock RLS behavior based on the SQL query
        // Check for UPDATE first since it also contains jwt_user_id()
        if (sql.includes("update public.profiles")) {
          // Student self-update
          const clerkUserId = getCurrentMockClerkUserId();
          const profileIndex = profiles.findIndex(p => p.clerk_user_id === clerkUserId);
          if (profileIndex >= 0 && params && params.length >= 2) {
            const sessionIncrement = params[0] as number;
            const timeIncrement = params[1] as number;
            const updatedProfile = {
              ...profiles[profileIndex],
              session_count: profiles[profileIndex].session_count + sessionIncrement,
              total_time_seconds: profiles[profileIndex].total_time_seconds + timeIncrement,
              last_session_ended_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            profiles[profileIndex] = updatedProfile; // Update the array
            return { rows: [updatedProfile] };
          }
          return { rows: [] };
        } else if (sql.includes("select * from public.profiles order by created_at desc")) {
          // Admin read all
          return { rows: profiles };
        } else if (sql.includes("jwt_user_id()")) {
          // This simulates RLS for self-read queries
          const clerkUserId = getCurrentMockClerkUserId();
          const profile = profiles.find(p => p.clerk_user_id === clerkUserId);
          return { rows: profile ? [profile] : [] };
        }
        return { rows: [] };
      },
      release: () => {}
    };
    
    setMockClient(mockClient);
  });

  afterAll(async () => {
    clearMockClient();
    await clearProfiles();
  });

  // Helper to track current user context for RLS simulation
  let currentMockClerkUserId = "student-1";
  function getCurrentMockClerkUserId() {
    return currentMockClerkUserId;
  }
  function setCurrentMockClerkUserId(userId: string) {
    currentMockClerkUserId = userId;
  }

  describe("Student behavior", () => {
    beforeEach(() => {
      setCurrentMockClerkUserId("student-1");
    });

    it("GET /api/me returns only their own profile", async () => {
      const res = await request(app)
        .get("/api/me")
        .set("Authorization", "Bearer fakestudenttoken");
      
      expect(res.status).toBe(200);
      const profile = JSON.parse(res.text);
      expect(profile.clerk_user_id).toBe("student-1");
      expect(profile.role).toBe("student");
      expect(profile.email).toBe("student1@example.com");
    });

    it("GET /api/users returns 403 Forbidden for students", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer fakestudenttoken");
      
      expect(res.status).toBe(403);
      const error = JSON.parse(res.text);
      expect(error.error).toContain("Forbidden");
    });

    it("PATCH /api/me/progress updates student's own counters", async () => {
      const res = await request(app)
        .patch("/api/me/progress")
        .set("Authorization", "Bearer fakestudenttoken")
        .send({ session_count: 2, total_time_seconds: 120 });
      
      expect(res.status).toBe(200);
      const updated = JSON.parse(res.text);
      expect(updated.clerk_user_id).toBe("student-1");
      expect(updated.session_count).toBe(7); // 5 + 2
      expect(updated.total_time_seconds).toBe(420); // 300 + 120
      expect(updated.last_session_ended_at).toBeTruthy();
    });

    it("PATCH /api/me/progress validates input data", async () => {
      const res = await request(app)
        .patch("/api/me/progress")
        .set("Authorization", "Bearer fakestudenttoken")
        .send({ session_count: "invalid", total_time_seconds: -5 });
      
      expect(res.status).toBe(400);
      const error = JSON.parse(res.text);
      expect(error.error).toContain("must be numbers");
    });
  });

  describe("Admin behavior", () => {
    beforeEach(() => {
      setCurrentMockClerkUserId("admin-1");
    });

    it("GET /api/users returns all profiles for admin", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer fakeadmintoken");
      
      expect(res.status).toBe(200);
      const profiles = JSON.parse(res.text);
      expect(Array.isArray(profiles)).toBe(true);
      expect(profiles.length).toBe(3); // 2 students + 1 admin
      
      // Should be ordered by created_at desc
      const roles = profiles.map((p: TestProfile) => p.role);
      expect(roles).toContain("student");
      expect(roles).toContain("admin");
    });

    it("GET /api/me returns admin's own profile", async () => {
      const res = await request(app)
        .get("/api/me")
        .set("Authorization", "Bearer fakeadmintoken");
      
      expect(res.status).toBe(200);
      const profile = JSON.parse(res.text);
      expect(profile.clerk_user_id).toBe("admin-1");
      expect(profile.role).toBe("admin");
    });
  });

  describe("Authentication edge cases", () => {
    it("returns 401 when no token provided", async () => {
      const res = await request(app).get("/api/me");
      expect(res.status).toBe(401);
      
      const error = JSON.parse(res.text);
      expect(error.error).toContain("Authorization token required");
    });

    it("returns 404 when user profile doesn't exist", async () => {
      setCurrentMockClerkUserId("nonexistent-user");
      const res = await request(app)
        .get("/api/me")
        .set("Authorization", "Bearer nonexistenttoken");
      
      expect(res.status).toBe(404);
      const error = JSON.parse(res.text);
      expect(error.error).toContain("Profile not found");
    });
  });

  describe("Input validation", () => {
    it("PATCH /api/me/progress rejects negative values", async () => {
      const res = await request(app)
        .patch("/api/me/progress")
        .set("Authorization", "Bearer fakestudenttoken")
        .send({ session_count: -1, total_time_seconds: 60 });
      
      expect(res.status).toBe(400);
      const error = JSON.parse(res.text);
      expect(error.error).toContain("non-negative");
    });

    it("PATCH /api/me/progress rejects invalid JSON", async () => {
      const res = await request(app)
        .patch("/api/me/progress")
        .set("Authorization", "Bearer fakestudenttoken")
        .send("invalid json");
      
      expect(res.status).toBe(400);
      const error = JSON.parse(res.text);
      expect(error.error).toContain("Invalid JSON");
    });
  });
});
