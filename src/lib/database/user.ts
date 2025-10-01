/**
 * Database integration utilities for user management
 * This file contains functions to sync Clerk users with Supabase profiles table
 */

import { supabaseAdmin } from '../supabase';

export interface DatabaseUser {
  user_id: string;
  clerk_user_id: string;
  email: string;
  role: "student" | "admin";
  full_name?: string;
  created_at: string;
  updated_at: string;
  cohort?: string;
  session_count: number;
  total_time_seconds: number;
  total_topics: string[];
  achievements: unknown[];
  last_session_ended_at?: string;
  avatar_url?: string;
  auth_provider: string;
  external_auth_id?: string;
}

// Type for app_role enum in Supabase
export type AppRole = "student" | "admin";

/**
 * Create a new user in the database
 * Called from Clerk webhook when user is created
 */
export async function createUser(userData: {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "student" | "admin";
}): Promise<DatabaseUser> {
  try {
    const fullName = userData.firstName && userData.lastName 
      ? `${userData.firstName} ${userData.lastName}` 
      : userData.firstName || userData.lastName || null;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        clerk_user_id: userData.clerkId,
        email: userData.email,
        role: userData.role as AppRole,
        full_name: fullName,
        // Set default values for Sprint-1 fields
        session_count: 0,
        total_time_seconds: 0,
        total_topics: [],
        achievements: [],
        auth_provider: 'clerk',
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating user:", error);
      throw error;
    }

    console.log("User created in Supabase:", data);
    return data;
  } catch (error) {
    console.error("Error creating user in database:", error);
    throw error;
  }
}

/**
 * Update user in the database
 * Called from Clerk webhook when user is updated
 */
export async function updateUser(
  clerkId: string,
  updates: Partial<{
    email: string;
    firstName: string;
    lastName: string;
    role: "student" | "admin";
  }>
): Promise<DatabaseUser | null> {
  try {
    const updateData: {
      updated_at: string;
      email?: string;
      role?: AppRole;
      full_name?: string | null;
    } = {
      updated_at: new Date().toISOString(),
    };

    // Map updates to Supabase schema
    if (updates.email) updateData.email = updates.email;
    if (updates.role) updateData.role = updates.role as AppRole;
    
    // Handle name updates
    if (updates.firstName || updates.lastName) {
      // Get current user to construct full name
      const { data: currentUser } = await supabaseAdmin
        .from('profiles')
        .select('full_name')
        .eq('clerk_user_id', clerkId)
        .single();

      const currentName = currentUser?.full_name || '';
      const [currentFirst, currentLast] = currentName.split(' ');
      
      const firstName = updates.firstName || currentFirst || '';
      const lastName = updates.lastName || currentLast || '';
      
      updateData.full_name = `${firstName} ${lastName}`.trim() || null;
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('clerk_user_id', clerkId)
      .select()
      .single();

    if (error) {
      console.error("Supabase error updating user:", error);
      throw error;
    }

    console.log("User updated in Supabase:", data);
    return data;
  } catch (error) {
    console.error("Error updating user in database:", error);
    throw error;
  }
}

/**
 * Delete user from the database
 * Called from Clerk webhook when user is deleted
 */
export async function deleteUser(clerkId: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('clerk_user_id', clerkId);

    if (error) {
      console.error("Supabase error deleting user:", error);
      throw error;
    }

    console.log("User deleted from Supabase:", clerkId);
  } catch (error) {
    console.error("Error deleting user from database:", error);
    throw error;
  }
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string): Promise<DatabaseUser | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('clerk_user_id', clerkId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error("Supabase error getting user:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error getting user by Clerk ID:", error);
    return null;
  }
}

/**
 * Update user's last active timestamp
 * Updates last_session_ended_at when user logs in
 */
export async function updateLastActive(clerkId: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({ 
        last_session_ended_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('clerk_user_id', clerkId);

    if (error) {
      console.error("Supabase error updating last active:", error);
      // Don't throw error for this - it's not critical
    } else {
      console.log("Updated last active for user:", clerkId);
    }
  } catch (error) {
    console.error("Error updating last active:", error);
    // Don't throw error for this - it's not critical
  }
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<DatabaseUser[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase error getting all users:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}

/**
 * Get users by role
 */
export async function getUsersByRole(role: "student" | "admin"): Promise<DatabaseUser[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase error getting users by role:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error getting users by role:", error);
    return [];
  }
}

/**
 * Update user session progress
 * Called when user completes a session or achieves something
 */
export async function updateUserProgress(
  clerkId: string,
  updates: {
    sessionIncrement?: number;
    timeSecondsIncrement?: number;
    newTopics?: string[];
    newAchievements?: Array<{
      slug: string;
      name: string;
      description?: string;
      earned_at: string;
    }>;
    cohort?: string;
  }
): Promise<DatabaseUser | null> {
  try {
    // First get current user data
    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      throw new Error(`User not found: ${clerkId}`);
    }

    const updateData: {
      updated_at: string;
      session_count?: number;
      total_time_seconds?: number;
      total_topics?: string[];
      achievements?: unknown[];
      cohort?: string;
      last_session_ended_at?: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    // Update session count
    if (updates.sessionIncrement) {
      updateData.session_count = currentUser.session_count + updates.sessionIncrement;
      updateData.last_session_ended_at = new Date().toISOString();
    }

    // Update total time
    if (updates.timeSecondsIncrement) {
      updateData.total_time_seconds = currentUser.total_time_seconds + updates.timeSecondsIncrement;
    }

    // Update topics (merge and dedupe)
    if (updates.newTopics && updates.newTopics.length > 0) {
      const existingTopics = currentUser.total_topics || [];
      const allTopics = [...existingTopics, ...updates.newTopics];
      updateData.total_topics = [...new Set(allTopics)]; // Remove duplicates
    }

    // Update achievements (append new ones)
    if (updates.newAchievements && updates.newAchievements.length > 0) {
      const existingAchievements = Array.isArray(currentUser.achievements) ? currentUser.achievements : [];
      updateData.achievements = [...existingAchievements, ...updates.newAchievements];
    }

    // Update cohort if provided
    if (updates.cohort) {
      updateData.cohort = updates.cohort;
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('clerk_user_id', clerkId)
      .select()
      .single();

    if (error) {
      console.error("Supabase error updating user progress:", error);
      throw error;
    }

    console.log("User progress updated:", { clerkId, updates: Object.keys(updateData) });
    return data;
  } catch (error) {
    console.error("Error updating user progress:", error);
    throw error;
  }
}
