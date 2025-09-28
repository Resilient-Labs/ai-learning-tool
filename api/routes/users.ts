// api/routes/users.ts
// -----------------------------------------------------------------------------
// Users routes — Sprint-1 stubs hitting the DB
// -----------------------------------------------------------------------------
// Implements basic profile access with RLS enforced by setDbClaims.
// TODO: Replace verifyClerkToken stub with real Clerk integration later.
// -----------------------------------------------------------------------------

import { getClient } from "../lib/db";
import { verifyClerkToken, setDbClaims } from "../lib/auth";

export async function getMe(req: Request): Promise<Response> {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return Response.json({ error: "Authorization token required" }, { status: 401 });
    }

    const claims = await verifyClerkToken(token); // placeholder claims for now

    const client = await getClient();
    try {
      await setDbClaims(client, claims);
      const { rows } = await client.query(
        "select * from public.profiles where clerk_user_id = jwt_user_id()"
      );
      
      if (rows.length === 0) {
        return Response.json({ error: "Profile not found" }, { status: 404 });
      }
      
      return Response.json(rows[0], { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in getMe:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function getUsers(req: Request): Promise<Response> {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return Response.json({ error: "Authorization token required" }, { status: 401 });
    }

    const claims = await verifyClerkToken(token);

    // Check if user has admin role for this endpoint
    if (claims.role !== "admin") {
      return Response.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const client = await getClient();
    try {
      await setDbClaims(client, claims);
      const { rows } = await client.query("select * from public.profiles order by created_at desc");
      return Response.json(rows, { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in getUsers:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function patchMeProgress(req: Request): Promise<Response> {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return Response.json({ error: "Authorization token required" }, { status: 401 });
    }

    const claims = await verifyClerkToken(token);

    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { session_count, total_time_seconds } = body;

    // Validate input
    if (typeof session_count !== "number" || typeof total_time_seconds !== "number") {
      return Response.json({ 
        error: "session_count and total_time_seconds must be numbers" 
      }, { status: 400 });
    }

    if (session_count < 0 || total_time_seconds < 0) {
      return Response.json({ 
        error: "session_count and total_time_seconds must be non-negative" 
      }, { status: 400 });
    }

    const client = await getClient();
    try {
      await setDbClaims(client, claims);
      const { rows } = await client.query(
        `update public.profiles
         set session_count = session_count + $1,
             total_time_seconds = total_time_seconds + $2,
             last_session_ended_at = now(),
             updated_at = now()
         where clerk_user_id = jwt_user_id()
         returning *`,
        [session_count, total_time_seconds]
      );
      
      if (rows.length === 0) {
        return Response.json({ error: "Profile not found" }, { status: 404 });
      }
      
      return Response.json(rows[0], { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error in patchMeProgress:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
