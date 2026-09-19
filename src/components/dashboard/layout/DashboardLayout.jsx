"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopBar from "./DashboardTopBar";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const { data: session, isLoading } = authClient.useSession();

  if (isLoading || !session?.user) {
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
    <div className="relative min-h-screen bg-page md:flex">
      {/* SIDEBAR */}
      <DashboardSidebar open={open} setOpen={setOpen} />

      {/* MAIN COLUMN — top header + content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <DashboardTopBar setOpen={setOpen} />

        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}