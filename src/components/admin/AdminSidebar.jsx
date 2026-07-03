"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/profile", label: "Profile & CV", icon: "manage_accounts" },
  { href: "/admin/publications", label: "Publications", icon: "menu_book" },
  { href: "/admin/research", label: "Research Interests", icon: "science" },
  { href: "/admin/experience", label: "Work Experience", icon: "work" },
  { href: "/admin/education", label: "Education", icon: "school" },
  { href: "/admin/conferences", label: "Conferences", icon: "public" },
  { href: "/admin/awards", label: "Awards & News", icon: "emoji_events" },
  { href: "/admin/skills", label: "Skills & Memberships", icon: "terminal" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0f172a] text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">admin_panel_settings</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">Portfolio Admin</p>
            <p className="text-[10px] text-white/50 leading-tight">Md Sharfuddin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          View Live Site
        </Link>
      </div>
    </aside>
  );
}
