"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { BookOpen, Lock, Mail, Sparkles } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

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
    <div className="bg-page relative min-h-screen overflow-x-clip px-4 py-10 md:flex md:items-center md:justify-center md:py-16">
      {/* ================= IMMERSIVE BACKGROUND ================= */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* mesh gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(50% 40% at 80% 0%, rgba(168,85,247,0.30), transparent 60%), radial-gradient(50% 45% at 50% 100%, rgba(217,70,239,0.22), transparent 60%)",
          }}
        />

        {/* soft grid texture */}
        <div className="bg-grid-slate absolute inset-0 opacity-70" />

        {/* ambient glowing orbs */}
        <div className="animate-glow absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-600/25 blur-[130px]" />
        <div className="animate-float absolute -right-24 top-0 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-[110px]" />
        <div className="animate-glow absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />

        {/* floating bookstore glyphs */}
        <div className="animate-float absolute bottom-[18%] left-[10%] hidden h-24 w-24 items-center justify-center rounded-3xl border border-indigo-500/15 bg-glass/50 text-indigo-300/40 shadow-xl backdrop-blur-xl lg:flex">
          <BookOpen className="h-10 w-10" />
        </div>
        <div className="absolute bottom-[30%] right-[12%] hidden h-20 w-20 items-center justify-center rounded-3xl border border-fuchsia-500/15 bg-glass/50 text-fuchsia-300/40 shadow-xl backdrop-blur-xl lg:flex">
          <Sparkles className="h-8 w-8" />
        </div>
      </div>

      {/* ================= AUTH CARD ================= */}
      <div className="relative z-10 w-full max-w-md overflow-visible rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 sm:p-8">
        {/* top hairline */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
        />

        {/* BRAND */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-600/30">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <p className="brand-text text-xl font-bold">Fable</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                Read · Imagine · Grow
              </p>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            Welcome <span className="brand-text">Back</span>
          </h1>

          <p className="mt-2 text-sm text-muted">
            Login to continue your reading journey
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
            <label className="mb-2 block text-sm font-medium text-ink">
              Email Address
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="example@gmail.com"
                className="input h-14 pl-12 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Password
            </label>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

              <input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="••••••••"
                className="input h-14 pl-12 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            isLoading={loading}
            className="h-14 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:shadow-xl hover:shadow-indigo-600/45 hover:brightness-110"
          >
            Login
          </Button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-line"></div>
          <span className="text-xs text-faint uppercase">OR</span>
          <div className="h-px flex-1 bg-line"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          variant="bordered"
          isLoading={googleLoading}
          onClick={handleGoogleLogin}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/70 text-ink backdrop-blur transition-all hover:border-indigo-400 hover:bg-indigo-50/70 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-indigo-600/15"
        >
          <FaGoogle className="h-4 w-4" />
          Continue with Google
        </Button>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-500 hover:text-violet-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}