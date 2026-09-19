"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isLoading } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = session?.user;

  // ================= SCROLL BLUR =================
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ================= GOOGLE SIGNUP DETECTION =================
  // ONLY hide user when:
  // - user exists
  // - role missing
  // - AND user is on /register page (signup flow)
  const isGoogleSignupPending =
    !!user && !user?.role && pathname === "/register";

  // ================= AUTH STATE =================
  const isLoggedIn = !!user && !isGoogleSignupPending;

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-indigo-500/15 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(129,140,248,0.28)]"
        : "text-muted hover:bg-glass hover:text-ink"
    }`;

  const mobileNavLinkClass = (path) =>
    `rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-indigo-500/15 text-ink"
        : "text-muted hover:bg-glass hover:text-ink"
    }`;

  const getDashboardLink = () => {
    const role = user?.role;

    if (role === "admin") return "/dashboard/admin";
    if (role === "writer") return "/dashboard/writer";
    return "/dashboard/user";
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully 👋");

      setMobileOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-page/80 shadow-lg shadow-indigo-950/30 backdrop-blur-2xl"
          : "border-b border-transparent bg-page/40 backdrop-blur-md"
      }`}
    >
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= DESKTOP ================= */}
        <div className="flex h-18 items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3 sm:gap-4">
            {/* Logo Image */}
            <div className="flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 drop-shadow-[0_0_18px_rgba(129,140,248,0.35)]">
              <img
                src="/images/logo.png"
                alt="Fable"
                className="h-full w-full scale-110 object-contain transition-transform duration-500 group-hover:scale-125 sm:scale-125"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col justify-center leading-none">
              <span className="brand-text text-lg font-semibold sm:text-xl">
                Fable
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-faint sm:text-xs">
                Discover Stories
              </span>
            </div>
          </Link>

          {/* NAV */}
          <div className="hidden items-center gap-1 lg:flex">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link href="/browse" className={navLinkClass("/browse")}>
              Browse Ebooks
            </Link>
            <Link href="/about" className={navLinkClass("/about")}>
              About Us
            </Link>
            <Link href="/privacy" className={navLinkClass("/privacy")}>
              Privacy Policy
            </Link>

            {/* show only real logged-in users */}
            {!isLoading && isLoggedIn && (
              <Link
                href={getDashboardLink()}
                className={navLinkClass("/dashboard")}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />

            {/* HIDE ONLY DURING GOOGLE SIGNUP ROLE SETUP */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-body transition-all duration-300 hover:bg-glass hover:text-ink"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* USER INFO */}
                <div className="flex items-center gap-3">
                  {user?.image ? (
                    <img
                      src={user.image}
                      className="h-11 w-11 rounded-full border border-line object-cover shadow-[0_0_0_2px_rgba(129,140,248,0.35)]"
                      alt="user"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-[0_0_18px_rgba(129,140,248,0.4)]">
                      {user?.name?.charAt(0)}
                    </div>
                  )}

                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-ink">
                      {user?.name}
                    </p>

                    <p className="text-xs capitalize text-muted">
                      {user?.role || ""}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm border border-line text-rose-400 hover:border-rose-500/60 hover:bg-rose-500/10"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-glass text-ink backdrop-blur transition-all duration-300 hover:bg-soft"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <div
          className={`absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileOpen
              ? "max-h-[560px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mb-4 rounded-2xl border border-line bg-panel/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:mx-6">
            {/* User Info */}
            {isLoggedIn && (
              <div className="mb-5 flex items-center gap-3 border-b border-line pb-5">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-12 w-12 rounded-full border border-line object-cover shadow-[0_0_0_2px_rgba(129,140,248,0.35)]"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white">
                    {user?.name?.charAt(0)}
                  </div>
                )}

                <div>
                  <p className="font-semibold text-ink">{user?.name}</p>

                  <p className="text-sm capitalize text-muted">
                    {user?.role}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass("/")}
              >
                Home
              </Link>

              <Link
                href="/browse"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass("/browse")}
              >
                Browse Ebooks
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass("/about")}
              >
                About Us
              </Link>

              <Link
                href="/privacy"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass("/privacy")}
              >
                Privacy Policy
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setMobileOpen(false)}
                    className={mobileNavLinkClass("/dashboard")}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="mt-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-left font-medium text-rose-400 transition-all duration-300 hover:bg-rose-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-all duration-300 hover:bg-glass hover:text-ink"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn btn-primary mt-2 w-full rounded-xl"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}