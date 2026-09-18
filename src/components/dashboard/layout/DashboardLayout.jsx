"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
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
    <div className="min-h-screen bg-page flex">

      {/* SIDEBAR */}
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        role={role}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        <DashboardHeader setOpen={setOpen} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}