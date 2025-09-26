import { getCurrentUser, UserRole, AuthenticatedUser } from "./auth";

/**
 * Role-Based Access Control (RBAC) utilities
 * Designed to work with Supabase Row Level Security (RLS) policies
 */

export interface Permission {
  resource: string;
  action: string;
  condition?: (user: AuthenticatedUser) => boolean;
  rlsPolicy?: string; // Reference to Supabase RLS policy
}

export const PERMISSIONS = {
  // Profile permissions (mapped to Supabase RLS policies)
  PROFILE_READ_SELF: { 
    resource: "profiles", 
    action: "read",
    rlsPolicy: "profiles: read self"
    // RLS handles the actual restriction
  },
  PROFILE_UPDATE_SELF: { 
    resource: "profiles", 
    action: "update",
    rlsPolicy: "profiles: update self"
    // RLS handles the actual restriction
  },
  PROFILE_READ_ALL: { 
    resource: "profiles", 
    action: "read",
    rlsPolicy: "profiles: admin read",
    condition: (user: AuthenticatedUser) => user.role === "admin"
  },
  PROFILE_UPDATE_ALL: { 
    resource: "profiles", 
    action: "update",
    rlsPolicy: "profiles: admin update",
    condition: (user: AuthenticatedUser) => user.role === "admin"
  },

  // Learning content permissions
  STUDENT_VIEW_PROGRESS: { resource: "progress", action: "read" },
  STUDENT_CREATE_CONVERSATION: { resource: "conversation", action: "create" },
  STUDENT_SEND_MESSAGE: { resource: "message", action: "create" },

  // Admin permissions
  ADMIN_VIEW_ANALYTICS: { resource: "analytics", action: "read" },
  ADMIN_MANAGE_CONTENT: { resource: "content", action: "write" },
  ADMIN_VIEW_ALL_CONVERSATIONS: { resource: "conversations", action: "read" },
} as const;

/**
 * Check if user has permission to perform an action
 */
export async function hasPermission(
  permission: Permission
): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return false;
    }

    // Check role-based permissions
    const rolePermissions = getRolePermissions(user.role);
    
    if (!rolePermissions.includes(permission)) {
      return false;
    }

    // Check additional conditions if provided
    if (permission.condition) {
      return permission.condition(user);
    }

    return true;
  } catch (error) {
    console.error("Error checking permission:", error);
    return false;
  }
}

/**
 * Get permissions for a specific role
 */
function getRolePermissions(role: UserRole): Permission[] {
  switch (role) {
    case "admin":
      return [
        // Profile permissions (admin can read/update all profiles)
        PERMISSIONS.PROFILE_READ_SELF,
        PERMISSIONS.PROFILE_UPDATE_SELF,
        PERMISSIONS.PROFILE_READ_ALL,
        PERMISSIONS.PROFILE_UPDATE_ALL,
        
        // Learning content permissions
        PERMISSIONS.STUDENT_VIEW_PROGRESS,
        PERMISSIONS.STUDENT_CREATE_CONVERSATION,
        PERMISSIONS.STUDENT_SEND_MESSAGE,
        
        // Admin-specific permissions
        PERMISSIONS.ADMIN_VIEW_ANALYTICS,
        PERMISSIONS.ADMIN_MANAGE_CONTENT,
        PERMISSIONS.ADMIN_VIEW_ALL_CONVERSATIONS,
      ];
    
    case "student":
      return [
        // Profile permissions (students can only read/update their own profile)
        PERMISSIONS.PROFILE_READ_SELF,
        PERMISSIONS.PROFILE_UPDATE_SELF,
        
        // Learning content permissions
        PERMISSIONS.STUDENT_VIEW_PROGRESS,
        PERMISSIONS.STUDENT_CREATE_CONVERSATION,
        PERMISSIONS.STUDENT_SEND_MESSAGE,
      ];
    
    default:
      return [];
  }
}

/**
 * Middleware function to check permissions in API routes
 */
export function requirePermission(permission: Permission) {
  return async function permissionMiddleware(
    request: Request
  ): Promise<{ success: boolean; error?: string }> {
    const hasAccess = await hasPermission(permission);
    
    if (!hasAccess) {
      return {
        success: false,
        error: "Insufficient permissions"
      };
    }
    
    return { success: true };
  };
}

/**
 * Check if user can access a specific resource
 */
export async function canAccessResource(
  resource: string,
  action: string
): Promise<boolean> {
  const permission: Permission = { resource, action };
  return hasPermission(permission);
}

/**
 * Get user's effective permissions
 */
export async function getUserPermissions(): Promise<Permission[]> {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return [];
    }

    return getRolePermissions(user.role);
  } catch (error) {
    console.error("Error getting user permissions:", error);
    return [];
  }
}

/**
 * Check if user can access a specific profile (self or admin)
 */
export async function canAccessProfile(
  targetUserId: string,
  action: "read" | "update" = "read"
): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return false;
    }

    // Admins can access any profile
    if (user.role === "admin") {
      return true;
    }

    // Users can only access their own profile
    return user.id === targetUserId;
  } catch (error) {
    console.error("Error checking profile access:", error);
    return false;
  }
}

/**
 * Get RLS policy name for a specific permission
 */
export function getRLSPolicy(permission: Permission): string | null {
  return permission.rlsPolicy || null;
}

/**
 * Check if a permission requires admin role
 */
export function isAdminOnlyPermission(permission: Permission): boolean {
  if (!permission.condition) {
    return false;
  }

  // Create mock user objects for testing
  const adminUser: AuthenticatedUser = {
    id: "test-admin",
    email: "admin@test.com",
    role: "admin",
    firstName: "Admin",
    lastName: "User"
  };

  const studentUser: AuthenticatedUser = {
    id: "test-student", 
    email: "student@test.com",
    role: "student",
    firstName: "Student",
    lastName: "User"
  };

  return permission.condition(adminUser) && !permission.condition(studentUser);
}

/**
 * Get user's role for JWT token (used by Supabase RLS)
 */
export async function getUserRoleForJWT(): Promise<string | null> {
  try {
    const user = await getCurrentUser();
    return user?.role || null;
  } catch (error) {
    console.error("Error getting user role for JWT:", error);
    return null;
  }
}
