"use client";

export default function WriterStatsCard({
  title,
  value,
  icon,
  color,
}) {
  const colors = {
    blue: "from-blue-500/20 to-indigo-500/10 text-blue-400 ring-blue-500/30",
    green: "from-emerald-500/20 to-green-500/10 text-emerald-400 ring-emerald-500/30",
    purple: "from-purple-500/20 to-violet-500/10 text-purple-400 ring-purple-500/30",
  };

  const tint = colors[color] || colors.blue;

  return (
    <div className="card p-5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-muted text-sm">
          {title}
        </p>

        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tint} text-xl ring-1`}
        >
          <span>{icon}</span>
        </span>
      </div>

      <h2 className="text-3xl font-bold text-ink mt-3">
        {value}
      </h2>
    </div>
  );
}