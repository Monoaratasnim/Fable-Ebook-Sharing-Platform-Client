"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, Bookmark, History, BookOpen, User, PlusCircle, Library, BarChart3 } from "lucide-react";

export default function DashboardSidebar({ open, setOpen, role }) {
  const pathname = usePathname();

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

  const links =
    role === "admin"
      ? adminLinks
      : role === "writer"
      ? writerLinks
      : userLinks;

  const roleTint = {
    admin: "from-rose-500/20 to-pink-500/10 text-rose-300 border-rose-500/30",
    writer: "from-indigo-500/20 to-violet-500/10 text-indigo-300 border-indigo-500/30",
    user: "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30",
  };

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-72 md:w-64
          bg-panel border-r border-line
          shadow-xl md:shadow-none
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="md:hidden flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-soft text-muted transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* LOGO */}
        <div className="px-6 py-5 border-b border-line flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Fable"
            className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(129,140,248,0.45)]"
          />

          <div>
            <h1 className="brand-text text-lg font-bold leading-none">
              Fable
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-faint mt-1">
              Dashboard
            </p>
          </div>
        </div>

        {/* ROLE PILL */}
        <div className="px-6 py-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-3 py-1.5 text-xs font-semibold capitalize ${roleTint[role] || roleTint.user}`}
          >
            {role}
          </span>
        </div>

        {/* LINKS */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {links.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-[0_8px_22px_-10px_rgba(99,102,241,0.8)]"
                      : "text-muted hover:bg-soft hover:text-ink hover:translate-x-0.5"
                  }
                `}
              >
                <span className={active ? "" : "text-faint group-hover:text-indigo-400 transition"}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-line text-xs text-faint">
          © {new Date().getFullYear()} Fable
        </div>
      </aside>
    </>
  );
}