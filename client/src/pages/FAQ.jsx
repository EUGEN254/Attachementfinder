// pages/FAQ.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdSearch,
  MdSchool,
  MdBusiness,
  MdAccountCircle,
  MdPayment,
  MdWork,
  MdAssignment,
  MdHelp,
  MdEmail,
  MdChat,
  MdExpandMore,
  MdExpandLess,
  MdCheckCircle,
  MdDescription,
  MdPerson,
  MdSecurity,
} from "react-icons/md";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const categories = [
    { id: "all", name: "All Questions", icon: <MdHelp size={18} />, count: 24 },
    { id: "students", name: "For Students", icon: <MdSchool size={18} />, count: 8 },
    { id: "employers", name: "For Employers", icon: <MdBusiness size={18} />, count: 6 },
    { id: "account", name: "Account & Profile", icon: <MdAccountCircle size={18} />, count: 5 },
    { id: "applications", name: "Applications", icon: <MdAssignment size={18} />, count: 4 },
    { id: "payments", name: "Payments & Billing", icon: <MdPayment size={18} />, count: 3 },
  ];

  const faqs = [
    {
      id: 1,
      category: "students",
      question: "How do I create a standout profile?",
      answer: "Start by uploading a professional photo, writing a compelling bio, and listing all relevant skills and experiences. Include specific achievements and use keywords related to your desired internship. Complete all sections and verify your email for higher visibility.",
      tips: ["Use a professional headshot", "Include quantifiable achievements", "Add relevant coursework"],
      relatedLinks: ["Profile Tips", "Resume Builder"]
    },
    {
      id: 2,
      category: "students",
      question: "What should I include in my internship applications?",
      answer: "Tailor each application to the specific internship. Include a personalized cover letter, updated resume, and any relevant portfolio links. Research the company and mention why you're interested in them specifically.",
      tips: ["Customize for each role", "Proofread everything", "Follow application instructions"],
      relatedLinks: ["Application Guide", "Cover Letter Tips"]
    },
    {
      id: 3,
      category: "students",
      question: "How can I increase my chances of getting interviewed?",
      answer: "Complete your profile 100%, apply to matching positions, and be proactive. Set up job alerts, apply early, and follow up professionally after a week. Network with company representatives when possible.",
      tips: ["Apply within 48 hours of posting", "Complete profile sections", "Set up email alerts"],
      relatedLinks: ["Interview Prep", "Networking Tips"]
    },
    {
      id: 4,
      category: "students",
      question: "Can I apply to multiple internships at once?",
      answer: "Yes, you can apply to up to 50 internships per month on the free plan, and unlimited on premium. We recommend applying to 5-10 carefully selected positions per week to maintain quality.",
      tips: ["Track your applications", "Prioritize best matches", "Stay organized"],
      relatedLinks: ["Application Limits", "Premium Features"]
    },
    {
      id: 5,
      category: "employers",
      question: "How do I post an internship opportunity?",
      answer: "Navigate to your employer dashboard and click 'Post New Internship'. Fill in the position details, requirements, and application deadlines. Review and publish. Posts are reviewed within 24 hours.",
      tips: ["Be detailed in requirements", "Include timeline clearly", "Add company culture info"],
      relatedLinks: ["Posting Guidelines", "Pricing Plans"]
    },
    {
      id: 6,
      category: "employers",
      question: "How do I review applications?",
      answer: "Access your employer dashboard to view all applications. You can filter by date, qualifications, and status. Use our rating system to evaluate candidates and schedule interviews directly.",
      tips: ["Review promptly", "Provide feedback", "Update status regularly"],
      relatedLinks: ["Review Process", "Candidate Evaluation"]
    },
    {
      id: 7,
      category: "employers",
      question: "What's the cost of posting internships?",
      answer: "Basic job postings start at $99 per listing. We also offer monthly subscriptions for companies with multiple openings. Volume discounts are available for 10+ posts.",
      tips: ["Annual plans save 20%", "Free trial available", "Cancel anytime"],
      relatedLinks: ["Pricing Page", "Enterprise Plans"]
    },
    {
      id: 8,
      category: "account",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your email, and we'll send a reset link. The link expires in 24 hours. Check spam folder if you don't see it.",
      tips: ["Use strong password", "Enable 2FA", "Update regularly"],
      relatedLinks: ["Security Tips", "Account Settings"]
    },
    {
      id: 9,
      category: "account",
      question: "Can I delete my account?",
      answer: "Yes, go to Account Settings > Security > Delete Account. Your data will be permanently removed within 30 days. Download your data first if needed.",
      tips: ["Export data first", "Cancel subscriptions", "Save important info"],
      relatedLinks: ["Data Export", "Privacy Policy"]
    },
    {
      id: 10,
      category: "applications",
      question: "How do I track my application status?",
      answer: "Visit 'My Applications' in your dashboard. Statuses include: Submitted, Under Review, Interview Scheduled, Rejected, or Offer Extended. You'll get email updates.",
      tips: ["Check weekly", "Follow up if pending > 2 weeks", "Update preferences"],
      relatedLinks: ["Application Tracking", "Notification Settings"]
    },
    {
      id: 11,
      category: "applications",
      question: "Can I withdraw an application?",
      answer: "Yes, if the employer hasn't reviewed it yet. Go to Applications, find the position, and click 'Withdraw'. Once reviewed, contact the employer directly.",
      tips: ["Withdraw early if needed", "Explain if appropriate", "Reapply later"],
      relatedLinks: ["Application Policy", "Contact Support"]
    },
    {
      id: 12,
      category: "payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. All payments are secure and encrypted.",
      tips: ["Secure transactions", "Invoices available", "Auto-renewal option"],
      relatedLinks: ["Billing Info", "Payment Security"]
    }
  ];

  const popularTopics = [
    { topic: "Creating an account", icon: <MdPerson />, count: 234 },
    { topic: "Application process", icon: <MdAssignment />, count: 189 },
    { topic: "Profile optimization", icon: <MdCheckCircle />, count: 156 },
    { topic: "Interview tips", icon: <MdChat />, count: 142 },
    { topic: "Resume guidelines", icon: <MdDescription />, count: 98 },
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestions(prev =>
      prev.includes(id)
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition">←</span>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 mb-4">
            <MdHelp size={16} />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about using InternConnect. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 shadow-sm"
            />
          </div>
        </div>

        {/* Popular topics */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular topics</h2>
          <div className="flex flex-wrap gap-3">
            {popularTopics.map((topic, idx) => (
              <button
                key={idx}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition"
              >
                <span className="text-gray-500">{topic.icon}</span>
                <span>{topic.topic}</span>
                <span className="text-xs text-gray-400">({topic.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Categories sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition ${
                      activeCategory === category.id
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={activeCategory === category.id ? "text-white" : "text-gray-400"}>
                        {category.icon}
                      </span>
                      {category.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === category.id
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Contact support card */}
              <div className="mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-2">Need more help?</h4>
                <p className="text-sm text-blue-800 mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* FAQ content */}
          <div className="flex-1">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">
                          {expandedQuestions.includes(faq.id) ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                        </span>
                        <span className="font-medium text-gray-900">{faq.question}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {faq.category}
                      </span>
                    </button>

                    {/* Answer */}
                    {expandedQuestions.includes(faq.id) && (
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                        <div className="pl-8">
                          <p className="text-gray-600 mb-4">{faq.answer}</p>
                          
                          {/* Tips */}
                          {faq.tips && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Quick tips:</h4>
                              <ul className="space-y-1">
                                {faq.tips.map((tip, idx) => (
                                  <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Related links */}
                          {faq.relatedLinks && (
                            <div className="flex gap-2">
                              {faq.relatedLinks.map((link, idx) => (
                                <button
                                  key={idx}
                                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition"
                                >
                                  {link}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Helpful section */}
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-xs text-gray-400">Was this helpful?</p>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                Yes
                              </button>
                              <button className="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <MdHelp size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or browse all categories</p>
                <button
                  onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800"
                >
                  View all questions
                </button>
              </div>
            )}

            {/* Load more */}
            {filteredFaqs.length > 0 && filteredFaqs.length < faqs.length && (
              <div className="mt-6 text-center">
                <button className="px-6 py-3 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:bg-white transition">
                  Load more questions
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Still need help section */}
        <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is ready to help with any specific questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium flex items-center justify-center gap-2"
              >
                <MdEmail size={18} />
                Contact Support
              </button>
              <button
                onClick={() => navigate("/live-chat")}
                className="px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-300 font-medium flex items-center justify-center gap-2"
              >
                <MdChat size={18} />
                Live Chat
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Average response time: <span className="text-gray-600">&lt; 2 hours</span>
            </p>
          </div>
        </div>

        {/* Quick links footer */}
        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
          <button className="hover:text-gray-900">Help Center</button>
          <span>•</span>
          <button className="hover:text-gray-900">Guides</button>
          <span>•</span>
          <button className="hover:text-gray-900">Tutorials</button>
          <span>•</span>
          <button className="hover:text-gray-900">Community</button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;