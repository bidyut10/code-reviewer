// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowUp } from "lucide-react";
import image1 from "../../assets/users/image1.jpg";
import image2 from "../../assets/users/image2.jpg";
import image3 from "../../assets/users/image3.jpg";
const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sounak Agarwal",
      role: "Senior Developer at HCL",
      image: image1,
      rating: 5,
      text: "CodeWiseAI has been a game-changer for us. It catches issues we might overlook and helps keep our codebase clean and consistent. It's like having an extra set of experienced eyes on every commit.",
    },
    {
      name: "Rupam Sen",
      role: "Software Developer",
      image: image2,
      rating: 5,
      text: "This tool is a lifesaver! The detailed AI-driven reviews give us actionable insights on code improvements. It's helped our team write better, cleaner code and saved us countless hours.",
    },
    {
      name: "Subhajit Khan",
      role: "Junior Developer",
      image: image3,
      rating: 5,
      text: "Honestly, it's amazing. CodeWiseAI doesn't just flag issues; it actually teaches me how to write better code with clear explanations and best practice suggestions. I feel like I'm learning on the job.",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl">
            Trusted by <span className="text-purple-400">developers</span>{" "}
            worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl text-xl mx-auto">
            See how CodeWiseAI is helping teams improve their code quality and
            development workflow
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className="absolute -top-6 left-8">
            <Quote
              className="w-12 h-12 bg-white text-purple-300"
              strokeWidth={1.5}
            />
          </div>

          <div className="border border-gray-200 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Testimonial Content */}
              <div className="lg:col-span-8 space-y-6 w-full">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-purple-400 text-purple-400"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <p className="text-xl text-gray-800 leading-relaxed w-full">
                  &quot;{testimonials[activeIndex].text}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-normal">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute -bottom-6 right-8 flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:border-purple-200 transition-colors"
            >
              <ChevronLeft
                className="w-5 h-5 text-gray-600"
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:border-purple-200 transition-colors"
            >
              <ChevronRight
                className="w-5 h-5 text-gray-600"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "bg-purple-400 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-end items-end">
          <button
            onClick={scrollToTop}
            className={` bg-black hover:bg-purple-400 text-white p-4 rounded-full shadow-md transition-all duration-300 transform group translate-y-0 opacity-100
        `}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="animate-pulse font-bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
