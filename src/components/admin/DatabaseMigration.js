"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, setDoc, addDoc } from "firebase/firestore";

export default function DatabaseMigration() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { text: message, type, time: new Date().toLocaleTimeString() }]);
  };

  const clearCollection = async (collectionName) => {
    addLog(`Clearing collection: "${collectionName}"...`, "pending");
    const querySnapshot = await getDocs(collection(db, collectionName));
    const deletePromises = querySnapshot.docs.map((docSnapshot) => 
      deleteDoc(doc(db, collectionName, docSnapshot.id))
    );
    await Promise.all(deletePromises);
    addLog(`Cleared collection: "${collectionName}".`, "success");
  };

  const runMigration = async () => {
    if (!confirm("Are you sure you want to clear the entire Firestore database and reload all default data? This action is irreversible.")) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setLogs([]);
    addLog("Starting database migration...", "info");

    try {
      // 1. Profile
      addLog("Seeding profile document...", "pending");
      const defaultProfile = {
        name: "Md Sharfuddin",
        title: "MBA in MIS | AI & Data Analytics Researcher | Business Analyst",
        subtitle: "Published Researcher | Patent Holder | Guest Lecturer",
        bio: "Bridging business strategy, intelligent information systems, and data-driven decision science. Specializing in machine learning and predictive analytics to optimize enterprise MIS frameworks.",
        location: "Los Angeles, CA",
        email: "sharfuddin.md50@yahoo.com",
        phone: "+1 (213) 636-2680",
        photoUrl: "/image 1.jpeg",
        cvLink: "",
      };
      await setDoc(doc(db, "site", "profile"), defaultProfile);
      addLog("Seeded profile document.", "success");

      // 2. Skills
      addLog("Seeding skills document...", "pending");
      const defaultSkills = {
        skillsData: {
          SQL: "Developed complex queries, subqueries, and table joins to extract insights from transactional databases. Experience with query optimization.",
          Python: "Used for data analysis, cleaning with Pandas/NumPy, and building predictive machine learning models in academic/professional research.",
          "R Language": "Applied for research statistics, hypothesis testing, regression models, and plotting academic publications graphs.",
          "Hypothesis Testing": "Utilized in research papers to validate variables such as AI-driven consumer behavior and green marketing indicators.",
          "Google BigQuery": "Handled massive data analysis queries and set up serverless warehouses to analyze public datasets.",
          "Power BI": "Created dynamic dashboards, dashboards on sales patterns, and linked metrics charts for business administration.",
          Tableau: "Built premium interactive reports for MIS stakeholders, visualizing regression and predictive forecasting outputs.",
          "KPI Measurement": "Formulated performance indicators for construction employee metrics and organizational logistics.",
        },
        skillGroups: [
          {
            category: "Programming & Analysis",
            items: ["SQL", "Python", "R Language", "Hypothesis Testing"],
          },
          {
            category: "Data Tools & BI",
            items: ["Google BigQuery", "Power BI", "Tableau", "KPI Measurement"],
          },
        ]
      };
      await setDoc(doc(db, "site", "skills"), defaultSkills);
      addLog("Seeded skills document.", "success");

      // 3. Publications
      await clearCollection("publications");
      const defaultPublications = [
        {
          year: "2025",
          category: "Supply Chain",
          title: "Enhancing supply chain resilience across US regions using machine learning and logistics performance analytics",
          journal: "International Journal of Applied Mathematics (IJAM) - In Press",
          authors: "M Sharfuddin, P Choudhury",
          abstract: "Supply chain resilience using machine learning analytics to optimize logistical performance.",
          link: "https://ijamjournal.org/ijam/publication/index.php/ijam/article/view/225"
        },
        {
          year: "2025",
          category: "MIS Focus",
          title: "Employee Motivation and Behavior in Construction Engineering Projects",
          journal: "International Journal of Social Science and Economic Research 10 (1), 342-372",
          authors: "M Sharfuddin, M Halimuzzaman, F Akter, KN Dey, P Saha",
          abstract: "Investigates human resource scheduling and motivational metrics in infrastructure developments.",
          link: "https://ijsser.org/more2025.php?id=26"
        },
        {
          year: "2023",
          category: "Sustainability",
          title: "Management information systems driven green marketing intelligence for sustainable consumer engagement",
          journal: "Journal of Primeasia 4 (1), 1-7",
          authors: "M Sharfuddin, SK Papia",
          abstract: "Research modeling consumer response to eco-labels and green analytics studies.",
          link: "https://primeasia.edu.bd/journal/index.php/paj/article/view/101"
        },
        {
          year: "2025",
          category: "MIS Focus",
          title: "Enhancing data reliability in management information systems through artificial intelligence driven validation and error detection models",
          journal: "Journal of Ai ML DL 1 (1), 1-8",
          authors: "M Sharfuddin, P Choudhury",
          abstract: "Proposes an automated data validation pipeline using outlier detection networks.",
          link: "https://jaimldl.com/index.php/jaimldl/article/view/1"
        },
        {
          year: "2023",
          category: "MIS Focus",
          title: "Management information systems in contemporary business: Prospects, strategic advantages, and future challenges",
          journal: "Business and Social Sciences 1 (1), 1-7",
          authors: "P Choudhury, M Sharfuddin",
          abstract: "Examines critical success factors and strategic advantages when deploying MIS.",
          link: "https://bssjournal.com/index.php/bss/article/view/1"
        },
        {
          year: "2022",
          category: "MIS Focus",
          title: "Strategic Healthcare Service Optimization and Overcoming Obstacles through Management Information Systems",
          journal: "Journal of Primeasia 3 (1), 1-8",
          authors: "P Choudhury, M Sharfuddin",
          abstract: "Optimization of healthcare services via robust management information systems.",
          link: "https://primeasia.edu.bd/journal/index.php/paj/article/view/85"
        },
        {
          year: "2025",
          category: "MIS Focus",
          title: "Optimizing Resource Allocation and Operational Efficiency in Management Information Systems Using Predictive Machine Learning",
          journal: "Journal of Ai ML DL 1 (1), 1-8",
          authors: "P Choudhury, M Sharfuddin",
          abstract: "Presents a dynamic heuristic model for server load and storage balancing across cloud-based systems.",
          link: "https://jaimldl.com/index.php/jaimldl/article/view/2"
        },
        {
          year: "2025",
          category: "MIS Focus",
          title: "Smart Management Information Systems for Data-Driven Organizational Excellence: Challenges and Multi-Sector Empirical Insights",
          journal: "Pacific Journal of Business Innovation and Strategy 2 (4), 183-191",
          authors: "M Sharfuddin, P Choudhury",
          abstract: "Challenges and empirical insights of smart MIS deployments for organizational excellence.",
          link: "https://pjbis.com/index.php/pjbis/article/view/36"
        },
        {
          year: "2022",
          category: "Sustainability",
          title: "Integrating Management Information Systems in Marketing: A Survey-Based Analysis of Consumer Engagement and Business Growth through Data Analytics",
          journal: "Pathfinder of Research 3 (1), 60-72",
          authors: "SK Papia, M Sharfuddin, K Begum",
          abstract: "Survey-based analysis of consumer engagement driven by MIS in marketing.",
          link: "https://pathfinderresearch.org/index.php/por/article/view/28"
        },
        {
          year: "2024",
          category: "MIS Focus",
          title: "Integration of Universal Management Information Systems in the Extended Organization Solving Fundamental Challenges",
          journal: "Research Sustainability 1 (3), 1-12",
          authors: "M Sharfuddin, P Choudhury, KM Ahmed",
          abstract: "Outlines a universal database API protocol standard for heterogeneous ERP databases.",
          link: "https://researchsustainability.org/index.php/rs/article/view/12"
        },
        {
          year: "2024",
          category: "MIS Focus",
          title: "Artificial Intelligence Driven Management Information Systems for Enhancing Social Equity, Economic Sustainability and Managing Costs and Challenges",
          journal: "Research Sustainability 1 (01), 37-50",
          authors: "P Choudhury, M Sharfuddin, KM Ahmed, K Begum",
          abstract: "A peer-reviewed critique on using bias-aware machine learning frameworks within MIS.",
          link: "https://researchsustainability.org/index.php/rs/article/view/3"
        },
        {
          year: "2026",
          category: "MIS Focus",
          title: "Leveraging artificial intelligence in business decision-making: A study on predictive analytics in retail management",
          journal: "Moving Towards Sustainable Businesses and Developing More Resilient Economies (181-188)",
          authors: "Md Sharfuddin, Nazmul Islam, Omor Fahad",
          abstract: "Study on predictive analytics in retail management utilizing artificial intelligence.",
          link: "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003647300-22/leveraging-artificial-intelligence-business-decision-making-study-predictive-analytics-retail-management-md-sharfuddin-nazmul-islam-omor-fahad"
        },
        {
          year: "2025",
          category: "MIS Focus",
          title: "Data-Driven Management Information Systems Leveraging Artificial Intelligence for Sustainable Business Performance and Operational Efficiency",
          journal: "Data-Driven Management Information Systems Leveraging Artificial Intelligence",
          authors: "MS Md Sharfuddin, PC Proggo Choudhury, AIH Ahamed Ismail Hossain",
          abstract: "Exploring how data-driven MIS leverages AI for sustainable performance and efficiency.",
          link: "https://semantjournals.org/index.php/AJBP/article/view/3358"
        },
        {
          year: "2025",
          category: "MIS Focus",
          title: "Artificial Intelligence Driven MIS for Decision Making and Superior Organizational Performance",
          journal: "Artificial Intelligence Driven MIS for Decision Making and Superior Organizational Performance",
          authors: "MS Md Sharfuddin",
          abstract: "Research on AI-driven management information systems facilitating decision making and superior performance.",
          link: "https://repository.antispubmed.com/artikel/18334/advances-in-compiler-construction-for-adaptive-computers"
        },
        {
          year: "2026",
          category: "Patent",
          title: "Desktop display stand for electronic tablets and screens",
          journal: "UK Patent Registration (6509489)",
          authors: "M Sharfuddin, MA Rahman, BMT Haque, M Karmakar, MA Azam, ...",
          abstract: "Ergonomic desktop display stand engineered to securely house and display electronic tablets and touchscreen devices.",
          link: "https://www.gov.uk/search-for-patent"
        },
        {
          year: "2025",
          category: "Patent",
          title: "Cyberattack Detection and Prevention Device",
          journal: "UK Patent Registration (6471605)",
          authors: "MR Buiya, MMB Reza, S Hossain, MK Rahman, O Fahad, M Sharfuddin",
          abstract: "A cutting-edge threat-detection device operating at the network hardware level to prevent data breaches.",
          link: "https://orcid.org/0009-0006-5783-9992"
        }
      ];
      addLog("Seeding publications...", "pending");
      for (const pub of defaultPublications) {
        await addDoc(collection(db, "publications"), pub);
      }
      addLog("Seeded publications successfully.", "success");

      // 4. Research interests
      await clearCollection("research_interests");
      const defaultInterests = {
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
          publications: []
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
          publications: []
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
          publications: []
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
          publications: []
        }
      };
      addLog("Seeding research interests...", "pending");
      for (const [key, value] of Object.entries(defaultInterests)) {
        await setDoc(doc(db, "research_interests", key), value);
      }
      addLog("Seeded research interests successfully.", "success");

      // 5. Experiences
      await clearCollection("experiences");
      const defaultExperiences = [
        {
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
        }
      ];
      addLog("Seeding experiences...", "pending");
      for (const exp of defaultExperiences) {
        await addDoc(collection(db, "experiences"), exp);
      }
      addLog("Seeded experiences successfully.", "success");

      // 6. Education
      await clearCollection("education");
      const defaultEducation = [
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
        }
      ];
      addLog("Seeding education...", "pending");
      for (const edu of defaultEducation) {
        await addDoc(collection(db, "education"), edu);
      }
      addLog("Seeded education successfully.", "success");

      // 7. Conferences
      await clearCollection("conferences");
      const defaultConferences = [
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
        }
      ];
      addLog("Seeding conferences...", "pending");
      for (const conf of defaultConferences) {
        await addDoc(collection(db, "conferences"), conf);
      }
      addLog("Seeded conferences successfully.", "success");

      // 8. Awards
      await clearCollection("awards");
      const defaultAwards = [
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
      ];
      addLog("Seeding awards...", "pending");
      for (const awd of defaultAwards) {
        await addDoc(collection(db, "awards"), awd);
      }
      addLog("Seeded awards successfully.", "success");

      // 9. News Coverage
      await clearCollection("news_coverage");
      const defaultNews = [
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
      ];
      addLog("Seeding news coverage...", "pending");
      for (const newsItem of defaultNews) {
        await addDoc(collection(db, "news_coverage"), newsItem);
      }
      addLog("Seeded news coverage successfully.", "success");

      // 10. Memberships
      await clearCollection("memberships");
      const defaultMemberships = [
        {
          title: "IEEE Member",
          org: "Institute of Electrical and Electronics Engineers",
          icon: "workspace_premium",
        },
        {
          title: "ISDSA Member",
          org: "International Society for Data Science and Analytics",
          icon: "verified",
        }
      ];
      addLog("Seeding memberships...", "pending");
      for (const memb of defaultMemberships) {
        await addDoc(collection(db, "memberships"), memb);
      }
      addLog("Seeded memberships successfully.", "success");

      addLog("Database reset & seeding completed successfully!", "finish");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      addLog(`Migration failed: ${err.message}`, "error");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-[20px]">database</span>
            Database Maintenance
          </h3>
          <p className="text-gray-500 text-xs">
            Reset or seed your Firestore database collections with all default hardcoded backup records.
          </p>
        </div>
        <button
          onClick={() => {
            setIsOpen(true);
            setLogs([]);
            setSuccess(false);
            setError(null);
          }}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
        >
          Restore Default Portfolio Data
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-2xl">cloud_sync</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">Restore Default Portfolio Data</h3>
                  <p className="text-xs text-gray-500">Firebase Firestore Seeding & Setup</p>
                </div>
              </div>
              <button
                onClick={() => !loading && setIsOpen(false)}
                disabled={loading}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-50 transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs leading-relaxed">
                <p className="font-semibold mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  Important Action Warning
                </p>
                This operation will delete all current documents in your Firestore collections (Publications, Experience, Education, Research Interests, Conferences, Awards, News, Memberships) and overwrite them with clean default records. This prevents duplicates and ensures data integrity.
              </div>

              {/* Logs output */}
              {(logs.length > 0 || error) && (
                <div className="border border-gray-200 rounded-xl bg-gray-900 p-4 font-mono text-xs text-gray-300 max-h-48 overflow-y-auto space-y-1">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-2">
                      <span className={`
                        ${log.type === "success" ? "text-emerald-400" : ""}
                        ${log.type === "error" ? "text-rose-400 font-bold" : ""}
                        ${log.type === "pending" ? "text-amber-300" : ""}
                        ${log.type === "info" ? "text-blue-400" : ""}
                      `}>
                        {log.type === "pending" && "⚙️ "}
                        {log.type === "success" && "✅ "}
                        {log.type === "error" && "❌ "}
                        {log.text}
                      </span>
                      <span className="text-gray-600 shrink-0">{log.time}</span>
                    </div>
                  ))}
                  {error && <div className="text-rose-500 font-bold mt-2">Error: {error}</div>}
                  {success && <div className="text-emerald-400 font-bold mt-2">🎉 Database reset completed successfully! Feel free to close this modal.</div>}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
              >
                Close
              </button>
              {!success && (
                <button
                  onClick={runMigration}
                  disabled={loading}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-semibold rounded-xl shadow disabled:opacity-50 transition flex items-center gap-1 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Executing...
                    </>
                  ) : (
                    "Execute Reset & Seed"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
