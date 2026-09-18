"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="card p-6 mb-6">
        <h1 className="text-3xl font-bold text-ink">
          Add New Ebook
        </h1>

        <p className="text-muted mt-2">
          Upload and publish your ebook for readers around the world.
        </p>
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
            className="input file:mr-3 file:rounded-lg file:border-0 file:bg-blue-500/10 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-blue-400"
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
          <div className="rounded-xl border border-line bg-soft/60 p-4">
            <p className="text-sm text-muted">
              Writer Name
            </p>

            <p className="font-semibold text-ink">
              {session?.user?.name}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-soft/60 p-4">
            <p className="text-sm text-muted">
              Writer Email
            </p>

            <p className="font-semibold text-ink break-all">
              {session?.user?.email}
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full md:w-auto"
        >
          {loading ? "Uploading..." : "Publish Ebook"}
        </button>
      </form>
    </div>
  );
}