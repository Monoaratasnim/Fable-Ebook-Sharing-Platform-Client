"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Crown,
  Feather,
  GraduationCap,
  ShoppingBag,
  Star,
  Sparkles,
  Globe,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { authClient, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

const PAGE_TITLES = {
  "/dashboard/admin/transactions": "Transactions",
  "/dashboard/admin/manage-users": "Manage Users",
  "/dashboard/admin/manage-ebooks": "Manage Ebooks",
  "/dashboard/writer/edit": "Edit Ebook",
  "/dashboard/writer/add-ebook": "Add Ebook",
  "/dashboard/writer/manage-ebooks": "Manage Ebooks",
  "/dashboard/writer/sales-history": "Sales History",
  "/dashboard/writer/bookmarks": "Bookmarks",
  "/dashboard/user/purchase-history": "Purchase History",
  "/dashboard/user/purchased-ebooks": "Purchased Ebooks",
  "/dashboard/user/bookmarks": "Bookmarks",
  "/dashboard/user/profile": "Profile",
  "/dashboard/admin": "Dashboard",
  "/dashboard/writer": "Dashboard",
  "/dashboard/user": "Dashboard",
};

const ROLE_BADGE = {
  admin: { badge: "from-rose-500 to-pink-500", icon: <Crown className="h-3.5 w-3.5" /> },
  writer: { badge: "from-indigo-500 to-violet-500", icon: <Feather className="h-3.5 w-3.5" /> },
  user: { badge: "from-emerald-500 to-teal-500", icon: <GraduationCap className="h-3.5 w-3.5" /> },
};

function getPageTitle(pathname) {
  let best = null;
  for (const key of Object.keys(PAGE_TITLES)) {
    if (pathname?.startsWith(key) && (!best || key.length > best.length)) {
      best = key;
    }
  }
  return best ? PAGE_TITLES[best] : "Dashboard";
}

export default function DashboardTopBar({ setOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const user = session?.user;
  const role = user?.role || "user";
  const badge = ROLE_BADGE[role] || ROLE_BADGE.user;
  const pageTitle = getPageTitle(pathname);

  const closeAll = () => {
    setSearchOpen(false);
    setNotifOpen(false);
    setUserOpen(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
    setNotifOpen(false);
    setUserOpen(false);
  };

  const openNotif = () => {
    setNotifOpen(true);
    setSearchOpen(false);
    setUserOpen(false);
  };

  const openUser = () => {
    setUserOpen(true);
    setSearchOpen(false);
    setNotifOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully 👋");
      closeAll();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const profileHref =
    role === "user" ? "/dashboard/user/profile" : role === "writer" ? "/dashboard/writer" : "/dashboard/admin";

  const dashboardHref =
    role === "admin" ? "/dashboard/admin" : role === "writer" ? "/dashboard/writer" : "/dashboard/user";

  const iconBtnClass =
    "relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-glass text-muted transition-all duration-300 hover:border-indigo-400/40 hover:text-ink hover:bg-soft active:scale-95";

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-panel/85 shadow-sm backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* gradient hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
      />

      <div className="flex h-16 md:h-[72px] items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        {/* LEFT — mobile menu + back to home + breadcrumb */}
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-glass text-ink transition-all duration-300 hover:bg-soft md:hidden"
            aria-label="Open sidebar menu"
          >
            <span className="sr-only">Open sidebar menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </button>

          {/* fable logo + title → home */}
          <Link
            href="/"
            aria-label="Back to Home"
            title="Back to Home"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-0.5 transition-all duration-300 hover:bg-soft"
          >
            <img
              src="/images/logo.png"
              alt="Fable Logo"
              className="h-8 w-auto bg-transparent object-contain transition-transform duration-300 group-hover:scale-110 sm:h-9"
            />
            <span className="brand-text hidden text-xl font-semibold leading-none md:block">
              Fable
            </span>
          </Link>

          <span className="hidden h-6 w-px bg-line sm:block" aria-hidden />

          <div className="min-w-0">
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-faint sm:block">
              {role} Panel
            </p>
            <h1 className="truncate text-lg font-bold leading-tight text-ink md:text-xl">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* RIGHT — utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* SEARCH */}
          <div className="relative">
            <button onClick={openSearch} className={iconBtnClass} aria-label="Search">
              <Search className="h-[18px] w-[18px]" />
            </button>

            {searchOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <div className="absolute right-0 top-full z-50 mt-2 w-80 origin-top-right animate-pop rounded-2xl border border-line bg-panel/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                    <input
                      type="text"
                      placeholder="Search ebooks, writers…"
                      className="input pl-10"
                    />
                  </div>

                  <div className="mt-3 border-t border-line-soft pt-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
                      Quick Actions
                    </p>
                    <Link
                      href="/browse"
                      onClick={closeAll}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-600/15 hover:text-ink"
                    >
                      <ShoppingBag className="h-4 w-4 text-indigo-400" />
                      Browse the marketplace
                    </Link>
                    <Link
                      href={dashboardHref}
                      onClick={closeAll}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-600/15 hover:text-ink"
                    >
                      <Sparkles className="h-4 w-4 text-fuchsia-400" />
                      Go to your dashboard
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button onClick={openNotif} className={iconBtnClass} aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-page" />
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <div className="absolute right-0 top-full z-50 mt-2 w-80 origin-top-right animate-pop rounded-2xl border border-line bg-panel/95 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                  <div className="flex items-center justify-between border-b border-line px-4 py-3">
                    <p className="text-sm font-semibold text-ink">Notifications</p>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      3 new
                    </span>
                  </div>

                  <div className="divide-y divide-line-soft">
                    {[
                      {
                        icon: <ShoppingBag className="h-4 w-4 text-indigo-400" />,
                        text: "New sale on “Atomic Habits”",
                        time: "2m ago",
                      },
                      {
                        icon: <Star className="h-4 w-4 text-amber-400" />,
                        text: "You received a new 5-star review",
                        time: "1h ago",
                      },
                      {
                        icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
                        text: "Your account security was verified",
                        time: "1d ago",
                      },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-600/10">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/15">
                          {n.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm text-ink">{n.text}</p>
                          <p className="text-xs text-faint">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={closeAll}
                    className="w-full border-t border-line px-4 py-2.5 text-center text-xs font-semibold text-indigo-400 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-600/10"
                  >
                    Mark all as read
                  </button>
                </div>
              </>
            )}
          </div>

          <ThemeToggle />

          {/* USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={openUser}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-glass py-1 pl-1 pr-2.5 transition-all duration-300 hover:border-indigo-400/40 hover:bg-soft"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user?.name || "user"}
                  className="h-8 w-8 rounded-[10px] border border-line object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
                  {user?.name?.charAt(0) || "F"}
                </div>
              )}

              <div className="hidden text-left xl:block">
                <p className="max-w-[9rem] truncate text-[13px] font-semibold leading-tight text-ink">
                  {user?.name}
                </p>
                <p className="text-[11px] capitalize leading-tight text-faint">{role}</p>
              </div>

              <ChevronDown className="hidden h-4 w-4 text-faint xl:block" />
            </button>

            {userOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <div className="absolute right-0 top-full z-50 mt-2 w-72 origin-top-right animate-pop overflow-hidden rounded-2xl border border-line bg-panel/95 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                  <div className={`bg-gradient-to-r ${badge.badge} -mx-px -mt-px px-5 py-4`}>
                    <div className="flex items-center gap-3">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user?.name || "user"}
                          className="h-11 w-11 rounded-xl border border-white/30 object-cover shadow-lg"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-base font-bold text-white ring-1 ring-white/30">
                          {user?.name?.charAt(0) || "F"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                        <p className="truncate text-xs text-white/80">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-2 py-2">
                    <span className={`mb-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${badge.badge} px-2.5 py-1 text-[11px] font-semibold text-white shadow`}>
                      {badge.icon}
                      {role}
                    </span>

                    <Link
                      href={role === "user" ? profileHref : "/"}
                      onClick={closeAll}
                      className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-600/15 hover:text-ink"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/15">
                        {role === "user" ? (
                          <ShieldCheck className="h-4 w-4" />
                        ) : (
                          <Globe className="h-4 w-4" />
                        )}
                      </span>
                      {role === "user" ? "View Profile" : "Back to Home"}
                    </Link>
                  </div>

                  <div className="border-t border-line p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-400 transition-colors hover:bg-rose-500/10"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 ring-1 ring-rose-500/15">
                        <LogOut className="h-4 w-4" />
                      </span>
                      Log out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}