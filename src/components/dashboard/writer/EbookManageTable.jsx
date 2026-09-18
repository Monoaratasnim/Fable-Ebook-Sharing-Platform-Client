"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Pencil, Eye, EyeOff, Trash2 } from "lucide-react";

export default function EbookManageTable({
  ebooks,
  refresh,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this ebook?"
    );

    if (!confirmDelete) return;

    const loadingToast = toast.loading(
      "Deleting ebook..."
    );

    try {
       const {data:tokenData} = await authClient.token()
       console.log(tokenData)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/ebooks/${id}`,
        {
          method: "DELETE",
          headers:{
             authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.dismiss(loadingToast);

      toast.success(
        "Ebook deleted successfully"
      );

      refresh();
    } catch (error) {
      console.log(error);

      toast.dismiss(loadingToast);

      toast.error("Failed to delete ebook");
    }
  };

  const handlePublish = async (
    id,
    currentStatus
  ) => {
    const loadingToast = toast.loading(
      currentStatus
        ? "Unpublishing ebook..."
        : "Publishing ebook..."
    );

    try {
       const {data:tokenData} = await authClient.token()
       console.log(tokenData)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/ebooks/${id}/publish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify({
            published: !currentStatus,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.dismiss(loadingToast);

      toast.success(
        currentStatus
          ? "Ebook unpublished successfully"
          : "Ebook published successfully"
      );

      refresh();
    } catch (error) {
      console.log(error);

      toast.dismiss(loadingToast);

      toast.error(
        currentStatus
          ? "Failed to unpublish ebook"
          : "Failed to publish ebook"
      );
    }
  };

  const statusBadge = (published) =>
    `rounded-full px-3 py-1 text-xs font-medium ring-1 ${
      published
        ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
        : "bg-rose-500/10 text-rose-400 ring-rose-500/30"
    }`;

  return (
  <div className="card overflow-hidden">
    {/* ---------------- Desktop Table ---------------- */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-soft border-b border-line">
          <tr>
            <th className="p-4 text-left font-semibold text-muted">Cover</th>
            <th className="p-4 text-left font-semibold text-muted">Title</th>
            <th className="p-4 text-left font-semibold text-muted">Price</th>
            <th className="p-4 text-left font-semibold text-muted">Genre</th>
            <th className="p-4 text-left font-semibold text-muted">Status</th>
            <th className="p-4 text-left font-semibold text-muted">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ebooks.map((book) => (
            <tr
              key={book._id}
              className="border-b border-line hover:bg-soft/60 transition"
            >
              <td className="p-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-24 rounded-lg object-cover shadow"
                />
              </td>

              <td className="p-4 font-semibold text-ink">
                {book.title}
              </td>

              <td className="p-4 font-medium text-emerald-400">
                ${book.price}
              </td>

              <td className="p-4 text-body">{book.genre}</td>

              <td className="p-4">
                <span className={statusBadge(book.published)}>
                  {book.published
                    ? "Published"
                    : "Unpublished"}
                </span>
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/writer/edit/${book._id}`}
                    className="btn btn-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_8px_20px_-10px_rgba(59,130,246,0.6)]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handlePublish(
                        book._id,
                        book.published
                      )
                    }
                    className={`btn btn-sm ${
                      book.published
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_8px_20px_-10px_rgba(245,158,11,0.55)]"
                        : "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-[0_8px_20px_-10px_rgba(34,197,94,0.55)]"
                    }`}
                  >
                    {book.published ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {book.published
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(book._id)
                    }
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ebooks.length === 0 && (
        <div className="text-center py-12 text-muted">
          No ebooks found
        </div>
      )}
    </div>

    {/* ---------------- Mobile & Tablet Cards ---------------- */}

    <div className="lg:hidden p-4 space-y-5">
      {ebooks.length === 0 ? (
        <div className="text-center py-12 text-muted">
          No ebooks found
        </div>
      ) : (
        ebooks.map((book) => (
          <div
            key={book._id}
            className="card rounded-2xl p-4"
          >
            <div className="flex gap-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 rounded-xl object-cover shadow"
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg text-ink">
                  {book.title}
                </h3>

                <p className="text-sm text-muted mt-2">
                  Genre: {book.genre}
                </p>

                <p className="text-emerald-400 font-semibold mt-2">
                  ${book.price}
                </p>

                <span
                  className={`inline-block mt-3 ${statusBadge(book.published)}`}
                >
                  {book.published
                    ? "Published"
                    : "Unpublished"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              <Link
                href={`/dashboard/writer/edit/${book._id}`}
                className="btn btn-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handlePublish(
                    book._id,
                    book.published
                  )
                }
                className={`btn btn-sm ${
                  book.published
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                }`}
              >
                {book.published
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                onClick={() =>
                  handleDelete(book._id)
                }
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}