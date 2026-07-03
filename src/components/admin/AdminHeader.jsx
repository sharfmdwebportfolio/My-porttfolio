"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminHeader({ title = "Dashboard" }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // fallback: clear session storage
    }
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          Preview Site
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>
    </header>
  );
}
