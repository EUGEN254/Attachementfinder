// pages/Sitemap.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdHome,
  MdInfo,
  MdAttachMoney,
  MdContactMail,
  MdWork,
  MdAssignment,
  MdBookmark,
  MdPerson,
  MdDescription,
  MdBusiness,
  MdPostAdd,
  MdPeople,
  MdSettings,
  MdHelp,
  MdPrivacyTip,
  MdGavel,
  MdSearch,
  MdDashboard,
  MdSchool,
  MdEmail,
  MdForum,
  MdAnnouncement,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";

const Sitemap = () => {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState(["main", "students", "employers", "company", "support"]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const siteStructure = [
    {
      id: "main",
      category: "Main Pages",
      icon: <MdDashboard size={20} />,
      color: "bg-gray-900",
      links: [
        { name: "Home", path: "/", icon: <MdHome size={18} />, description: "Dashboard and overview" },
        { name: "How It Works", path: "/how-it-works", icon: <MdInfo size={18} />, description: "Platform guide for students" },
        { name: "Pricing", path: "/pricing", icon: <MdAttachMoney size={18} />, description: "Plans and features" },
        { name: "About Us", path: "/about", icon: <MdBusiness size={18} />, description: "Our mission and team" },
        { name: "Contact", path: "/contact", icon: <MdContactMail size={18} />, description: "Get in touch with us" }
      ]
    },
    {
      id: "students",
      category: "For Students",
      icon: <MdSchool size={20} />,
      color: "bg-blue-600",
      links: [
        { name: "Browse Internships", path: "/internships", icon: <MdWork size={18} />, description: "Search and filter opportunities" },
        { name: "My Applications", path: "/applications", icon: <MdAssignment size={18} />, description: "Track application status" },
        { name: "Saved Jobs", path: "/saved", icon: <MdBookmark size={18} />, description: "View saved internships" },
        { name: "Student Profile", path: "/profile/student", icon: <MdPerson size={18} />, description: "Manage your profile" },
        { name: "Resume Builder", path: "/resume-builder", icon: <MdDescription size={18} />, description: "Create professional resumes" },
        { name: "Career Resources", path: "/resources", icon: <MdSchool size={18} />, description: "Tips and guides" },
        { name: "Interview Prep", path: "/interview-prep", icon: <MdForum size={18} />, description: "Practice interviews" }
      ]
    },
    {
      id: "employers",
      category: "For Employers",
      icon: <MdBusiness size={20} />,
      color: "bg-green-600",
      links: [
        { name: "Post an Internship", path: "/post-internship", icon: <MdPostAdd size={18} />, description: "Create new listings" },
        { name: "Manage Listings", path: "/manage-listings", icon: <MdWork size={18} />, description: "Edit and update posts" },
        { name: "Review Applications", path: "/review-applications", icon: <MdAssignment size={18} />, description: "Evaluate candidates" },
        { name: "Company Profile", path: "/company/profile", icon: <MdBusiness size={18} />, description: "Update company info" },
        { name: "Analytics", path: "/analytics", icon: <MdDashboard size={18} />, description: "Track performance" },
        { name: "Team Members", path: "/team", icon: <MdPeople size={18} />, description: "Manage team access" }
      ]
    },
    {
      id: "company",
      category: "Company & Legal",
      icon: <MdGavel size={20} />,
      color: "bg-purple-600",
      links: [
        { name: "About InternConnect", path: "/about", icon: <MdInfo size={18} />, description: "Our story and values" },
        { name: "Careers", path: "/careers", icon: <MdPeople size={18} />, description: "Join our team" },
        { name: "Blog", path: "/blog", icon: <MdAnnouncement size={18} />, description: "News and updates" },
        { name: "Press", path: "/press", icon: <MdAnnouncement size={18} />, description: "Media resources" },
        { name: "Privacy Policy", path: "/privacy", icon: <MdPrivacyTip size={18} />, description: "How we handle data" },
        { name: "Terms of Service", path: "/terms", icon: <MdGavel size={18} />, description: "Terms and conditions" },
        { name: "Cookie Policy", path: "/cookies", icon: <MdInfo size={18} />, description: "Cookie usage" }
      ]
    },
    {
      id: "support",
      category: "Support & Resources",
      icon: <MdHelp size={20} />,
      color: "bg-orange-600",
      links: [
        { name: "Help Center", path: "/help", icon: <MdHelp size={18} />, description: "FAQs and guides" },
        { name: "Contact Support", path: "/support", icon: <MdEmail size={18} />, description: "Get help" },
        { name: "Community Forum", path: "/community", icon: <MdForum size={18} />, description: "Connect with others" },
        { name: "Site Map", path: "/sitemap", icon: <MdDashboard size={18} />, description: "All pages overview" },
        { name: "Accessibility", path: "/accessibility", icon: <MdPerson size={18} />, description: "Accessibility features" },
        { name: "Feedback", path: "/feedback", icon: <MdForum size={18} />, description: "Share your thoughts" }
      ]
    }
  ];

  const quickLinks = [
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/signup" },
    { name: "Forgot Password", path: "/forgot-password" },
    { name: "Reset Password", path: "/reset-password" },
    { name: "Verify Email", path: "/verify-email" },
  ];

  const filteredStructure = siteStructure.map(category => ({
    ...category,
    links: category.links.filter(link =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.links.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm group"
            >
              <span className="group-hover:-translate-x-1 transition">←</span>
              Back
            </button>
            <div className="text-sm text-gray-400">
              {siteStructure.reduce((acc, cat) => acc + cat.links.length, 0)} pages total
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🗺️</span>
            <h1 className="text-3xl font-bold text-gray-900">Sitemap</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Navigate through all pages and sections of InternConnect. Find what you're looking for quickly and easily.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        {/* Quick links section */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Quick Access</h2>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigate(link.path)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sitemap grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStructure.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${category.color} bg-opacity-10 flex items-center justify-center text-${category.color.replace('bg-', '')}`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-left">{category.category}</h3>
                    <p className="text-xs text-gray-500 text-left">{category.links.length} pages</p>
                  </div>
                </div>
                <span className="text-gray-400">
                  {expandedCategories.includes(category.id) ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                </span>
              </button>

              {/* Links */}
              {expandedCategories.includes(category.id) && (
                <div className="px-5 pb-4 pt-2 border-t border-gray-100">
                  <div className="space-y-2">
                    {category.links.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(link.path)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
                      >
                        <span className="text-gray-400 group-hover:text-gray-600">
                          {link.icon}
                        </span>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                            {link.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {link.description}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-900 bg-opacity-10 rounded"></div>
              <span>Main pages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 bg-opacity-10 rounded"></div>
              <span>Student sections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 bg-opacity-10 rounded"></div>
              <span>Employer sections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 bg-opacity-10 rounded"></div>
              <span>Legal & company</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-600 bg-opacity-10 rounded"></div>
              <span>Support</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Can't find what you're looking for? <button onClick={() => navigate("/contact")} className="text-gray-600 underline">Contact us</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;