"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import EbookCard from "@/components/EbookCard";
import EbookSkeleton from "@/components/EbookSkeleton";
import SelectDropdown from "@/components/SelectDropdown";

import {
  Search,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  BookOpen,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

const FILTER_TRANSITION = "transition-all duration-250 ease-in-out";
const FILTER_HOVER_INPUT =
  "hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-[0_10px_26px_-14px_rgba(99,102,241,0.45)] dark:hover:bg-indigo-600/20 dark:hover:border-indigo-500/50 dark:hover:shadow-[0_10px_30px_-12px_rgba(99,102,241,0.5)]";
const INPUT_ACTIVE =
  "border-indigo-500/60 shadow-[0_0_16px_rgba(99,102,241,0.18)] dark:shadow-[0_0_18px_rgba(99,102,241,0.22)]";
const FILTER_ACTIVE =
  "border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25";

const GENRE_OPTIONS = [
  { value: "all", label: "All Genres" },
  { value: "Fiction", label: "Fiction" },
  { value: "Mystery", label: "Mystery" },
  { value: "Horror", label: "Horror" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Romance", label: "Romance" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Thriller", label: "Thriller" },
  { value: "Biography", label: "Biography" },
  { value: "Self Development", label: "Self Development" },
  { value: "Poetry", label: "Poetry" },
];

const SORT_OPTIONS = [
  { value: "new", label: "Newest" },
  { value: "low", label: "Price Low → High" },
  { value: "high", label: "Price High → Low" },
];

const AVAILABILITY_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
];

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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 backdrop-blur">
          <BookOpen className="h-3.5 w-3.5" />
          Library
        </div>

        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
          Browse Ebooks
        </h1>

        <p className="mt-2 text-muted">
          Discover and explore amazing ebooks.
        </p>
      </motion.div>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative z-30 mt-8 rounded-2xl border border-line bg-glass p-4 backdrop-blur-xl sm:p-5"
      >
        <div className="mb-3 hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted sm:flex">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Refine Your Search
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          {/* SEARCH */}
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className={`input pl-10 ${FILTER_TRANSITION} ${FILTER_HOVER_INPUT} ${
                search.trim() ? INPUT_ACTIVE : ""
              }`}
            />
          </div>

          {/* GENRE */}
          <SelectDropdown
            icon={BookOpen}
            value={genre}
            placeholder="All Genres"
            active={genre !== "all"}
            onChange={(v) => {
              setPage(1);
              setGenre(v);
            }}
            options={GENRE_OPTIONS}
          />

          {/* SORT */}
          <SelectDropdown
            icon={ArrowDownWideNarrow}
            value={sort}
            placeholder="Sort By"
            active={sort !== ""}
            onChange={(v) => {
              setPage(1);
              setSort(v);
            }}
            options={SORT_OPTIONS}
          />

          {/* MIN PRICE */}
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => {
                setPage(1);
                setMinPrice(e.target.value);
              }}
              className={`input pl-10 ${FILTER_TRANSITION} ${FILTER_HOVER_INPUT} ${
                minPrice !== "" ? INPUT_ACTIVE : ""
              }`}
            />
          </div>

          {/* MAX PRICE */}
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                setPage(1);
                setMaxPrice(e.target.value);
              }}
              className={`input pl-10 ${FILTER_TRANSITION} ${FILTER_HOVER_INPUT} ${
                maxPrice !== "" ? INPUT_ACTIVE : ""
              }`}
            />
          </div>

          {/* AVAILABILITY */}
          <SelectDropdown
            icon={ShieldCheck}
            value={availability}
            placeholder="All Status"
            active={availability !== "all"}
            onChange={(v) => {
              setPage(1);
              setAvailability(v);
            }}
            options={AVAILABILITY_OPTIONS}
          />
        </div>
      </motion.div>

      {error && (
        <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400">
          {error}
        </div>
      )}

      {/* RESULTS */}
      {!loading && (
        <p className="mt-6 text-sm text-muted">
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
        <div className="mt-16 text-center text-muted">
          No ebooks found.
        </div>
      )}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-outline btn-sm disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n + 1)}
              className={`btn btn-sm px-4 ${
                page === n + 1 ? FILTER_ACTIVE : "btn-outline"
              }`}
            >
              {n + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn btn-outline btn-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}