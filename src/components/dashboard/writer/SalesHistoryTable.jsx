"use client";

export default function SalesHistoryTable({ sales }) {
  return (
    <div className="card overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-line bg-soft/60">
        <h2 className="text-lg font-semibold text-ink">
          Sales Records
        </h2>
        <p className="text-sm text-muted">
          Track all ebook purchases and revenue
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-soft">

            <tr className="border-b border-line">
              <th className="px-6 py-4 text-left font-semibold text-muted">
                Ebook Title
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Buyer
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Purchase Date
              </th>

              <th className="px-6 py-4 text-left font-semibold text-muted">
                Amount
              </th>
            </tr>

          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale._id}
                className="border-b border-line hover:bg-soft/60 transition"
              >
                <td className="px-6 py-4 font-medium text-ink">
                  {sale.ebookTitle}
                </td>

                <td className="px-6 py-4 text-body">
                  {sale.userEmail}
                </td>

                <td className="px-6 py-4 text-muted">
                  {new Date(
                    sale.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span className="font-bold text-emerald-400">
                    ${sale.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sales.length === 0 && (
          <div className="p-12 text-center text-muted">
            No sales history found.
          </div>
        )}
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        {sales.length === 0 ? (
          <div className="p-12 text-center text-muted">
            No sales history found.
          </div>
        ) : (
          <div className="divide-y divide-line">
            {sales.map((sale) => (
              <div
                key={sale._id}
                className="p-5 hover:bg-soft/50 transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold text-ink">
                      {sale.ebookTitle}
                    </h3>

                    <p className="text-sm text-muted mt-1">
                      {sale.userEmail}
                    </p>

                    <p className="text-sm text-faint mt-1">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="font-bold text-emerald-400">
                    ${sale.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {sales.length === 0 ? (
          <div className="p-10 text-center text-muted">
            No sales history found.
          </div>
        ) : (
          <div className="p-4 space-y-4">

            {sales.map((sale) => (
              <div
                key={sale._id}
                className="card rounded-xl p-4"
              >
                <div className="space-y-3">

                  <div>
                    <p className="text-xs text-faint">
                      Ebook
                    </p>

                    <h3 className="font-semibold text-ink">
                      {sale.ebookTitle}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-faint">
                      Buyer
                    </p>

                    <p className="text-sm text-body">
                      {sale.userEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-faint">
                      Purchase Date
                    </p>

                    <p className="text-sm text-body">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-faint">
                      Amount
                    </p>

                    <p className="font-bold text-emerald-400 text-lg">
                      ${sale.amount}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}