"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import UserStatsCard from "@/components/dashboard/user/UserStatsCard";
import Link from "next/link";

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
    <div className="p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="card p-5">
        <h1 className="text-2xl font-bold text-ink">
          Welcome {session?.user?.name}
        </h1>
        <p className="text-muted text-sm">
          User Dashboard Overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <UserStatsCard
          title="Total Purchases"
          value={stats?.totalPurchases || 0}
        />
        <UserStatsCard
          title="Total Spent"
        value={`$${Number(stats?.totalSpent*100 || 0).toFixed(2)}`}
        />
        <UserStatsCard
          title="Bookmarks"
          value={stats?.bookmarks || 0}
        />
      </div>

      {/* QUICK LINKS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/user/purchase-history"
          className="bg-blue-500 text-white p-4 rounded-xl text-center"
        >
          Purchase History
        </Link>

        <Link
          href="/dashboard/user/purchased-ebooks"
          className="bg-green-500 text-white p-4 rounded-xl text-center"
        >
          Purchased Books
        </Link>

        <Link
          href="/dashboard/user/bookmarks"
          className="bg-purple-500 text-white p-4 rounded-xl text-center"
        >
          Bookmarks
        </Link>
      </div>
    </div>
  );
}