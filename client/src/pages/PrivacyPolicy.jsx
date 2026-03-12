// pages/PrivacyPolicy.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const lastUpdated = "March 15, 2024";

  const sections = [
    {
      id: "collection",
      title: "Information Collection",
      summary: "What data we gather when you use our platform",
      details: [
        { type: "Account Information", description: "Name, email, password, profile photo, and account preferences" },
        { type: "Professional Data", description: "Resume, skills, work history, education, and career interests" },
        { type: "Application Materials", description: "Cover letters, portfolio links, and internship applications" },
        { type: "Usage Data", description: "Pages visited, time spent, applications submitted, and search history" },
        { type: "Device Information", description: "IP address, browser type, operating system, and device identifiers" }
      ],
      note: "We never collect sensitive information like political opinions or religious beliefs"
    },
    {
      id: "usage",
      title: "How We Use Data",
      summary: "How your information helps improve your experience",
      details: [
        { type: "Match Making", description: "Connect you with relevant internship opportunities" },
        { type: "Platform Improvement", description: "Analyze usage patterns to enhance our service" },
        { type: "Communication", description: "Send application updates and relevant opportunities" },
        { type: "Security", description: "Detect and prevent fraudulent activities" },
        { type: "Personalization", description: "Tailor content and recommendations to your interests" }
      ],
      note: "Your data is never sold to third parties for marketing purposes"
    },
    {
      id: "sharing",
      title: "Information Sharing",
      summary: "When and with whom we share your data",
      details: [
        { type: "Employers", description: "When you apply to internships, employers see your profile and materials" },
        { type: "Service Providers", description: "Trusted partners who help operate our platform (hosting, analytics)" },
        { type: "Legal Requirements", description: "When required by law or to protect rights and safety" },
        { type: "Business Transfers", description: "In case of merger, acquisition, or asset sale" }
      ],
      note: "You control what employers see through your privacy settings"
    },
    {
      id: "protection",
      title: "Data Security",
      summary: "How we keep your information safe",
      details: [
        { type: "Encryption", description: "256-bit encryption for all data in transit and at rest" },
        { type: "Access Control", description: "Strict employee access policies and regular audits" },
        { type: "Monitoring", description: "24/7 automated threat detection and prevention" },
        { type: "Backups", description: "Regular encrypted backups to prevent data loss" },
        { type: "Compliance", description: "Regular security assessments and penetration testing" }
      ],
      note: "We maintain ISO 27001 certification and GDPR compliance"
    },
    {
      id: "rights",
      title: "Your Rights",
      summary: "Control over your personal information",
      details: [
        { type: "Access", description: "Request a copy of all data we hold about you" },
        { type: "Correction", description: "Update inaccurate or incomplete information" },
        { type: "Deletion", description: "Request account and data deletion" },
        { type: "Export", description: "Download your data in portable format" },
        { type: "Opt-out", description: "Control marketing communications and cookies" }
      ],
      note: "Exercise your rights anytime through account settings or by contacting us"
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      summary: "How we use cookies and similar technologies",
      details: [
        { type: "Essential", description: "Required for platform functionality (login, security)" },
        { type: "Preferences", description: "Remember your settings and preferences" },
        { type: "Analytics", description: "Understand how users interact with our platform" },
        { type: "Marketing", description: "Measure effectiveness of communications (opt-in only)" }
      ],
      note: "You can manage cookie preferences in your browser settings"
    }
  ];

  const quickFacts = [
    { label: "Data Controller", value: "InternConnect Inc." },
    { label: "GDPR Representative", value: "EU Privacy Team" },
    { label: "Data Retention", value: "24 months after last login" },
    { label: "Third-party sharing", value: "Only with consent" },
    { label: "Children under 16", value: "Not permitted" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition">←</span>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            We believe in transparency about how we collect and use your data. 
            This policy explains our practices in plain language.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="text-gray-500">Last updated: {lastUpdated}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-gray-500">5 min read</span>
          </div>
        </div>

        {/* Quick facts grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {quickFacts.map((fact, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">{fact.label}</div>
              <div className="text-sm font-medium text-gray-900">{fact.value}</div>
            </div>
          ))}
        </div>

        {/* Summary banner */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mb-10">
          <div className="flex gap-3">
            <span className="text-blue-600">📌</span>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Privacy at a glance</h4>
              <p className="text-sm text-blue-800">
                We collect only what's needed to connect you with internships. Your data is encrypted, 
                never sold, and you can delete it anytime. We're GDPR and CCPA compliant.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Section header - always visible */}
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
              >
                <div>
                  <h2 className="font-semibold text-gray-900">{section.title}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{section.summary}</p>
                </div>
                <span className="text-gray-400 text-xl">
                  {expandedSection === section.id ? "−" : "+"}
                </span>
              </button>

              {/* Expanded content */}
              {expandedSection === section.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="space-y-4">
                    {section.details.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-medium text-gray-900">{item.type}:</span>
                        <span className="text-gray-600 ml-2">{item.description}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Note:</span> {section.note}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact options */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <span className="text-xl mb-3 block">📧</span>
            <h3 className="font-medium text-gray-900 mb-1">Email us</h3>
            <p className="text-xs text-gray-500 mb-2">Privacy questions?</p>
            <a href="mailto:privacy@internconnect.com" className="text-sm text-gray-900 hover:underline">
              privacy@internconnect.com
            </a>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <span className="text-xl mb-3 block">⏱️</span>
            <h3 className="font-medium text-gray-900 mb-1">Response time</h3>
            <p className="text-xs text-gray-500 mb-2">We aim to reply within</p>
            <p className="text-sm text-gray-900">48 hours or less</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <span className="text-xl mb-3 block">📋</span>
            <h3 className="font-medium text-gray-900 mb-1">DPO contact</h3>
            <p className="text-xs text-gray-500 mb-2">Data Protection Officer</p>
            <p className="text-sm text-gray-900">dpo@internconnect.com</p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            We use necessary cookies to operate our platform. By continuing, you accept this policy.
            <button className="text-gray-600 underline ml-1">Cookie preferences</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;