"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { BookOpen } from "lucide-react";

export default function EditEbookForm({ ebook }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(
    ebook?.title || ""
  );

  const [description, setDescription] = useState(
    ebook?.description || ""
  );

  const [price, setPrice] = useState(
    ebook?.price || ""
  );

  const [genre, setGenre] = useState(
    ebook?.genre || ""
  );

  const [coverImage, setCoverImage] = useState(
    ebook?.coverImage || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const {data:tokenData} = await authClient.token()
       console.log(tokenData)
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/writer/ebooks/${ebook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
        
          body: JSON.stringify({
            title,
            description,
            price: Number(price),
            genre,
            coverImage,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Ebook Updated Successfully");

        setTimeout(() => {
          router.push(
            "/dashboard/writer/manage-ebooks"
          );
        }, 1000);
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update ebook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl pb-8 mb-12">
      <div className="card relative overflow-hidden p-6 md:p-8">
        {/* top hairline + glow */}
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        />

        <form
          onSubmit={handleSubmit}
          className="relative space-y-6"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Ebook Title
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="input"
              placeholder="Atomic Habits"
            />
          </div>

          {/* COVER IMAGE */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Cover Image URL
            </label>

            <input
              type="text"
              required
              value={coverImage}
              onChange={(e) =>
                setCoverImage(e.target.value)
              }
              className="input"
              placeholder="https://i.ibb.co/..."
            />
          </div>

          {/* PREVIEW */}
          {coverImage && (
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">
                Cover Preview
              </p>

              <img
                src={coverImage}
                alt="preview"
                className="
                  w-full
                  max-w-xs
                  rounded-xl
                  border border-line
                  shadow
                  object-cover
                "
              />
            </div>
          )}

          {/* GENRE + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) =>
                  setGenre(e.target.value)
                }
                className="input"
              >
                <option value="">
                  Select Genre
                </option>

                <option value="Fiction">
                  Fiction
                </option>

                <option value="Mystery">
                  Mystery
                </option>

                <option value="Romance">
                  Romance
                </option>

                <option value="Sci-Fi">
                  Sci-Fi
                </option>

                <option value="Fantasy">
                  Fantasy
                </option>

                <option value="Horror">
                  Horror
                </option>

                <option value="Biography">
                  Biography
                </option>

                <option value="Self Development">
                  Self Development
                </option>

                <option value="Thriller">
                  Thriller
                </option>

                <option value="Poetry">
                  Poetry
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">
                Price ($)
              </label>

              <input
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="input"
                placeholder="9.99"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Description / Full Content
            </label>

            <textarea
              rows={10}
              required
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="input min-h-[250px] resize-none"
              placeholder="Write your ebook description..."
            />
          </div>

          {/* BUTTON */}
          <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full sm:w-auto sm:px-10"
            >
              {loading
                ? "Updating Ebook..."
                : "Update Ebook"}
            </button>

            <p className="flex items-center gap-1.5 text-xs text-faint">
              <BookOpen className="h-3.5 w-3.5" />
              Changes go live on the marketplace immediately.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}