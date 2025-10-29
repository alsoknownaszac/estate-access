"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

interface TopbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Topbar({ isDarkMode, onToggleDarkMode }: TopbarProps) {
  const { user } = useAuthStore();

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user?.name}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className="text-foreground"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
