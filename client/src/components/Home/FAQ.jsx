/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer border-b border-gray-100 last:border-b-0 w-full"
    >
      <div className="py-6 space-y-4 w-full">
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-normal">{question}</h3>
          <div className="text-[#323232]">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <p className="text-gray-600 pb-4">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI code review work?",
      answer:
        "Our AI analyzes your code using advanced machine learning, identifying potential issues and suggesting improvements based on industry best practices.",
    },
    {
      question: "Is my code secure and private?",
      answer:
        "Yes, we use end-to-end encryption. Your code is analyzed in isolated environments and never stored permanently.",
    },
    {
      question: "Which languages do you support?",
      answer:
        "We support Python, JavaScript, Java, TypeScript, C++, Ruby, Go, and more. Our language support is constantly expanding.",
    },
    {
      question: "How accurate is the AI?",
      answer:
        "Our AI maintains an 85% accuracy rate in identifying improvements and preventing bugs, thanks to continuous training on quality code repositories.",
    },
    // {
    //   question: "What are tokens, and how do they work?",
    //   answer:
    //     "Tokens are credits you use for each AI-powered code review. One token equals one code review.",
    // },
    // {
    //   question: "How can I get free tokens?",
    //   answer: "Sign up to receive 10 free tokens to get started immediately.",
    // },
    // {
    //   question: "Can I buy more tokens?",
    //   answer:
    //     "Yes, you can purchase additional tokens at $1 per token without any subscription commitments.",
    // },
    // {
    //   question: "Do tokens expire?",
    //   answer:
    //     "No, tokens do not expire. You can use them whenever you need a code review.",
    // },
  ];

  return (
    <div id="faq" className=" bg-white w-full max-w-7xl flex justify-center items-center py-20 px-4 md:px-0">
      <div className="mt-32 space-y-16">
        <div className="space-y-3">
          <p className="text-4xl text-start md:text-center font-semibold text-gray-900">
            Everything you need
          </p>
          <p className="text-4xl text-start md:text-center font-semibold text-gray-900">
            to know about the product.
          </p>
        </div>

        <div className="w-full max-w-7xl">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default FAQ;
