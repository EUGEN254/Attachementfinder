import React from "react";
import { useAppContext } from "../context/AppContext";

const StudentDashboard = () => {
  const { logout } = useAppContext();
  return (
    <div>
      <button
        type="button"
        onClick={logout}
        className="px-4 mt-33 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        logout
      </button>
    </div>
  );
};

export default StudentDashboard;
