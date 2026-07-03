"use client";

import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DatabaseMigration from "@/components/admin/DatabaseMigration";

const sections = [
  {
    href: "/admin/profile",
    title: "Profile & CV",
    desc: "Update your photo, bio, name, CV link",
    icon: "manage_accounts",
    color: "bg-violet-50 border-violet-200 text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    href: "/admin/publications",
    title: "Publications",
    desc: "Add, edit or delete research papers",
    icon: "menu_book",
    color: "bg-blue-50 border-blue-200 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    href: "/admin/research",
    title: "Research Interests",
    desc: "Manage your 4 research domain cards",
    icon: "science",
    color: "bg-cyan-50 border-cyan-200 text-cyan-600",
    iconBg: "bg-cyan-100",
  },
  {
    href: "/admin/experience",
    title: "Work Experience",
    desc: "Add or update your work history",
    icon: "work",
    color: "bg-emerald-50 border-emerald-200 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    href: "/admin/education",
    title: "Education",
    desc: "Manage your academic qualifications",
    icon: "school",
    color: "bg-teal-50 border-teal-200 text-teal-600",
    iconBg: "bg-teal-100",
  },
  {
    href: "/admin/conferences",
    title: "Conferences",
    desc: "Manage international conference entries",
    icon: "public",
    color: "bg-indigo-50 border-indigo-200 text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  {
    href: "/admin/awards",
    title: "Awards & News",
    desc: "Update awards, recognitions, and media coverage",
    icon: "emoji_events",
    color: "bg-amber-50 border-amber-200 text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    href: "/admin/skills",
    title: "Skills & Memberships",
    desc: "Update your technical skills and memberships",
    icon: "terminal",
    color: "bg-rose-50 border-rose-200 text-rose-600",
    iconBg: "bg-rose-100",
  },
];

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Welcome */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg">
          <h2 className="text-xl font-bold mb-1">👋 Welcome back, Sharfuddin!</h2>
          <p className="text-blue-100 text-sm">
            Use the sections below to manage your portfolio content. Changes will reflect on your live site immediately.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`block p-5 rounded-2xl border-2 ${s.color} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group`}
            >
              <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-inherit">{s.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-5 bg-white border border-gray-200 rounded-2xl">
          <h3 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500 text-[20px]">lightbulb</span>
            Quick Tips
          </h3>
          <ul className="space-y-2 text-xs text-gray-500">
            <li className="flex gap-2"><span className="text-blue-400 font-bold">→</span> Click any section card above to start editing</li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">→</span> All changes save automatically to your live site</li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">→</span> Use &quot;Preview Site&quot; button (top right) to see your changes</li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">→</span> For CV link, paste the Google Drive share link directly</li>
          </ul>
        </div>

        {/* Database Migration */}
        <DatabaseMigration />
      </main>
    </>
  );
}
