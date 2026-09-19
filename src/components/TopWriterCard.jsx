"use client";

import Link from "next/link";
import { Medal, Award, Star, BookOpen, Eye, ArrowRight } from "lucide-react";

const rankMeta = [
  {
    label: "Top Writer",
    badge: "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 shadow-amber-500/50",
    icon: <Medal className="h-3.5 w-3.5" />,
    glow: "shadow-amber-500/30",
    tint: "from-amber-400/15",
  },
  {
    label: "2nd Writer",
    badge: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900 shadow-slate-400/50",
    icon: <Medal className="h-3.5 w-3.5" />,
    glow: "shadow-slate-400/30",
    tint: "from-slate-300/15",
  },
  {
    label: "3rd Writer",
    badge: "bg-gradient-to-r from-orange-400 to-amber-600 text-orange-950 shadow-orange-500/50",
    icon: <Medal className="h-3.5 w-3.5" />,
    glow: "shadow-orange-500/30",
    tint: "from-orange-400/15",
  },
];

function getInitials(name = "Writer") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TopWriterCard({ writer, index }) {
  const rank = rankMeta[index] || rankMeta[2];
  const initials = getInitials(writer.writerName);
  const totalSales = Number(writer.totalSales) || 0;
  const reads = `${Math.round(Math.max(1, totalSales) * (16 - index * 2))}K`;

  return (
    <div className="group card relative h-full overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[var(--shadow-hover)]">
      {/* hairline */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
      />

      {/* Header */}
      <div
        className={`relative overflow-hidden bg-gradient-to-b ${rank.tint} via-transparent to-transparent p-6 pb-5 text-center`}
      >
        {/* soft halo behind avatar */}
        <div
          aria-hidden
          className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl"
        />

        {/* rank badge */}
        <span
          className={`absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-lg ${rank.badge}`}
        >
          {rank.icon}
          #{index + 1} {rank.label}
        </span>

        {/* letter avatar */}
        <div className="relative mx-auto mt-2 flex h-24 w-24 items-center justify-center">
          <div
            aria-hidden
            className="absolute -inset-2 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-70"
          />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-2xl font-bold text-white shadow-lg ring-4 ring-white/15 transition-transform duration-300 group-hover:scale-105">
            {initials}
          </div>
        </div>

        <h3 className="mt-4 text-xl font-bold text-ink md:text-2xl">
          {writer.writerName}
        </h3>

        <p className="mt-1 break-all text-sm text-muted">
          {writer.writerEmail}
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 pb-7">
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-line bg-glass/70 backdrop-blur">
          {/* Sales */}
          <div className="flex flex-col items-center gap-1 border-r border-line px-2 py-4 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
              <BookOpen className="h-4 w-4" />
            </span>
            <p className="mt-2 text-lg font-bold text-ink">{totalSales}</p>
            <p className="text-[10px] uppercase tracking-wider text-faint">
              Ebook Sales
            </p>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-center gap-1 border-r border-line px-2 py-4 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
              <Star className="h-4 w-4 fill-current" />
            </span>
            <p className="mt-2 flex items-center gap-1 text-lg font-bold text-ink">
              4.9
              <span className="flex text-amber-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
            </p>
            <p className="text-[10px] uppercase tracking-wider text-faint">
              Avg. Rating
            </p>
          </div>

          {/* Reads */}
          <div className="flex flex-col items-center gap-1 px-2 py-4 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
              <Eye className="h-4 w-4" />
            </span>
            <p className="mt-2 text-lg font-bold text-ink">{reads}</p>
            <p className="text-[10px] uppercase tracking-wider text-faint">
              Total Reads
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400/90">
            <Award className="h-4 w-4" />
            Featured Writer
          </span>

          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition-all duration-300 hover:gap-2.5 hover:text-indigo-300"
          >
            View library
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}