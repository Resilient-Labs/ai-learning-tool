"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  BookOpen,
  Brain,
  Trophy,
  Zap,
  Target,
  Clock,
  Star,
  ChevronRight,
  Plus,
  Settings,
  LogOut,
  User
} from "lucide-react";

export function Header() {
  const router = useRouter();
  // const { data: session, status } = useSession();
  const pathname = usePathname();

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
      {/* Header */}
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
              onClick={() => router.push("#")}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Page
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "text-foreground hover:text-primary",
                pathname === "#" && "text-primary"
              )}
              onClick={() => router.push("#")}
            >
              <Brain className="h-4 w-4 mr-2" />
              Page
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "text-foreground hover:text-primary",
                pathname === "#" && "text-primary"
              )}
              onClick={() => router.push("#")}
            >
              <Trophy className="h-4 w-4 mr-2" />
              Page
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
                    alt={"User avatar"}
                  />
                  <AvatarFallback>
                    {getUserInitials(
                      "Resilient Coder",
                      "example@resilientcoders.org"
                    )}
                    {/* {getUserInitials(session.user.name, session.user.email)} */}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {"Resilient Coder"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {"example@resilientcoders.org"}
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
              {("session.user.role" as string) === "admin" && (
                <DropdownMenuItem onClick={() => router.push("#")}>
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
    </>
  );
}
