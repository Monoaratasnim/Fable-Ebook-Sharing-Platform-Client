"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BadgeCheck, Hash, Mail, ShieldCheck, User } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isLoading } = authClient.useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) setUser(session.user);
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex max-w-3xl mx-auto items-center justify-center rounded-2xl border border-line bg-panel/60 p-16">
        <p className="text-muted animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex max-w-3xl mx-auto items-center justify-center rounded-2xl border border-line bg-panel/60 p-16">
        <p className="text-rose-400">User not found</p>
      </div>
    );
  }

  const roleChip =
    user.role === "admin"
      ? "bg-rose-500/10 text-rose-400 ring-rose-500/30"
      : user.role === "writer"
      ? "bg-indigo-500/10 text-indigo-300 ring-indigo-500/30"
      : "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30";

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 border-b border-line py-3.5 last:border-b-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
          {label}
        </p>
        <p className="mt-0.5 break-all font-semibold text-ink">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="mb-6 flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Account
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            My <span className="brand-text">Profile</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            Your account details and preferences.
          </p>
        </div>

        <span className={`mt-3 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 sm:mt-0 ${roleChip}`}>
          <BadgeCheck className="mr-1.5 h-3.5 w-3.5" />
          {user.role || "user"}
        </span>
      </div>

      {/* PROFILE CARD */}
      <div className="card relative overflow-hidden p-5 sm:p-8">
        {/* top hairline + ambient glow */}
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        />

        {/* IDENTITY HEADER */}
        <div className="relative mb-7 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "user"}
              className="h-20 w-20 rounded-2xl border border-line object-cover shadow-lg shadow-indigo-500/10"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-3xl font-bold text-white shadow-lg shadow-indigo-600/30">
              {user.name?.charAt(0) || "F"}
            </div>
          )}

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-ink">{user.name || "Fable Reader"}</h2>
            <p className="mt-0.5 text-sm text-muted">{user.email}</p>
            <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${roleChip}`}>
              {user.role || "user"}
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="relative">
          <InfoRow icon={User} label="Name" value={user.name || "N/A"} />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow icon={Hash} label="User ID" value={user.id || "N/A"} />
        </div>

        {/* NOTICE BOX */}
        <div className="relative mt-6 flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
          <div>
            <p className="text-sm font-semibold text-ink">Managed by Fable</p>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              Profile information is managed through the authentication system.
              Role changes are controlled by admin only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}