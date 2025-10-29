import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDarkMode: boolean;
}

interface ThemeActions {
  toggleTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

// Single DOM manipulation utility
const updateDOM = (isDark: boolean) => {
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark);
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // State
      isDarkMode: false,

      // Actions
      toggleTheme: () => {
        const newDarkMode = !get().isDarkMode;
        set({ isDarkMode: newDarkMode });
        updateDOM(newDarkMode);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
