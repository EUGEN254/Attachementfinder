import React from "react";
import Header from "../components/Header";
import FeaturedInternship from "../components/FeaturedInternship";
import TrustedCompanies from "../components/TrustedCompanies";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <FeaturedInternship />
      <TrustedCompanies/>
    </div>
  );
};

export default HomePage;
