"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Menu, X, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isLoading } = useSession();

  const [nav, setNav] = useState({ open: false, path: pathname });
  const [scrolled, setScrolled] = useState(false);

  const user = session?.user;

  const isLanding = pathname === "/";

  // The drawer is tied to the route it was opened on, so navigating
  // always closes it. Adjusting state during render (rather than in an
  // effect) is the pattern React recommends — no extra render pass and
  // no flash of an open drawer on the new page.
  if (nav.path !== pathname) {
    setNav({ open: false, path: pathname });
  }

  const mobileOpen = nav.open;

  const toggleMobile = useCallback(
    () => setNav({ open: !nav.open, path: pathname }),
    [nav.open, pathname],
  );

  const closeMobile = useCallback(
    () => setNav((prev) => (prev.open ? { open: false, path: pathname } : prev)),
    [pathname],
  );

  // Transparent (hero-showing-through) state ONLY at rest.
  // The old logic kept the bar transparent for the entire height of
  // the hero, so hero copy scrolled up behind a see-through bar and
  // collided with the logo/nav links. Now we flip to a solid,
  // blurred surface as soon as the page moves at all.
  const atTop = isLanding && !scrolled;

  // ================= SCROLL BLUR =================
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // ================= MOBILE DRAWER: SCROLL LOCK =================
  // Locks the page behind the open drawer without a layout shift:
  // the scrollbar's width is replaced with padding so the page
  // content does not jump sideways when the bar disappears.
  useEffect(() => {
    if (!mobileOpen) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [mobileOpen]);

  // ================= MOBILE DRAWER: ESCAPE TO CLOSE =================
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

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
        ? atTop
          ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
          : "bg-indigo-500/15 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(129,140,248,0.28)]"
        : atTop
          ? "text-white/90 hover:bg-white/10 hover:text-white"
          : "text-muted hover:bg-glass hover:text-ink"
    }`;

  const mobileNavLinkClass = (path) =>
    `flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-indigo-500/15 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
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

      closeMobile();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-slate-200/50 bg-white/85 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-slate-800/60 dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/65"
          : isLanding
            ? "border-b border-transparent bg-transparent shadow-none"
            : "border-b border-transparent bg-page/70 backdrop-blur-xl"
      }`}
    >
      {/* Scrim: guarantees contrast for the logo + links even while the
          bar is transparent over the hero. Fades away once solid. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/75 via-slate-950/35 to-transparent transition-opacity duration-300 ${
          atTop ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= DESKTOP ================= */}
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-3">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-4"
          >
            {/* Logo Image */}
            <img
              src="/images/logo.png"
              alt="Fable Logo"
              className="h-8 w-auto shrink-0 bg-transparent object-contain transition-transform duration-500 group-hover:scale-110 sm:h-9"
            />

            {/* Brand Text */}
            <div className="flex min-w-0 flex-col justify-center leading-none">
              <span className="brand-text text-lg font-semibold sm:text-xl">
                Fable
              </span>
              <span
                className={`mt-1 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 sm:text-xs ${
                  atTop ? "text-white/70" : "text-faint"
                }`}
              >
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

          {/* RIGHT SIDE — shares the `lg` breakpoint with the nav links so the
              bar never has to fit both clusters at 1024px. */}
          <div className="hidden shrink-0 items-center gap-2 sm:gap-3 lg:flex">
            <ThemeToggle />

            {/* HIDE ONLY DURING GOOGLE SIGNUP ROLE SETUP */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    atTop
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-body hover:bg-glass hover:text-ink"
                  }`}
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
                <div className="flex min-w-0 items-center gap-3">
                  {user?.image ? (
                    <img
                      src={user.image}
                      className="h-10 w-10 shrink-0 rounded-full border border-line object-cover shadow-[0_0_0_2px_rgba(129,140,248,0.35)] sm:h-11 sm:w-11"
                      alt="user"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-[0_0_18px_rgba(129,140,248,0.4)] sm:h-11 sm:w-11">
                      {user?.name?.charAt(0)}
                    </div>
                  )}

                  <div className="hidden min-w-0 lg:block">
                    <p
                      className={`truncate text-sm font-semibold ${
                        atTop ? "text-white" : "text-ink"
                      }`}
                    >
                      {user?.name}
                    </p>

                    <p
                      className={`truncate text-xs capitalize ${
                        atTop ? "text-white/70" : "text-muted"
                      }`}
                    >
                      {user?.role || ""}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1.5 font-medium text-white shadow-md transition-all duration-300 hover:opacity-90"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
            <ThemeToggle />

            <button
              onClick={toggleMobile}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-glass text-ink backdrop-blur transition-all duration-300 hover:bg-soft sm:h-11 sm:w-11"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="fable-mobile-drawer"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* SCRIM — dims only the page BELOW the bar so the navbar stays
            visible and interactive; tap it to dismiss. */}
        {mobileOpen && (
          <div
            aria-hidden
            onClick={closeMobile}
            className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-10 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* MOBILE MENU DRAWER
            Height is viewport-derived (dvh) and the panel scrolls
            internally, so on short/landscape phones nothing is ever
            clipped or pushed off-screen. */}
        <div
          id="fable-mobile-drawer"
          className={`absolute left-0 right-0 top-full z-20 overflow-y-auto overscroll-contain transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
            mobileOpen
              ? "max-h-[calc(100dvh-var(--nav-h)-1rem)] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-3 mb-4 rounded-2xl border border-line bg-panel/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:mx-6 sm:p-4">
            {/* No brand block here: the navbar directly above already shows
                the logo, name and tagline, and the X already closes the
                drawer — repeating them inside was pure redundancy. */}

            {/* User Info */}
            {isLoggedIn && (
              <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-12 w-12 shrink-0 rounded-full border border-line object-cover shadow-[0_0_0_2px_rgba(129,140,248,0.35)]"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white">
                    {user?.name?.charAt(0)}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{user?.name}</p>

                  <p className="truncate text-sm capitalize text-muted">
                    {user?.role}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Link
                href="/"
                onClick={closeMobile}
                className={mobileNavLinkClass("/")}
              >
                Home
              </Link>

              <Link
                href="/browse"
                onClick={closeMobile}
                className={mobileNavLinkClass("/browse")}
              >
                Browse Ebooks
              </Link>

              <Link
                href="/about"
                onClick={closeMobile}
                className={mobileNavLinkClass("/about")}
              >
                About Us
              </Link>

              <Link
                href="/privacy"
                onClick={closeMobile}
                className={mobileNavLinkClass("/privacy")}
              >
                Privacy Policy
              </Link>
            </div>

            {/* Divider — separates navigation from the account actions */}
            <div className="my-4 h-px w-full bg-line" role="separator" />

            <div className="flex flex-col gap-1.5">
              {isLoggedIn ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    onClick={closeMobile}
                    className={mobileNavLinkClass("/dashboard")}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      closeMobile();
                      handleLogout();
                    }}
                    className="mt-2 flex w-full items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-left text-sm font-medium text-rose-400 transition-all duration-300 hover:bg-rose-500/20"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobile}
                    className={mobileNavLinkClass("/login")}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMobile}
                    className={mobileNavLinkClass("/register")}
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