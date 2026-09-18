"use client";

const palette = {
  blue: {
    icon: "from-blue-500/25 to-indigo-500/10 text-blue-400 ring-blue-500/40",
    hairline: "via-blue-500/70",
    glow: "bg-blue-500/10",
  },
  green: {
    icon: "from-emerald-500/25 to-green-500/10 text-emerald-400 ring-emerald-500/40",
    hairline: "via-emerald-500/70",
    glow: "bg-emerald-500/10",
  },
  purple: {
    icon: "from-purple-500/25 to-violet-500/10 text-purple-400 ring-purple-500/40",
    hairline: "via-purple-500/70",
    glow: "bg-purple-500/10",
  },
};

export default function WriterStatsCard({ title, value, icon, color = "blue" }) {
  const tint = palette[color] || palette.blue;

  return (
    <div className="card group relative overflow-hidden p-5 hover:-translate-y-1 transition-all duration-300">
      {/* top hairline + corner glow */}
      <div
        aria-hidden
        className={`absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${tint.hairline}`}
      />
      <div
        aria-hidden
        className={`absolute -right-10 -top-12 h-28 w-28 rounded-full ${tint.glow} blur-2xl transition-all duration-500 group-hover:scale-125`}
      />

      <div className="relative flex items-center justify-between">
        <p className="text-muted text-sm">{title}</p>

        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl ring-1 ${tint.icon} shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </span>
      </div>

      <h2 className="relative mt-3 text-3xl font-bold text-ink break-words">
        {value}
      </h2>
    </div>
  );
}