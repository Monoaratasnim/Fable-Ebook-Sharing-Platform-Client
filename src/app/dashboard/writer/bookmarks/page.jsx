"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import EmptyState from "@/components/dashboard/shared/EmptyState";

export default function WriterBookmarksPage() {
  const { data: session } = authClient.useSession();

  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
          const {data:tokenData} = await authClient.token()
          console.log(tokenData)
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/my-bookmarks?email=${session.user.email}`,{
              headers: {
                authorization: `Bearer ${tokenData?.token}`
              }
            }
        );

        const data = await res.json();

        setEbooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Bookmark fetch error:", error);
        setEbooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [session?.user?.email]);

  return (
    <div className="max-w-7xl">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink">
          My Bookmarked Ebooks
        </h1>

        <p className="text-muted mt-1 text-sm sm:text-base">
          All ebooks you saved for later reading
        </p>
      </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-72 bg-soft animate-pulse rounded-xl"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && ebooks.length === 0 && (
          <EmptyState
            title="No bookmarks found"
            description="Start saving ebooks you like for quick access later."
            actionLabel="Browse Ebooks"
            actionHref="/ebooks"
          />
        )}

        {/* GRID */}
        {!loading && ebooks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {ebooks.map((ebook) => (
              <Link
                key={ebook._id}
                href={`/ebooks/${ebook._id}`}
                className="group block h-full w-full"
              >
                <div className="card overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] transition-all duration-300 h-full flex flex-col">

                  {/* IMAGE */}
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                    <img
                      src={
                        ebook.coverImage ||
                        "https://via.placeholder.com/400x600"
                      }
                      alt={ebook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h2 className="font-semibold text-sm sm:text-base line-clamp-2 text-ink">
                      {ebook.title}
                    </h2>

                    <p className="truncate text-xs sm:text-sm text-muted mt-1">
                      {ebook.writerEmail}
                    </p>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <p className="font-semibold text-sm sm:text-base text-ink">
                        ${ebook.price}
                      </p>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ring-1 ${
                          ebook.sold
                            ? "bg-rose-500/10 text-rose-400 ring-rose-500/30"
                            : "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                        }`}
                      >
                        {ebook.sold ? "Sold" : "Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
}