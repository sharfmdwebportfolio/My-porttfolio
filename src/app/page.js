"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatentModal from "@/components/PatentModal";
import ResearchDashboard from "@/components/ResearchDashboard";

export default function Home() {
  const [isPatentOpen, setIsPatentOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const revealTargets = document.querySelectorAll(".reveal-section");
    revealTargets.forEach((target) => {
      target.classList.add(
        "transition-all",
        "duration-700",
        "ease-out",
        "opacity-0",
        "translate-y-10"
      );
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface transition-colors duration-300">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden py-16 md:py-24 dot-grid">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 w-full">
            <div className="md:col-span-7 flex flex-col gap-6 reveal-section">
              <span className="font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-secondary bg-secondary-fixed/50 dark:bg-secondary/20 px-3 py-1 rounded-full w-fit font-bold">
                Academic Portfolio &amp; Research
              </span>
              <h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg text-primary tracking-tight font-extrabold leading-none">
                Md Sharfuddin
              </h1>
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-deep-navy leading-tight font-bold">
                AI-Driven MIS Researcher | <span className="text-secondary">Data Analytics Specialist</span>
              </h2>
              <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Bridging business strategy, intelligent information systems, and data-driven decision science. Specializing in machine learning and predictive analytics to optimize enterprise MIS frameworks.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-xl">location_on</span>
                  <span className="font-body-md text-sm md:text-base font-medium">Los Angeles, CA</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-xl">mail</span>
                  <a href="mailto:sharfuddin.md50@yahoo.com" className="font-body-md text-sm md:text-base font-semibold hover:underline">
                    sharfuddin.md50@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/experience"
                  className="bg-secondary text-white px-6 py-3 rounded-lg font-body-md font-semibold hover:bg-primary transition-all duration-200 shadow-md flex items-center gap-2 hover:translate-x-1"
                >
                  View Experience
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  href="/publications"
                  className="bg-white dark:bg-surface-container-low text-primary border border-outline-variant px-6 py-3 rounded-lg font-body-md font-semibold hover:bg-surface-container-low transition-all duration-200 shadow-sm"
                >
                  See Research Papers
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 relative w-full flex justify-center reveal-section">
              <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden border border-surface-container-highest shadow-2xl bg-white dark:bg-surface-container-lowest p-2">
                <img
                  alt="Md Sharfuddin Portrait"
                  className="w-full h-full object-cover rounded-xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB17c65LV9BylHjLw6_KDtvqzFpN9jhDpBdXjh3b89vKLEXX1WlfOpTQatX2COkEN5wQBFoLVbtqZJLo32VsY6dnCGs0RgDdvCvh6X9_N-C5w72Nwe22QGNA7UUBf06pHiG1l2YuetphH8ixAMGy6ogd32ItGG58RtJph3y08rKaSgij3MHNWB0CbhY7yMa9bmgGhhDcJyJDUjqRVNWc4PTWiNUsiSL9X_jkMtBBpAP4z3E5iD2nXe7VIwTUxJQcWVk_i8XMArSMC8"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 bg-white dark:bg-surface-container-lowest p-4 rounded-xl border border-surface-container-highest shadow-xl flex items-center gap-4 animate-bounce hidden sm:flex">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-xl">analytics</span>
                </div>
                <div>
                  <p className="font-label-sm text-xs text-on-surface-variant">Research Impact</p>
                  <p className="font-headline-md text-sm md:text-base font-bold text-primary">10+ Publications</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cognitive Strategy & Data Intelligence Section */}
        <section className="py-16 md:py-24 bg-surface-container-low transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop space-y-12">
            <div className="max-w-3xl space-y-4 reveal-section">
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-primary font-bold">
                Cognitive Strategy &amp; Data Intelligence
              </h2>
              <div className="w-20 h-1 bg-electric-cyan rounded-full"></div>
              <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant leading-relaxed">
                My research focuses at the intersection of Artificial Intelligence and Management Information Systems (AI-MIS). I believe that the future of organizational excellence lies in the seamless integration of predictive analytics and human-centric business strategy.
              </p>
            </div>

            {/* Interactive Research Dashboard Component */}
            <div className="reveal-section">
              <ResearchDashboard />
            </div>
          </div>
        </section>

        {/* Bento Grid Highlights Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="mb-12 text-center reveal-section">
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-primary font-bold">
                Distinguished Highlights
              </h2>
              <p className="text-on-surface-variant font-body-md mt-2">
                Recognitions in global innovation and academic excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Patent Card */}
              <div className="md:col-span-2 bg-white dark:bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group reveal-section">
                <div>
                  <div className="flex justify-between items-start mb-6 gap-2">
                    <span className="font-label-sm text-xs text-secondary bg-secondary-fixed dark:bg-secondary/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                      UK Approved Patent 2025
                    </span>
                    <span className="material-symbols-outlined text-4xl text-secondary opacity-40 group-hover:opacity-100 transition-opacity">
                      shield_lock
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-xl md:text-headline-lg text-primary font-bold mb-4">
                    Cyberattack Detection and Prevention Device
                  </h3>
                  <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
                    A cutting-edge technical solution designed for intelligent threat detection, utilizing predictive MIS frameworks to safeguard enterprise data integrity.
                  </p>
                </div>
                <button
                  onClick={() => setIsPatentOpen(true)}
                  className="mt-8 flex items-center gap-4 text-secondary font-bold hover:translate-x-1 transition-transform cursor-pointer w-fit focus:outline-none"
                >
                  <span>Patent Details &amp; Schema</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Award Card */}
              <div className="bg-deep-navy text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden reveal-section">
                <div className="absolute -right-8 -bottom-8 opacity-10 hidden sm:block">
                  <span className="material-symbols-outlined text-[160px] text-white">emoji_events</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-electric-cyan border border-electric-cyan/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Royal Golden Award 2025
                  </span>
                  <h3 className="font-headline-lg text-xl md:text-headline-lg text-white font-bold mt-6 mb-4">
                    Data Analytics Excellence
                  </h3>
                  <p className="font-body-md text-sm text-white/70 leading-relaxed">
                    Honored as a Royal Golden Fellow (FRAEL) by Eudoxia Research University for contributions to the field of MIS.
                  </p>
                </div>
                <div className="mt-12 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-electric-cyan"></div>
                    <span className="font-label-sm text-xs opacity-90">Eudoxia Research University</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-electric-cyan"></div>
                    <span className="font-label-sm text-xs opacity-90">Fellowship ID: FRAEL-2025</span>
                  </div>
                </div>
              </div>

              {/* Publications Summary */}
              <div className="bg-surface-gray border border-outline-variant rounded-2xl p-6 md:p-8 reveal-section">
                <h3 className="font-headline-md text-lg font-bold text-primary mb-6">Recent Research</h3>
                <ul className="space-y-4">
                  {[
                    { year: "2026", cat: "SUSTAINABILITY", title: "AI-Driven Sustainable Consumer Behaviour" },
                    { year: "2025", cat: "SUPPLY CHAIN", title: "Resilience using ML Integration" },
                    { year: "2025", cat: "MIS FRAMEWORKS", title: "Optimizing Resource Allocation in MIS" },
                  ].map((res, i) => (
                    <li key={i} className="group cursor-pointer">
                      <p className="font-label-sm text-xs text-secondary mb-1">
                        {res.year} &bull; {res.cat}
                      </p>
                      <p className="font-body-md text-sm font-semibold text-deep-navy group-hover:text-secondary transition-colors leading-snug">
                        {res.title}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/publications"
                  className="mt-8 text-on-surface-variant font-label-sm text-xs flex items-center gap-2 hover:text-primary transition-colors font-semibold"
                >
                  VIEW FULL PUBLICATION LIST{" "}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>

              {/* Research Connections */}
              <div className="md:col-span-2 bg-white dark:bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 reveal-section">
                <div className="flex flex-col gap-2">
                  <h3 className="font-headline-md text-lg font-bold text-primary">Connect with my Research</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Access open research profiles and academic databases.
                  </p>
                </div>
                <div className="flex gap-4">
                  {[
                    { icon: "school", name: "Scholar", href: "#" },
                    { icon: "hub", name: "ResearchGate", href: "#" },
                    { icon: "account_circle", name: "ORCID", href: "#" },
                  ].map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center hover:bg-secondary-container hover:scale-105 transition-all group"
                      title={link.name}
                    >
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-secondary-container text-2xl">
                        {link.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education Summary Section */}
        <section className="py-16 md:py-24 border-t border-surface-container-highest bg-surface-container-lowest transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="reveal-section">
              <h3 className="font-headline-md text-xl font-bold text-primary mb-10 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">work</span> Experience
              </h3>
              <div className="space-y-10">
                <div className="relative pl-8 border-l border-outline-variant">
                  <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-secondary"></div>
                  <p className="font-label-sm text-xs text-secondary mb-1">08/2025 &ndash; Present</p>
                  <h4 className="font-headline-md text-base md:text-[18px] font-bold text-deep-navy">Business Analyst</h4>
                  <p className="font-body-md text-sm text-on-surface-variant">UpSkill Consultancy, NY</p>
                </div>
                <div className="relative pl-8 border-l border-outline-variant">
                  <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-outline-variant"></div>
                  <p className="font-label-sm text-xs text-on-surface-variant mb-1">01/2025 &ndash; 04/2025</p>
                  <h4 className="font-headline-md text-base md:text-[18px] font-bold text-deep-navy">IT Support Intern</h4>
                  <p className="font-body-md text-sm text-on-surface-variant">Mainwins Inc., TX</p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/experience" className="text-secondary hover:text-primary font-semibold text-sm flex items-center gap-1">
                  View full journey details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="reveal-section">
              <h3 className="font-headline-md text-xl font-bold text-primary mb-10 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">history_edu</span> Education
              </h3>
              <div className="space-y-10">
                <div className="relative pl-8 border-l border-outline-variant">
                  <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-secondary"></div>
                  <p className="font-label-sm text-xs text-secondary mb-1">2023 &ndash; 2025</p>
                  <h4 className="font-headline-md text-base md:text-[18px] font-bold text-deep-navy">MBA in MIS</h4>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    International American University, Los Angeles
                  </p>
                </div>
                <div className="relative pl-8 border-l border-outline-variant">
                  <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-outline-variant"></div>
                  <p className="font-label-sm text-xs text-on-surface-variant mb-1">2016 &ndash; 2021</p>
                  <h4 className="font-headline-md text-base md:text-[18px] font-bold text-deep-navy">BBA in Finance</h4>
                  <p className="font-body-md text-sm text-on-surface-variant">National University of Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Patent Details Modal */}
      <PatentModal isOpen={isPatentOpen} onClose={() => setIsPatentOpen(false)} />
    </div>
  );
}
