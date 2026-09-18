"use client";

import { useEffect, useState } from "react";

import TopWriterCard from "./TopWriterCard";

export default function TopWriters() {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWriters = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/top-writers`
        );

        const data = await res.json();

        setWriters(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadWriters();
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-line bg-soft/40 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            Our Best Authors
          </span>

          <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
            Top Writers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Meet the writers whose ebooks have been
            loved the most by readers across Fable.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-line bg-glass p-6 backdrop-blur"
              >
                <div className="h-20 rounded-xl bg-gradient-to-br from-soft to-line" />

                <div className="mx-auto -mt-12 h-24 w-24 rounded-full border-4 border-panel bg-soft"></div>

                <div className="mt-6 h-6 rounded bg-soft"></div>

                <div className="mt-4 h-4 rounded bg-soft"></div>

                <div className="mt-6 h-10 rounded-full bg-soft"></div>

                <div className="mt-6 h-12 rounded bg-soft"></div>
              </div>
            ))}
          </div>
        )}

        {/* Cards */}
        {!loading && writers.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {writers.map((writer, index) => (
              <TopWriterCard
                key={writer.writerEmail}
                writer={writer}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && writers.length === 0 && (
          <div className="rounded-2xl border border-line bg-glass py-14 text-center backdrop-blur">
            <h3 className="text-xl font-semibold text-ink">
              No Top Writers Found
            </h3>

            <p className="mt-2 text-muted">
              Writers will appear here after ebook sales are recorded.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}