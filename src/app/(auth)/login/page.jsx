"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { BookOpen, CheckCircle, Lock, Mail } from "lucide-react";
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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    const toastId = toast.loading("Redirecting to Google...");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
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
    <div className="bg-page relative flex min-h-screen items-center justify-center overflow-x-clip px-4 pb-12 pt-24 md:px-6 md:pb-16 md:pt-28">
      {/* ============ BACKGROUND ============ */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(50% 40% at 80% 0%, rgba(168,85,247,0.30), transparent 60%), radial-gradient(50% 45% at 50% 100%, rgba(217,70,239,0.22), transparent 60%)",
          }}
        />
        <div className="bg-grid-slate absolute inset-0 opacity-70" />
        <div className="animate-glow absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-600/25 blur-[130px]" />
        <div className="animate-float absolute -right-24 top-10 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-[110px]" />
        <div className="animate-glow absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      {/* ============ CARD ============ */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/90 md:grid md:grid-cols-2">
        {/* ============ LEFT PANEL — BRAND (hidden mobile) ============ */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 md:flex md:flex-col md:justify-between p-10 lg:p-12">
          {/* decorative glows */}
          <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />

          {/* top brand */}
          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-lg shadow-indigo-800/30">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Fable</span>
            </div>

            <h2 className="mb-3 text-3xl font-bold leading-snug tracking-tight text-white lg:text-4xl">
              Welcome Back
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-indigo-100/80">
              Continue your reading journey. Access your bookmarks, purchases, and personalized recommendations.
            </p>
          </div>

          {/* features */}
          <div className="relative z-10 space-y-3">
            {[
              "Thousands of curated ebooks",
              "Sync across all your devices",
              "Join a community of readers & writers",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/90">
                <CheckCircle className="h-4 w-4 shrink-0 text-fuchsia-300" />
                {item}
              </div>
            ))}
          </div>

          {/* bottom decorative stats */}
          <div className="relative z-10 mt-10 grid grid-cols-3 gap-3">
            {[
              { label: "Readers", value: "12k+" },
              { label: "Ebooks", value: "500+" },
              { label: "Writers", value: "80+" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur-sm"
              >
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-indigo-200/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============ RIGHT PANEL — FORM ============ */}
        <div className="relative p-6 sm:p-8 lg:p-10">
          {/* mobile-only compact brand */}
          <div className="mb-6 flex items-center justify-center gap-2.5 md:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-600/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="brand-text text-lg font-bold">Fable</span>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Sign in to <span className="brand-text">Fable</span>
            </h1>
            <p className="mt-2 text-sm text-muted">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input h-13 pl-12 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

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
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input h-13 pl-12 shadow-inner focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="h-13 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:shadow-xl hover:shadow-indigo-600/45 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs font-medium uppercase text-faint">OR</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <Button
            variant="bordered"
            isLoading={googleLoading}
            onClick={handleGoogleLogin}
            className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/70 text-ink backdrop-blur transition-all hover:border-indigo-400 hover:bg-indigo-50/70 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:bg-indigo-600/15"
          >
            <FaGoogle className="h-4 w-4" />
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-500 transition-colors hover:text-violet-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}