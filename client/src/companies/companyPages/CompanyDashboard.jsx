import React from "react";
import { useAppContext } from "../../context/AppContext";
import TopNavbar from "../../components/TopNavbar";

const CompanyDashboard = () => {
  const { logout } = useAppContext();
  return (
    <div>
      <div className="-mt-10">
        <TopNavbar />
      </div>
      <button
        type="button"
        onClick={logout}
        className="mt-22 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        logout
      </button>
    </div>
  );
};

export default CompanyDashboard;
