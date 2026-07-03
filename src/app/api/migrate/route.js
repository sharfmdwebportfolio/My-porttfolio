import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";

async function clearCollection(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map((docSnapshot) => 
    deleteDoc(doc(db, collectionName, docSnapshot.id))
  );
  await Promise.all(deletePromises);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD && password !== "sharfuddin2025admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Migrate site/profile
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
    await setDoc(doc(db, "site", "profile"), { ...defaultProfile, updatedAt: serverTimestamp() });

    // 2. Migrate site/skills
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
    await setDoc(doc(db, "site", "skills"), { ...defaultSkills, updatedAt: serverTimestamp() });

    // 3. Migrate publications
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
    for (const pub of defaultPublications) {
      await addDoc(collection(db, "publications"), { ...pub, createdAt: serverTimestamp() });
    }

    // 4. Migrate research_interests
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
    for (const [key, value] of Object.entries(defaultInterests)) {
      await setDoc(doc(db, "research_interests", key), { ...value, updatedAt: serverTimestamp() });
    }

    // 5. Migrate experiences
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
    for (const exp of defaultExperiences) {
      await addDoc(collection(db, "experiences"), { ...exp, createdAt: serverTimestamp() });
    }

    // 6. Migrate education
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
    for (const edu of defaultEducation) {
      await addDoc(collection(db, "education"), { ...edu, createdAt: serverTimestamp() });
    }

    // 7. Migrate conferences
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
    for (const conf of defaultConferences) {
      await addDoc(collection(db, "conferences"), { ...conf, createdAt: serverTimestamp() });
    }

    // 8. Migrate awards
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
    for (const awd of defaultAwards) {
      await addDoc(collection(db, "awards"), { ...awd, createdAt: serverTimestamp() });
    }

    // 9. Migrate news_coverage
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
    for (const newsItem of defaultNews) {
      await addDoc(collection(db, "news_coverage"), { ...newsItem, createdAt: serverTimestamp() });
    }

    // 10. Migrate memberships
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
    for (const memb of defaultMemberships) {
      await addDoc(collection(db, "memberships"), { ...memb, createdAt: serverTimestamp() });
    }

    return NextResponse.json({ success: true, message: "Migration completed successfully! All hardcoded data has been uploaded to Firebase Firestore." });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: error.message || "Migration failed." }, { status: 500 });
  }
}
