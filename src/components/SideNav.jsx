"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home Portfolio", href: "/" },
    { name: "Research Interests", href: "/research" },
    { name: "Publications & Patents", href: "/publications" },
    { name: "Professional Journey", href: "/experience" },
    { name: "Get in Touch", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex fixed left-0 top-[20%] z-50 bg-[#021124] text-white p-3 rounded-r-xl shadow-lg border border-l-0 border-white/10 transition-transform duration-300 items-center justify-center hover:bg-secondary ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
        aria-label="Toggle Navigation"
      >
        <span className="material-symbols-outlined text-2xl">
          menu_open
        </span>
      </button>

      {/* Side Navigation Box */}
      <aside className={`hidden lg:flex flex-col w-[260px] fixed left-8 top-[20%] bg-[#021124] text-white py-8 px-6 rounded-2xl shadow-2xl border border-white/10 z-50 transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-12 opacity-0 pointer-events-none'}`}>
        
        {/* Close Button Inside */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="mb-6">
          <h2 className="flex items-center gap-3 text-sm font-bold tracking-widest text-[#7EB6FF] uppercase">
            <span className="w-0.5 h-4 bg-[#4A90E2] rounded-full"></span>
            Navigation
          </h2>
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-all duration-300 relative pl-4 ${
                  active ? "text-white" : "text-[#8BA4C4] hover:text-white hover:translate-x-1"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-full bg-[#4A90E2] rounded-full"></span>
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
