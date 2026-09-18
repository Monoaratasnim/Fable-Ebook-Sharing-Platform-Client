"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export default function ThemeToggle({ className = "" }) {
  const theme = useTheme();

  const isDark = theme === "dark";

  const toggle = () => {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");

    html.classList.remove("dark", "light");
    html.classList.add(next ? "dark" : "light");
    html.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("fable-theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-glass text-ink backdrop-blur transition-all duration-300 hover:border-indigo-500/60 hover:shadow-[0_0_18px_rgba(129,140,248,0.45)] active:scale-90 ${className}`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}