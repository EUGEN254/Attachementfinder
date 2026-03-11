import React from "react";
import { Toaster } from "sonner";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import InternshipPage from "./pages/Internship";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRoute from "./components/ScrollToTopOnRoute";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import MyApplication from "./pages/MyApplication";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./companies/companyPages/CompanyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppContext } from "./context/AppContext";
import StudentDashboardLayout from "./components/students/StudentDashboardLayout";
import CompanyDashboardLayout from "./companies/companyComponents/CompanyDashboardLayout";

const App = () => {
  const location = useLocation();

  const usersRoute = ["/student/dashboard", "/company/dashboard"];
  const isUsersRoute = usersRoute.includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" richColors />

      {/* Main Navbar */}
      {!isUsersRoute && <Navbar />}
      <ScrollToTopOnRoute smooth={true} />
      {/* Main Content with padding to account for fixed navbar*/}
      <main className={`min-h-screen  ${isUsersRoute ? "" : "pt-10"}    `}>
        {" "}
        {/* pt-16 if navbar is fixed */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-account" element={<AuthPage />} />
          <Route path="/internships" element={<InternshipPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />
          <Route path="/my-applications" element={<MyApplication />} />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedUserType="student">
                <StudentDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
          </Route>

          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute allowedUserType="company">
                <CompanyDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CompanyDashboard />} />
             </Route>
        </Routes>
      </main>
      {!isUsersRoute && <Footer />}
      <ScrollToTop />
    </>
  );
};

export default App;
