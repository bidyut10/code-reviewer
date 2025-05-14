/* eslint-disable no-unused-vars */
import React from "react";
import Features from "../components/Home/Features";
import FAQ from "../components/Home/FAQ";
import Testimonial from "../components/Home/Testimonial";
import Footer from "../components/Home/Footer";
import Home from "../components/Home/Home";
import Navbar from "../components/Home/Navbar";

const HomeNew = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Navbar />
      <Home />
      <Features />
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomeNew;
