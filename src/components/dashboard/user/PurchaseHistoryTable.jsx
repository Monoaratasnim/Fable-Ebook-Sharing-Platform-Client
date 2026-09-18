"use client";

import EmptyState from "@/components/dashboard/shared/EmptyState";

export default function PurchaseHistoryTable({ data = [] }) {
  if (!data.length) {
    return (
      <EmptyState
        title="No purchase history found"
        description="Transactions from your purchases will show up here."
        actionLabel="Browse Ebooks"
        actionHref="/ebooks"
      />
    );
  }

  return (
    <>
      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead className="bg-soft border-b border-line">
              <tr className="text-left text-sm font-semibold text-muted">
                <th className="px-6 py-4">Ebook</th>
                <th className="px-6 py-4">Writer</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Amount Paid</th>
                <th className="px-6 py-4">Purchase Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-line last:border-none hover:bg-soft/60 transition"
                >
                  <td
                    className="px-6 py-4 font-medium text-ink max-w-[220px] truncate"
                    title={item.ebookTitle}
                  >
                    {item.ebookTitle}
                  </td>

                  <td className="px-6 py-4 text-body">
                    {item.writer}
                  </td>

                  <td className="px-6 py-4 font-medium text-ink">
                    ${Number(item.price).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    ${Number(item.amount).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="card p-4"
          >
            <h3
              className="font-semibold text-ink truncate"
              title={item.ebookTitle}
            >
              {item.ebookTitle}
            </h3>

            <p className="text-sm text-muted mt-1">
              {item.writer}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

              <div>
                <p className="text-muted">Price</p>
                <p className="font-semibold text-ink">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-muted">Paid</p>
                <p className="font-semibold text-emerald-400">
                  ${Number(item.amount).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-muted">Date</p>
                <p className="text-body">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-muted">Status</p>

                <span className="inline-flex mt-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                  Paid
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}