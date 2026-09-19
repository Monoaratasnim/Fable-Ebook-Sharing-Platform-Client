"use client";

import Link from "next/link";
import {
  BookOpen,
  Compass,
  HeartHandshake,
  Rocket,
  Sparkles,
  Ghost,
  Zap,
  Feather,
  Brain,
  PenTool,
} from "lucide-react";

const genres = [
  {
    name: "Fiction",
    icon: <BookOpen className="h-7 w-7 stroke-[1.5]" />,
    color: "from-indigo-500 to-violet-600",
    glow: "radial-gradient(closest-side, rgba(129,140,248,0.5), transparent)",
  },
  {
    name: "Mystery",
    icon: <Compass className="h-7 w-7 stroke-[1.5]" />,
    color: "from-violet-500 to-purple-600",
    glow: "radial-gradient(closest-side, rgba(167,139,250,0.5), transparent)",
  },
  {
    name: "Romance",
    icon: <HeartHandshake className="h-7 w-7 stroke-[1.5]" />,
    color: "from-rose-500 to-pink-500",
    glow: "radial-gradient(closest-side, rgba(251,113,133,0.5), transparent)",
  },
  {
    name: "Sci-Fi",
    icon: <Rocket className="h-7 w-7 stroke-[1.5]" />,
    color: "from-sky-500 to-indigo-500",
    glow: "radial-gradient(closest-side, rgba(56,189,248,0.45), transparent)",
  },
  {
    name: "Fantasy",
    icon: <Sparkles className="h-7 w-7 stroke-[1.5]" />,
    color: "from-purple-500 to-fuchsia-500",
    glow: "radial-gradient(closest-side, rgba(217,70,239,0.5), transparent)",
  },
  {
    name: "Horror",
    icon: <Ghost className="h-7 w-7 stroke-[1.5]" />,
    color: "from-slate-600 to-indigo-900",
    glow: "radial-gradient(closest-side, rgba(100,116,139,0.5), transparent)",
  },
  {
    name: "Thriller",
    icon: <Zap className="h-7 w-7 stroke-[1.5]" />,
    color: "from-amber-500 to-orange-500",
    glow: "radial-gradient(closest-side, rgba(251,191,36,0.45), transparent)",
  },
  {
    name: "Biography",
    icon: <Feather className="h-7 w-7 stroke-[1.5]" />,
    color: "from-emerald-500 to-teal-600",
    glow: "radial-gradient(closest-side, rgba(52,211,153,0.45), transparent)",
  },
  {
    name: "Self Development",
    icon: <Brain className="h-7 w-7 stroke-[1.5]" />,
    color: "from-blue-500 to-violet-600",
    glow: "radial-gradient(closest-side, rgba(96,165,250,0.45), transparent)",
  },
  {
    name: "Poetry",
    icon: <PenTool className="h-7 w-7 stroke-[1.5]" />,
    color: "from-fuchsia-500 to-purple-600",
    glow: "radial-gradient(closest-side, rgba(232,121,249,0.5), transparent)",
  },
];

export default function GenreSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur dark:text-indigo-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            Find Your Favorite
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Explore Ebook Genres
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Browse ebooks by category and discover stories,
            knowledge, and adventures you&apos;ll love.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              href={`/browse?genre=${encodeURIComponent(genre.name)}`}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 p-6 text-center shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/20 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-slate-950/40 dark:hover:shadow-indigo-500/25"
            >
              {/* Ambient hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-1/3 left-1/2 h-40 w-64 -translate-x-1/2 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: genre.glow }}
              />

              {/* Gradient border highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  padding: "1.5px",
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.75), rgba(217,70,239,0.5), rgba(245,158,11,0.4))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  mask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              />

              {/* Multi-layered gradient icon wrapper */}
              <div className="relative mx-auto mb-5 h-16 w-16">
                <div
                  aria-hidden
                  className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${genre.color} opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-35`}
                />
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${genre.color} shadow-[inset_0_-4px_10px_rgba(2,6,23,0.3),inset_0_2px_6px_rgba(255,255,255,0.35),0_8px_20px_-8px_rgba(2,6,23,0.5)] ring-1 ring-white/40 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-2 top-1 h-1/2 rounded-full bg-white/25 blur-[2px]"
                  />
                  <span className="relative text-white drop-shadow-md">
                    {genre.icon}
                  </span>
                </div>
              </div>

              <h3 className="relative font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                {genre.name}
              </h3>

              <p className="relative mt-2 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-indigo-500 dark:text-slate-400 dark:group-hover:text-indigo-300">
                Explore
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                >
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}