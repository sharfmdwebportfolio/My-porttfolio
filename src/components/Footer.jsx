import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Google Scholar",
      href: "https://scholar.google.com/citations?user=SHARFUDDIN",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L1 7l11 5 9-4.09V14c0 .55.45 1 1 1s1-.45 1-1V7.82L12 2zm1.88 9.59c-.56-.16-1.15.15-1.32.7-.22.68-.78 1.15-1.46 1.25-1.1.15-2.07-.63-2.17-1.73-.08-.94.6-1.76 1.54-1.89a1.996 1.996 0 0 1 2.19 1.4c.12.39.48.65.88.65.62 0 1.07-.6 0.88-1.2A3.992 3.992 0 0 0 13.38 8c-2.47.33-4.22 2.6-3.89 5.07.29 2.17 2.12 3.82 4.31 3.82 1.63 0 3.03-.99 3.63-2.42.23-.55-.07-1.17-.63-1.33l-1.68-.42z"/>
        </svg>
      )
    },
    {
      name: "ResearchGate",
      href: "https://www.researchgate.net/profile/Md-Sharfuddin-4",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19.5 0h-15c-2.485 0-4.5 2.015-4.5 4.5v15c0 2.485 2.015 4.5 4.5 4.5h15c2.485 0 4.5-2.015 4.5-4.5v-15c0-2.485-2.015-4.5-4.5-4.5zm-5.7 17.5H12v-11h1.8c1.65 0 3 1.35 3 3s-1.35 3-3 3h-1.8m0 0h1.8c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H12"/>
        </svg>
      )
    },
    {
      name: "ORCID",
      href: "https://orcid.org/0009-0005-2313-1768",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm.797 3.328v9.916H6.572V7.706h1.594zm6.656 5.306c0 1.959-1.2 3.197-3.084 3.197h-2.316V7.706h2.512c1.781 0 2.887 1.153 2.887 3.197v2.131zm-1.612-2.1c0-.984-.506-1.547-1.444-1.547H10.15v5.194h1.097c.938 0 1.444-.563 1.444-1.547v-2.1z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/md-sharfuddin-2708b730b",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#061630] dark:bg-surface-container-lowest text-slate-100 border-t border-slate-800 dark:border-outline-variant/60 transition-colors duration-300 mt-auto relative overflow-hidden">
      {/* Subtle abstract glow background patterns */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-800 dark:border-outline-variant/60 pb-12">
          {/* Column 1: Title & Description */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-headline-lg text-2xl font-bold text-white tracking-tight">
              Md Sharfuddin
            </h3>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              MBA in MIS | AI &amp; Data Analytics Researcher
            </p>
            <p className="font-body-md text-sm text-slate-300 leading-relaxed max-w-sm">
              Bridging business management systems, predictive machine learning algorithms, and intelligent decision science frameworks to empower organizational efficiency.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-label-sm text-xs font-bold text-slate-100 uppercase tracking-widest border-l-2 border-secondary pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-secondary transition-colors duration-200">
                  Home Portfolio
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-slate-300 hover:text-secondary transition-colors duration-200">
                  Research Interests
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-slate-300 hover:text-secondary transition-colors duration-200">
                  Publications &amp; Patents
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-slate-300 hover:text-secondary transition-colors duration-200">
                  Professional Journey
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-secondary transition-colors duration-200">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Identifiers */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="font-label-sm text-xs font-bold text-slate-100 uppercase tracking-widest border-l-2 border-secondary pl-2">
              Contact &amp; Identifiers
            </h4>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-xl">mail</span>
              <a
                href="mailto:sharfuddin.md50@yahoo.com"
                className="text-sm text-slate-200 hover:text-secondary hover:underline transition-colors font-medium"
              >
                sharfuddin.md50@yahoo.com
              </a>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">
                Academic Networks &amp; Registry
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-secondary hover:border-secondary hover:scale-105 transition-all duration-200"
                    title={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} Md Sharfuddin. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            <span>Academic Portfolio &amp; Research Profile</span>
            <span className="w-1 h-1 rounded-full bg-slate-600 mx-1"></span>
            <span>UK Approved Patent: UK-6392015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
