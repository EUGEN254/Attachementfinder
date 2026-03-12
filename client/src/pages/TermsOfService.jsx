// pages/TermsOfService.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const effectiveDate = "March 15, 2024";

  const sections = [
    {
      id: "eligibility",
      title: "Eligibility & Account Terms",
      content: "You must be at least 16 years old to use InternConnect. Account registration requires accurate, current information. You're responsible for maintaining account security and all activities under your account. Immediate termination may occur for violations.",
      points: [
        "Minimum age requirement: 16 years",
        "One person - one account policy",
        "No account sharing permitted",
        "Verify email within 7 days"
      ]
    },
    {
      id: "applications",
      title: "Application Process",
      content: "All internship applications must contain truthful information. Misrepresentation of qualifications, experience, or identity results in permanent platform ban. Employers may verify provided information.",
      points: [
        "Applications are final upon submission",
        "Withdrawals allowed before employer review",
        "Document uploads must be original",
        "Max 50 applications per month (free tier)"
      ]
    },
    {
      id: "conduct",
      title: "User Conduct Guidelines",
      content: "Professional behavior is mandatory. Harassment, spam, unauthorized scraping, or manipulation of our systems is prohibited. Report violations immediately.",
      points: [
        "No automated scripts or bots",
        "Respect intellectual property rights",
        "No false reporting of employers",
        "Maintain professional communication"
      ]
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: "InternConnect facilitates connections but doesn't guarantee internships, offers, or employment outcomes. We're not liable for employer decisions, interview outcomes, or third-party actions.",
      points: [
        "Platform provided 'as is'",
        "No guarantee of interview selection",
        "Employers solely responsible for hiring",
        "Maximum liability: $100 USD"
      ]
    },
    {
      id: "privacy",
      title: "Data & Privacy",
      content: "We collect and process data as outlined in our Privacy Policy. Your information is shared only with employers you apply to. Account deletion removes public profile within 30 days.",
      points: [
        "Data retention: 2 years after last login",
        "Optional profile visibility controls",
        "GDPR/CCPA compliance maintained",
        "No selling of personal data"
      ]
    },
    {
      id: "termination",
      title: "Account Termination",
      content: "We reserve the right to suspend or terminate accounts violating these terms. Appeals within 14 days of termination notice. Repeated violations result in permanent ban.",
      points: [
        "30-day notice for policy changes",
        "Export your data anytime",
        "Appeals reviewed within 5 business days",
        "Ban evasion results in legal action"
      ]
    }
  ];

  const definitions = [
    { term: "Platform", definition: "InternConnect website and mobile applications" },
    { term: "Employer", definition: "Companies and organizations posting internships" },
    { term: "User", definition: "Students and professionals seeking internships" },
    { term: "Content", definition: "Profiles, messages, applications, and uploaded materials" }
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
            Back to previous page
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Main content grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left sidebar - Navigation */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-1">Terms of Service</h3>
                  <p className="text-xs text-gray-500">Effective {effectiveDate}</p>
                  <div className="w-12 h-0.5 bg-gray-200 mt-3"></div>
                </div>
                
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition ${
                        activeSection === section.id
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Version 2.4.1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Last updated: {effectiveDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Terms */}
          <div className="md:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Terms of Service
              </h1>
              <p className="text-gray-600">
                Please read these terms carefully before using InternConnect.
              </p>
            </div>

            {/* Quick read notice */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex gap-3">
                <span className="text-blue-600 text-xl">📋</span>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Quick summary</h4>
                  <p className="text-sm text-blue-800">
                    These terms govern your use of our platform. By signing up, you agree to 
                    provide accurate information, behave professionally, and understand that 
                    we're not responsible for employer decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Definitions */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Key terms</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {definitions.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-medium text-gray-900">{item.term}</span>
                    <span className="text-gray-500">: {item.definition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms sections */}
            {sections.map((section) => (
              <div 
                key={section.id} 
                id={section.id}
                className="bg-white rounded-xl p-6 border border-gray-100 scroll-mt-24"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {section.content}
                </p>
                <ul className="space-y-2">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-gray-300 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Agreement section */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 mt-8">
              <div className="flex items-start gap-3 mb-6">
                <button
                  onClick={() => setAccepted(!accepted)}
                  className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition flex-shrink-0 ${
                    accepted 
                      ? "bg-gray-900 border-gray-900" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {accepted && <span className="text-white text-xs">✓</span>}
                </button>
                <p className="text-sm text-gray-600">
                  I confirm that I have read and agree to these Terms of Service. 
                  I understand that my use of InternConnect is subject to these terms 
                  and any future updates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={!accepted}
                  onClick={() => navigate("/register")}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    accepted
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Accept & Continue
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-700"
                >
                  Decline
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                By accepting, you also agree to receive important notices electronically
              </p>
            </div>

            {/* Additional info */}
            <div className="text-xs text-gray-400 text-center pt-4">
              <span>Questions? Contact legal@internconnect.com</span>
              <span className="mx-2">•</span>
              <span>DPI Compliance Verified</span>
              <span className="mx-2">•</span>
              <span>EU Representative Appointed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;