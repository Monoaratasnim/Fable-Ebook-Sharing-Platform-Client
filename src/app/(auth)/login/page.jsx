"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ================= EMAIL LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn.email({
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        setError(result.error.message || "Invalid credentials");
        toast.error(result.error.message || "Login failed");
        return;
      }

      toast.success("Login successful 🎉");

      // ✅ ROLE BASED REDIRECT (EMAIL ONLY)
      const role = result?.user?.role || "user";

      const routes = {
        admin: "/dashboard/admin",
        writer: "/dashboard/writer",
        user: "/",
      };

      router.replace(routes[role] || "/");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    const toastId = toast.loading("Redirecting to Google...");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/", // ✅ ALWAYS GO HOME
      });

      toast.dismiss(toastId);
    } catch (error) {
      console.error(error);
      setError("Google login failed");
      toast.error("Google login failed");
      toast.dismiss(toastId);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
  <div className="bg-page relative min-h-screen overflow-x-clip px-4 pt-8 pb-8 md:flex md:items-center md:justify-center">
    <div
      aria-hidden
      className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-600/15 blur-[130px]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[110px]"
    />

  <div className="card relative w-full max-w-md mx-auto p-6 sm:p-8 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
    />

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-ink">
            Welcome Back
          </h1>

          <p className="mt-2 text-muted text-sm">
            Login to continue your journey
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-400">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-ink">
              Email Address
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="example@gmail.com"
              className="input h-14"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 text-sm font-medium text-ink">
              Password
            </label>

            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="••••••••"
              className="input h-14"
            />
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold"
          >
            Login
          </Button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-line flex-1"></div>
          <span className="text-xs text-faint uppercase">OR</span>
          <div className="h-px bg-line flex-1"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          variant="bordered"
          isLoading={googleLoading}
          onClick={handleGoogleLogin}
          className="w-full h-14 rounded-xl border-line text-ink bg-glass"
        >
          Continue with Google
        </Button>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}