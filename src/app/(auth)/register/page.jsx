"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn, signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [role, setRole] = useState("user");
  const [googleMode, setGoogleMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // detect google login without role
  useEffect(() => {
    if (session?.user && !session?.user?.role) {
      setGoogleMode(true);
    }
  }, [session]);

  // EMAIL SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role,
      });

      if (res?.error) {
        toast.error(res.error.message || "Signup failed");
        return;
      }

      toast.success("Account created 🎉");

      await signOut();
      router.push("/login");
    } catch {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/register",
      });
    } catch {
      toast.error("Google signup failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // SAVE ROLE (IMPORTANT FIXED FLOW)
  const saveGoogleRole = async () => {
    try {
      await fetch("/api/user/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      toast.success("Role saved 🎉");

      await signOut();

      router.replace("/login");
    } catch {
      toast.error("Failed to save role");
    }
  };

  return (
  <div className="bg-page relative min-h-screen overflow-x-clip px-4 pt-8 pb-8 md:flex md:items-center md:justify-center">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[130px]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-indigo-600/15 blur-[110px]"
    />

  <div className="card relative w-full max-w-md mx-auto p-6 sm:p-8 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/70 to-transparent"
    />

        <h1 className="text-2xl font-bold text-center text-ink">
          Create Account
        </h1>

        {/* GOOGLE ROLE STEP */}
        {googleMode && session?.user ? (
          <div className="space-y-4">

            <p className="text-center text-muted">
              Welcome <b className="text-ink">{session.user.name}</b>
            </p>

            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="writer">Writer</option>
            </select>

            <Button
              onPress={saveGoogleRole}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold h-14"
            >
              Complete Signup
            </Button>

          </div>
        ) : (
          <>
            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="input"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="abc@gmail.com"
                className="input"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="input"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="input"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <select
                className="input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="writer">Writer</option>
              </select>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold h-14"
              >
                Create Account
              </Button>

            </form>

            <Button
              onPress={handleGoogleSignup}
              isLoading={googleLoading}
              variant="bordered"
              className="w-full mt-3 h-14 rounded-xl border-line text-ink bg-glass"
            >
              Continue with Google
            </Button>
          </>
        )}

      </div>
    </div>
  );
}