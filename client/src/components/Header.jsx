import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find the best{" "}
            <span className="text-gray-500">internships & attachments</span> in
            Kenya
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            InternshipHub connects students with top companies offering
            internships and attachments across Kenya.
          </p>

          {/* Search */}
          <div className="mt-8 flex shadow-md rounded-lg overflow-hidden border">
            <input
              type="text"
              placeholder="Search internships or companies..."
              className="flex-1 px-4 py-3 outline-none"
            />

            <button className="bg-gray-500 text-white px-6 hover:bg-gray-600 transition">
              Search
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/internships")}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
            >
              Browse Internships
            </button>

            <button 
            onClick={() => navigate("/companies")}
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              View Companies
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="students searching internships"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
