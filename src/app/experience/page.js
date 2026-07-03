"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Experience() {
  const [expandedJob, setExpandedJob] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState("SQL");

  const [experiences, setExperiences] = useState([
    {
      id: "upskill",
      date: "08/2025 – Present",
      title: "Business Analyst",
      company: "UpSkill Consultancy",
      location: "Remote, NY",
      active: true,
      bullets: [
        "Leveraging AI-driven MIS frameworks to optimize organizational workflows and decision cycles.",
        "Conducting predictive analytics to support data-driven decision-making processes.",
        "Developing business intelligence reporting using SQL and Tableau.",
      ],
      achievements: [
        "Integrated machine learning predictors that enhanced forecasting metrics by 14%.",
        "Streamlined corporate reporting architecture, saving an average of 6 hours of weekly manual reporting tasks.",
      ],
    },
    {
      id: "mainwins",
      date: "01/2025 – 04/2025",
      title: "IT Support Intern",
      company: "Mainwins Inc.",
      location: "Remote, TX",
      active: false,
      bullets: [
        "Supported enterprise MIS infrastructures and ensured database/network reliability.",
        "Assisted in technical troubleshooting and system maintenance protocols.",
      ],
      achievements: [
        "Resolved 90%+ system latency issues reported during the transition to remote setups.",
        "Automated backup script verifications using terminal pipelines, improving system audit logs.",
      ],
    },
    {
      id: "synergy",
      date: "2021 – 2023",
      title: "Sales & Communication Specialist",
      company: "Synergy Solutions",
      location: "Dhaka, Bangladesh",
      active: false,
      bullets: [
        "Managed client communications and developed strategic business proposals.",
        "Optimized sales pipelines through CRM-driven analytics.",
      ],
      achievements: [
        "Increased inbound contract closure rate by 18% through data-backed client pitch books.",
      ],
    },
    {
      id: "aci",
      date: "2019 – 2020",
      title: "Operations Executive",
      company: "ACI Logistics Limited",
      location: "Dhaka, Bangladesh",
      active: false,
      bullets: [
        "Streamlined retail operational workflows and inventory monitoring systems.",
      ],
      achievements: [
        "Collaborated with retail data teams to pinpoint stock discrepancies, reducing waste margins.",
      ],
    },
  ]);

  const [education, setEducation] = useState([
    {
      date: "2023 – 2025",
      degree: "MBA in MIS",
      school: "International American University (IAU)",
      location: "Los Angeles, CA",
      active: true,
      highlights: [
        "Specialized in Management Information Systems & Business Analytics",
        "Focused on AI-driven validation frameworks and decision support systems",
        "Completed coursework in Enterprise Architecture, Big Data Analytics, and Strategic MIS"
      ]
    },
    {
      date: "2016 – 2021",
      degree: "BBA in Finance",
      school: "National University of Bangladesh",
      location: "Dhaka, Bangladesh",
      active: false,
      highlights: [
        "Focused on Corporate Finance, Investment Portfolio Management, and Financial Analysis",
        "Conducted thesis modeling on stock portfolio optimizations using quantitative metrics",
        "Completed coursework in Business Statistics, Managerial Accounting, and Financial Risk Management"
      ]
    },
  ]);

  const [skillsData, setSkillsData] = useState({
    SQL: "Developed complex queries, subqueries, and table joins to extract insights from transactional databases. Experience with query optimization.",
    Python: "Used for data analysis, cleaning with Pandas/NumPy, and building predictive machine learning models in academic/professional research.",
    "R Language": "Applied for research statistics, hypothesis testing, regression models, and plotting academic publications graphs.",
    "Hypothesis Testing": "Utilized in research papers to validate variables such as AI-driven consumer behavior and green marketing indicators.",
    "Google BigQuery": "Handled massive data analysis queries and set up serverless warehouses to analyze public datasets.",
    "Power BI": "Created dynamic dashboards, dashboards on sales patterns, and linked metrics charts for business administration.",
    Tableau: "Built premium interactive reports for MIS stakeholders, visualizing regression and predictive forecasting outputs.",
    "KPI Measurement": "Formulated performance indicators for construction employee metrics and organizational logistics.",
  });

  const [skillGroups, setSkillGroups] = useState([
    {
      category: "Programming & Analysis",
      items: ["SQL", "Python", "R Language", "Hypothesis Testing"],
    },
    {
      category: "Data Tools & BI",
      items: ["Google BigQuery", "Power BI", "Tableau", "KPI Measurement"],
    },
  ]);

  const [memberships, setMemberships] = useState([
    {
      title: "IEEE Member",
      org: "Institute of Electrical and Electronics Engineers",
      icon: "workspace_premium",
    },
    {
      title: "ISDSA Member",
      org: "International Society for Data Science and Analytics",
      icon: "verified",
    },
  ]);

  const [awards, setAwards] = useState([
    {
      title: "Data Analytics Excellence Award (2025)",
      org: "Academic Year: 2025",
      icon: "emoji_events"
    },
    {
      title: "Royal Golden Fellow (FRAEL)",
      org: "Fellow of ERU",
      icon: "military_tech"
    }
  ]);

  useEffect(() => {
    import("@/lib/firestore").then(({ getExperiences, getEducation, getSkills, getMemberships, getAwards }) => {
      getExperiences().then((data) => {
        if (data && data.length > 0) {
          // Format bullet strings to arrays if saved as comma/newline separated in admin dashboard
          const formatted = data.map((exp) => {
            let bullets = exp.bullets || [];
            if (typeof bullets === "string") {
              bullets = bullets.split("\n").map(b => b.trim()).filter(Boolean);
            }
            let achievements = exp.achievements || [];
            if (typeof achievements === "string") {
              achievements = achievements.split("\n").map(a => a.trim()).filter(Boolean);
            }
            return {
              id: exp.id,
              date: exp.date || "",
              title: exp.title || "",
              company: exp.company || "",
              location: exp.location || "",
              active: exp.active || false,
              bullets,
              achievements
            };
          });
          setExperiences(formatted);
        }
      }).catch(() => {});

      getEducation().then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((edu) => {
            let highlights = edu.highlights || [];
            if (typeof highlights === "string") {
              highlights = highlights.split("\n").map(h => h.trim()).filter(Boolean);
            }
            return {
              date: edu.date || "",
              degree: edu.degree || "",
              school: edu.school || "",
              location: edu.location || "",
              active: edu.active || false,
              highlights
            };
          });
          setEducation(formatted);
        }
      }).catch(() => {});

      getSkills().then((data) => {
        if (data && data.skillGroups && data.skillsData) {
          setSkillGroups(data.skillGroups);
          setSkillsData(data.skillsData);
          if (data.skillGroups.length > 0 && data.skillGroups[0].items.length > 0) {
            setSelectedSkill(data.skillGroups[0].items[0]);
          }
        }
      }).catch(() => {});

      getMemberships().then((data) => {
        if (data && data.length > 0) {
          setMemberships(data.map(m => ({
            title: m.title || "",
            org: m.org || "",
            icon: m.icon || "workspace_premium"
          })));
        }
      }).catch(() => {});

      getAwards().then((data) => {
        if (data && data.length > 0) {
          setAwards(data.map(a => ({
            title: a.title || "",
            org: a.org || "",
            icon: a.icon || "emoji_events"
          })));
        }
      }).catch(() => {});
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface transition-colors duration-300">
      <Header />

      <main className="max-w-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-20 w-full flex-grow">
        {/* Title Section */}
        <section className="mb-12 md:mb-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="font-display-lg text-4xl md:text-display-lg text-primary font-extrabold mb-4 tracking-tight">
              Professional Experience &amp; Expertise
            </h1>
            <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Bridging business strategy and intelligent information systems through data-driven decision science and machine learning.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary px-6 py-3 rounded-lg font-body-md font-semibold shrink-0 shadow-md self-start sm:self-center transition-all duration-200"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Print Resume
          </button>
        </section>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Education & Experience */}
          <div className="lg:col-span-7 space-y-16">
            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary text-2xl font-semibold">school</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg text-primary font-bold">Academic Education</h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-6 md:p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm hover:border-secondary hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform translate-y-2 translate-x-2 scale-110">
                      <span className="material-symbols-outlined text-8xl text-secondary">school</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <span
                        className={`font-label-sm text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider w-fit ${
                          edu.active ? "text-secondary bg-secondary-fixed" : "text-on-surface-variant bg-surface-variant"
                        }`}
                      >
                        {edu.date}
                      </span>
                      <p className="font-body-md text-xs text-outline font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {edu.location}
                      </p>
                    </div>
                    <h3 className="font-headline-md text-lg md:text-xl font-bold text-deep-navy mb-1 group-hover:text-secondary transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="font-body-md text-sm md:text-base font-bold text-primary mb-4">{edu.school}</p>
                    
                    <div className="border-t border-outline-variant/60 pt-4 mt-2">
                      <h4 className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2.5">Academic Focus &amp; Coursework</h4>
                      <ul className="space-y-2">
                        {edu.highlights.map((hl, i) => (
                          <li key={i} className="text-xs text-on-surface-variant flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5"></span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Academic Engagement & Lectures */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary text-2xl font-semibold">mic</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg text-primary font-bold">Academic Engagement &amp; Lectures</h2>
              </div>
              <div className="bg-white dark:bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-xl shadow-sm space-y-4 hover:border-secondary transition-colors">
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-outline-variant/60 pb-3">
                  <div>
                    <h3 className="font-headline-md text-lg font-bold text-deep-navy">Invited Guest Lecture</h3>
                    <p className="font-body-md text-sm font-semibold text-secondary">Virscend University, Irvine, California, USA</p>
                  </div>
                  <span className="font-label-sm text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider text-secondary bg-secondary-fixed">
                    MBA (MIS Department)
                  </span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] md:text-xs font-bold text-outline uppercase tracking-wider block">
                    Lecture Based on Published Research Paper
                  </span>
                  <h4 className="font-headline-md text-sm md:text-base font-bold text-primary italic leading-snug">
                    "Enhancing Data Reliability in Management Information Systems through Artificial Intelligence-Driven Validation and Error Detection Models"
                  </h4>
                  <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed pt-1">
                    Invited by Virscend University to deliver a recorded guest lecture for MBA students based on my published research examining how Artificial Intelligence can enhance data reliability through automated validation and error detection mechanisms within Management Information Systems.
                  </p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary text-2xl font-semibold">work</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg text-primary font-bold">
                  Professional Journey
                </h2>
              </div>
              <div className="space-y-0">
                {experiences.map((exp) => (
                  <div key={exp.id} className="timeline-item flex gap-6 pb-10 relative">
                    <div className="timeline-dot relative z-10 flex-shrink-0">
                      <div
                        className={`w-4 h-4 rounded-full border-4 border-surface-container-lowest ${
                          exp.active ? "bg-secondary" : "bg-outline-variant"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-grow bg-white dark:bg-surface-container-lowest border border-outline-variant p-6 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <span
                          className={`font-label-sm text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                            exp.active
                              ? "text-secondary bg-secondary-fixed"
                              : "text-on-surface-variant bg-surface-variant"
                          }`}
                        >
                          {exp.date}
                        </span>
                        <span className="text-xs text-outline font-semibold">{exp.location}</span>
                      </div>
                      <h3 className="font-headline-md text-lg font-bold text-deep-navy mb-1">
                        {exp.title}
                      </h3>
                      <p className="font-body-md text-sm font-semibold text-secondary mb-4">
                        {exp.company}
                      </p>
                      
                      <ul className="space-y-2 text-on-surface-variant text-xs md:text-sm list-disc pl-5 leading-relaxed mb-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>

                      {/* Expandable Achievements */}
                      {exp.achievements && (
                        <div className="border-t border-outline-variant pt-4">
                          <button
                            onClick={() => setExpandedJob(expandedJob === exp.id ? null : exp.id)}
                            className="flex items-center gap-1 text-xs text-secondary font-bold hover:text-primary transition-colors focus:outline-none"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {expandedJob === exp.id ? "expand_less" : "expand_more"}
                            </span>
                            {expandedJob === exp.id ? "Hide Key Achievements" : "View Key Achievements"}
                          </button>

                          {expandedJob === exp.id && (
                            <div className="mt-3 bg-surface-container-low p-4 rounded-lg border border-outline-variant animate-in slide-in-from-top duration-200">
                              <h4 className="font-label-sm text-[10px] text-primary uppercase font-bold tracking-wider mb-2">
                                Measurable Achievements:
                              </h4>
                              <ul className="space-y-1.5 text-xs text-on-surface-variant list-none">
                                {exp.achievements.map((ach, i) => (
                                  <li key={i} className="flex gap-2 items-start">
                                    <span className="text-secondary font-bold">•</span>
                                    <span>{ach}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Skills & Memberships */}
          <div className="lg:col-span-5 space-y-12">
            {/* Core Skills & Interactive Detailer */}
            <section className="bg-surface-gray p-6 md:p-8 rounded-xl border border-outline-variant space-y-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl">terminal</span>
                <h2 className="font-headline-lg text-xl md:text-headline-lg text-primary font-bold">Core Skills</h2>
              </div>
              
              <div className="space-y-6">
                {skillGroups.map((group, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="font-label-sm text-xs text-primary font-bold uppercase tracking-widest">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => setSelectedSkill(item)}
                          className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all duration-200 ${
                            selectedSkill === item
                              ? "bg-secondary text-on-secondary shadow-md scale-105"
                              : "bg-surface-container-lowest text-on-surface border border-outline-variant hover:border-secondary"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Description Display */}
              {selectedSkill && (
                <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-lg space-y-2 shadow-inner animate-in fade-in duration-200">
                  <h4 className="font-headline-md text-sm font-bold text-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    {selectedSkill} Application
                  </h4>
                  <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {skillsData[selectedSkill]}
                  </p>
                </div>
              )}
            </section>

            {/* Memberships */}
            <section className="bg-primary text-on-primary p-6 md:p-8 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-secondary-fixed text-2xl">groups</span>
                  <h2 className="font-headline-lg text-xl md:text-headline-lg font-bold">Professional Memberships</h2>
                </div>
                <div className="space-y-6">
                  {memberships.map((memb, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary-fixed text-xl">{memb.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-body-md font-bold text-sm md:text-base">{memb.title}</h4>
                        <p className="text-on-primary/75 text-xs mt-1 leading-relaxed">{memb.org}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Honors Section */}
            <section className="p-6 md:p-8 border border-outline-variant rounded-xl bg-white dark:bg-surface-container-lowest">
              <h3 className="font-headline-md text-lg font-bold text-deep-navy mb-6">Recent Honors</h3>
              <div className="space-y-4">
                {awards.map((award, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="text-secondary shrink-0">
                      <span className="material-symbols-outlined text-xl">{award.icon || "emoji_events"}</span>
                    </div>
                    <div>
                      <p className="font-body-md text-xs md:text-sm text-on-surface-variant font-bold">
                        {award.title}
                      </p>
                      {award.org && (
                        <p className="text-[10px] text-outline font-semibold">
                          {award.org}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
