import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { canAccessProfile } from "@/lib/rbac";
import { getUserByClerkId, updateUser } from "@/lib/database/user";

/**
 * GET /api/user/profile
 * Get current user's profile or specific user profile (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("userId");

    let profileUserId = user.id;

    // If requesting specific user profile, check permissions
    if (targetUserId && targetUserId !== user.id) {
      const canAccess = await canAccessProfile(targetUserId);
      if (!canAccess) {
        return NextResponse.json(
          { error: "Insufficient permissions to view this profile" },
          { status: 403 }
        );
      }
      profileUserId = targetUserId;
    }

    // Get user profile from database
    const profile = await getUserByClerkId(profileUserId);
    
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    // Return profile data
    const profileData = {
      id: profile.user_id,
      clerk_user_id: profile.clerk_user_id,
      email: profile.email,
      fullName: profile.full_name,
      role: profile.role,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
      lastActiveAt: profile.last_active_at,
    };

    return NextResponse.json({
      success: true,
      data: profileData
    });

  } catch (error) {
    console.error("Profile GET API error:", error);
    
    if (error instanceof Error && error.message.includes("redirect")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/profile
 * Update current user's profile or specific user profile (admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { userId, ...updateData } = body;

    let targetUserId = user.id;

    // If updating specific user profile, check permissions
    if (userId && userId !== user.id) {
      const canAccess = await canAccessProfile(userId);
      if (!canAccess) {
        return NextResponse.json(
          { error: "Insufficient permissions to update this profile" },
          { status: 403 }
        );
      }
      targetUserId = userId;
    }

    // Validate update data
    const allowedFields = ["fullName", "email"];
    const filteredData: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined && typeof value === 'string') {
        filteredData[key] = value;
      }
    }

    // Only admins can update roles
    if (updateData.role && user.role === "admin") {
      if (["student", "admin"].includes(updateData.role)) {
        filteredData.role = updateData.role;
      } else {
        return NextResponse.json(
          { error: "Invalid role. Must be 'student' or 'admin'" },
          { status: 400 }
        );
      }
    }

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    console.log(`User ${user.id} updating profile ${targetUserId}:`, filteredData);

    // Update user profile
    const updatedProfile = await updateUser(targetUserId, filteredData);
    
    if (!updatedProfile) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedProfile.user_id,
        clerk_user_id: updatedProfile.clerk_user_id,
        email: updatedProfile.email,
        fullName: updatedProfile.full_name,
        role: updatedProfile.role,
        updatedAt: updatedProfile.updated_at,
      },
      updatedBy: user.id
    });

  } catch (error) {
    console.error("Profile PUT API error:", error);
    
    if (error instanceof Error && error.message.includes("redirect")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
