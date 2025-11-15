"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search as LucideSearch, User, LogOut, Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { ThemeToggle } from "../components/ThemeToggle";

import {
  FaDiscord,
  FaTelegramPlane,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  // Dummy user for profile dropdown
  const user = {
    email: "user@example.com",
    user_metadata: { username: "User" },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    setShowProfile(false);
    // Add logout logic here if needed
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="flex h-14 md:h-12 lg:h-16 items-center px-3 md:px-3 lg:px-4 gap-2 md:gap-2 lg:gap-4">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="h-9 w-9 md:h-8 md:w-8 lg:h-10 lg:w-10 flex-shrink-0" />

        {/* Logo for mobile/tablet */}
        <Link
          href="/"
          className="hidden md:flex items-center lg:hidden flex-shrink-0"
        >
          <span className="font-bold text-sm md:text-xs lg:text-lg bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-pulse">
            AnimixPlay
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 mx-4 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <LucideSearch className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Social Icons (Desktop & Tablet) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="https://discord.com" target="_blank">
            <FaDiscord className="h-5 w-5 hover:text-indigo-400 transition-colors" />
          </Link>
          <Link href="https://telegram.org" target="_blank">
            <FaTelegramPlane className="h-5 w-5 hover:text-blue-400 transition-colors" />
          </Link>
          <Link href="https://wa.me" target="_blank">
            <FaWhatsapp className="h-5 w-5 hover:text-green-500 transition-colors" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <FaInstagram className="h-5 w-5 hover:text-pink-500 transition-colors" />
          </Link>
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-1 md:gap-1 lg:gap-2 flex-shrink-0 ml-auto relative">
          <ThemeToggle />

          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 md:h-8 md:w-8 lg:h-10 lg:w-auto lg:px-3 p-0 lg:p-2"
                onClick={() => setShowProfile(!showProfile)}
              >
                <Avatar className="h-7 w-7 md:h-7 md:w-7 lg:h-8 lg:w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-xs lg:text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline ml-2 text-sm">Profile</span>
              </Button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-64 md:w-72 bg-card border border-border rounded-lg shadow-xl animate-slide-up overflow-hidden z-50">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {user.user_metadata?.username || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setShowProfile(false);
                        router.push("/profile");
                      }}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setShowProfile(false);
                        router.push("/settings");
                      }}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="h-8 md:h-8 lg:h-10 px-3 md:px-3 lg:px-4 text-xs md:text-xs lg:text-sm font-medium"
              asChild
            >
              <Link href="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
