import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdPlayCircleFilled,
  MdPlayCircleOutline,
  MdPlayArrow,
  MdOndemandVideo,
} from "react-icons/md";
const Header = () => {
  const [openVideo, setOpenVideo] = useState(false);
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

            <div className="relative group">
              <button
                onClick={() => setOpenVideo(!openVideo)}
                className="flex items-center justify-center hover:text-gray-600 animate-shake"
              >
                <MdPlayCircleFilled size={60} />
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                Watch Demo
              </span>
            </div>
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

      {openVideo && (
        <div
          onClick={() => setOpenVideo(false)}
          className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className=" p-4 rounded-lg">
            <button
              onClick={() => setOpenVideo(false)}
              className=" hover:text-gray-700 bg-black text-white px-4 py-2 rounded mb-4 transition"
            >
              Close
            </button>
            <iframe
              width="566"
              height="387"
              src="https://www.youtube.com/embed/E4Su1zTSyis"
              title="INTERNSHIP Interview Questions And Answers! (How To PASS a JOB INTERN Interview!)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
