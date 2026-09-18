import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-6">
      <div className="text-center max-w-lg">

        <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4 text-ink">
          Page Not Found
        </h2>

        <p className="mt-4 text-muted">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="btn btn-primary btn-md mt-8"
        >
          Go Home
        </Link>

      </div>
    </div>
  );
}