/* eslint-disable no-unused-vars */
import React from "react";
import HeroSection from "../components/Home/HeroSection";
import HeroNavbar from "../components/Home/HeroNavbar";
import Features from "../components/Home/Features";
import FeaturesAndFaqSection from "../components/Home/FeaturesAndFaqSection";
import Testimonial from "../components/Home/Testimonial";
import Footer from "../components/Home/Footer";
import TokenInfo from "../components/Home/TokenInfo";

const HomeNew = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-16 px-[10px] md:px-[0px]">
      <HeroNavbar />
      <HeroSection />
      <Features />
      <TokenInfo />
      <FeaturesAndFaqSection />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default HomeNew;
