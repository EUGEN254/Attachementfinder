// pages/ContactUs.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdSend,
  MdCheckCircle,
  MdHelp,
  MdBusiness,
  MdPerson,
  MdMessage,
  MdAttachFile,
  MdForum,
  // Replace MdTwitter, MdLinkedIn, MdInstagram with available icons
  MdShare,
  MdLink,
  MdChat,
} from "react-icons/md";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
    attachments: []
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
  const [activeFaq, setActiveFaq] = useState(null);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing Question" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "report", label: "Report an Issue" },
    { value: "feedback", label: "Feedback" }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      address: "548 Market St, Suite 72691",
      region: "San Francisco, CA 94104",
      hours: "Mon-Fri, 9:00 AM - 6:00 PM PST",
      phone: "+1 (415) 555-0123",
      email: "sf@internconnect.com"
    },
    {
      city: "New York",
      address: "20 W 34th St, Floor 15",
      region: "New York, NY 10001",
      hours: "Mon-Fri, 9:00 AM - 6:00 PM EST",
      phone: "+1 (212) 555-0456",
      email: "nyc@internconnect.com"
    },
    {
      city: "London",
      address: "123 Oxford Street",
      region: "London, W1D 2LG, UK",
      hours: "Mon-Fri, 9:00 AM - 5:30 PM GMT",
      phone: "+44 20 7946 0123",
      email: "london@internconnect.com"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I expect a response?",
      answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend using the 'Technical Support' category or calling our support line."
    },
    {
      question: "Can I schedule a demo for my company?",
      answer: "Absolutely! Please select 'Partnership Opportunity' in the category dropdown, and our team will reach out within 2 business days to schedule a personalized demo."
    },
    {
      question: "I'm having trouble with my application",
      answer: "For application-related issues, please include your application ID and a detailed description of the problem. Our technical support team will investigate immediately."
    },
    {
      question: "How do I update my billing information?",
      answer: "Billing updates can be made in your account settings under 'Billing Information'. If you need assistance, select 'Billing Question' and we'll help you out."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ 
      ...prev, 
      attachments: [...prev.attachments, ...files] 
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
        attachments: []
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

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
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-3">
              <MdEmail size={20} />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Email</h3>
            <p className="text-xs text-gray-500 mb-2">24/7 support</p>
            <a href="mailto:support@internconnect.com" className="text-sm text-gray-900 hover:underline">
              support@internconnect.com
            </a>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-3">
              <MdPhone size={20} />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
            <p className="text-xs text-gray-500 mb-2">Mon-Fri, 9am-6pm</p>
            <a href="tel:+18005550123" className="text-sm text-gray-900 hover:underline">
              +1 (800) 555-0123
            </a>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-3">
              <MdChat size={20} />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Live Chat</h3>
            <p className="text-xs text-gray-500 mb-2">Avg. 2 min response</p>
            <button className="text-sm text-gray-900 hover:underline">
              Start conversation →
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-3">
              <MdHelp size={20} />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Help Center</h3>
            <p className="text-xs text-gray-500 mb-2">FAQs & guides</p>
            <button className="text-sm text-gray-900 hover:underline">
              Visit help center →
            </button>
          </div>
        </div>

        {/* Main contact form and info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>
              
              {formStatus === "success" && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <MdCheckCircle className="text-green-600" size={20} />
                  <p className="text-sm text-green-700">
                    Message sent successfully! We'll respond within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and email row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="You name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject and category */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <div className="relative">
                      <MdMessage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                    placeholder="Please describe your question or issue in detail..."
                  />
                </div>

                {/* File attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments (optional)
                  </label>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                    >
                      <MdAttachFile size={18} />
                      <span>Upload files</span>
                    </label>
                    
                    {formData.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                            <span className="text-gray-600">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Max 10MB. Supported: PDF, DOC, JPG, PNG
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                    formStatus === "submitting"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {formStatus === "submitting" ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <MdSend size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar info */}
          <div className="space-y-6">
            {/* Social links - using available icons */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Connect with us</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                  <MdShare size={20} />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                  <MdLink size={20} />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                  <MdChat size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">Follow us on social media</p>
            </div>

            {/* Response time */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <MdAccessTime size={20} className="text-gray-600" />
                <h3 className="font-semibold text-gray-900">Response time</h3>
              </div>
              <p className="text-sm text-gray-600">
                We aim to respond to all inquiries within <span className="font-medium text-gray-900">24 hours</span> on business days.
              </p>
            </div>

            {/* Office hours */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Support hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office locations */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our offices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {officeLocations.map((office, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MdBusiness size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{office.city}</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <MdLocationOn size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{office.address}<br />{office.region}</span>
                  </div>
                  <div className="flex gap-2">
                    <MdAccessTime size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{office.hours}</span>
                  </div>
                  <div className="flex gap-2">
                    <MdPhone size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-gray-900">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <MdEmail size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-gray-900">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently asked questions</h2>
          <div className="bg-white rounded-xl border border-gray-100 divide-y">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-400 text-xl">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <p className="mt-3 text-sm text-gray-600 pr-8">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-400">
            For urgent technical issues, please call our support line. 
            <button onClick={() => navigate("/emergency")} className="text-gray-600 underline ml-1">
              Emergency contacts
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;