"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BookOpen, Mail, User } from "lucide-react";

const genres = [
  "Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Thriller",
  "Biography",
  "Self Development",
  "Poetry",
];

export default function AddEbookForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const form = e.target;

      const title = form.title.value;
      const genre = form.genre.value;
      const price = form.price.value;
      const description = form.description.value;

      const imageFile = form.cover.files[0];

      if (!imageFile) {
        toast.error("Please select a cover image");
        return;
      }

      // =====================
      // Upload to ImgBB
      // =====================

      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imageUpload = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imageResult = await imageUpload.json();

      if (!imageResult.success) {
        throw new Error("Image upload failed");
      }

      const coverImage = imageResult.data.url;

      // =====================
      // Save Ebook
      // =====================

      const ebookData = {
        title,
        genre,
        price: Number(price),
        description,
        coverImage,

        writerName: session?.user?.name,
        writerEmail: session?.user?.email,

        sold: false,
        published: true,
      };

      const {data:tokenData} = await authClient.token()
      console.log(tokenData)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/ebooks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(ebookData),
        }
      );

      const result = await response.json();

      if (result.success) {
       toast.success("Ebook published successfully");

        form.reset();

        router.push("/dashboard/writer/manage-ebooks");
      } else {
        toast.error("Failed to add ebook");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl pb-8 mb-12">
      {/* Header */}
      <div className="card relative overflow-hidden p-6 mb-6">
        <div
          aria-hidden
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
        />
        <div
          aria-hidden
          className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl"
        />

        <div className="relative">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Writer Studio
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">
            Add New <span className="brand-text">Ebook</span>
          </h1>
          <p className="mt-2 text-sm text-muted">
            Upload and publish your ebook for readers around the world.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="card p-6 md:p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Ebook Title
          </label>

          <input
            type="text"
            name="title"
            required
            placeholder="Atomic Habits"
            className="input"
          />
        </div>

        {/* Genre + Price */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Genre
            </label>

            <select
              name="genre"
              required
              className="input"
            >
              <option value="">Select Genre</option>

              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Price ($)
            </label>

            <input
              type="number"
              name="price"
              required
              min="1"
              placeholder="10"
              className="input"
            />
          </div>
        </div>

        {/* Cover */}
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Cover Image
          </label>

          <input
            type="file"
            name="cover"
            required
            accept="image/*"
            className="input file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-indigo-400 dark:file:bg-indigo-500/20 dark:file:text-indigo-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-ink mb-2">
            Ebook Content / Full Description
          </label>

          <textarea
            name="description"
            required
            rows={12}
            placeholder="Write your ebook content here..."
            className="input resize-none"
          />
        </div>

        {/* Writer Info */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex items-start gap-3 rounded-xl border border-indigo-500/15 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/25">
              <User className="h-4 w-4" />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                Writer Name
              </p>
              <p className="mt-1 truncate font-semibold text-ink">
                {session?.user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-indigo-500/15 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/25">
              <Mail className="h-4 w-4" />
            </span>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                Writer Email
              </p>
              <p className="mt-1 truncate font-semibold text-ink break-all">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full sm:w-auto sm:px-10"
          >
            {loading ? "Uploading..." : "Publish Ebook"}
          </button>

          <p className="flex items-center gap-1.5 text-xs text-faint">
            <BookOpen className="h-3.5 w-3.5" />
            Your ebook will appear on the marketplace once published.
          </p>
        </div>
      </form>
    </div>
  );
}