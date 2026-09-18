"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setRole(session.user.role || "user");
      setLoading(false);
    }
  }, [session]);

  // prevent flicker
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-page">
        <img
          src="/images/logo.png"
          alt="Fable"
          className="h-16 w-16 object-contain drop-shadow-[0_0_18px_rgba(129,140,248,0.5)]"
        />
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          Loading your dashboard…
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-page flex">

      {/* SIDEBAR */}
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        role={role}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile floating menu toggle — only while the drawer is closed */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="absolute left-4 top-3 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-glass text-ink shadow-lg backdrop-blur transition-all duration-300 hover:bg-soft md:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <main className="flex-1 px-4 pt-16 pb-8 md:px-6 md:pt-8 lg:px-8">
          {children}
        </main>

      </div>
    </div>
  );
}