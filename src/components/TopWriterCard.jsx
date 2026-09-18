"use client";

import Image from "next/image";
import { FaAward, FaBookOpen, FaMedal } from "react-icons/fa";
import { authorAvatar } from "@/lib/authorAvatar";

export default function TopWriterCard({ writer, index }) {
  const avatar = authorAvatar(writer.writerName, writer.avatar);

  const rankInfo = [
    {
      badge: "🥇 #1 Writer",
      color: "from-amber-400 via-yellow-400 to-amber-500",
      text: "text-amber-300",
    },
    {
      badge: "🥈 #2 Writer",
      color: "from-slate-300 via-slate-400 to-slate-500",
      text: "text-slate-300",
    },
    {
      badge: "🥉 #3 Writer",
      color: "from-orange-400 via-orange-400 to-amber-500",
      text: "text-orange-300",
    },
  ];

  const rank = rankInfo[index] || rankInfo[2];

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-line bg-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[var(--shadow-hover)]">

      {/* Hover sheen */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Header */}
      <div
        className={`relative h-28 bg-gradient-to-r ${rank.color}`}
      >
        <div className="absolute inset-0 bg-slate-950/30" />

        <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">
          <Image
            src={avatar}
            alt={writer.writerName}
            width={128}
            height={128}
            unoptimized
            className="h-28 w-28 rounded-full border-4 border-page object-cover object-top shadow-[0_8px_30px_rgba(0,0,0,0.5)] drop-shadow-[0_0_18px_rgba(129,140,248,0.4)] md:h-32 md:w-32"
          />
        </div>
      </div>

      {/* Body */}
      <div className="relative px-6 pb-8 pt-20 text-center">
        <h3 className="text-xl font-bold text-ink md:text-2xl">
          {writer.writerName}
        </h3>

        <p className="mt-2 break-all text-sm text-muted">
          {writer.writerEmail}
        </p>

        {/* Rank */}
        <div
          className={`mt-5 inline-flex items-center gap-2 rounded-full border border-line-soft bg-soft/70 px-4 py-2 backdrop-blur ${rank.text}`}
        >
          <FaAward />

          <span className="font-semibold">
            {rank.badge}
          </span>
        </div>

        {/* Sales */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-soft/60 px-6 py-4 backdrop-blur">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 text-indigo-300 ring-1 ring-indigo-500/30">
              <FaBookOpen className="text-xl" />
            </div>

            <div className="text-left">
              <h4 className="text-2xl font-bold text-ink">
                {writer.totalSales}
              </h4>

              <p className="text-sm text-muted">
                Ebook Sales
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-amber-400/90">
            <FaMedal />
            <span className="text-sm font-medium">
              Featured Writer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}