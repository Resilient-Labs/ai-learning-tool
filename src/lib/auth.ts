import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId, updateLastActive } from "./database/user";

/**
 * Server-side authentication utilities for Clerk integration
 */

export type UserRole = "student" | "admin";

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  // Note: imageUrl is available from Clerk but not stored in our Supabase profiles table
  // If we need to store profile images, i can add an image_url field 
}

/**
 * Get the current authenticated user from Clerk and Supabase
 * Returns null if user is not authenticated
 */
export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const user = await currentUser();
    
    if (!user) {
      return null;
    }

    // Get user data from Supabase
    const dbUser = await getUserByClerkId(user.id);
    
    if (!dbUser) {
      console.warn("User not found in Supabase database:", user.id);
      return null;
    }

    // Update last active timestamp
    await updateLastActive(user.id);

    // Parse full name from database
    const [firstName, ...lastNameParts] = (dbUser.full_name || "").split(" ");
    const lastName = lastNameParts.join(" ");

    return {
      id: user.id,
      email: dbUser.email,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      role: dbUser.role,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Require authentication - redirects to sign-in if not authenticated
 * Returns the authenticated user
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return user;
}

/**
 * Require specific role - redirects to unauthorized if role doesn't match
 * Returns the authenticated user
 */
export async function requireRole(requiredRole: UserRole): Promise<AuthenticatedUser> {
  const user = await requireAuth();
  
  if (user.role !== requiredRole) {
    redirect("/unauthorized");
  }
  
  return user;
}

/**
 * Check if user has specific role
 */
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === requiredRole;
}

/**
 * Get user ID from auth context (for API routes)
 */
export async function getUserId(): Promise<string | null> {
  try {
    const { userId } = await auth();
    return userId;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}

/**
 * Require user ID - throws error if not authenticated
 */
export async function requireUserId(): Promise<string> {
  const userId = await getUserId();
  
  if (!userId) {
    throw new Error("Authentication required");
  }
  
  return userId;
}
