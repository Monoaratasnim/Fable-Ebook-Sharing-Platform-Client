"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import EbookCard from "@/components/EbookCard";
import EbookSkeleton from "@/components/EbookSkeleton";

export default function BrowsePage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [availability, setAvailability] = useState("all");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEbooks = async () => {
      setLoading(true);

      try {
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/ebooks?page=${page}&limit=8&search=${search}&genre=${genre}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}&availability=${availability}`
        );

        if (!res.ok) {
          throw new Error("Failed");
        }

        const data = await res.json();

        setEbooks(data.ebooks || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError("Failed to load ebooks.");
        setEbooks([]);
      }

      setLoading(false);
    };

    fetchEbooks();
  }, [
    page,
    search,
    genre,
    sort,
    minPrice,
    maxPrice,
    availability,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-white">
          Browse Ebooks
        </h1>

        <p className="mt-2 text-slate-400">
          Discover and explore amazing ebooks.
        </p>
      </motion.div>



      <div className="mt-8 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />

        <select
          value={genre}
          onChange={(e) => {
            setPage(1);
            setGenre(e.target.value);
          }}
          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="all">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
           <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Biography">Biography</option>
          <option value="Self Development">Self Development</option>
          <option value="Poetry">Poetry</option>
        </select>

  

        <select
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="">Sort By</option>
          <option value="new">Newest</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setPage(1);
            setMinPrice(e.target.value);
          }}
          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setPage(1);
            setMaxPrice(e.target.value);
          }}
          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />

        <select
          value={availability}
          onChange={(e) => {
            setPage(1);
            setAvailability(e.target.value);
          }}
          className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur transition focus:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300">
          {error}
        </div>
      )}

      {/* RESULTS */}

      {!loading && (
        <p className="mt-6 text-sm text-slate-400">
          {ebooks.length} ebooks found
        </p>
      )}

      {/* GRID */}

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <EbookSkeleton key={i} />
          ))}

        {!loading &&
          ebooks.map((ebook) => (
            <EbookCard
              key={ebook._id}
              ebook={ebook}
            />
          ))}
      </div>

      {/* EMPTY */}

      {!loading && ebooks.length === 0 && (
        <div className="mt-16 text-center text-slate-400">
          No ebooks found.
        </div>
      )}

      {/* PAGINATION */}

      {!loading && totalPages > 1 && (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border border-slate-800/80 bg-white/5 px-4 py-2 text-slate-200 backdrop-blur transition hover:bg-white/10 disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n + 1)}
              className={`rounded-lg border px-4 py-2 backdrop-blur transition ${
                page === n + 1
                  ? "border-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(129,140,248,0.4)]"
                  : "border-slate-800/80 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
            >
              {n + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border border-slate-800/80 bg-white/5 px-4 py-2 text-slate-200 backdrop-blur transition hover:bg-white/10 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}