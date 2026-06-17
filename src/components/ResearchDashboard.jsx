"use client";

import { useState } from "react";

export default function ResearchDashboard() {
  const [activeTab, setActiveTab] = useState("ai-mis");

  const domains = {
    "ai-mis": {
      title: "AI-Driven MIS & Data Reliability",
      desc: "Enhancing data reliability and resource allocation in enterprise MIS using advanced machine learning models and predictive architectures.",
      metrics: "4 Papers & 1 Approved Patent",
      percentage: 45,
      color: "bg-secondary",
      textColor: "text-secondary",
      tools: ["Python", "SQL", "Google BigQuery", "PostgreSQL"],
      findings: [
        "Identified machine learning bottlenecks in enterprise data synchronization.",
        "Created an inline packet filtering firmware device for cyber threat mitigation.",
      ],
    },
    "sustainable": {
      title: "Sustainable Decision Science",
      desc: "Analyzing green marketing intelligence and sustainable consumer choices through predictive modeling, hypothesis testing, and regression analysis.",
      metrics: "3 Publications",
      percentage: 35,
      color: "bg-electric-cyan",
      textColor: "text-electric-cyan",
      tools: ["Python", "R Language", "Tableau", "Hypothesis Testing"],
      findings: [
        "Modeled behavioral triggers of eco-conscious consumers using regression analysis.",
        "Published insights on Green Marketing Intelligence and corporate social equity.",
      ],
    },
    "supply-chain": {
      title: "Supply Chain Resilience",
      desc: "Integrating machine learning algorithms to forecast logistical vulnerabilities and optimize enterprise resources dynamically.",
      metrics: "2 Publications",
      percentage: 20,
      color: "bg-deep-navy",
      textColor: "text-deep-navy",
      tools: ["Python", "Power BI", "Regression", "KPI Measurement"],
      findings: [
        "Reduced resource allocation latency by up to 15% using predictive scheduling models.",
        "Analyzed supply chain structural integrity under global operational disruptions.",
      ],
    },
  };

  const current = domains[activeTab];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Interactive Tabs and Progress */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-4">
          <h3 className="font-headline-lg text-xl md:text-headline-lg font-bold text-primary">
            Research Domains &amp; Share
          </h3>
          <p className="font-body-md text-sm text-on-surface-variant">
            Explore active research vectors, data weights, and primary tools.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-col gap-3">
          {Object.entries(domains).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                activeTab === key
                  ? "bg-white border-secondary shadow-md scale-102"
                  : "bg-white/50 hover:bg-white border-outline-variant hover:scale-101"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${value.color}`}></div>
                <span className="font-headline-md text-sm md:text-base font-bold text-primary">
                  {key === "ai-mis" ? "AI-Driven MIS" : key === "sustainable" ? "Sustainable Behavior" : "Supply Chain & ML"}
                </span>
              </div>
              <span className={`font-label-sm text-xs font-bold ${activeTab === key ? value.textColor : "text-outline"}`}>
                {value.percentage}%
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Multi-Bar Chart */}
        <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
          <h4 className="font-label-sm text-xs font-bold text-primary text-center">Repository Share (Weighted)</h4>
          <div className="h-6 w-full flex rounded-lg overflow-hidden bg-surface-container shadow-inner">
            {Object.entries(domains).map(([key, value]) => (
              <div
                key={key}
                style={{ width: `${value.percentage}%` }}
                className={`${value.color} transition-all duration-500`}
                title={`${value.title} (${value.percentage}%)`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-outline px-1">
            <span>MIS Focus</span>
            <span>Sustainable Decision</span>
            <span>Supply Chain</span>
          </div>
        </div>
      </div>

      {/* Domain Details Card */}
      <div className="lg:col-span-7 bg-white border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm space-y-6 min-h-[380px] flex flex-col justify-between transition-all duration-300">
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <span className="font-label-sm text-xs text-secondary bg-secondary-fixed px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              {current.metrics}
            </span>
            <span className={`font-headline-md text-2xl font-black ${current.textColor}`}>
              {current.percentage}%
            </span>
          </div>

          <h3 className="font-headline-lg text-lg md:text-xl font-bold text-primary">
            {current.title}
          </h3>

          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
            {current.desc}
          </p>

          <div className="space-y-2">
            <h4 className="font-headline-md text-xs font-bold text-primary uppercase tracking-wider">
              Primary Findings:
            </h4>
            <ul className="space-y-1 text-xs md:text-sm text-on-surface-variant list-disc pl-5 leading-relaxed">
              {current.findings.map((finding, idx) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant space-y-3">
          <h4 className="font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider">
            Primary Tools &amp; Methods:
          </h4>
          <div className="flex flex-wrap gap-2">
            {current.tools.map((tool) => (
              <span
                key={tool}
                className="font-label-sm text-xs px-3 py-1 bg-surface-gray text-on-primary-fixed-variant border border-outline-variant rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
