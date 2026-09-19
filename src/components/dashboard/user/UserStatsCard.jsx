"use client";

const accents = {
  indigo: {
    iconBox: "from-indigo-500/25 to-violet-500/10 ring-indigo-500/25",
    icon: "text-indigo-500 dark:text-indigo-400",
    hairline: "via-indigo-500/70",
    glow: "bg-indigo-500/10",
    value: "text-indigo-600 dark:text-indigo-400",
  },
  emerald: {
    iconBox: "from-emerald-500/25 to-teal-500/10 ring-emerald-500/25",
    icon: "text-emerald-500 dark:text-emerald-400",
    hairline: "via-emerald-500/70",
    glow: "bg-emerald-500/10",
    value: "text-emerald-600 dark:text-emerald-400",
  },
  violet: {
    iconBox: "from-violet-500/25 to-fuchsia-500/10 ring-violet-500/25",
    icon: "text-violet-500 dark:text-violet-400",
    hairline: "via-violet-500/70",
    glow: "bg-violet-500/10",
    value: "text-violet-600 dark:text-violet-400",
  },
  blue: {
    iconBox: "from-blue-500/25 to-indigo-500/10 ring-blue-500/25",
    icon: "text-blue-500 dark:text-blue-400",
    hairline: "via-blue-500/70",
    glow: "bg-blue-500/10",
    value: "text-blue-600 dark:text-blue-400",
  },
  pink: {
    iconBox: "from-pink-500/25 to-rose-500/10 ring-pink-500/25",
    icon: "text-pink-500 dark:text-pink-400",
    hairline: "via-pink-500/70",
    glow: "bg-pink-500/10",
    value: "text-pink-600 dark:text-pink-400",
  },
  orange: {
    iconBox: "from-orange-500/25 to-amber-500/10 ring-orange-500/25",
    icon: "text-orange-500 dark:text-orange-400",
    hairline: "via-orange-500/70",
    glow: "bg-orange-500/10",
    value: "text-orange-600 dark:text-orange-400",
  },
};

export default function UserStatsCard({ title, value, icon: Icon, accent = "indigo", hint }) {
  const tint = accents[accent] || accents.indigo;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/80">
      {/* top hairline + corner glow */}
      <div
        aria-hidden
        className={`absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent to-transparent sm:inset-x-6 ${tint.hairline}`}
      />
      <div
        aria-hidden
        className={`absolute -right-10 -top-12 h-28 w-28 rounded-full ${tint.glow} blur-2xl transition-all duration-500 group-hover:scale-125`}
      />

      <div className="relative min-w-0">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 shadow-lg transition-transform duration-300 group-hover:scale-110 ${tint.iconBox}`}
        >
          <Icon className={`h-6 w-6 ${tint.icon}`} strokeWidth={2} />
        </div>

        <p className="truncate text-sm font-medium text-muted">{title}</p>

        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 break-words dark:text-white sm:text-3xl">
          <span className={tint.value}>{value}</span>
        </h2>

        {hint && <p className="mt-1 text-xs font-medium text-muted">{hint}</p>}
      </div>
    </div>
  );
}