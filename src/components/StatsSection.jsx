"use client";

import { Users, BookMarked, Eye, DollarSign } from "lucide-react";
import Reveal from "@/components/Reveal";

const stats = [
  {
    icon: <Users className="h-5 w-5" />,
    value: "120K+",
    label: "Active Readers",
    desc: "Reading stories across the globe",
    color: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-600/30",
  },
  {
    icon: <BookMarked className="h-5 w-5" />,
    value: "45K+",
    label: "Published Ebooks",
    desc: "Across every genre imaginable",
    color: "from-fuchsia-500 to-purple-500",
    glow: "shadow-fuchsia-600/30",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    value: "2.4M+",
    label: "Daily Story Views",
    desc: "Immersed in stories every single day",
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-600/30",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    value: "$3.2M+",
    label: "Writer Revenue Shared",
    desc: "Earned by writers like you",
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-600/30",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute right-1/3 top-0 h-72 w-72 rounded-full bg-purple-600/15 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            Fable At A Glance
          </span>

          <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
            A Growing Community of{" "}
            <span className="brand-text">Storytellers</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Real numbers from a platform built for readers, writers,
            and the stories that connect them.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="group card relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
                />

                <div
                  aria-hidden
                  className={`absolute -right-10 -top-12 h-28 w-28 rounded-full bg-gradient-to-br ${stat.color} opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                />

                <div
                  className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.glow}`}
                >
                  {stat.icon}
                </div>

                <h3 className="relative mt-5 bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl dark:from-indigo-400 dark:via-purple-400 dark:to-fuchsia-400">
                  {stat.value}
                </h3>

                <p className="relative mt-2 font-semibold text-ink">
                  {stat.label}
                </p>

                <p className="relative mt-1 text-sm text-muted">
                  {stat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}