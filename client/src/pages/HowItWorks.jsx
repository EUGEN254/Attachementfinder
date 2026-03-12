// pages/HowItWorks.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "1",
      title: "Build Your Profile",
      description: "Create a comprehensive profile showcasing your skills, education, and aspirations. Our smart system helps you highlight what employers truly seek.",
      metrics: "85% of completed profiles receive interview requests",
      action: "Start Building"
    },
    {
      number: "2",
      title: "Discover Matches",
      description: "Access curated opportunities that align with your career goals. Our matching algorithm considers your unique strengths and preferences.",
      metrics: "500+ active internship listings",
      action: "Browse Opportunities"
    },
    {
      number: "3",
      title: "Connect & Apply",
      description: "Apply seamlessly and track every application. Receive real-time updates and communicate directly with hiring managers.",
      metrics: "Average response time: 48 hours",
      action: "View Openings"
    },
    {
      number: "4",
      title: "Launch Your Career",
      description: "Accept offers, complete onboarding, and begin your professional journey with confidence and support.",
      metrics: "92% of interns receive full-time offers",
      action: "Get Started"
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      role: "Software Engineering Intern → Full-time Developer",
      company: "TechCorp",
      image: "SC",
      quote: "This platform connected me with mentors who shaped my career path."
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Intern → Brand Manager",
      company: "Global Media Group",
      image: "MR",
      quote: "The application process was transparent and supportive throughout."
    },
    {
      name: "Priya Patel",
      role: "Data Science Intern → Analytics Lead",
      company: "DataDrive Inc",
      image: "PP",
      quote: "Found opportunities I couldn't discover anywhere else."
    }
  ];

  const resources = [
    {
      title: "Resume Guide",
      description: "Expert tips for crafting compelling resumes",
      type: "Guide",
      readTime: "5 min"
    },
    {
      title: "Interview Prep",
      description: "Common questions and winning strategies",
      type: "Workshop",
      readTime: "10 min"
    },
    {
      title: "Portfolio Tips",
      description: "Showcase your work effectively",
      type: "Article",
      readTime: "4 min"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
   
      {/* Hero */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition">←</span>
            Back
          </button>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Your journey starts here
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              From application to 
              <span className="text-gray-500"> opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              A straightforward path to finding meaningful internship experiences 
              that launch your career forward.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium"
              >
                Create free account
              </button>
              <button
                onClick={() => navigate("/demo")}
                className="px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-300 font-medium text-gray-700"
              >
                Watch demo →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-between gap-8">
            <div>
              <div className="text-3xl font-bold text-gray-900">15k+</div>
              <div className="text-sm text-gray-500">Active students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-500">Partner companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-gray-500">Placement rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-500">Avg. response time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Four steps to your next opportunity
          </h2>
          <p className="text-gray-600">
            Designed to be straightforward, supportive, and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition h-full">
                <div className="text-5xl font-light text-gray-200 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  {step.metrics}
                </div>
                <button className="text-sm text-gray-900 font-medium hover:text-gray-600">
                  {step.action} →
                </button>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-gray-300">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Real stories from real students
              </h2>
              <p className="text-gray-600 max-w-xl">
                See how InternConnect helped launch careers across industries.
              </p>
            </div>
            <button className="hidden md:block text-gray-900 font-medium">
              View all stories →
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                    {story.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-xs text-gray-500">{story.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">"{story.quote}"</p>
                <div className="text-xs font-medium text-gray-500">{story.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Resources to help you succeed
            </h2>
            <p className="text-gray-600 max-w-xl">
              Guides, templates, and tips from industry experts.
            </p>
          </div>
          <button className="hidden md:block text-gray-900 font-medium">
            Browse all resources →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <div key={idx} className="border border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-xs font-medium rounded-full">
                  {resource.type}
                </span>
                <span className="text-xs text-gray-400">{resource.readTime}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <button className="text-sm text-gray-900 font-medium">Read more →</button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to find your internship?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of students who've launched their careers through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 font-medium"
            >
              Create free account
            </button>
            <button
              onClick={() => navigate("/internships")}
              className="px-6 py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 font-medium"
            >
              Browse internships
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-6">
            No credit card required. Free for students forever.
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default HowItWorks;