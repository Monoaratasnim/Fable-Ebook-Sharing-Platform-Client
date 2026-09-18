"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import UserStatsCard from "@/components/dashboard/user/UserStatsCard";
import Link from "next/link";
import { ArrowUpRight, Bookmark, BookOpen, History } from "lucide-react";

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

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-4 p-4">
        <div className="h-28 bg-soft animate-pulse rounded-xl" />
        <div className="h-28 bg-soft animate-pulse rounded-xl" />
        <div className="h-28 bg-soft animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="card relative overflow-hidden p-6 md:p-7">
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl"
        />

        <div className="relative">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            User Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Welcome back, <span className="brand-text">{session?.user?.name}</span> 👋
          </h1>
          <p className="mt-2 text-sm text-muted">
            Track your purchases, bookmarks and reading journey all in one place.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <UserStatsCard
          title="Total Purchases"
          value={stats?.totalPurchases || 0}
          icon="🛒"
          color="indigo"
        />
        <UserStatsCard
          title="Total Spent"
          value={`$${Number(stats?.totalSpent*100 || 0).toFixed(2)}`}
          icon="💰"
          color="green"
        />
        <UserStatsCard
          title="Bookmarks"
          value={stats?.bookmarks || 0}
          icon="🔖"
          color="purple"
        />
      </div>

      {/* QUICK LINKS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/user/purchase-history"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <History className="mb-3 h-6 w-6" />
          <p className="font-semibold">Purchase History</p>
          <p className="mt-0.5 text-xs text-blue-100/80">Every order you’ve made</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/dashboard/user/purchased-ebooks"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <BookOpen className="mb-3 h-6 w-6" />
          <p className="font-semibold">Purchased Books</p>
          <p className="mt-0.5 text-xs text-emerald-100/80">Your personal library</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/dashboard/user/bookmarks"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-5 text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <Bookmark className="mb-3 h-6 w-6" />
          <p className="font-semibold">Bookmarks</p>
          <p className="mt-0.5 text-xs text-violet-100/80">Saved for later</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}