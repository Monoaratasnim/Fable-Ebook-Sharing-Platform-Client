"use client";

import Link from "next/link";

export default function EbookCard({ ebook }) {
  return (
    <Link href={`/ebooks/${ebook._id}`} className="group block h-full w-full">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[var(--shadow-hover)]">

        {/* IMAGE — fixed 4/3 ratio so every cover geometry renders identically */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
          <img
            src={ebook.coverImage}
            alt={ebook.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/10" />

          {ebook.sold && (
            <span className="absolute right-3 top-3 rounded-full border border-rose-400/40 bg-rose-500/85 px-3 py-1 text-xs font-semibold text-white shadow-[0_0_16px_rgba(244,63,94,0.5)] backdrop-blur">
              Sold
            </span>
          )}

          {ebook.genre && (
            <span className="absolute left-3 top-3 max-w-[55%] truncate rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-[11px] font-medium text-slate-200 backdrop-blur">
              {ebook.genre}
            </span>
          )}

          <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur">
            ${ebook.price}
          </span>
        </div>

        {/* CONTENT — grows to fill, footer pinned to the bottom */}
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <h3 className="line-clamp-1 text-sm font-bold text-ink sm:text-base">
            {ebook.title}
          </h3>

          <p className="mt-1 truncate text-sm text-muted">
            By {ebook.writerName}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-lg font-bold text-transparent">
              ${ebook.price}
            </span>

            <span className="btn btn-primary btn-sm rounded-lg px-4 py-2">
              View
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}