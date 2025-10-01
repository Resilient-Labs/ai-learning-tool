"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import {
  BookOpen,
  Brain,
  LogOut,
  Settings,
  Trophy,
  User,
  Zap
} from "lucide-react";

const mockUser = {
  id: "e4a2c7b8-1f5c-4d9e-9b0a-3c8d1e5f7b2a",
  email: "flim.flam@resilientcoders.org",
  primaryEmailAddress: {
    emailAddress: "flim.flam@resilientcoders.org"
  },
  firstName: "Flim",
  lastName: "Flam",
  fullName: "Flim Flam",
  role: "admin",
  cohort: "2025A",
  created_at: "2025-09-27T10:00:00Z",
  updated_at: "2025-09-27T10:00:00Z",
  last_login: "2025-09-27T10:00:00Z",
  is_active: true,
  auth_provider: "supabase",
  provider_id: null
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(mockUser);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCurrentUser(user as any);
    }
  }, [isLoaded, user]);

  // Get user initials for avatar
  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const handleSignOut = () => {
    console.log("Implement Signout");
  };

  return (
    <>
      {isLoaded && user && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            <div
              className="flex items-center gap-2"
              onClick={() => router.push("/")}
            >
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                AI Learning Tool
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                className={cn(
                  "text-foreground hover:text-primary",
                  pathname === "#" && "text-primary"
                )}
                onClick={() => router.push("/ui-docs")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                UI Docs
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-foreground hover:text-primary",
                  pathname === "#" && "text-primary"
                )}
                onClick={() => router.push("#")}
              >
                <Brain className="h-4 w-4 mr-2" />#
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-foreground hover:text-primary",
                  pathname === "#" && "text-primary"
                )}
                onClick={() => router.push("#")}
              >
                <Trophy className="h-4 w-4 mr-2" />#
              </Button>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt={currentUser.firstName + " " + currentUser.lastName}
                    />
                    <AvatarFallback>
                      {getUserInitials(
                        currentUser.firstName + " " + currentUser.lastName,
                        currentUser.email ||
                          currentUser.primaryEmailAddress.emailAddress
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none flex justify-between">
                      <span>
                        {currentUser.firstName + " " + currentUser.lastName}
                      </span>
                      <Badge variant="destructive">
                        {currentUser.cohort || "1970A"}
                      </Badge>
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email ||
                        currentUser.primaryEmailAddress.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("#")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("#")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                {currentUser.role === "admin" && (
                  <DropdownMenuItem onClick={() => router.push("/admin")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      )}
    </>
  );
}
