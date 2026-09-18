"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import TableSkeleton from "@/components/TableSkeleton";

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
         const {data:tokenData} = await authClient.token()
         console.log(tokenData)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/transactions`,{
            headers:{
              authorization: `Bearer ${tokenData?.token}`
            }
          }
        );

        const data = await res.json();

        setTransactions(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return <TableSkeleton rows={6} />;
  }

  return (
    <div className="card overflow-hidden">

    
      <div className="block md:hidden p-4 space-y-4">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx._id}
              className="card rounded-xl p-4"
            >
              <div className="space-y-2 text-sm text-body">

                <div>
                  <span className="font-semibold text-ink">
                    Transaction ID:
                  </span>

                  <p className="break-all text-body">
                    {tx.transactionId}
                  </p>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-ink">
                    Type
                  </span>

                  <span className="capitalize">
                    {tx.type}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="font-semibold text-ink">
                    Email
                  </span>

                  <span className="text-right break-all">
                    {tx.email}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-ink">
                    Amount
                  </span>

                  <span className="font-bold text-emerald-400">
                    ${Number(tx.amount).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-ink">
                    Date
                  </span>

                  <span>
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-muted">
            No transactions found.
          </div>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-soft">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-muted">
                Transaction ID
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Type
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                User Email
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Amount
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t border-line hover:bg-soft/60 transition"
                >
                  <td className="px-6 py-4 break-all text-body">
                    {tx.transactionId}
                  </td>

                  <td className="px-6 py-4 capitalize text-body">
                    {tx.type}
                  </td>

                  <td className="px-6 py-4 text-body">
                    {tx.email}
                  </td>

                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    ${Number(tx.amount).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-body">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-muted"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}