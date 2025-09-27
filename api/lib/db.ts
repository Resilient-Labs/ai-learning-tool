// -----------------------------------------------------------------------------
// Postgres connection helper
// -----------------------------------------------------------------------------
//
// Provides a shared Pool instance and a getClient() helper.
// All queries in routes/tests should go through this module.
//

import { Pool, PoolClient } from "pg";

// For testing: allow mocking the database
interface MockClient {
  query: (sql: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
  release: () => void;
}

let mockClient: MockClient | null = null;
export function setMockClient(client: MockClient) {
  mockClient = client;
}

export function clearMockClient() {
  mockClient = null;
}

// Only require DATABASE_URL in non-test environments
if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "test") {
  throw new Error("DATABASE_URL is not defined in environment");
}

// Shared pool across the app (only create if not in test mode)
export const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
}) : null;

/**
 * Get a client for per-request operations.
 * Remember to call client.release() when done.
 */
export async function getClient(): Promise<PoolClient> {
  // Return mock client if set (for testing)
  if (mockClient) {
    return mockClient as unknown as PoolClient;
  }
  
  if (!pool) {
    throw new Error("Database pool not initialized");
  }
  
  return pool.connect();
}