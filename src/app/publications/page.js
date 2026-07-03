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

  const [publicationsList, setPublicationsList] = useState([
    {
      id: "pub-1",
      year: "2025",
      category: "Supply Chain",
      title: "Enhancing supply chain resilience across US regions using machine learning and logistics performance analytics",
      journal: "International Journal of Applied Mathematics 38 (4s), 182-205",
      authors: "RER Shawon",
      abstract: "Supply chain resilience using machine learning analytics to optimize logistical performance.",
      link: "https://ijamjournal.org/ijam/publication/index.php/ijam/article/view/225"
    },
    {
      id: "pub-2",
      year: "2025",
      category: "MIS Focus",
      title: "Employee Motivation and Behavior in Construction Engineering Projects",
      journal: "International Journal of Social Science and Economic Research 10 (1), 342-372",
      authors: "M Sharfuddin, M Halimuzzaman, F Akter, KN Dey, P Saha",
      abstract: "Investigates human resource scheduling and motivational metrics in infrastructure developments.",
      link: "https://ijsser.org/more2025.php?id=26"
    },
    {
      id: "pub-3",
      year: "2023",
      category: "Sustainability",
      title: "Management information systems driven green marketing intelligence for sustainable consumer engagement",
      journal: "Journal of Primeasia 4 (1), 1-7",
      authors: "M Sharfuddin, SK Papia",
      abstract: "Research modeling consumer response to eco-labels and green analytics studies.",
      link: "https://primeasia.edu.bd/journal/index.php/paj/article/view/101"
    },
    {
      id: "pub-4",
      year: "2025",
      category: "MIS Focus",
      title: "Enhancing data reliability in management information systems through artificial intelligence driven validation and error detection models",
      journal: "Journal of Ai ML DL 1 (1), 1-8",
      authors: "M Sharfuddin, P Choudhury",
      abstract: "Proposes an automated data validation pipeline using outlier detection networks.",
      link: "https://jaimldl.com/index.php/jaimldl/article/view/1"
    },
    {
      id: "pub-5",
      year: "2023",
      category: "MIS Focus",
      title: "Management information systems in contemporary business: Prospects, strategic advantages, and future challenges",
      journal: "Business and Social Sciences 1 (1), 1-7",
      authors: "P Choudhury, M Sharfuddin",
      abstract: "Examines critical success factors and strategic advantages when deploying MIS.",
      link: "https://bssjournal.com/index.php/bss/article/view/1"
    },
    {
      id: "pub-6",
      year: "2022",
      category: "MIS Focus",
      title: "Strategic Healthcare Service Optimization and Overcoming Obstacles through Management Information Systems",
      journal: "Journal of Primeasia 3 (1), 1-8",
      authors: "P Choudhury, M Sharfuddin",
      abstract: "Optimization of healthcare services via robust management information systems.",
      link: "https://primeasia.edu.bd/journal/index.php/paj/article/view/85"
    },
    {
      id: "pub-7",
      year: "2025",
      category: "MIS Focus",
      title: "Optimizing Resource Allocation and Operational Efficiency in Management Information Systems Using Predictive Machine Learning",
      journal: "Journal of Ai ML DL 1 (1), 1-8",
      authors: "P Choudhury, M Sharfuddin",
      abstract: "Presents a dynamic heuristic model for server load and storage balancing across cloud-based systems.",
      link: "https://jaimldl.com/index.php/jaimldl/article/view/2"
    },
    {
      id: "pub-8",
      year: "2025",
      category: "MIS Focus",
      title: "Smart Management Information Systems for Data-Driven Organizational Excellence: Challenges and Multi-Sector Empirical Insights",
      journal: "Pacific Journal of Business Innovation and Strategy 2 (4), 183-191",
      authors: "M Sharfuddin, P Choudhury",
      abstract: "Challenges and empirical insights of smart MIS deployments for organizational excellence.",
      link: "https://pjbis.com/index.php/pjbis/article/view/36"
    },
    {
      id: "pub-9",
      year: "2022",
      category: "Sustainability",
      title: "Integrating Management Information Systems in Marketing: A Survey-Based Analysis of Consumer Engagement and Business Growth through Data Analytics",
      journal: "Pathfinder of Research 3 (1), 60-72",
      authors: "SK Papia, M Sharfuddin, K Begum",
      abstract: "Survey-based analysis of consumer engagement driven by MIS in marketing.",
      link: "https://pathfinderresearch.org/index.php/por/article/view/28"
    },
    {
      id: "pub-10",
      year: "2024",
      category: "MIS Focus",
      title: "Integration of Universal Management Information Systems in the Extended Organization Solving Fundamental Challenges",
      journal: "Research Sustainability 1 (3), 1-12",
      authors: "M Sharfuddin, P Choudhury, KM Ahmed",
      abstract: "Outlines a universal database API protocol standard for heterogeneous ERP databases.",
      link: "https://researchsustainability.org/index.php/rs/article/view/12"
    },
    {
      id: "pub-11",
      year: "2024",
      category: "MIS Focus",
      title: "Artificial Intelligence Driven Management Information Systems for Enhancing Social Equity, Economic Sustainability and Managing Costs and Challenges",
      journal: "Research Sustainability 1 (01), 37-50",
      authors: "P Choudhury, M Sharfuddin, KM Ahmed, K Begum",
      abstract: "A peer-reviewed critique on using bias-aware machine learning frameworks within MIS.",
      link: "https://researchsustainability.org/index.php/rs/article/view/3"
    },
    {
      id: "pub-12",
      year: "2026",
      category: "MIS Focus",
      title: "Leveraging artificial intelligence in business decision-making: A study on predictive analytics in retail management",
      journal: "Moving Towards Sustainable Businesses and Developing More Resilient Economies (181-188)",
      authors: "Md Sharfuddin, Nazmul Islam, Omor Fahad",
      abstract: "Study on predictive analytics in retail management utilizing artificial intelligence.",
      link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003647300-22/leveraging-artificial-intelligence-business-decision-making-study-predictive-analytics-retail-management-md-sharfuddin-nazmul-islam-omor-fahad"
    },
    {
      id: "pub-13",
      year: "2025",
      category: "MIS Focus",
      title: "Data-Driven Management Information Systems Leveraging Artificial Intelligence for Sustainable Business Performance and Operational Efficiency",
      journal: "Data-Driven Management Information Systems Leveraging Artificial Intelligence",
      authors: "MS Md Sharfuddin, PC Proggo Choudhury, AIH Ahamed Ismail Hossain",
      abstract: "Exploring how data-driven MIS leverages AI for sustainable performance and efficiency.",
      link: "https://semantjournals.org/index.php/AJBP/article/view/3358"
    },
    {
      id: "pub-14",
      year: "2025",
      category: "MIS Focus",
      title: "Artificial Intelligence Driven MIS for Decision Making and Superior Organizational Performance",
      journal: "Artificial Intelligence Driven MIS for Decision Making and Superior Organizational Performance",
      authors: "MS Md Sharfuddin",
      abstract: "Research on AI-driven management information systems facilitating decision making and superior performance.",
      link: "https://repository.antispubmed.com/artikel/18334/advances-in-compiler-construction-for-adaptive-computers"
    },
    {
      id: "pub-15",
      year: "2026",
      category: "Patent",
      title: "Desktop display stand for electronic tablets and screens",
      journal: "UK Patent Registration (6509489)",
      authors: "M Sharfuddin, MA Rahman, BMT Haque, M Karmakar, MA Azam, ...",
      abstract: "Ergonomic desktop display stand engineered to securely house and display electronic tablets and touchscreen devices.",
      link: "https://www.gov.uk/search-for-patent"
    },
    {
      id: "pub-16",
      year: "2025",
      category: "Patent",
      title: "Cyberattack Detection and Prevention Device",
      journal: "UK Patent Registration (6471605)",
      authors: "MR Buiya, MMB Reza, S Hossain, MK Rahman, O Fahad, M Sharfuddin",
      abstract: "A cutting-edge threat-detection device operating at the network hardware level to prevent data breaches.",
      link: "https://orcid.org/0009-0006-5783-9992"
    }
  ]);

  const [conferences, setConferences] = useState([
    {
      code: "ICBMEIS-2025",
      name: "International Conference on Business, Management, Economics, and Information Systems (ICBMEIS-2025)",
      role: "PAPER PRESENTER",
      loc: "York College (CUNY), New York, USA | October 25–26, 2025",
      title: "Leveraging artificial intelligence in business decision-making: A study on predictive analytics in retail management",
      certLink: "https://drive.google.com/file/d/1gGyZ6qjJ2gN6PIQmKej2hPhaqWxi3GTh/view",
      pubLink: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003647300-22/leveraging-artificial-intelligence-business-decision-making-study-predictive-analytics-retail-management-md-sharfuddin-nazmul-islam-omor-fahad",
      fullPaperLink: "https://docs.google.com/document/d/19oDu7zspNmBYiLFYtsT79S-p8jYBufyI/edit?rtpof=true&sd=true&tab=t.0"
    },
    {
      code: "CASH 4.0-2025",
      name: "Fourth International Conference on Recent Advances in Social Sciences and Humanities (CASH 4.0 – 2025) - Organized by Eudoxia Research University & Eudoxia Research Centre",
      role: "PARTICIPANT",
      loc: "November 28–29, 2025",
      certLink: "https://drive.google.com/file/d/1dR4mW1rSui2WMVDeOCT-0HDFVm0I1w5l/view"
    },
  ]);

  const [awards, setAwards] = useState([
    {
      title: "Data Analytics Excellence Award",
      subtitle: "(International Royal Golden Award)",
      org: "Eudoxia Research University",
      year: "2025",
      icon: "emoji_events",
      link: "https://drive.google.com/file/d/15gq6QlvD3Fs3NVksAcV1FEZOw-HRZ_Y5/view"
    },
    {
      title: "Royal Golden Fellow (FRAEL)",
      subtitle: "",
      org: "Eudoxia Research University & Eudoxia Research Centre",
      year: "2025",
      icon: "workspace_premium",
      link: "https://drive.google.com/file/d/1v4kcjfCPE79zVKxewlGDjsPoemavdk38/view"
    }
  ]);

  const [newsCoverage, setNewsCoverage] = useState([
    {
      title: "Data Analytics Excellence Award 2025 Conferred to Md Sharfuddin",
      outlet: "Daily Observer",
      link: "https://www.observerbd.com/news/557499#google_vignette",
      date: "2025"
    },
    {
      title: "Data Analytics Excellence Award 2025 Conferred to Md Sharfuddin",
      outlet: "The Asian Age",
      link: "https://dailyasianage.com/news/345540/data-analytics-excellence-award2025-conferred-to-md-sharfuddin",
      date: "2025"
    }
  ]);

  useEffect(() => {
    import("@/lib/firestore").then(({ getPublications, getConferences, getAwards, getNewsCoverage }) => {
      getPublications().then((data) => {
        if (data && data.length > 0) {
          setPublicationsList(data.map(p => ({
            id: p.id,
            year: p.year || "",
            category: p.category || "",
            title: p.title || "",
            journal: p.journal || "",
            authors: p.authors || "",
            abstract: p.abstract || "",
            link: p.link || "",
            peerReviewed: p.peerReviewed || false,
            status: p.status || "",
            linkType: p.linkType || ""
          })));
        }
      }).catch(() => {});

      getConferences().then((data) => {
        if (data && data.length > 0) {
          setConferences(data.map(c => ({
            code: c.code || "",
            name: c.name || "",
            role: c.role || "",
            loc: c.loc || "",
            title: c.title || "",
            certLink: c.certLink || "",
            pubLink: c.pubLink || "",
            fullPaperLink: c.fullPaperLink || ""
          })));
        }
      }).catch(() => {});

      getAwards().then((data) => {
        if (data && data.length > 0) {
          setAwards(data.map(a => ({
            title: a.title || "",
            subtitle: a.subtitle || "",
            org: a.org || "",
            year: a.year || "",
            icon: a.icon || "emoji_events",
            link: a.link || ""
          })));
        }
      }).catch(() => {});

      getNewsCoverage().then((data) => {
        if (data && data.length > 0) {
          setNewsCoverage(data.map(n => ({
            title: n.title || "",
            outlet: n.outlet || "",
            link: n.link || "",
            date: n.date || ""
          })));
        }
      }).catch(() => {});
    }).catch(() => {});
  }, []);

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
    const counts = { "2026": 0, "2025": 0, "2024": 0, "2023": 0, "2022": 0 };
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
    
    const targetIds = ["year-2026", "year-2025", "year-2024", "year-2023", "year-2022", "conferences", "awards", "news", "patents"];
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
    { label: "2026 Publications", id: "year-2026", count: yearCounts["2026"] },
    { label: "2025 Publications", id: "year-2025", count: yearCounts["2025"] },
    { label: "2024 Publications", id: "year-2024", count: yearCounts["2024"] },
    { label: "2023 Publications", id: "year-2023", count: yearCounts["2023"] },
    { label: "2022 Publications", id: "year-2022", count: yearCounts["2022"] },
    { label: "International Conferences", id: "conferences", isConference: true },
    { label: "Awards & Recognitions", id: "awards", isConference: true },
    { label: "News Coverage", id: "news", isConference: true },
    { label: "Patent & Intellectual Property", id: "patents", isPatent: true },
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
            Academic Publications &amp; Research
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
                    ? "bg-primary text-on-primary shadow-sm"
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
                      ? "bg-secondary text-on-secondary font-semibold shadow-md"
                      : item.isConference || item.isPatent
                      ? "text-secondary font-semibold hover:bg-surface-container"
                      : "text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {item.label}{" "}
                  {!item.isConference && !item.isPatent && (
                    <span
                      className={`text-xs ml-1 ${
                        activeSection === item.id ? "text-on-secondary/80" : "text-outline"
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
                          <div className="flex-grow">
                            {pub.status && (
                              <span className="font-label-sm text-xs px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded font-bold">
                                {pub.status}
                              </span>
                            )}
                          </div>
                          <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">
                            {expandedPub === pub.id ? "expand_less" : "expand_more"}
                          </span>
                        </div>
                        <h3 className="font-headline-md text-lg md:text-headline-md font-bold text-primary mb-2">
                          {pub.title}
                        </h3>
                        <p className="font-body-md text-sm text-on-surface-variant mb-3">
                          {pub.journal}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
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

                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-label-sm text-xs text-secondary hover:underline hover:text-primary flex items-center gap-1 font-bold mt-3 w-fit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{pub.linkType || "VIEW FORTHCOMING PAPER"}</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
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

                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-label-sm text-xs text-secondary hover:underline hover:text-primary flex items-center gap-1 font-bold mt-2 w-fit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{pub.linkType || "VIEW PAPER"}</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
                        )}
                      </article>
                    ))
                )}
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

                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-label-sm text-xs text-secondary hover:underline hover:text-primary flex items-center gap-1 font-bold mt-3 w-fit"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>VIEW PAPER</span>
                              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                            </a>
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

                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-label-sm text-xs text-secondary hover:underline hover:text-primary flex items-center gap-1 font-bold mt-3 w-fit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>VIEW PAPER</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
                        )}
                      </article>
                    ))
                )}
              </div>
            </section>

            {/* 2022 */}
            <section id="year-2022" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy">2022</h2>
                <div className="h-[1px] flex-grow bg-outline-variant"></div>
              </div>
              <div className="space-y-6">
                {filteredPubs.filter((p) => p.year === "2022").length === 0 ? (
                  <p className="text-sm text-outline italic">No matching publications found for 2022.</p>
                ) : (
                  filteredPubs
                    .filter((p) => p.year === "2022")
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

                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-label-sm text-xs text-secondary hover:underline hover:text-primary flex items-center gap-1 font-bold mt-3 w-fit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>VIEW PAPER</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
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
                      {conf.title && (
                        <p className="font-body-md text-sm text-electric-cyan font-semibold mb-2 max-w-xl">
                          {conf.title}
                        </p>
                      )}
                      <p className="font-body-md text-xs md:text-sm opacity-80 leading-relaxed max-w-xl">
                        {conf.name}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span className="font-label-sm text-xs text-electric-cyan mb-1 font-bold uppercase tracking-wider">
                        {conf.role}
                      </span>
                      <span className="font-body-md text-xs opacity-90 mb-3">{conf.loc}</span>
                      <div className="flex flex-col md:items-end gap-2 mt-1">
                        {conf.certLink && (
                          <a href={conf.certLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-electric-cyan hover:underline font-bold bg-white/10 px-2 py-1 rounded w-fit">
                            <span>View Certificate</span>
                            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          </a>
                        )}
                        {conf.pubLink && (
                          <a href={conf.pubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-electric-cyan hover:underline font-bold bg-white/10 px-2 py-1 rounded w-fit">
                            <span>Publication Link</span>
                            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          </a>
                        )}
                        {conf.fullPaperLink && (
                          <a href={conf.fullPaperLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-electric-cyan hover:underline font-bold bg-white/10 px-2 py-1 rounded w-fit">
                            <span>Full Paper</span>
                            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards & Recognitions */}
            <section id="awards" className="p-6 md:p-8 bg-surface-container-low border border-outline-variant rounded-2xl scroll-mt-24 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-amber-500 text-4xl">workspace_premium</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg font-bold text-deep-navy">
                  Awards &amp; Recognitions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award, idx) => (
                  <div key={idx} className="bg-white dark:bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-amber-500 text-2xl">{award.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-base font-bold text-primary">{award.title}</h3>
                      {award.subtitle && <p className="text-xs text-secondary font-semibold mb-1">{award.subtitle}</p>}
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-2">{award.org}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline font-bold">{award.year}</span>
                        {award.link && (
                          <a href={award.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-secondary hover:underline font-bold">
                            <span>View Certificate</span>
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* News Coverage */}
            <section id="news" className="p-6 md:p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl scroll-mt-24 shadow-sm mt-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-primary text-4xl">newspaper</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg font-bold text-deep-navy">
                  Media &amp; News Coverage
                </h2>
              </div>
              <div className="space-y-4">
                {newsCoverage.map((news, idx) => (
                  <a key={idx} href={news.link} target="_blank" rel="noopener noreferrer" className="block p-4 border border-outline-variant rounded-xl hover:border-secondary hover:shadow-md transition-all group">
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wider mb-1 block">{news.outlet}</span>
                        <h3 className="font-headline-md text-sm md:text-base font-bold text-primary group-hover:text-secondary transition-colors">{news.title}</h3>
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">open_in_new</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Patent & Intellectual Property Section */}
            <section id="patents" className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-headline-lg text-2xl md:text-headline-lg font-bold text-deep-navy">
                  Patent &amp; Intellectual Property
                </h2>
                <div className="h-[1px] flex-grow bg-outline-variant"></div>
              </div>
              <div className="space-y-6">
                {publicationsList.filter(p => p.category === "Patent").length === 0 ? (
                  <p className="text-sm text-outline italic">No patents found.</p>
                ) : (
                  publicationsList.filter(p => p.category === "Patent").map((patent) => {
                    const isStand = patent.title.toLowerCase().includes("stand") || patent.title.toLowerCase().includes("display");
                    const regNoMatch = patent.journal.match(/\((.*?)\)/) || patent.journal.match(/No:?\s*(\w+)/i) || patent.journal.match(/(\d+)/);
                    const regNo = regNoMatch ? regNoMatch[1] : patent.journal;
                    return (
                      <div key={patent.id} className="p-6 md:p-8 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-md space-y-6">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                          <div>
                            <span className="font-label-sm text-xs text-secondary bg-secondary-fixed dark:bg-secondary/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3 inline-block">
                              UK Approved Patent {patent.year}
                            </span>
                            <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-primary">
                              {patent.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-xs text-outline font-semibold">Design Registration: {regNo}</p>
                              {patent.link && (
                                <a href={patent.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-secondary hover:underline font-bold inline-flex items-center gap-1">
                                  Verify Online <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                                </a>
                              )}
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-5xl text-secondary opacity-80">
                            {isStand ? "devices" : "shield_lock"}
                          </span>
                        </div>
                        <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                          {patent.abstract}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                          {patent.link && (
                            <a
                              href={patent.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-secondary px-5 py-2.5 rounded-lg font-body-md font-semibold transition-all shadow-sm text-xs md:text-sm hover:scale-105 duration-200"
                            >
                              Verify Patent
                              <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                          )}
                          <a
                            href="mailto:sharfuddin.md50@yahoo.com?subject=Patent Inquiry"
                            className="inline-flex items-center gap-2 border border-outline-variant text-primary hover:bg-surface-container-low px-5 py-2.5 rounded-lg font-body-md font-semibold transition-all text-xs md:text-sm hover:scale-105 duration-200"
                          >
                            Inquire Details
                            <span className="material-symbols-outlined text-sm">mail</span>
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Stats Section & CTA */}
        <section className="mt-32 pt-20 border-t border-surface-container-highest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
            <div className="p-8 rounded-2xl bg-surface-container-low/60 shadow-sm border border-surface-container-highest">
              <span className="font-display-lg text-4xl md:text-display-lg font-extrabold text-primary block mb-2">
                {publicationsList.filter(p => p.category !== "Patent").length}
              </span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Publications
              </span>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container-low/60 shadow-sm border border-surface-container-highest">
              <span className="font-display-lg text-4xl md:text-display-lg font-extrabold text-primary block mb-2">
                {String(publicationsList.filter(p => p.category === "Patent").length).padStart(2, "0")}
              </span>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Approved Patents
              </span>
            </div>
            <div className="p-8 rounded-2xl bg-surface-container-low/60 shadow-sm border border-surface-container-highest">
              <span className="font-display-lg text-4xl md:text-display-lg font-extrabold text-primary block mb-2">
                {String(conferences.length + 2).padStart(2, "0")}+
              </span>
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
