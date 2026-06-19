"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Research() {
  const [activeInterest, setActiveInterest] = useState("predictive");

  useEffect(() => {
    document.title = "Research Interests | Md Sharfuddin";
  }, []);

  const interests = {
    predictive: {
      title: "Predictive Analytics",
      icon: "analytics",
      color: "from-blue-600 to-indigo-700",
      tagline: "Forecasting market trends, consumer behaviour, and logistics via machine learning.",
      overview: "Harnessing predictive modeling to address enterprise challenges, utilizing regression modeling, deep learning classifiers, and time-series analysis to transform historical logs into forward-looking foresight.",
      questions: [
        "How can AI-driven transparency models accurately predict and stimulate sustainable green purchase decisions?",
        "Can neural networks reliably forecast container scheduling delays to build responsive supply chain reserves?"
      ],
      methodology: ["Deep Learning Classifiers", "Regression Analysis", "Random Forest Algorithms", "TensorFlow & Python Tools"],
      publications: [
        { title: "AI-Driven Sustainable Consumer Behaviour", type: "Journal Paper", year: "2026" },
        { title: "Enhancing supply chain resilience using ML", type: "Journal Paper", year: "2025" }
      ]
    },
    dss: {
      title: "Decision Support Systems (DSS)",
      icon: "settings_suggest",
      color: "from-emerald-600 to-teal-700",
      tagline: "Designing cognitive dashboards to empower executive and management choices.",
      overview: "Exploring the backend architectures and frontend visualizations of modern Decision Support Systems. Investigating how complex multi-source database queries can be aggregated in real-time to facilitate strategic planning.",
      questions: [
        "What data architectures best support real-time resource allocations in server systems?",
        "How can automated outlier-detection pipelines safeguard data reliability within organizational decision loops?"
      ],
      methodology: ["Heuristic Scheduling Models", "Outlier Validation Pipelines", "Enterprise Warehousing", "API Integration Protocols"],
      publications: [
        { title: "Optimizing Resource Allocation in MIS", type: "Journal Paper", year: "2025" },
        { title: "Enhancing data reliability in MIS through AI", type: "Journal Paper", year: "2025" }
      ]
    },
    alignment: {
      title: "Strategic Alignment in MIS",
      icon: "hub",
      color: "from-amber-600 to-orange-700",
      tagline: "Connecting corporate information infrastructures directly to business strategy.",
      overview: "Analyzing the synergy between database structures, Enterprise Resource Planning (ERP) integrations, and high-level corporate visions to ensure digital tools actively maximize business value and operational speed.",
      questions: [
        "What frameworks ensure zero-latency synergy when integrating legacy ERP systems with modern MIS platforms?",
        "How does system alignment impact long-term corporate agility and data integrity?"
      ],
      methodology: ["Universal Database API Standards", "Strategic Fit Models", "ERP Infrastructure Auditing", "Organizational Synergy Mapping"],
      publications: [
        { title: "Integration of Universal MIS", type: "Journal Paper", year: "2024" },
        { title: "Smart MIS for Data-Driven Organizational Excellence", type: "Journal Paper", year: "2025" }
      ]
    },
    human: {
      title: "Human Factors in MIS",
      icon: "groups",
      color: "from-rose-600 to-pink-700",
      tagline: "Bridging system efficiency with employee motivation and user adoption.",
      overview: "Investigating the human element of technology systems. Focuses on employee motivation, UI ergonomics, and user training strategies that drive system adoption and prevent organizational friction.",
      questions: [
        "How do motivational metrics in engineering projects correspond with digital task-scheduling interfaces?",
        "What UI dashboards design principles optimize data literacy among executives?"
      ],
      methodology: ["Usability & Human-Computer Interaction (HCI)", "Motivational Scheduling Matrix", "User Literacy Audits", "Surveys & Quantitative Analysis"],
      publications: [
        { title: "Employee Motivation in Construction Engineering", type: "Journal Paper", year: "2025" },
        { title: "AI-Driven MIS for Social Equity", type: "Journal Paper", year: "2024" }
      ]
    }
  };

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
            <p className="font-body-lg text-sm md:text-base opacity-90 leading-relaxed mb-8">
              Moving forward, my research is expanding to explore how **Generative Artificial Intelligence (GenAI)** and automated large language models can be securely integrated within enterprise DSS dashboards. Additionally, I am investigating **Sustainable Decision Paradigms** in global supply chains to reduce carbon footprints via real-time resource alignment and green MIS transparency frameworks.
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
