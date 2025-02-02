import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowUp, Quote } from "lucide-react";
import image1 from "../../assets/users/image1.jpg";
import image2 from "../../assets/users/image2.jpg";
import image3 from "../../assets/users/image3.jpg";

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      name: "Sounak Agarwal",
      role: "Senior Developer at HCL",
      image: image1,
      text: "You know what's amazing? Having CodeWiseAI watch over our code. It's like having that one super-detail-oriented friend who catches all the little things we might miss. Been using it for months now, and honestly, our code quality has never been better. Such a relief to have this extra layer of confidence before pushing code!",
      highlight: "our code quality has never been better",
    },
    {
      name: "Rupam Sen",
      role: "Software Developer",
      image: image2,
      text: "I remember when we first started using CodeWiseAI - it felt like having a senior dev looking over my shoulder, but in a good way! It's caught so many potential issues before they could cause problems. The suggestions are always spot-on, and I've learned so much just from following its advice. Seriously can't imagine coding without it now.",
      highlight: "learned so much just from following its advice",
    },
    {
      name: "Subhajit Khan",
      role: "Junior Developer",
      image: image3,
      text: "As someone just starting out, CodeWiseAI has been like having a personal mentor. It doesn't just point out what's wrong - it explains why and shows how to make it better. The best part? I'm actually becoming a better developer because of it. Every code review feels like a mini learning session!",
      highlight: "becoming a better developer because of it",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (direction) => {
    setActiveIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % testimonials.length;
      }
      return (prev - 1 + testimonials.length) % testimonials.length;
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16">
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col justify-center items-center space-y-6">
          <Quote className="w-12 h-12 text-[#50D890]" strokeWidth={1} />
          <h2 className="text-3xl leading-relaxed">
            From the developers who use CodeWiseAI every day
          </h2>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Author info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full border-4 border-[#50D890]/20"
                />
                <div>
                  <h3 className="text-xl font-normal mb-1">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-gray-600">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>

              {/* Testimonial text */}
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-gray-800">
                  {testimonials[activeIndex].text
                    .split(testimonials[activeIndex].highlight)
                    .map((part, index, array) => (
                      <React.Fragment key={index}>
                        {part}
                        {index < array.length - 1 && (
                          <span className="text-[#50D890]">
                            {testimonials[activeIndex].highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </p>
              </div>

              {/* Hand-drawn style separator */}
              <div className="w-24 h-1 bg-[#50D890] rounded-full mx-auto opacity-50 transform -rotate-2"></div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <button
              onClick={() => navigate("prev")}
              className="group flex items-center gap-2 text-gray-600 hover:text-[#50D890] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-normal">Previous story</span>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-150 ${
                    idx === activeIndex
                      ? "bg-[#50D890] scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate("next")}
              className="group flex items-center gap-2 text-gray-600 hover:text-[#50D890] transition-colors"
            >
              <span className="text-sm font-normal">Next story</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 p-3 bg-black/80 hover:bg-[#50D890] rounded-full shadow-lg transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </section>
  );
};

export default Testimonial;
