"use client";

import { useTheme } from "@/contexts/theme-context";
import { Moon, Sun } from "lucide-react";

export default function DarkModeBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="dark mode button"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      {theme == "dark" ? (
        <Moon size={20} className="text-neutral-400" />
      ) : (
        <Sun size={20} className="text-neutral-600" />
      )}
    </button>
  );
}
