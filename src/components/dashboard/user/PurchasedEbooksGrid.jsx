"use client";

import Link from "next/link";
import EmptyState from "@/components/dashboard/shared/EmptyState";

export default function PurchasedEbooksGrid({ ebooks }) {
  if (!ebooks || ebooks.length === 0) {
    return (
      <EmptyState
        title="No purchased ebooks found"
        description="Ebooks you buy will appear here. Head to the browse page to start your collection."
        actionLabel="Browse Ebooks"
        actionHref="/ebooks"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {ebooks.map((ebook) => (
        <Link
          key={ebook._id}
          href={`/ebooks/${ebook._id}`}
          className="group"
        >
          <div className="card overflow-hidden h-[300px] flex flex-col hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] transition-all duration-300">

            {/* Image */}
            <div className="h-40 overflow-hidden">
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">

              <h2
                className="font-semibold text-sm text-ink truncate"
                title={ebook.title}
              >
                {ebook.title}
              </h2>

              <p
                className="text-xs text-muted truncate mt-1"
                title={ebook.writerName || ebook.author}
              >
                {ebook.writerName || ebook.author}
              </p>

              <div className="mt-auto">
                <p className="text-base font-bold text-blue-400">
                  ${ebook.price}
                </p>

                <span className="inline-flex mt-2 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30 text-[11px] font-medium">
                  Purchased
                </span>
              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}