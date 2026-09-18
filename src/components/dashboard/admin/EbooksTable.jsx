"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/TableSkeleton";
import { Trash2, Eye, EyeOff } from "lucide-react";

export default function EbooksTable() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEbooks = async () => {
    try {
        const {data:tokenData} = await authClient.token()
        console.log(tokenData)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/ebooks`,{
              headers: {
                authorization: `Bearer ${tokenData?.token}`
              }
            }
      );

      const data = await res.json();

      setEbooks(data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load ebooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEbooks();
  }, []);

  const handlePublish = async (
    id,
    currentStatus
  ) => {
    try {
       const {data:tokenData} = await authClient.token()
      console.log(tokenData)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/ebooks/${id}/publish`,
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
        toast.error("Update failed");
        return;
      }

      setEbooks((prev) =>
        prev.map((ebook) =>
          ebook._id === id
            ? {
                ...ebook,
                published: !currentStatus,
              }
            : ebook
        )
      );

      toast.success(
        currentStatus
          ? "Ebook unpublished successfully"
          : "Ebook published successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete ebook?"))
      return;

    try {
       const {data:tokenData} = await authClient.token()
        console.log(tokenData)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/ebooks/${id}`,
        {
          method: "DELETE",
          headers:{
             authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      if (!res.ok) {
        toast.error("Delete failed");
        return;
      }

      setEbooks((prev) =>
        prev.filter((ebook) => ebook._id !== id)
      );

      toast.success(
        "Ebook deleted successfully"
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



if (loading) {
  return <TableSkeleton rows={6} />;
}

  return (
    <>
      <div className="card hidden lg:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-soft">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-muted">
                  Title
                </th>

                <th className="px-6 py-4 text-left font-semibold text-muted">
                  Writer
                </th>

                <th className="px-6 py-4 text-left font-semibold text-muted">
                  Price
                </th>

                <th className="px-6 py-4 text-left font-semibold text-muted">
                  Status
                </th>

                <th className="px-6 py-4 text-left font-semibold text-muted">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {ebooks.map((ebook) => (
                <tr
                  key={ebook._id}
                  className="border-t border-line hover:bg-soft/60 transition"
                >
                  <td className="px-6 py-4 text-ink">
                    {ebook.title}
                  </td>

                  <td className="px-6 py-4 text-body">
                    {ebook.writerName}
                  </td>

                  <td className="px-6 py-4 text-ink">
                    ${ebook.price}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ${
                        ebook.published
                          ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                          : "bg-rose-500/10 text-rose-400 ring-rose-500/30"
                      }`}
                    >
                      {ebook.published
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handlePublish(
                            ebook._id,
                            ebook.published
                          )
                        }
                        className={`btn btn-sm ${
                          ebook.published
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_8px_20px_-10px_rgba(245,158,11,0.6)]"
                            : "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-[0_8px_20px_-10px_rgba(34,197,94,0.6)]"
                        }`}
                      >
                        {ebook.published ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        {ebook.published
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            ebook._id
                          )
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
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        {ebooks.map((ebook) => (
          <div
            key={ebook._id}
            className="card p-5"
          >
            <h3 className="font-bold text-ink">
              {ebook.title}
            </h3>

            <p className="text-muted mt-1">{ebook.writerName}</p>

            <p className="text-ink mt-1">${ebook.price}</p>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ring-1 ${
                ebook.published
                  ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                  : "bg-rose-500/10 text-rose-400 ring-rose-500/30"
              }`}
            >
              {ebook.published
                ? "Published"
                : "Unpublished"}
            </span>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() =>
                  handlePublish(
                    ebook._id,
                    ebook.published
                  )
                }
                className={`btn btn-sm flex-1 ${
                  ebook.published
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                }`}
              >
                {ebook.published
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    ebook._id
                  )
                }
                className="btn btn-danger btn-sm flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}