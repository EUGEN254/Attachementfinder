import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdLocationOn,
  MdBusiness,
  MdWork,
  MdArrowBack,
  MdAttachMoney,
  MdAccessTime,
} from "react-icons/md";
import { companies, internships } from "../assets/assets";

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get company details
  const company = companies.find(c => c.id === parseInt(id));
  
  // Get company's internships
  const companyInternships = internships.filter(
    internship => internship.companyId === parseInt(id)
  );

  if (!company) {
    return (
      <section className="mt-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Company not found</h2>
          <button
            onClick={() => navigate("/companies")}
            className="inline-flex items-center px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <MdArrowBack className="mr-2" />
            Back to Companies
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className=" mt-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/companies")}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <MdArrowBack size={20} className="mr-1" />
          Back to Companies
        </button>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 border border-gray-200">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <p className="text-gray-600 mb-4">{company.industry}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <MdLocationOn className="mr-1" size={18} />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MdBusiness className="mr-1" size={18} />
                  <span>12+ Interns Hired</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MdWork className="mr-1" size={18} />
                  <span>{companyInternships.length} Active Openings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
          
          {companyInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyInternships.map(internship => (
                <div
                  key={internship.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={internship.image}
                    alt={internship.role}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {internship.role}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {internship.description}
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-gray-600 text-xs">
                        <MdLocationOn className="mr-1" size={14} />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs">
                        <MdAccessTime className="mr-1" size={14} />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-xs col-span-2">
                        <MdAttachMoney className="mr-1" size={14} />
                        <span>KSh {internship.stipend}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {internship.requiredSkills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <MdWork size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No open positions</h3>
              <p className="text-gray-500">
                There are currently no internships available at {company.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyDetailsPage;