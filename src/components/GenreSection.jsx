"use client";

import Link from "next/link";
import {
  BookOpen,
  Search,
  Heart,
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
    icon: <BookOpen className="h-7 w-7" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Mystery",
    icon: <Search className="h-7 w-7" />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Romance",
    icon: <Heart className="h-7 w-7" />,
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Sci-Fi",
    icon: <Rocket className="h-7 w-7" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Fantasy",
    icon: <Sparkles className="h-7 w-7" />,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    name: "Horror",
    icon: <Ghost className="h-7 w-7" />,
    color: "from-gray-600 to-slate-800",
  },
  {
    name: "Thriller",
    icon: <Zap className="h-7 w-7" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Biography",
    icon: <Feather className="h-7 w-7" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Self Development",
    icon: <Brain className="h-7 w-7" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Poetry",
    icon: <PenTool className="h-7 w-7" />,
    color: "from-violet-500 to-purple-500",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            Find Your Favorite
          </span>

          <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
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
              className="group relative overflow-hidden rounded-2xl border border-line bg-glass p-6 text-center backdrop-blur-md transition-all duration-250 ease-in-out hover:-translate-y-1.5 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-[0_14px_36px_-16px_rgba(99,102,241,0.5)] dark:hover:bg-indigo-600/20 dark:hover:border-indigo-500/50 dark:hover:shadow-[0_0_28px_rgba(99,102,241,0.28)]"
            >
              {/* Hover glow */}
              <div
                aria-hidden
                className="absolute inset-x-0 -top-16 h-24 bg-gradient-to-b from-indigo-500/20 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Glowing icon container */}
              <div
                className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${genre.color} text-2xl text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(129,140,248,0.55)]`}
              >
                {genre.icon}
              </div>

              <h3 className="relative font-bold text-ink transition-colors duration-250 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">{genre.name}</h3>

              <p className="relative mt-2 text-sm font-medium text-muted transition-colors duration-300 group-hover:text-indigo-400">
                Explore →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}