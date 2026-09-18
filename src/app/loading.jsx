"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="w-16 h-16 border-[6px] border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>

        <h2 className="text-2xl font-bold text-ink brand-text">
          Fable
        </h2>

        <p className="text-muted">
          Loading...
        </p>
      </div>
    </div>
  );
}