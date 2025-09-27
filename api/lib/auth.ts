// api/lib/auth.ts
// -----------------------------------------------------------------------------
// Auth Provider → DB Sync Contract (Sprint-1 Stub)
//
// Purpose: Bridge Clerk authentication with Postgres row-level security (RLS).
// Right now this is a placeholder so other tasks (DB claims, API tests) can
// build on it. Replace TODOs as we integrate Clerk in later sprints.
// -----------------------------------------------------------------------------

import type { PoolClient } from "pg";

// Claims that Postgres policies expect
export type Claims = {
  sub: string;                // maps to profiles.clerk_user_id
  role: "student" | "admin";  // maps to profiles.role
};

/**
 * Verify a Clerk token and normalize it into our Claims format.
 *
 * @param token - raw JWT string from Clerk
 * @returns {Claims} object with `sub` and `role`
 */
export async function verifyClerkToken(token: string): Promise<Claims> {
  // TODO: Integrate Clerk SDK
  // 1. Use `@clerk/backend` (or `@clerk/nextjs/server`) to verify the token.
  // 2. Extract Clerk's `userId` claim (maps to profiles.clerk_user_id).
  // 3. Query Postgres to fetch the role for that user.
  //    Example: SELECT role FROM public.profiles WHERE clerk_user_id = $1;
  // 4. Return { sub: clerk_user_id, role }.
  // 5. Throw an error if token invalid or user not found.

  // Temporary stub so routes/tests can call this now:
  // For testing: parse fake tokens to simulate different users
  if (token === "fakestudenttoken") {
    return { sub: "student-1", role: "student" };
  } else if (token === "fakeadmintoken") {
    return { sub: "admin-1", role: "admin" };
  } else if (token === "fakestudent2token") {
    return { sub: "student-2", role: "student" };
  } else if (token === "nonexistenttoken") {
    // Simulate a user that doesn't exist in our database
    return { sub: "nonexistent-user", role: "student" };
  }
  
  // For invalid tokens, throw an error
  throw new Error("Invalid or expired token");
}

/**
 * Helper: Attach claims to a Postgres session.
 *
 * This ensures RLS functions in polocies.sql can read the claims.
 */
export async function setDbClaims(
  client: PoolClient,
  claims: Claims
): Promise<void> {
  await client.query(
    "select set_config('request.jwt.claims', $1, true)",
    [JSON.stringify(claims)]
  );
}