import { Inter, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/SideNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Md Sharfuddin | AI-Driven MIS Researcher & Business Analyst",
    template: "%s | Md Sharfuddin"
  },
  description: "Official portfolio of Md Sharfuddin, specializing in AI-driven Management Information Systems (MIS), predictive machine learning analytics, supply chain resilience, and green marketing intelligence.",
  keywords: [
    "Md Sharfuddin",
    "Management Information Systems",
    "MIS Researcher",
    "Business Analyst",
    "Artificial Intelligence in MIS",
    "Supply Chain Machine Learning",
    "Logistics Performance Analytics",
    "Green Marketing Intelligence",
    "Predictive Machine Learning Models",
    "Data Reliability",
    "Academic Portfolio",
    "Los Angeles"
  ],
  authors: [{ name: "Md Sharfuddin", url: "https://sharfmdwebportfolio.com" }],
  creator: "Md Sharfuddin",
  metadataBase: new URL("https://sharfmdwebportfolio.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sharfmdwebportfolio.com",
    title: "Md Sharfuddin | AI-Driven MIS Researcher & Business Analyst",
    description: "Official portfolio of Md Sharfuddin, specializing in AI-driven Management Information Systems (MIS), predictive machine learning analytics, supply chain resilience, and green marketing intelligence.",
    siteName: "Md Sharfuddin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Sharfuddin | AI-Driven MIS Researcher & Business Analyst",
    description: "Official portfolio of Md Sharfuddin, specializing in AI-driven Management Information Systems (MIS), predictive machine learning analytics, supply chain resilience, and green marketing intelligence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container relative">
        {children}
        <SideNav />
      </body>
    </html>
  );
}
