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
import FindInternship from "./pages/FindInternship";
import StudentNotification from "./pages/StudentNotification";
import StudentProfile from "./pages/StudentProfile";
import StudentMessages from "./pages/StudentMessages";
import StudentSavedInternships from "./pages/StudentSavedInternships";
import StudentsSettings from "./pages/StudentsSettings";
import InterviewHistory from "./pages/InterviewHistory";
import Help from "./pages/Help";
import TermsOfService from "./pages/TermsOfService";
import HowItWorks from "./pages/HowItWorks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import Chatbot from "./components/Chatbot";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();

  const isUsersRoute =
    location.pathname.startsWith("/student/dashboard") ||
    location.pathname.startsWith("/company/dashboard");

  return (
    <>
      <Toaster position="top-right" richColors />

      {/* Main Navbar */}
      {!isUsersRoute && <Navbar />}
      <ScrollToTopOnRoute smooth={true} />
      {/* Main Content with padding to account for fixed navbar*/}
      <main className={`min-h-screen  ${isUsersRoute ? "" : "pt-10"}    `}>
        {" "}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-account" element={<AuthPage />} />
          <Route path="/internships" element={<InternshipPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedUserType="student">
                <StudentDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="internships" element={<FindInternship />} />
            <Route path="applications" element={<MyApplication />} />
            <Route path="saved" element={<StudentSavedInternships />} />
            <Route path="messages" element={<StudentMessages />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentsSettings />} />
            <Route path="notifications" element={<StudentNotification />} />
            <Route path="interviews" element={<InterviewHistory />} />
            <Route path="help" element={<Help />} />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isUsersRoute && <Footer />}

      {/* Chatbot - only show on certain pages */}
      <Chatbot />
      <ScrollToTop />
    </>
  );
};

export default App;
