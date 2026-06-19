"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface transition-colors duration-300">
      <Header />

      <main className="max-w-max-width mx-auto px-4 md:px-margin-desktop py-12 md:py-20 w-full flex-grow">
        {/* Title Section */}
        <section className="mb-12 md:mb-16">
          <h1 className="font-display-lg text-4xl md:text-display-lg text-primary font-extrabold mb-4 tracking-tight">
            Connect &amp; Collaborate
          </h1>
          <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            I am always open to research collaborations, consulting opportunities, or discussing advanced MIS frameworks. Reach out and let's start a conversation.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-headline-lg text-xl md:text-headline-lg font-bold text-deep-navy mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</h4>
                    <a href="mailto:sharfuddin.md50@yahoo.com" className="text-primary hover:text-secondary hover:underline font-semibold text-sm md:text-base transition-colors mt-1 block">
                      sharfuddin.md50@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                    <span className="material-symbols-outlined text-xl">phone</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Phone</h4>
                    <a href="tel:+12136362680" className="text-primary hover:text-secondary hover:underline font-semibold text-sm md:text-base transition-colors mt-1 block">
                      +1 (213) 636-2680
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Location</h4>
                    <span className="text-primary font-semibold text-sm md:text-base mt-1 block">
                      Los Angeles, California
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Portals */}
            <div className="bg-primary text-on-primary rounded-2xl p-6 md:p-8 shadow-md">
              <h3 className="font-headline-lg text-lg md:text-xl font-bold mb-4">
                Research Portals
              </h3>
              <p className="text-on-primary/80 text-sm mb-6 leading-relaxed">
                You can also view my research publications and verification records across these global platforms:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Google Scholar", icon: "school", href: "https://scholar.google.com/citations?user=SHARFUDDIN" },
                  { name: "ResearchGate", icon: "hub", href: "https://www.researchgate.net/profile/Md-Sharfuddin-4" },
                  { name: "ORCID Profile", icon: "account_circle", href: "https://orcid.org/0009-0005-2313-1768" },
                  { name: "LinkedIn Profile", icon: "link", href: "https://www.linkedin.com/in/md-sharfuddin-2708b730b" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-on-primary/10 rounded-lg hover:bg-on-primary/20 transition-all duration-200 hover:scale-[1.03] group"
                  >
                    <span className="material-symbols-outlined text-electric-cyan group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
 
          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="font-headline-lg text-xl md:text-headline-lg font-bold text-deep-navy mb-6">
              Send a Message
            </h3>
 
            {submitted ? (
              <div className="bg-secondary-fixed/30 text-primary border border-secondary/20 p-8 rounded-xl flex flex-col items-center text-center gap-4">
                <span className="material-symbols-outlined text-5xl text-secondary animate-bounce">
                  check_circle
                </span>
                <div>
                  <h4 className="font-headline-md text-lg font-bold text-primary mb-2">Message Sent Successfully!</h4>
                  <p className="font-body-md text-sm text-on-surface-variant max-w-sm">
                    Thank you for reaching out. I will review your message and get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-all text-sm mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/35 rounded-lg px-4 py-3 text-sm focus:outline-none transition-all duration-200"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/35 rounded-lg px-4 py-3 text-sm focus:outline-none transition-all duration-200"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>
 
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/35 rounded-lg px-4 py-3 text-sm focus:outline-none transition-all duration-200"
                    placeholder="e.g. Research Collaboration Inquiry"
                  />
                </div>
 
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/35 rounded-lg px-4 py-3 text-sm focus:outline-none transition-all resize-none duration-200"
                    placeholder="Describe your request or proposal..."
                  ></textarea>
                </div>
 
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-secondary hover:text-on-secondary active:scale-[0.98] hover:scale-[1.01] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-sm"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
