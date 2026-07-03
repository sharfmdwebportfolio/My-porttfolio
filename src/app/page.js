"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PatentModal from "@/components/PatentModal";
import ResearchDashboard from "@/components/ResearchDashboard";

export default function Home() {
  const [isPatentOpen, setIsPatentOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profile, setProfile] = useState({
    name: "Md Sharfuddin",
    title: "MBA in MIS | AI & Data Analytics Researcher | Business Analyst",
    subtitle: "Published Researcher | Patent Holder | Guest Lecturer",
    bio: "Bridging business strategy, intelligent information systems, and data-driven decision science. Specializing in machine learning and predictive analytics to optimize enterprise MIS frameworks.",
    location: "Los Angeles, CA",
    email: "sharfuddin.md50@yahoo.com",
    photoUrl: "/image 1.jpeg",
  });
  const [featuredPubs, setFeaturedPubs] = useState([
    {
      year: "2025",
      category: "Supply Chain",
      title: "Enhancing supply chain resilience across US regions using machine learning and logistics performance analytics",
      abstract: "Supply chain resilience using machine learning analytics to optimize logistical performance.",
    },
    {
      year: "2025",
      category: "MIS Focus",
      title: "Enhancing data reliability in management information systems through artificial intelligence driven validation and error detection models",
      abstract: "Proposes an automated data validation pipeline using outlier detection networks.",
    }
  ]);

  useEffect(() => {
    import("@/lib/firestore").then(({ getProfile, getPublications }) => {
      getProfile().then((data) => {
        if (data) setProfile((p) => ({ ...p, ...data }));
      }).catch(() => {});
      
      getPublications().then((data) => {
        if (data && data.length > 0) {
          // Sort by year desc and take top 2
          const sorted = [...data].sort((a, b) => (b.year || "").localeCompare(a.year || ""));
          setFeaturedPubs(sorted.slice(0, 2));
        }
      }).catch(() => {});
    }).catch(() => {});
  }, []);
  
  const keywords = [
    "Management Information Systems",
    "AI & Data Analytics Research",
    "Predictive Error Detection",
    "Decision Support Systems",
    "Data-Driven Business Solutions"
  ];

  useEffect(() => {
    let timer;
    const currentWord = keywords[textIndex];
    const typingSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % keywords.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? currentWord.substring(0, currentText.length - 1)
            : currentWord.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

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
                {profile.name}
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-headline-lg text-xl md:text-2xl lg:text-[25px] text-deep-navy leading-snug font-bold">
                  {profile.title}
                </h2>
                <h3 className="font-headline-md text-base md:text-lg text-secondary font-semibold">
                  {profile.subtitle}
                </h3>
                <div className="text-sm font-semibold text-on-surface-variant flex items-center gap-2 mt-1 min-h-[24px]">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0 animate-pulse"></span>
                  <span>Research Focus: <span className="text-secondary border-r-2 border-secondary pr-1 animate-pulse font-bold">{currentText}</span></span>
                </div>
              </div>
              <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                {profile.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                {profile.location && (
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-xl">location_on</span>
                    <span className="font-body-md text-sm md:text-base font-medium">{profile.location}</span>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-xl">mail</span>
                    <a href={`mailto:${profile.email}`} className="font-body-md text-sm md:text-base font-semibold hover:underline">
                      {profile.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/experience"
                  className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-body-md font-semibold hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-md flex items-center gap-2 hover:translate-x-1"
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${profile.name} Portrait`}
                  className="w-full h-full object-cover rounded-xl"
                  src={profile.photoUrl || "/image 1.jpeg"}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-xl flex flex-col gap-2.5 max-w-[250px] z-20 hover:scale-[1.03] transition-transform duration-300 hidden sm:flex">
                <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-1.5">
                  <span className="material-symbols-outlined text-secondary text-lg">insights</span>
                  <p className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">Research Impact</p>
                </div>
                <ul className="space-y-1.5 text-xs text-on-surface-variant font-semibold">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    15+ Publications
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    2 Patents (UK Approved)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Guest Lecturer
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Multiple Int. Conferences
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Data Analytics Excellence Award
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Research Interests Section */}
        <section className="py-16 md:py-24 bg-surface-container-low transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop space-y-12">
            <div className="max-w-3xl space-y-4 reveal-section">
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-primary font-bold">
                Research Interests &amp; Focus
              </h2>
              <div className="w-20 h-1 bg-secondary rounded-full"></div>
              <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed">
                My academic investigation bridges management methodologies and deep analytical technologies, aimed at making enterprise frameworks predictive, automated, and secure.
              </p>
            </div>

            {/* Biography & Research Interests Cards Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 reveal-section items-stretch">
              {/* Left Column: Biography */}
              <div className="lg:col-span-5 bg-white dark:bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="font-headline-lg text-xl font-bold text-primary mb-4">
                    Biography &amp; Academic Focus
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-4">
                    {profile.name} is an AI-driven MIS researcher and business analyst specializing in strategic IT alignment, machine learning-based decision engines, and data security. With an academic background bridging finance and management information systems, his research addresses critical bottlenecks in modern organizational workflows.
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-4">
                    His work focuses on implementing predictive analytics to drive sustainable consumer habits, constructing robust supply chain schedules, and mitigating cybersecurity threats. His recent UK-approved patent showcases his capacity to engineer hardware-level intrusion prevention systems integrated directly with enterprise MIS logs.
                  </p>
                </div>
                <div className="border-t border-outline-variant pt-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-secondary uppercase tracking-wider">
                    Fellow of ERU (FRAEL)
                  </span>
                  <span className="text-outline italic">
                    Active Researcher
                  </span>
                </div>
              </div>

              {/* Right Column: Research Interests List */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Artificial Intelligence", desc: "Machine learning integration, automated validation, neural fraud detection, and algorithm optimization.", icon: "psychology", color: "border-blue-500 text-blue-500 bg-blue-500/5" },
                  { title: "Management Information Systems", desc: "Enterprise MIS structural alignment, ERP log monitoring, and IT strategic synchronization.", icon: "settings_applications", color: "border-purple-500 text-purple-500 bg-purple-500/5" },
                  { title: "Data Analytics", desc: "Converting complex datasets into visual dashboards, indexing patterns, and driving corporate decisions.", icon: "analytics", color: "border-emerald-500 text-emerald-500 bg-emerald-500/5" },
                  { title: "Business Intelligence", desc: "Predictive reporting schemas, data warehousing, metadata integrity, and competitor analysis.", icon: "insights", color: "border-amber-500 text-amber-500 bg-amber-500/5" },
                  { title: "Predictive Analytics", desc: "Forecasting consumer habits, supply chain disruptions, system failures, and risk scenarios.", icon: "online_prediction", color: "border-rose-500 text-rose-500 bg-rose-500/5" },
                  { title: "Supply Chain Analytics", desc: "Applying regression model sets to optimize raw container flow, delivery pipelines, and warehouse safety.", icon: "inventory", color: "border-indigo-500 text-indigo-500 bg-indigo-500/5" },
                ].map((interest, i) => (
                  <div key={i} className="bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md hover:border-secondary hover:-translate-y-0.5 transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`material-symbols-outlined text-2xl p-2 rounded-lg border ${interest.color}`}>
                          {interest.icon}
                        </span>
                        <span className="text-[10px] text-outline uppercase tracking-wider font-bold">Research Area</span>
                      </div>
                      <h4 className="font-headline-md text-base font-bold text-deep-navy mb-2 group-hover:text-secondary transition-colors">
                        {interest.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {interest.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education Summary Section */}
        <section className="py-16 md:py-24 border-t border-surface-container-highest bg-surface-container-lowest transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="mb-12 reveal-section">
              <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">Background Summary</span>
              <h2 className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary">Foundations &amp; Credentials</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Experience Card */}
              <div className="bg-primary text-on-primary rounded-3xl p-8 md:p-10 shadow-xl flex flex-col justify-between reveal-section group relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform -translate-y-10 translate-x-10 scale-150">
                  <span className="material-symbols-outlined text-[200px]">work</span>
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 text-secondary-fixed-dim px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
                    <span className="material-symbols-outlined text-[16px]">business_center</span>
                    Professional Focus
                  </div>
                  <p className="text-on-primary/60 text-xs font-semibold mb-2">08/2025 &ndash; Present</p>
                  <h3 className="font-display-lg text-2xl md:text-3xl font-extrabold mb-3 group-hover:text-secondary-fixed transition-colors">Business Analyst</h3>
                  <p className="font-body-lg text-base md:text-lg font-bold text-on-primary/80 mb-6">UpSkill Consultancy, New York, USA</p>
                  <p className="font-body-md text-sm text-on-primary/70 leading-relaxed mb-6">
                    Spearheading AI-driven MIS implementations, optimizing organizational workflows, and designing predictive analytic dashboards to guide executive decision frameworks.
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-on-primary/10">
                  <Link href="/experience" className="inline-flex items-center gap-1.5 text-sm text-secondary-fixed-dim font-bold hover:underline group-hover:gap-2.5 transition-all">
                    Explore Career Roadmap
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Education Card */}
              <div className="bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between reveal-section group relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform -translate-y-10 translate-x-10 scale-150">
                  <span className="material-symbols-outlined text-[200px] text-secondary">school</span>
                </div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    Academic Credentials
                  </div>
                  <p className="text-secondary text-xs font-semibold mb-2">2023 &ndash; 2025</p>
                  <h3 className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary mb-3 group-hover:text-secondary transition-colors">MBA in MIS</h3>
                  <p className="font-body-lg text-base md:text-lg font-bold text-deep-navy mb-6">International American University, Los Angeles, USA</p>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
                    Specializing in Management Information Systems, data validation paradigms, and predictive forecasting pipelines. Researching intersections of artificial intelligence and strategic data structures.
                  </p>
                </div>
                <div className="relative z-10 pt-6 border-t border-outline-variant/60">
                  <Link href="/experience" className="inline-flex items-center gap-1.5 text-sm text-secondary font-bold hover:underline group-hover:gap-2.5 transition-all">
                    View Academic Credentials
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Featured Research & Patents Section */}
        <section className="py-16 md:py-24 bg-surface-container-low transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="mb-12 reveal-section">
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-primary font-bold">
                Featured Research &amp; Innovations
              </h2>
              <p className="text-on-surface-variant font-body-md mt-2">
                Core academic contributions and patented industrial technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Patent Card */}
              <div className="lg:col-span-7 bg-white dark:bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300 group reveal-section">
                <div>
                  <div className="flex justify-between items-start mb-6 gap-2">
                      UK Approved Patents
                    <span className="material-symbols-outlined text-4xl text-secondary opacity-40 group-hover:opacity-100 transition-opacity">
                      shield_lock
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-xl md:text-2xl font-bold text-primary mb-4">
                    Patented Innovations
                  </h3>
                  <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed mb-4">
                    <strong>1. Cyberattack Detection Device:</strong> An advanced threat-detection device operating at the network hardware level to monitor system logs and mitigate lateral movements.<br/>
                    <strong>2. Desktop Display Stand:</strong> An ergonomic display stand designed for electronic tablets and screens.
                  </p>
                  <p className="text-xs text-outline font-semibold">Design Registration Nos: 6471605, 6509489</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsPatentOpen(true)}
                    className="flex items-center gap-2 bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-body-md font-semibold hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-sm text-xs md:text-sm cursor-pointer"
                  >
                    View Schematic Schema
                    <span className="material-symbols-outlined text-sm">schema</span>
                  </button>
                  <a
                    href="https://www.registered-design.service.gov.uk/find"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-outline-variant text-on-surface hover:text-secondary hover:border-secondary hover:bg-surface-container-low px-5 py-2.5 rounded-lg font-body-md font-semibold transition-all text-xs md:text-sm"
                  >
                    Verify on UK Gov Portal
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>

              {/* Featured Papers List */}
              <div className="lg:col-span-5 bg-white dark:bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all duration-300 reveal-section">
                <div>
                  <h3 className="font-headline-md text-lg font-bold text-deep-navy mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">star</span>
                    Featured Publications
                  </h3>
                  <div className="space-y-6">
                    {featuredPubs.map((pub, idx) => (
                      <div key={pub.id || idx} className={idx > 0 ? "border-t border-outline-variant/60 pt-4" : ""}>
                        <span className="font-label-sm text-[10px] text-secondary font-bold uppercase tracking-wider">
                          {pub.category} • {pub.year}
                        </span>
                        <h4 className="font-headline-md text-sm md:text-base font-bold text-primary mt-1 mb-1 leading-tight line-clamp-2">
                          {pub.title}
                        </h4>
                        {pub.abstract ? (
                          <p className="text-xs text-on-surface-variant line-clamp-2">
                            {pub.abstract}
                          </p>
                        ) : pub.journal ? (
                          <p className="text-xs text-on-surface-variant line-clamp-2">
                            {pub.journal}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-outline-variant/60">
                  <Link
                    href="/publications"
                    className="inline-flex items-center gap-2 text-secondary hover:text-primary font-bold text-xs md:text-sm transition-colors"
                  >
                    View Academic Repository
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Achievements Section */}
        <section className="py-16 md:py-24 border-t border-surface-container-highest bg-surface-container-lowest transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="mb-12 text-center reveal-section">
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-primary font-bold">
                Key Achievements
              </h2>
              <p className="text-on-surface-variant font-body-md mt-2">
                Significant milestones in data analytics, academic research, and intellectual property.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-section">
              {/* Achievement 1 */}
              <div className="p-6 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-secondary hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-4xl mb-4 block">🏆</span>
                  <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-2">Data Analytics Excellence</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Honored with the Data Analytics Excellence Award (2025) for contributions to decision science and predictive systems.
                  </p>
                </div>
                <span className="text-[10px] text-outline font-semibold mt-4 block">Academic Year: 2025</span>
              </div>

              {/* Achievement 2 */}
              <div className="p-6 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-secondary hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-4xl mb-4 block">📜</span>
                  <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-2">UK Patents Approved</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Design registrations approved in 2025-2026 for cyberattack detection devices and electronic tablet stands.
                  </p>
                </div>
                <span className="text-[10px] text-outline font-semibold mt-4 block">IDs: 6471605, 6509489 | 2025-2026</span>
              </div>

              {/* Achievement 3 */}
              <div className="p-6 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-secondary hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-4xl mb-4 block">🎤</span>
                  <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-2">Invited Guest Lecture</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Delivered guest lectures to postgraduate scholars at Virscend University, California on database security patterns.
                  </p>
                </div>
                <span className="text-[10px] text-outline font-semibold mt-4 block">Virscend University, CA</span>
              </div>

              {/* Achievement 4 */}
              <div className="p-6 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-secondary hover:-translate-y-1 transition-all duration-300">
                <div>
                  <span className="text-4xl mb-4 block">📚</span>
                  <h3 className="font-headline-md text-base md:text-lg font-bold text-primary mb-2">16 Research Papers</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    16 research publications spanning international journals, Springer series, and global academic indexing platforms.
                  </p>
                </div>
                <span className="text-[10px] text-outline font-semibold mt-4 block">Published &amp; Indexed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Engagement Section */}
        <section className="py-16 md:py-24 border-t border-surface-container-highest bg-surface-container-low transition-colors duration-300">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="mb-12 reveal-section">
              <span className="font-label-sm text-xs text-secondary bg-secondary-fixed dark:bg-secondary/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                Academic Engagement
              </span>
              <h2 className="font-headline-lg text-2xl md:text-headline-lg text-primary font-bold mt-3">
                Invited Academic Lectures &amp; Presentations
              </h2>
            </div>

            <div className="bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 reveal-section flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-500 text-3xl">mic</span>
                  <div>
                    <h3 className="font-headline-lg text-lg md:text-xl font-bold text-primary">
                      Invited Guest Lecture
                    </h3>
                    <p className="text-sm font-semibold text-secondary">
                      Virscend University, Irvine, California, USA
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-outline-variant/60 pt-4 space-y-2">
                  <span className="text-[10px] md:text-xs font-bold text-outline uppercase tracking-wider block">
                    Lecture Based on Published Research Paper
                  </span>
                  <p className="font-headline-md text-base md:text-lg font-bold text-deep-navy leading-snug">
                    "Enhancing Data Reliability in Management Information Systems through Artificial Intelligence-Driven Validation and Error Detection Models"
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Invited by Virscend University to deliver a recorded guest lecture for MBA students based on my published research examining how Artificial Intelligence can enhance data reliability through automated validation and error detection mechanisms within Management Information Systems.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-fit flex flex-col gap-4 bg-surface-container-low border border-outline-variant/60 p-6 rounded-xl min-w-[280px]">
                <h4 className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider border-b border-outline-variant/60 pb-2">
                  Lecture Details
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Institution:</span>
                    <span className="font-semibold text-right">Virscend University, Irvine, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Target Class:</span>
                    <span className="font-semibold text-right">MBA (MIS Department)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Format:</span>
                    <span className="font-semibold text-right">Recorded Guest Lecture</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-medium">Core Subject:</span>
                    <span className="font-semibold text-right">AI &amp; Data Reliability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Connections Section */}
        <section className="py-12 border-t border-surface-container-highest">
          <div className="max-w-max-width mx-auto px-4 md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-center">
              {/* Research Connections */}
              <div className="md:col-span-2 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 reveal-section">
                <div className="flex flex-col gap-2">
                  <h3 className="font-headline-md text-lg font-bold text-primary">Connect with my Research</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Access open research profiles and academic databases.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {/* Google Scholar Link */}
                  <a
                    href="https://scholar.google.com/citations?hl=en&authuser=3&user=SMQ9e18AAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-highest hover:scale-110 shadow-sm transition-all duration-300 group"
                    title="Google Scholar"
                  >
                    <svg className="w-6 h-6 fill-current text-on-surface-variant group-hover:text-[#4285F4] transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 2L1 7l11 5 9-4.09V14c0 .55.45 1 1 1s1-.45 1-1V7.82L12 2zm1.88 9.59c-.56-.16-1.15.15-1.32.7-.22.68-.78 1.15-1.46 1.25-1.1.15-2.07-.63-2.17-1.73-.08-.94.6-1.76 1.54-1.89a1.996 1.996 0 0 1 2.19 1.4c.12.39.48.65.88.65.62 0 1.07-.6 0.88-1.2A3.992 3.992 0 0 0 13.38 8c-2.47.33-4.22 2.6-3.89 5.07.29 2.17 2.12 3.82 4.31 3.82 1.63 0 3.03-.99 3.63-2.42.23-.55-.07-1.17-.63-1.33l-1.68-.42z"/>
                    </svg>
                  </a>

                  {/* ResearchGate Link */}
                  <a
                    href="https://www.researchgate.net/profile/Md-Sharfuddin?ev=hdr_xprf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-highest hover:scale-110 shadow-sm transition-all duration-300 group"
                    title="ResearchGate"
                  >
                    <svg className="w-6 h-6 fill-current text-on-surface-variant group-hover:text-[#00CCBB] transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/>
                    </svg>
                  </a>

                  {/* ORCID Link */}
                  <a
                    href="https://orcid.org/my-orcid?orcid=0009-0006-5783-9992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-highest hover:scale-110 shadow-sm transition-all duration-300 group"
                    title="ORCID"
                  >
                    <svg className="w-6 h-6 fill-current text-on-surface-variant group-hover:text-[#A6CE39] transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm.797 3.328v9.916H6.572V7.706h1.594zm6.656 5.306c0 1.959-1.2 3.197-3.084 3.197h-2.316V7.706h2.512c1.781 0 2.887 1.153 2.887 3.197v2.131zm-1.612-2.1c0-.984-.506-1.547-1.444-1.547H10.15v5.194h1.097c.938 0 1.444-.563 1.444-1.547v-2.1z"/>
                    </svg>
                  </a>

                  {/* LinkedIn Link */}
                  <a
                    href="https://www.linkedin.com/in/md-sharfuddin96/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-highest hover:scale-110 shadow-sm transition-all duration-300 group"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6 fill-current text-on-surface-variant group-hover:text-[#0A66C2] transition-colors duration-300" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
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
