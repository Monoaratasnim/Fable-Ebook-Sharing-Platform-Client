"use client";

import { Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardHeader({ setOpen }) {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line bg-page/70 backdrop-blur-xl px-4 py-3 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="btn btn-outline btn-sm md:hidden !px-2.5"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="font-semibold text-ink">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-line bg-glass px-4 py-1.5 text-sm text-muted truncate max-w-[240px] backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          {session?.user?.email || "Guest"}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}