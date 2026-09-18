"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import AdminStatsCard from "@/components/dashboard/admin/AdminStatsCard";
import MonthlySalesChart from "@/components/dashboard/admin/MonthlySalesChart";
import GenrePieChart from "@/components/dashboard/admin/GenrePieChart";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
         const {data:tokenData} = await authClient.token()
         console.log(tokenData)
        const [
          statsRes,
          salesRes,
          genreRes,
        ] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/admin/stats`,{
              headers: {
                authorization: `Bearer ${tokenData?.token}`
              }
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/admin/monthly-sales`,{
              headers: {
                authorization: `Bearer ${tokenData?.token}`
              }
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/admin/genre-stats`,{
              headers: {
                authorization: `Bearer ${tokenData?.token}`
              }
            }
          ),
        ]);

        const stats = await statsRes.json();
        const sales = await salesRes.json();
        const genres = await genreRes.json();

        setStats(stats);
        setSalesData(sales);
        setGenreData(genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="card p-10">
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 border-[5px] border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
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
            Admin Control Center
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Admin <span className="brand-text">Dashboard</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Overview of users, writers, ebooks, sales and revenue.
          </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <AdminStatsCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon="👥"
          color="blue"
        />

        <AdminStatsCard
          title="Total Writers"
          value={stats.totalWriters || 0}
          icon="✍️"
          color="green"
        />

        <AdminStatsCard
          title="Ebooks Sold"
          value={stats.totalSold || 0}
          icon="📚"
          color="purple"
        />

        <AdminStatsCard
          title="Revenue"
          value={`$${(
            (stats.totalRevenue || 0) 
          ).toFixed(2)}`}
          icon="💰"
          color="orange"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <MonthlySalesChart
          data={salesData}
        />

        <GenrePieChart
          data={genreData}
        />

      </div>

    </div>
  );
}