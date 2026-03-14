import React, { useEffect, useState } from "react";
import { MdBookmark, MdDelete, MdWork, MdCalendarToday } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import internshipService from "../services/internshipService";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";

const StudentSavedInternships = () => {
  const { user } = useAppContext();
  const [savedInternships, setSavedInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint for fetching saved internships
        const response = await internshipService.getInternships({ saved: true });
        if (response.data && response.data.data) {
          setSavedInternships(response.data.data);
        } else {
          setSavedInternships([]);
        }
      } catch (err) {
        setError("Failed to load saved internships.");
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  // Remove internship from saved
  const handleRemove = async (internshipId) => {
    // Replace with your actual API endpoint for removing saved internship
    // Example: await internshipService.removeSavedInternship(internshipId);
    setSavedInternships((prev) => prev.filter((i) => i._id !== internshipId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-2">
          <MdBookmark className="text-blue-500 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-900">Saved Internships</h2>
        </div>
        {loading ? (
          <StatsSkeleton />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : savedInternships.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            <MdBookmark className="text-4xl mx-auto mb-2" />
            <p>No saved internships found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedInternships.map((intern) => (
              <div
                key={intern._id}
                className="group p-4 border border-gray-200 rounded-xl bg-white shadow hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {intern.title}
                  </h4>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <MdCalendarToday />
                    {intern.posted_at ? new Date(intern.posted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{intern.company_name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-full">{intern.type || "Internship"}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full">{intern.location || "Remote"}</span>
                </div>
                <button
                  onClick={() => handleRemove(intern._id)}
                  className="flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs mt-2"
                >
                  <MdDelete /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSavedInternships;