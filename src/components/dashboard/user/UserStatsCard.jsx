"use client";

export default function UserStatsCard({ title, value, icon }) {
  return (
    <div className="card p-5 flex justify-between items-center hover:-translate-y-1 transition-all duration-300">

      <div>
        <p className="text-muted text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-ink">{value}</h2>
      </div>

      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 text-2xl ring-1 ring-indigo-500/30">
          <span>{icon}</span>
        </div>
      )}
    </div>
  );
}