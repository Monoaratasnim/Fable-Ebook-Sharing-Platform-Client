"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import UserStatsCard from "@/components/dashboard/user/UserStatsCard";
import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Clock,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

export default function UserDashboardPage() {
  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadStats = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/user/stats");
        const data = await res.json();

        setStats(data);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [session?.user?.email]);

  const firstName = session?.user?.name?.split(" ")[0] || "there";
  const totalPurchases = stats?.totalPurchases || 0;
  const totalBookmarks = stats?.bookmarks || 0;
  const totalSpent = `$${Number(stats?.totalSpent || 0).toFixed(2)}`;

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl border border-slate-200/70 bg-white/60 dark:border-slate-800/80 dark:bg-slate-900/70"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white/90 via-white/70 to-indigo-50/70 shadow-lg backdrop-blur-xl dark:border-slate-800/80 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-indigo-950/40">
        {/* decorative */}
        <div
          aria-hidden
          className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-gradient-to-tl from-emerald-500/10 to-indigo-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute right-1/3 top-0 h-40 w-40 -translate-y-1/2 rounded-full bg-violet-500/10 blur-2xl"
        />

        <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-10">
          <div className="min-w-0 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.9)]" />
              User Dashboard
            </span>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 lg:text-3xl dark:text-white">
              Welcome back, <span className="brand-text">{firstName}</span> 👋
            </h1>

            <p className="mt-2 text-sm text-muted sm:text-base">
              Track your purchases, bookmarks and reading journey — all in one
              place.
            </p>
          </div>

          {/* stats pill — balances whitespace on large screens */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70">
              <DollarSign className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-xs font-medium text-muted">Total spent</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {totalSpent}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70">
              <Bookmark className="h-4 w-4 text-violet-500 dark:text-violet-400" />
              <span className="text-xs font-medium text-muted">Saved</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {totalBookmarks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Overview
            </h2>
            <p className="text-sm text-muted">Your Fable activity at a glance</p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200/70 bg-white/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UserStatsCard
            title="Total Purchases"
            value={totalPurchases}
            icon={ShoppingBag}
            accent="indigo"
            hint="Completed orders"
          />

          <UserStatsCard
            title="Total Spent"
            value={totalSpent}
            icon={DollarSign}
            accent="emerald"
            hint="Lifetime spend"
          />

          <UserStatsCard
            title="Bookmarks"
            value={totalBookmarks}
            icon={Bookmark}
            accent="violet"
            hint="Saved for later"
          />
        </div>
      </section>

      {/* QUICK LINKS */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Quick Access
          </h2>
          <p className="text-sm text-muted">Jump straight into your reader hub</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dashboard/user/purchase-history"
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <span
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
            />

            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-violet-500/10 ring-1 ring-indigo-500/25 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Clock className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
              </span>

              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Purchase History
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  Every order you’ve made
                </p>
              </div>

              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-400" />
            </div>
          </Link>

          <Link
            href="/dashboard/user/purchased-ebooks"
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-xl sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <span
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
            />

            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/10 ring-1 ring-emerald-500/25 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <BookOpen className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </span>

              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Purchased Books
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  Your personal library
                </p>
              </div>

              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400" />
            </div>
          </Link>

          <Link
            href="/dashboard/user/bookmarks"
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-xl sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <span
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
            />

            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/10 ring-1 ring-violet-500/25 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Bookmark className="h-6 w-6 text-violet-500 dark:text-violet-400" />
              </span>

              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Bookmarks
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  Saved for later
                </p>
              </div>

              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}