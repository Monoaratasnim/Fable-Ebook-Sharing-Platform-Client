"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import WriterStatsCard from "@/components/dashboard/writer/WriterStatsCard";
import { ArrowUpRight, BarChart3, Bookmark, Library, PlusCircle } from "lucide-react";

export default function WriterDashboard() {
  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState({
    totalEbooks: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchStats = async () => {
      try {
        const {data:tokenData} = await authClient.token()
        console.log(tokenData)
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/writer/stats?email=${session.user.email}`,{
              headers: {
                authorization: `Bearer ${tokenData?.token}`
              }
            }
        );

        const data = await res.json();

        setStats({
          totalEbooks: data.totalEbooks || 0,
          totalSales: data.totalSales || 0,
          totalRevenue: data.totalRevenue || 0,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="h-24 bg-soft animate-pulse rounded-xl" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 bg-soft rounded-xl animate-pulse" />
          <div className="h-28 bg-soft rounded-xl animate-pulse" />
          <div className="h-28 bg-soft rounded-xl animate-pulse" />
        </div>
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
            Writer Studio
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Welcome, <span className="brand-text">{session?.user?.name}</span> 📖
          </h1>
          <p className="mt-2 text-sm text-muted">
            Manage your ebooks, track sales & grow your revenue.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WriterStatsCard
          title="Total Ebooks"
          value={stats.totalEbooks}
          color="blue"
          icon="📚"
        />

        <WriterStatsCard
          title="Total Sales"
          value={stats.totalSales}
          color="green"
          icon="💰"
        />

        <WriterStatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          color="purple"
          icon="📈"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link
          href="/dashboard/writer/add-ebook"
          className="group relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-indigo-500 to-violet-600 p-5 text-white shadow-lg shadow-indigo-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <PlusCircle className="mb-3 h-6 w-6" />
          <p className="font-semibold">Add Ebook</p>
          <p className="mt-0.5 text-xs text-indigo-100/80">Publish a new story</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/dashboard/writer/manage-ebooks"
          className="group relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <Library className="mb-3 h-6 w-6" />
          <p className="font-semibold">Manage Ebooks</p>
          <p className="mt-0.5 text-xs text-blue-100/80">Edit or unpublish your books</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/dashboard/writer/bookmarks"
          className="group relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-violet-500 to-fuchsia-600 p-5 text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <Bookmark className="mb-3 h-6 w-6" />
          <p className="font-semibold">Bookmarks</p>
          <p className="mt-0.5 text-xs text-violet-100/80">Reader favorites you saved</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <Link
          href="/dashboard/writer/sales-history"
          className="group relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/40"
        >
          <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
          <BarChart3 className="mb-3 h-6 w-6" />
          <p className="font-semibold">Sales History</p>
          <p className="mt-0.5 text-xs text-emerald-100/80">Revenue & purchase records</p>
          <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}