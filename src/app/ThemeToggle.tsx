"use client"

import { useTheme } from "./ThemeContext"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-slate-800" />}
    </button>
  )
}
