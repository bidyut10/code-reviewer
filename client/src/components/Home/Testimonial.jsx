// eslint-disable-next-line no-unused-vars
import React from "react";
import { Quote, Heart, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Sounak Agarwal",
    role: "Senior Developer at HCL",
    text: "You know what's amazing? Having CodeWiseAI watch over our code. It's like having that one super-detail-oriented friend who catches all the little things we might miss. Been using it for months now, and honestly, our code quality has never been better. Such a relief to have this extra layer of confidence before pushing code!",
    highlight: "our code quality has never been better",
    background: "#38bdf8",
    isQuote: true,
  },
  {
    name: "Rupam Sen",
    role: "Software Developer",
    text: "I remember when we first started using CodeWiseAI - it felt like having a senior dev looking over my shoulder, but in a good way! It's caught so many potential issues before they could cause problems.",
    background: "#ffffff",
    logoText: "CODEGUARD",
    isLogo: true,
  },
  {
    name: "Jörg Schmidt",
    role: "Founder of CodeCraft Solutions",
    text: "CodeWiseAI makes it incredibly easy for me to secure clean code and maintain high standards with developers that resonate with my team's goals.",
    highlight: "incredibly easy for me to secure clean code",
    background: "#fde047",
    isQuote: true,
  },
  {
    name: "MergeFlow",
    logoText: "MERGE FLOW",
    background: "#ffffff",
    isLogo: true,
  },
  {
    name: "Zain Khan",
    role: "Lead Engineer",
    background: "#4ade80",
    hasProfile: true,
  },
  {
    name: "CodePro",
    logoText: "C⌘DE PRO",
    background: "#ffffff",
    isLogo: true,
  },
  {
    name: "Ali Sharma",
    role: "Developer Advocate",
    background: "#fb923c",
    hasProfile: true,
  },
  {
    name: "Paula Echeverria",
    role: "Manager at DevHub Community",
    text: "CodeWiseAI has become a valuable channel for connecting better code practices with our teams. The platform simplifies the process, and implementations are always secure, making it a reliable tool for managing our codebase.",
    highlight: "platform simplifies the process",
    background: "#c084fc",
    isQuote: true,
  },
  {
    name: "Bonnie Weber",
    role: "Senior QA Engineer",
    background: "#7dd3fc",
    hasProfile: true,
  },
  {
    name: "CodeBuddy",
    logoText: "〈/〉",
    background: "#ffffff",
    isLogo: true,
  },
];

const TestimonialCard = ({ item }) => {
  const baseClass = `rounded-xl p-6 h-full w-full overflow-hidden relative flex flex-col justify-between`;

  if (item.isQuote) {
    return (
      <div
        className={`${baseClass} text-black`}
        style={{ backgroundColor: item.background }}
      >
        <Quote className="absolute top-4 left-4 w-6 h-6 opacity-10" />
        <div className="z-10 mt-10">
          <p className="mb-4 text-sm">"{item.text}"</p>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-gray-700">{item.role}</p>
        </div>
        <Sparkles className="w-4 h-4 mt-4 self-end" />
      </div>
    );
  }

  if (item.isLogo) {
    return (
      <div
        className={`${baseClass} bg-white shadow-xl flex items-center justify-center text-black font-bold text-xl pt-12`}
        style={{ backgroundColor: item.background }}
      >
        <p>{item.logoText}</p>
      </div>
    );
  }

  if (item.hasProfile) {
    return (
      <div
        className={`${baseClass} text-white`}
        style={{ backgroundColor: item.background }}
      >
        <div>
          <p className="font-semibold text-lg">{item.name}</p>
          <p className="text-sm">{item.role}</p>
        </div>
        <Heart className="w-4 h-4 mt-4 self-end" />
      </div>
    );
  }

  return null;
};

const TestimonialGrid = () => {
  return (
    <div id="testimonials" className="py-32 px-4 md:px-0 w-full max-w-7xl">
      <div className="space-y-3 mb-16">
        <p className="text-4xl text-center font-semibold text-gray-900 ">
          Powered by passion,
        </p>
        <p className="text-4xl text-center font-semibold text-gray-900 leading-snug">
          built for people <span className="block sm:inline">like you</span>
        </p>
        <p className="text-gray-600 text-start md:text-center">
          Join the community of leading creators and get more out of your
          business.
        </p>
      </div>

      {/* First Row: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        {testimonials.slice(0, 3).map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </div>

      {/* Second Row: 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
        {testimonials.slice(3, 7).map((item, index) => (
          <TestimonialCard key={index + 3} item={item} />
        ))}
      </div>

      {/* Third Row: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {testimonials.slice(7, 10).map((item, index) => (
          <TestimonialCard key={index + 7} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialGrid;
