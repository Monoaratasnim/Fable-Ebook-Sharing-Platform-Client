"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-page">
      <div className="card p-10 text-center max-w-md">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 text-rose-400">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold text-ink">
          Something went wrong
        </h1>

        <p className="text-muted mt-3">
          An unexpected error occurred.
        </p>

        <button
          onClick={reset}
          className="btn btn-primary btn-md mt-8"
        >
          <RotateCw className="h-4 w-4" />
          Reload
        </button>

      </div>
    </div>
  );
}