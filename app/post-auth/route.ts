import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../src/lib/auth";

/**
 * Post-authentication role-based router
 * Redirects users to appropriate landing page based on their role
 */
export async function GET(request: NextRequest) {
  try {
    // Get current user using existing auth helpers
    const user = await getCurrentUser();
    
    // If not signed in, redirect to sign-in
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Apply role-based mapping
    // admin → /app (no /admin route exists)
    // student/unknown → /app
    const redirectUrl = "/app";
    
    console.log(`Post-auth redirect: user ${user.id} (${user.role}) → ${redirectUrl}`);
    
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("Post-auth router error:", error);
    // Fallback to app on error
    return NextResponse.redirect(new URL("/app", request.url));
  }
}
