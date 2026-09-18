"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import EmptyState from "@/components/dashboard/shared/EmptyState";

export default function BookmarkPage() {
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
    <div className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-ink mb-6">
          My Bookmarked Ebooks
        </h1>

        {loading && (
          <div className="text-center py-10">
            <div className="flex justify-center">
              <div className="h-10 w-10 border-[4px] border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          </div>
        )}

        {!loading && ebooks.length === 0 && (
          <EmptyState
            title="No bookmarks found"
            description="Start bookmarking your favorite ebooks and they’ll show up here for quick access."
            actionLabel="Browse Ebooks"
            actionHref="/ebooks"
          />
        )}

        {!loading && ebooks.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {ebooks.map((ebook) => (
              <Link
                key={ebook._id}
                href={`/ebooks/${ebook._id}`}
              >
                <div className="card overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] transition">
                  <img
                    src={
                      ebook.coverImage ||
                      "https://via.placeholder.com/400x600"
                    }
                    alt={ebook.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-4">
                    <h2 className="font-semibold text-ink line-clamp-2">
                      {ebook.title}
                    </h2>

                    <p className="text-sm text-muted mt-1">
                      {ebook.author}
                    </p>

                    <p className="mt-2 font-medium text-ink">
                      ${ebook.price}
                    </p>

                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ring-1 ${
                        ebook.sold
                          ? "bg-rose-500/10 text-rose-400 ring-rose-500/30"
                          : "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                      }`}
                    >
                      {ebook.sold
                        ? "Sold Out"
                        : "Available"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}