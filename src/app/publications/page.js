"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Publications() {
  const [activeSection, setActiveSection] = useState("year-2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPub, setExpandedPub] = useState(null);

  const publicationsList = useMemo(() => [
    {
      id: "pub-2026-1",
      year: "2026",
      category: "Sustainability",
      title: "AI-Driven Sustainable Consumer Behaviour",
      journal: "International Journal of MIS and Sustainability Research",
      authors: "Md Sharfuddin, L. Anderson",
      abstract: "This paper analyzes green purchase intentions using deep learning classifiers. We explore how digital MIS transparency affects trust metrics, mapping cognitive purchasing intent and pathways for green products.",
      status: "FORTHCOMING",
    },
    {
      id: "pub-2025-1",
      year: "2025",
      category: "Sustainability",
      title: "AI-Driven Sustainable Consumption",
      journal: "Journal of Intelligent Business Analytics",
      authors: "Md Sharfuddin",
      abstract: "A quantitative evaluation of green marketing claims and their actual conversion rates in modern e-commerce applications, utilizing big data customer behavioral analytics.",
      linkType: "VIEW DOI",
    },
    {
      id: "pub-2025-2",
      year: "2025",
      category: "MIS Focus",
      title: "Employee Motivation in Construction Engineering",
      journal: "International Review of Management",
      authors: "Md Sharfuddin, R. Ahmed",
      abstract: "Investigates human resource scheduling and motivational metrics in infrastructure developments, linking operational performance indicators directly to enterprise MIS structures.",
      linkType: "VIEW PAPER",
    },
    {
      id: "pub-2025-3",
      year: "2025",
      category: "Supply Chain",
      title: "Enhancing supply chain resilience using ML",
      journal: "Global Supply Chain & Data Science Journal",
      authors: "Md Sharfuddin, T. Vance",
      abstract: "Develops an adaptive machine learning scheduler that forecasts logistical disruptions and container delays, allowing enterprises to optimize reserve stocks dynamically.",
    },
    {
      id: "pub-2025-4",
      year: "2025",
      category: "MIS Focus",
      title: "Enhancing data reliability in MIS through AI",
      journal: "Information Systems Quarterly",
      authors: "Md Sharfuddin",
      abstract: "Proposes an automated data validation pipeline using outlier detection networks. Reduces database cleaning latency for MIS logs while improving data integrity.",
    },
    {
      id: "pub-2025-5",
      year: "2025",
      category: "MIS Focus",
      title: "Optimizing Resource Allocation in MIS",
      journal: "Decision Support Systems Digest",
      authors: "Md Sharfuddin",
      abstract: "Presents a dynamic heuristic model for server load and storage balancing across cloud-based management information systems, validating resource gains using regression testing.",
    },
    {
      id: "pub-2025-6",
      year: "2025",
      category: "MIS Focus",
      title: "Smart MIS for Data-Driven Organizational Excellence",
      journal: "Management Strategy Review",
      authors: "Md Sharfuddin, K. Patel",
      abstract: "Examines critical success factors when deploying AI-driven dashboards to executive decision-makers, emphasizing data literacy and interactive dashboard designs.",
    },
    {
      id: "pub-2024-1",
      year: "2024",
      category: "MIS Focus",
      title: "AI-Driven MIS for Social Equity",
      journal: "Social Information Systems Quarterly",
      authors: "Md Sharfuddin",
      abstract: "A peer-reviewed critique on using bias-aware machine learning frameworks within public sector management information systems to promote resource equality.",
      peerReviewed: true,
    },
    {
      id: "pub-2024-2",
      year: "2024",
      category: "MIS Focus",
      title: "Integration of Universal MIS",
      journal: "Global Management Review",
      authors: "Md Sharfuddin, S. Kimura",
      abstract: "Outlines a universal database API protocol standard, allowing heterogeneous ERP databases to sync securely with central MIS warehouses.",
      peerReviewed: true,
    },
    {
      id: "pub-2023-1",
      year: "2023",
      category: "Sustainability",
      title: "MIS Driven Green Marketing Intelligence",
      journal: "Sustainable Enterprise Journal",
      authors: "Md Sharfuddin",
      abstract: "Early research modeling consumer response to eco-labels using regression analysis, providing a structural template for subsequent green analytics studies.",
    },
  ], []);

  const conferences = [
    {
      code: "ICBMEIS-2025",
      name: "International Conference on Business Management & Enterprise Information Systems",
      role: "KEYNOTE SPEAKER",
      loc: "Tokyo, Japan | Oct 2025",
    },
    {
      code: "CASH 4.0-2025",
      name: "Conference on Automation, Sustainability and Humanity 4.0",
      role: "PRESENTATION",
      loc: "Berlin, Germany | June 2025",
    },
  ];

  // Filtering publications
  const filteredPubs = useMemo(() => {
    return publicationsList.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || pub.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, publicationsList]);

  // Year counts for sidebar (based on current filter)
  const yearCounts = useMemo(() => {
    const counts = { "2026": 0, "2025": 0, "2024": 0, "2023": 0 };
    filteredPubs.forEach((pub) => {
      if (counts[pub.year] !== undefined) {
        counts[pub.year]++;
      }
    });
    return counts;
  }, [filteredPubs]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const targetIds = ["year-2026", "year-2025", "conferences", "year-2024", "year-2023"];
    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredPubs]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const timelineItems = [
    { label: "2026", id: "year-2026", count: yearCounts["2026"] },
    { label: "2025", id: "year-2025", count: yearCounts["2025"] },
    { label: "Conferences", id: "conferences", isConference: true },
    { label: "2024", id: "year-2024", count: yearCounts["2024"] },
    { label: "2023", id: "year-2023", count: yearCounts["2023"] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface custom-scroll transition-colors duration-300">
      <Header />

      <main className="max-w-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-20 w-full flex-grow">
        {/* Title / Hero */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full mb-6 font-semibold shadow-sm">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="font-label-sm text-xs uppercase tracking-widest">Research Repository</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-deep-navy font-extrabold tracking-tight mb-4">
            Academic Publications
          </h1>
          <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            A comprehensive collection of research papers and presentations focused on AI-driven management information systems, predictive analytics, and sustainable decision science.
          </p>
        </header>

        {/* Interactive Search & Filter Panel */}
        <section className="mb-12 p-6 bg-surface-container-low border border-outline-variant rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center shadow-sm">
          <div className="flex-grow max-w-md relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-outline">search</span>
            <input
              type="text"
              placeholder="Search by title, journal, or co-author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-surface-container-lowest border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-2 hidden sm:inline">
              Filter Area:
            </span>
            {["All", "MIS Focus", "Sustainability", "Supply Chain"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white dark:bg-surface-container-lowest border border-outline-variant text-on-surface hover:border-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Sticky Left Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <nav className="sticky top-24 space-y-2 bg-surface-container-low/50 p-4 rounded-xl border border-surface-container-highest">
              <p className="font-label-sm text-xs text-outline mb-4 px-2 uppercase tracking-widest font-bold">
                Timeline
              </p>
              {timelineItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`block px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-secondary text-white font-semibold shadow-md"
                      : item.isConference
                      ? "text-secondary font-semibold hover:bg-surface-container"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {item.label}{" "}
                  {!item.isConference && (
                    <span
                      className={`text-xs ml-1 ${
                        activeSection === item.id ? "text-white/80" : "text-outline"
                      }`}
                    >
                      ({item.count})
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </aside>

          {/* Publications Main Area */}
          <div className="lg:col-span-9 space-y-20">
            {/* 2026 */}
            <section id="year-2026" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy">2026</h2>
                <div className="h-[1px] flex-grow bg-outline-variant"></div>
              </div>
              <div className="space-y-6">
                {filteredPubs.filter((p) => p.year === "2026").length === 0 ? (
                  <p className="text-sm text-outline italic">No matching publications found for 2026.</p>
                ) : (
                  filteredPubs
                    .filter((p) => p.year === "2026")
                    .map((pub) => (
                      <article
                        key={pub.id}
                        onClick={() => setExpandedPub(expandedPub === pub.id ? null : pub.id)}
                        className="publication-card p-6 bg-surface-container-lowest border border-surface-container-highest rounded-xl group hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <span className="font-label-sm text-xs px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded font-bold">
                            {pub.status}
                          </span>
                          <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                            {expandedPub === pub.id ? "expand_less" : "expand_more"}
                          </span>
                        </div>
                        <h3 className="font-headline-md text-lg md:text-headline-md font-bold text-primary mb-2">
                          {pub.title}
                        </h3>
                        <p className="font-body-md text-sm text-on-surface-variant mb-4">
                          {pub.journal}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="font-label-sm text-[10px] px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded font-bold uppercase">
                            {pub.category}
                          </span>
                        </div>

                        {/* Abstract Drawer */}
                        {expandedPub === pub.id && (
                          <div className="mt-4 pt-4 border-t border-outline-variant space-y-3 bg-surface-container-low/50 p-4 rounded-lg animate-in slide-in-from-top duration-200">
                            <p className="text-xs text-outline"><strong>Authors:</strong> {pub.authors}</p>
                            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                              <strong>Abstract:</strong> {pub.abstract}
                            </p>
                          </div>
                        )}
                      </article>
                    ))
                )}
              </div>
            </section>

            {/* 2025 */}
            <section id="year-2025" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy">2025</h2>
                <div className="h-[1px] flex-grow bg-outline-variant"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPubs.filter((p) => p.year === "2025").length === 0 ? (
                  <p className="text-sm text-outline italic col-span-2">No matching publications found for 2025.</p>
                ) : (
                  filteredPubs
                    .filter((p) => p.year === "2025")
                    .map((pub) => (
                      <article
                        key={pub.id}
                        onClick={() => setExpandedPub(expandedPub === pub.id ? null : pub.id)}
                        className="publication-card p-6 bg-surface-container-lowest border border-surface-container-highest rounded-xl flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span className="font-label-sm text-[10px] px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded font-semibold uppercase">
                              {pub.category}
                            </span>
                            <span className="material-symbols-outlined text-outline">
                              {expandedPub === pub.id ? "expand_less" : "expand_more"}
                            </span>
                          </div>
                          <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-2 line-clamp-2">
                            {pub.title}
                          </h3>
                          <p className="font-body-md text-xs text-on-surface-variant mb-4">
                            {pub.journal}
                          </p>
                        </div>

                        {/* Abstract Drawer */}
                        {expandedPub === pub.id && (
                          <div className="mt-4 pt-4 border-t border-outline-variant space-y-2 bg-surface-container-low/50 p-3 rounded-lg animate-in slide-in-from-top duration-200 mb-4 text-left">
                            <p className="text-[10px] text-outline"><strong>Authors:</strong> {pub.authors}</p>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              <strong>Abstract:</strong> {pub.abstract}
                            </p>
                          </div>
                        )}

                        {pub.linkType && (
                          <span className="font-label-sm text-xs text-secondary hover:underline flex items-center gap-1 font-bold">
                            {pub.linkType}{" "}
                            <span className="material-symbols-outlined text-[14px]">
                              {pub.linkType === "VIEW DOI" ? "link" : "picture_as_pdf"}
                            </span>
                          </span>
                        )}
                      </article>
                    ))
                )}
              </div>
            </section>

            {/* Conferences */}
            <section id="conferences" className="p-6 md:p-8 bg-primary rounded-2xl text-on-primary scroll-mt-24 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-electric-cyan text-4xl">public</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg font-bold text-white">
                  International Conferences
                </h2>
              </div>
              <div className="space-y-8">
                {conferences.map((conf, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4 ${
                      idx === 0 ? "border-b border-white/10" : ""
                    }`}
                  >
                    <div>
                      <h3 className="font-headline-md text-lg font-bold mb-1 text-white">{conf.code}</h3>
                      <p className="font-body-md text-xs md:text-sm opacity-80 leading-relaxed max-w-xl">
                        {conf.name}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span className="font-label-sm text-xs text-electric-cyan mb-1 font-bold uppercase tracking-wider">
                        {conf.role}
                      </span>
                      <span className="font-body-md text-xs opacity-90">{conf.loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2024 */}
            <section id="year-2024" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy">2024</h2>
                <div className="h-[1px] flex-grow bg-outline-variant"></div>
              </div>
              <div className="space-y-6">
                {filteredPubs.filter((p) => p.year === "2024").length === 0 ? (
                  <p className="text-sm text-outline italic">No matching publications found for 2024.</p>
                ) : (
                  filteredPubs
                    .filter((p) => p.year === "2024")
                    .map((pub) => (
                      <article
                        key={pub.id}
                        onClick={() => setExpandedPub(expandedPub === pub.id ? null : pub.id)}
                        className="publication-card p-6 bg-surface-container-lowest border border-surface-container-highest rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-label-sm text-[10px] px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded font-bold uppercase">
                              {pub.category}
                            </span>
                            {pub.peerReviewed && (
                              <span className="font-label-sm text-[10px] px-2 py-0.5 border border-outline-variant rounded-full text-outline font-semibold">
                                PEER REVIEWED
                              </span>
                            )}
                          </div>
                          <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-1">
                            {pub.title}
                          </h3>
                          <p className="font-body-md text-xs text-on-surface-variant">
                            {pub.journal}
                          </p>

                          {/* Abstract Drawer */}
                          {expandedPub === pub.id && (
                            <div className="mt-4 pt-4 border-t border-outline-variant space-y-2 bg-surface-container-low/50 p-3 rounded-lg animate-in slide-in-from-top duration-200">
                              <p className="text-[10px] text-outline"><strong>Authors:</strong> {pub.authors}</p>
                              <p className="text-xs text-on-surface-variant leading-relaxed">
                                <strong>Abstract:</strong> {pub.abstract}
                              </p>
                            </div>
                          )}
                        </div>
                        <span className="material-symbols-outlined text-outline self-end sm:self-center shrink-0">
                          {expandedPub === pub.id ? "expand_less" : "expand_more"}
                        </span>
                      </article>
                    ))
                )}
              </div>
            </section>

            {/* 2023 */}
            <section id="year-2023" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy">2023</h2>
                <div className="h-[1px] flex-grow bg-outline-variant"></div>
              </div>
              <div className="space-y-6">
                {filteredPubs.filter((p) => p.year === "2023").length === 0 ? (
                  <p className="text-sm text-outline italic">No matching publications found for 2023.</p>
                ) : (
                  filteredPubs
                    .filter((p) => p.year === "2023")
                    .map((pub) => (
                      <article
                        key={pub.id}
                        onClick={() => setExpandedPub(expandedPub === pub.id ? null : pub.id)}
                        className="publication-card p-6 bg-surface-container-lowest border border-surface-container-highest rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="font-label-sm text-[10px] px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded font-bold uppercase">
                            {pub.category}
                          </span>
                          <span className="material-symbols-outlined text-outline">
                            {expandedPub === pub.id ? "expand_less" : "expand_more"}
                          </span>
                        </div>
                        <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-2">
                          {pub.title}
                        </h3>
                        <p className="font-body-md text-xs text-on-surface-variant mb-2">
                          {pub.journal}
                        </p>

                        {/* Abstract Drawer */}
                        {expandedPub === pub.id && (
                          <div className="mt-4 pt-4 border-t border-outline-variant space-y-2 bg-surface-container-low/50 p-3 rounded-lg animate-in slide-in-from-top duration-200">
                            <p className="text-[10px] text-outline"><strong>Authors:</strong> {pub.authors}</p>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                              <strong>Abstract:</strong> {pub.abstract}
                            </p>
                          </div>
                        )}
                      </article>
                    ))
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Stats Section & CTA */}
        <section className="mt-32 pt-20 border-t border-surface-container-highest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
            <div className="p-8 rounded-2xl bg-surface-container-low/60 shadow-sm border border-surface-container-highest">
              <span className="font-display-lg text-4xl md:text-display-lg font-extrabold text-primary block mb-2">10+</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Publications
              </span>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container-low/60 shadow-sm border border-surface-container-highest">
              <span className="font-display-lg text-4xl md:text-display-lg font-extrabold text-primary block mb-2">01</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Approved Patent
              </span>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container-low/60 shadow-sm border border-surface-container-highest">
              <span className="font-display-lg text-4xl md:text-display-lg font-extrabold text-primary block mb-2">04+</span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                International Links
              </span>
            </div>
          </div>
          
          <div className="mt-20 p-8 md:p-12 bg-surface-gray rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-surface-container-highest shadow-sm">
            <div className="max-w-2xl text-left">
              <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy mb-2">
                Collaborative Research
              </h2>
              <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
                Interested in co-authoring or discussing MIS frameworks? Reach out for research collaborations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-xl font-headline-md font-semibold hover:bg-primary transition-all duration-200 shadow-md group shrink-0"
            >
              Get in Touch
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
