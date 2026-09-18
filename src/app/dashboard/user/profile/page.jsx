"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isLoading } = authClient.useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) setUser(session.user);
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-400">User not found</p>
      </div>
    );
  }

  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-line pb-3">
      <span className="text-muted text-sm sm:text-base">{label}</span>
      <span className="font-medium text-ink text-sm sm:text-base break-all sm:text-right">
        {value}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="max-w-2xl card p-5 sm:p-6 md:p-8">

        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl font-bold text-ink mb-6">
          My Profile
        </h1>

        {/* USER INFO */}
        <div className="space-y-4">

          <InfoRow label="Name" value={user.name || "N/A"} />
          <InfoRow label="Email" value={user.email} />

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b border-line pb-3">
            <span className="text-muted text-sm sm:text-base">Role</span>
            <span
              className={`inline-block font-semibold px-3 py-1 rounded-full text-xs sm:text-sm w-fit ring-1 ${
                user.role === "admin"
                  ? "bg-rose-500/10 text-rose-400 ring-rose-500/30"
                  : user.role === "writer"
                  ? "bg-indigo-500/10 text-indigo-300 ring-indigo-500/30"
                  : "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
              }`}
            >
              {user.role || "user"}
            </span>
          </div>

          <InfoRow label="User ID" value={user.id || "N/A"} />

        </div>

        {/* INFO BOX */}
        <div className="mt-6 p-4 rounded-lg bg-soft/60 text-xs sm:text-sm text-muted">
          Profile information is managed through authentication system.
          Role changes are controlled by admin only.
        </div>

      </div>
    </div>
  );
}