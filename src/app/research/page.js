"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Research() {
  const [activeInterest, setActiveInterest] = useState("mis_ai");
  const [interests, setInterests] = useState({
    mis_ai: {
      title: "AI-Driven Management Information Systems",
      icon: "settings_applications",
      color: "from-blue-600 to-indigo-700",
      tagline: "Integrating artificial intelligence into MIS frameworks for smarter, more reliable enterprise decision-making.",
      overview: "My primary research focus is on how Artificial Intelligence can be embedded within Management Information Systems to enhance data reliability, reduce operational errors, and automate decision workflows. This includes designing AI-driven validation models, error detection pipelines, and smart dashboards that replace manual oversight in organizational data environments. Published across multiple peer-reviewed journals including Journal of AI ML DL, Research Sustainability, and Pacific Journal of Business Innovation and Strategy.",
      questions: [
        "How can AI-driven validation frameworks reduce data errors within large-scale enterprise MIS environments?",
        "What machine learning architectures best support real-time decision automation for organizational leadership?",
        "How does integrating AI into MIS affect long-term business performance and cost management?"
      ],
      methodology: ["AI Validation Pipelines", "Outlier Detection Networks", "Predictive Machine Learning Models", "Smart Dashboard Design", "Data Integrity Frameworks"],
      publications: [
        { title: "Enhancing data reliability in MIS through AI-driven validation and error detection models", type: "Journal Paper", year: "2025" },
        { title: "Optimizing Resource Allocation and Operational Efficiency in MIS Using Predictive Machine Learning", type: "Journal Paper", year: "2025" },
        { title: "Data-Driven MIS Leveraging AI for Sustainable Business Performance", type: "Journal Paper", year: "2025" },
        { title: "AI-Driven MIS for Decision Making and Superior Organizational Performance", type: "Journal Paper", year: "2025" }
      ]
    },
    supply_chain: {
      title: "Supply Chain Analytics & Logistics",
      icon: "inventory",
      color: "from-emerald-600 to-teal-700",
      tagline: "Using machine learning to build resilient, data-driven supply chain systems across US regions.",
      overview: "This research stream focuses on applying machine learning techniques to logistics performance data to identify bottlenecks, predict disruptions, and strengthen supply chain resilience. My published work specifically examines cross-regional logistics performance patterns across the United States, proposing regression-based and ML-driven models to improve raw material flow, warehouse efficiency, and delivery reliability. Published in the International Journal of Applied Mathematics (2025).",
      questions: [
        "How can machine learning models accurately predict supply chain disruptions across diverse US regional logistics networks?",
        "What logistics performance indicators are most predictive of long-term supply chain resilience?"
      ],
      methodology: ["Regression Analysis", "Random Forest Algorithms", "Logistics Performance Indexing", "Time-Series Forecasting", "Regional Data Clustering"],
      publications: [
        { title: "Enhancing supply chain resilience across US regions using machine learning and logistics performance analytics", type: "Journal Paper", year: "2025" }
      ]
    },
    sustainability: {
      title: "Sustainability & Green Marketing Intelligence",
      icon: "eco",
      color: "from-amber-600 to-orange-700",
      tagline: "Leveraging MIS and data analytics to drive sustainable consumer engagement and green business practices.",
      overview: "This research explores how Management Information Systems, when aligned with green marketing strategies, can drive measurable improvements in sustainable consumer behaviour. It examines the role of data analytics in identifying eco-conscious consumer segments, designing targeted green campaigns, and measuring their long-term impact on brand loyalty and revenue. Also covers how AI-driven MIS can support economic sustainability, social equity, and cost efficiency across multiple sectors. Published in Journal of Primeasia and Research Sustainability.",
      questions: [
        "How can MIS-driven green marketing intelligence increase sustainable purchase behaviour among target consumer segments?",
        "What role does AI-powered MIS play in reducing organizational costs while improving social equity outcomes?"
      ],
      methodology: ["Consumer Survey Analysis", "Green Analytics Frameworks", "Social Equity Metrics", "Cost-Benefit Modeling", "Quantitative Research Design"],
      publications: [
        { title: "MIS-Driven Green Marketing Intelligence for Sustainable Consumer Engagement", type: "Journal Paper", year: "2023" },
        { title: "Integrating MIS in Marketing: Consumer Engagement via Data Analytics", type: "Journal Paper", year: "2022" },
        { title: "AI-Driven MIS for Enhancing Social Equity, Economic Sustainability and Managing Costs", type: "Journal Paper", year: "2024" }
      ]
    },
    healthcare_org: {
      title: "Healthcare & Organizational MIS",
      icon: "local_hospital",
      color: "from-rose-600 to-pink-700",
      tagline: "Optimizing healthcare services and workforce performance through strategic Management Information Systems.",
      overview: "This domain investigates how MIS can be strategically deployed within healthcare organizations and construction engineering environments to improve service delivery, resource allocation, and employee motivation. The healthcare research proposes frameworks for overcoming structural barriers in hospital information management. The organizational research examines motivational dynamics among engineering project teams and how human factors influence digital system adoption and performance outcomes. Published in Journal of Primeasia and International Journal of Social Science and Economic Research.",
      questions: [
        "What MIS architectural strategies best overcome information silos in healthcare service delivery systems?",
        "What do employee motivation and behavioural dynamics affect digital MIS adoption in construction engineering projects?"
      ],
      methodology: ["Healthcare Systems Analysis", "Employee Motivation Surveys", "Quantitative & Qualitative Mixed Methods", "Organizational Behaviour Frameworks", "MIS Structural Auditing"],
      publications: [
        { title: "Strategic Healthcare Service Optimization through Management Information Systems", type: "Journal Paper", year: "2022" },
        { title: "Employee Motivation and Behavior in Construction Engineering Projects", type: "Journal Paper", year: "2025" },
        { title: "Smart MIS for Data-Driven Organizational Excellence: Multi-Sector Empirical Insights", type: "Journal Paper", year: "2025" }
      ]
    }
  });

  useEffect(() => {
    document.title = "Research Interests | Md Sharfuddin";

    import("@/lib/firestore").then(({ getResearchInterests, getPublications }) => {
      getPublications().then((allPubs) => {
        getResearchInterests().then((data) => {
          if (data && data.length > 0) {
            // Convert array of docs back to interests dictionary
            const newInterests = {};
            data.forEach((item) => {
              let questions = item.questions || [];
              if (typeof questions === "string") {
                questions = questions.split("\n").map(q => q.trim()).filter(Boolean);
              }
              let methodology = item.methodology || [];
              if (typeof methodology === "string") {
                methodology = methodology.split("\n").map(m => m.trim()).filter(Boolean);
              }
              let publications = item.publications || [];
              if (typeof publications === "string") {
                try {
                  publications = JSON.parse(publications);
                } catch (_) {
                  publications = publications.split("\n").map(p => ({ title: p.trim(), type: "Paper", year: "" })).filter(p => p.title);
                }
              }
              
              // Dynamic mapping from publications list if empty
              if ((!publications || publications.length === 0) && allPubs && allPubs.length > 0) {
                const itemKey = (item.id || "").toLowerCase();
                const itemTitle = (item.title || "").toLowerCase();
                
                const matched = allPubs.filter((pub) => {
                  const pubCat = (pub.category || "").toLowerCase();
                  const pubTitle = (pub.title || "").toLowerCase();
                  
                  if (itemKey === "mis_ai" && (pubCat.includes("mis") || pubTitle.includes("management information"))) return true;
                  if (itemKey === "supply_chain" && (pubCat.includes("supply") || pubTitle.includes("supply chain"))) return true;
                  if (itemKey === "sustainability" && (pubCat.includes("sustain") || pubTitle.includes("sustainable") || pubTitle.includes("green marketing"))) return true;
                  if (itemKey === "healthcare_org" && (
                    pubCat.includes("health") || 
                    pubTitle.includes("healthcare") || 
                    pubTitle.includes("motivation") || 
                    pubTitle.includes("behavior") ||
                    pubTitle.includes("construction") ||
                    pubTitle.includes("excellence")
                  )) return true;
                  
                  if (pubCat && itemTitle.includes(pubCat)) return true;
                  return false;
                });
                
                publications = matched.map(p => ({
                  title: p.title || "",
                  type: p.category === "Patent" ? "Patent" : "Journal Paper",
                  year: p.year || ""
                }));
              }
              
              newInterests[item.id] = {
                title: item.title || "",
                icon: item.icon || "science",
                color: item.color || "from-blue-600 to-indigo-700",
                tagline: item.tagline || "",
                overview: item.overview || "",
                questions,
                methodology,
                publications
              };
            });
            setInterests(newInterests);
            // Set first key as active if current is not in keys anymore
            const keys = Object.keys(newInterests);
            if (keys.length > 0 && !keys.includes(activeInterest)) {
              setActiveInterest(keys[0]);
            }
          }
        }).catch(() => {});
      }).catch(() => {
        // Fallback if getPublications fails
        getResearchInterests().then((data) => {
          if (data && data.length > 0) {
            const newInterests = {};
            data.forEach((item) => {
              let questions = item.questions || [];
              if (typeof questions === "string") {
                questions = questions.split("\n").map(q => q.trim()).filter(Boolean);
              }
              let methodology = item.methodology || [];
              if (typeof methodology === "string") {
                methodology = methodology.split("\n").map(m => m.trim()).filter(Boolean);
              }
              let publications = item.publications || [];
              if (typeof publications === "string") {
                try {
                  publications = JSON.parse(publications);
                } catch (_) {
                  publications = publications.split("\n").map(p => ({ title: p.trim(), type: "Paper", year: "" })).filter(p => p.title);
                }
              }
              newInterests[item.id] = {
                title: item.title || "",
                icon: item.icon || "science",
                color: item.color || "from-blue-600 to-indigo-700",
                tagline: item.tagline || "",
                overview: item.overview || "",
                questions,
                methodology,
                publications
              };
            });
            setInterests(newInterests);
            const keys = Object.keys(newInterests);
            if (keys.length > 0 && !keys.includes(activeInterest)) {
              setActiveInterest(keys[0]);
            }
          }
        }).catch(() => {});
      });
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface custom-scroll transition-colors duration-300">
      <Header />

      <main className="max-w-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-20 w-full flex-grow">
        {/* Hero Section */}
        <header className="mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full mb-6 font-semibold shadow-sm animate-fade-in">
            <span className="material-symbols-outlined text-[18px]">science</span>
            <span className="font-label-sm text-xs uppercase tracking-widest">Research Interests &amp; Direction</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-deep-navy font-extrabold tracking-tight mb-4 leading-tight">
            Academic Fields &amp; Specializations
          </h1>
          <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Exploring the critical intersection of business administration, machine learning, and administrative information systems. My research targets the optimization of operational and decision environments.
          </p>
        </header>

        {/* Interactive Interest Grid / Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-label-sm text-xs text-outline uppercase tracking-wider font-bold mb-2 px-1">
              Select Research Domain:
            </p>
            {Object.keys(interests).map((key) => {
              const item = interests[key];
              const isActive = activeInterest === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveInterest(key)}
                  className={`w-full text-left p-5 rounded-xl border flex items-center gap-4 transition-all duration-300 group cursor-pointer shadow-sm ${
                    isActive
                      ? "bg-primary border-primary text-on-primary scale-[1.02]"
                      : "bg-surface-container-low hover:bg-surface-container-high border-outline-variant text-on-surface hover:border-secondary"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-on-primary" : "text-secondary"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-headline-md text-base md:text-lg font-bold">
                      {item.title}
                    </h3>
                    <p
                      className={`font-body-md text-xs mt-0.5 line-clamp-1 ${
                        isActive ? "text-on-primary/85" : "text-on-surface-variant"
                      }`}
                    >
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content Card */}
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-6 md:p-10 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300">
            {/* Top Accent Gradient */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${interests[activeInterest].color}`} />

            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
              <div>
                <h2 className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-secondary">
                    {interests[activeInterest].icon}
                  </span>
                  {interests[activeInterest].title}
                </h2>
                <p className="font-body-lg text-sm md:text-base text-secondary font-semibold italic mt-2">
                  "{interests[activeInterest].tagline}"
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Overview */}
              <div>
                <h4 className="font-label-sm text-xs text-outline uppercase tracking-wider font-bold mb-3">
                  Domain Overview
                </h4>
                <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {interests[activeInterest].overview}
                </p>
              </div>

              {/* Research Questions */}
              <div>
                <h4 className="font-label-sm text-xs text-outline uppercase tracking-wider font-bold mb-3">
                  Key Research Questions
                </h4>
                <ul className="space-y-3">
                  {interests[activeInterest].questions.map((q, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-on-surface">
                      <span className="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">
                        help_outline
                      </span>
                      <span className="leading-relaxed font-semibold">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Methodology / Technologies */}
              <div>
                <h4 className="font-label-sm text-xs text-outline uppercase tracking-wider font-bold mb-3">
                  Methodology &amp; Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interests[activeInterest].methodology.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-surface-container border border-outline-variant text-on-surface-variant rounded-full text-xs font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Papers */}
              <div className="border-t border-outline-variant pt-6">
                <h4 className="font-label-sm text-xs text-outline uppercase tracking-wider font-bold mb-4">
                  Related Portfolio Papers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {interests[activeInterest].publications.map((pub, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-surface-container-low border border-outline-variant rounded-xl shadow-sm"
                    >
                      <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wider block mb-1">
                        {pub.type} • {pub.year}
                      </span>
                      <h5 className="font-headline-md text-xs md:text-sm font-bold text-primary leading-snug">
                        {pub.title}
                      </h5>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Link
                    href="/publications"
                    className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary font-bold transition-all"
                  >
                    View All Publications
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Directions Section */}
        <section className="mt-24 p-8 md:p-12 bg-primary rounded-3xl text-on-primary shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4 scale-150">
            <span className="material-symbols-outlined text-[300px]">insights</span>
          </div>

          <div className="max-w-3xl relative z-10">
            <span className="font-label-sm text-xs text-electric-cyan font-bold uppercase tracking-wider mb-2 block">
              Emerging Frontiers
            </span>
            <h2 className="font-display-lg text-2xl md:text-4xl font-extrabold text-on-primary mb-6">
              Future Research Directions
            </h2>
            <p className="font-body-lg text-sm md:text-base opacity-90 leading-relaxed mb-6">
              My ongoing research is expanding into how <strong>Generative AI and Large Language Models (LLMs)</strong> can be responsibly integrated within enterprise MIS platforms to automate structured reporting, anomaly flagging, and strategic advisory outputs. I am also investigating <strong>AI-driven cybersecurity frameworks</strong> that extend the capabilities of my patented threat-detection hardware — building predictive intrusion models that adapt to evolving network attack patterns in real time.
            </p>
            <p className="font-body-lg text-sm md:text-base opacity-90 leading-relaxed mb-8">
              In parallel, I am deepening my work on <strong>Sustainable MIS Design</strong> — exploring how AI-powered green analytics can be embedded within organizational information systems to reduce carbon footprint, improve supply chain transparency, and support ESG (Environmental, Social, Governance) compliance reporting across global enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-on-primary text-primary hover:bg-secondary hover:text-on-secondary px-6 py-3 rounded-lg font-body-md font-bold text-sm shadow-md transition-all duration-200"
              >
                Collaborate with Me
                <span className="material-symbols-outlined text-sm">group_add</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
