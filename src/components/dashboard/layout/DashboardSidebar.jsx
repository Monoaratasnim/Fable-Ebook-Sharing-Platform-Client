"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Bookmark,
  History,
  BookOpen,
  User,
  PlusCircle,
  Library,
  BarChart3,
  ChevronRight,
  GraduationCap,
  Feather,
  Crown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const roleMeta = {
  admin: {
    label: "Administrator",
    badge: "from-rose-500 to-pink-500 shadow-rose-600/40",
    icon: <Crown className="h-3.5 w-3.5" />,
    dot: "bg-rose-400",
  },
  writer: {
    label: "Writer",
    badge: "from-indigo-500 to-violet-500 shadow-indigo-600/40",
    icon: <Feather className="h-3.5 w-3.5" />,
    dot: "bg-indigo-400",
  },
  user: {
    label: "Reader",
    badge: "from-emerald-500 to-teal-500 shadow-emerald-600/40",
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    dot: "bg-emerald-400",
  },
};

export default function DashboardSidebar({ open, setOpen, role }) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const userLinks = [
    { name: "Dashboard", href: "/dashboard/user", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "Bookmarks", href: "/dashboard/user/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
    { name: "Purchase History", href: "/dashboard/user/purchase-history", icon: <History className="h-4 w-4" /> },
    { name: "Purchased Ebooks", href: "/dashboard/user/purchased-ebooks", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Profile", href: "/dashboard/user/profile", icon: <User className="h-4 w-4" /> },
  ];

  const writerLinks = [
    { name: "Dashboard", href: "/dashboard/writer", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "Add Ebook", href: "/dashboard/writer/add-ebook", icon: <PlusCircle className="h-4 w-4" /> },
    { name: "Manage Books", href: "/dashboard/writer/manage-ebooks", icon: <Library className="h-4 w-4" /> },
    { name: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: <Bookmark className="h-4 w-4" /> },
    { name: "Sales History", href: "/dashboard/writer/sales-history", icon: <BarChart3 className="h-4 w-4" /> },
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/dashboard/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "Users", href: "/dashboard/admin/manage-users", icon: <User className="h-4 w-4" /> },
    { name: "Ebooks", href: "/dashboard/admin/manage-ebooks", icon: <Library className="h-4 w-4" /> },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: <History className="h-4 w-4" /> },
  ];

  const links = role === "admin" ? adminLinks : role === "writer" ? writerLinks : userLinks;

  const meta = roleMeta[role] || roleMeta.user;

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 md:w-64 md:sticky md:top-[72px] md:h-[calc(100vh-72px)] md:shrink-0
          flex flex-col overflow-y-auto
          bg-panel/95 backdrop-blur-xl border-r border-line
          shadow-xl md:shadow-none
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* decorative top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-indigo-500/15 to-transparent"
        />

        {/* CLOSE BUTTON */}
        <div className="md:hidden flex justify-end p-3 relative">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-600/15 text-muted transition"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* ROLE BADGE */}
        <div className="px-6 pt-6 pb-5 border-b border-line">
          <span
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${meta.badge} px-3 py-1.5 text-xs font-semibold capitalize text-white shadow-lg ${meta.badge.split(" ")[2]}`}
          >
            {meta.icon}
            {role}
          </span>
          <p className="mt-2.5 text-[11px] text-faint">Signed in as {meta.label}</p>
        </div>

        {/* SECTION LABEL */}
        <div className="px-6 pt-6 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-faint">
            Menu
          </p>
        </div>

        {/* LINKS */}
        <nav className="flex-1 min-h-0 px-4 py-2 space-y-1.5">
          {links.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/40"
                      : "text-muted hover:bg-indigo-50 dark:hover:bg-indigo-600/15 hover:text-ink hover:translate-x-0.5"
                  }
                `}
              >
                {/* left accent bar for active */}
                <span
                  className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-white/80 transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span className={`shrink-0 transition ${active ? "text-white" : "text-faint group-hover:text-indigo-400"}`}>
                  {item.icon}
                </span>

                {item.name}

                {active && (
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER — COMPACT USER CARD */}
        <div className="p-4 mt-auto border-t border-line space-y-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-line bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-2.5">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session?.user?.name || "user"}
                className="h-8 w-8 shrink-0 rounded-full border border-line object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
                {session?.user?.name?.charAt(0) || "F"}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-ink">
                {session?.user?.name || "Fable Reader"}
              </p>
              <p className="truncate text-[11px] text-faint">
                {session?.user?.email || role}
              </p>
            </div>
          </div>

          <p className="text-[10px] text-center text-faint">© {new Date().getFullYear()} Fable</p>
        </div>
      </aside>
    </>
  );
}