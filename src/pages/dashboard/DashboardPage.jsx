import React from "react";
import { Navbar } from "../../components/Navs/Navbar.jsx";
import { Footer } from "../../components/Footer/Footer.jsx"
import { HomePage } from "../../components/HomePage/HomePage.jsx";


export const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className='dashboard-background'/>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
};