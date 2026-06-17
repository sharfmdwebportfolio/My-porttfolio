import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/md-sharfuddin-2a4413155" }, // We will link to contact or mock
    { name: "Google Scholar", href: "#" },
    { name: "ResearchGate", href: "#" },
    { name: "ORCID", href: "#" },
  ];

  return (
    <footer className="bg-surface-container-high border-t border-surface-container-highest mt-auto">
      <div className="flex flex-col items-center gap-6 px-4 py-12 md:px-margin-desktop max-w-max-width mx-auto">
        <div className="font-headline-md text-headline-md font-bold text-deep-navy">Md Sharfuddin</div>
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-xl leading-relaxed">
          © {currentYear} Md Sharfuddin. All rights reserved. AI-Driven MIS Researcher focusing on the evolution of intelligent business systems.
        </p>
        
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-secondary transition-colors duration-200 font-medium text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Email Contact */}
        <div className="flex items-center gap-2 mt-2">
          <span className="material-symbols-outlined text-secondary">mail</span>
          <a
            href="mailto:sharfuddin.md50@yahoo.com"
            className="text-primary font-semibold hover:text-secondary hover:underline transition-colors duration-200"
          >
            sharfuddin.md50@yahoo.com
          </a>
        </div>
      </div>
    </footer>
  );
}
