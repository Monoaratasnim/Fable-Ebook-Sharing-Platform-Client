"use client";

import { Menu, LayoutGrid } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardHeader({ setOpen }) {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-line bg-page/70 px-4 py-3 backdrop-blur-xl flex items-center justify-between">
      {/* subtle hairline under the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
      />

      {/* Left */}
      <div className="relative flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="btn btn-outline btn-sm md:hidden !px-2.5"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-600/30">
            <LayoutGrid className="h-4 w-4" />
          </div>

          <div className="leading-tight">
            <h1 className="font-semibold text-ink">Dashboard</h1>
            <p className="hidden text-[11px] text-faint capitalize sm:block">
              {user?.role || "Workspace"}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 rounded-full border border-line bg-glass px-4 py-1.5 backdrop-blur">
          {user?.image ? (
            <img
              src={user.image}
              alt={user?.name || "user"}
              className="h-7 w-7 rounded-full border border-line object-cover"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
              {user?.name?.charAt(0) || "F"}
            </div>
          )}

          <div className="max-w-[240px] leading-tight">
            <p className="truncate text-sm font-semibold text-ink">
              {user?.name || "Guest"}
            </p>
            <p className="truncate text-[11px] text-faint">
              {user?.email || "Not signed in"}
            </p>
          </div>

          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          </span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}