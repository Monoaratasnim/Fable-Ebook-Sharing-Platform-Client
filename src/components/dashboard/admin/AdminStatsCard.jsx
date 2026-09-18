"use client";

export default function AdminStatsCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      icon: "from-blue-500/20 to-indigo-500/10 text-blue-400 ring-blue-500/30",
    },
    green: {
      icon: "from-emerald-500/20 to-green-500/10 text-emerald-400 ring-emerald-500/30",
    },
    purple: {
      icon: "from-purple-500/20 to-violet-500/10 text-purple-400 ring-purple-500/30",
    },
    orange: {
      icon: "from-orange-500/20 to-amber-500/10 text-orange-400 ring-orange-500/30",
    },
    pink: {
      icon: "from-pink-500/20 to-rose-500/10 text-pink-400 ring-pink-500/30",
    },
    red: {
      icon: "from-red-500/20 to-rose-500/10 text-red-400 ring-red-500/30",
    },
  };

  const tint = colors[color] || colors.blue;

  return (
    <div className="card p-5 sm:p-6 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="text-muted text-sm font-medium">
          {title}
        </p>

        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tint.icon} text-xl ring-1`}
        >
          <span>{icon}</span>
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink mt-4 break-words">
        {value}
      </h2>
    </div>
  );
}