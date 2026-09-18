"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Content you add will appear here.",
  actionLabel,
  actionHref,
  icon = null,
}) {
  return (
    <div className="card relative overflow-hidden p-8 sm:p-10 text-center">
      {/* decorative hairline + glow */}
      <div
        aria-hidden
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl"
      />

      <div className="relative flex flex-col items-center pt-4">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/10 text-indigo-400 ring-1 ring-indigo-500/30 shadow-xl shadow-indigo-500/10">
          {icon || <BookOpen className="h-9 w-9" />}
        </div>

        <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>

        <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>

        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="btn btn-primary btn-md mt-7 hover:scale-[1.03]"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
}