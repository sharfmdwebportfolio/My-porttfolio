"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Research Interests", href: "/research" },
    { name: "Publications", href: "/publications" },
    { name: "Experience", href: "/experience" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-surface-container-lowest sticky top-0 z-50 border-b border-surface-container-highest shadow-sm transition-colors duration-300">
      <nav className="flex justify-between items-center h-16 px-4 md:px-margin-desktop max-w-max-width mx-auto">
        {/* Logo */}
        <Link href="/" className="font-headline-md text-headline-md font-bold text-deep-navy hover:text-secondary transition-colors duration-200">
          Md Sharfuddin
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-body-md text-body-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`pb-1 transition-all duration-200 text-sm lg:text-base ${
                isActive(item.href)
                  ? "text-secondary font-bold border-b-2 border-secondary"
                  : "text-on-surface-variant hover:text-electric-cyan"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme Switcher & Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface hover:text-secondary flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Toggle Theme"
          >
            <span className={`material-symbols-outlined text-2xl transition-transform duration-500 ${theme === "dark" ? "rotate-[360deg] text-yellow-400" : "rotate-0 text-slate-700"}`}>
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <a
            href="https://drive.google.com/file/d/1gY4ggrCjIUSrV2sJgMMK_wCcKt4FEP8q/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-body-md font-semibold hover:bg-secondary hover:text-on-secondary hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm text-sm"
          >
            View CV
          </a>
          
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-on-surface hover:text-secondary focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-surface-container-lowest border-b border-surface-container-highest shadow-lg z-40 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-secondary font-bold pl-2 border-l-2 border-secondary"
                    : "text-on-surface-variant hover:text-electric-cyan"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
