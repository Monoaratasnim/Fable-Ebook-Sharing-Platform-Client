"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import PurchaseHistoryTable from "@/components/dashboard/user/PurchaseHistoryTable";

export default function PurchaseHistoryPage() {
  const { data: session } = authClient.useSession();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/user/purchases");
        const json = await res.json();

        setData(json);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-10 bg-soft animate-pulse rounded" />
        <div className="h-10 bg-soft animate-pulse rounded" />
        <div className="h-10 bg-soft animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold text-ink">
        Purchase History
      </h1>

      <PurchaseHistoryTable data={data} />
    </div>
  );
}