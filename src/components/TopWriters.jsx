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
    <section className="relative border-y border-slate-800/60 bg-slate-900/40 py-20 sm:py-24">
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-300 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
            Our Best Authors
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Top Writers
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
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
                className="animate-pulse rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur"
              >
                <div className="h-20 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900" />

                <div className="mx-auto -mt-12 h-24 w-24 rounded-full border-4 border-slate-700 bg-slate-800"></div>

                <div className="mt-6 h-6 rounded bg-slate-800"></div>

                <div className="mt-4 h-4 rounded bg-slate-800"></div>

                <div className="mt-6 h-10 rounded-full bg-slate-800"></div>

                <div className="mt-6 h-12 rounded bg-slate-800"></div>
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
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 py-14 text-center backdrop-blur">
            <h3 className="text-xl font-semibold text-white">
              No Top Writers Found
            </h3>

            <p className="mt-2 text-slate-400">
              Writers will appear here after ebook sales are recorded.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}