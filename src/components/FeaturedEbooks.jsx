"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EbookCard from "@/components/EbookCard";
import EbookSkeleton from "@/components/EbookSkeleton";

export default function FeaturedEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/ebooks/featured`
        );

        const data = await res.json();

        setEbooks(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="relative py-20 sm:py-24">
      <div aria-hidden className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-indigo-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 font-semibold text-indigo-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]" />
              Featured Collection
            </span>

            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Featured Ebooks
            </h2>

            <p className="mt-3 max-w-2xl text-muted">
              Explore some of the most popular and recently published
              ebooks from talented writers around the world.
            </p>
          </div>

          <Link href="/browse" className="btn btn-outline btn-md">
            View All Ebooks
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <EbookSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Books */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {ebooks.map((ebook) => (
              <EbookCard key={ebook._id} ebook={ebook} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && ebooks.length === 0 && (
          <div className="py-12 text-center text-muted">
            No featured ebooks found.
          </div>
        )}
      </div>
    </section>
  );
}