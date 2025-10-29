"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated, useAuthStore } from "@/stores/auth-store";
import { useThemeStore } from "@/stores/theme-store";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { isLoading } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // Track hydration state
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after component mounts
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, [hasHydrated, isAuthenticated, isLoading, router]);

  // Apply theme after mount to avoid hydration issues
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar isDarkMode={isDarkMode} onToggleDarkMode={toggleTheme} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
