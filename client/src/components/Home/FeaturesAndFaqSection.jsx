/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BrainCircuit,
  Bug,
  Clock,
  Terminal,
  Shield,
  ChevronDown,
  ChevronUp,
  Languages,
} from "lucide-react";

const FeatureItem = ({ Icon, title, description }) => (
  <div className="group border-b border-gray-100 last:border-b-0">
    <div className="py-8 space-y-4">
      <div className="flex items-start gap-6">
        <Icon className="w-6 h-6 mt-1 text-[#50D890]" strokeWidth={1.5} />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer border-b border-gray-100 last:border-b-0"
    >
      <div className="py-6 space-y-4">
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-normal">{question}</h3>
          <div className="text-[#50D890]">
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

const FeaturesAndFaqSection = () => {
  const features = [
    {
      Icon: Terminal,
      title: "Automated Code Review",
      description:
        "AI-powered code analysis for comprehensive review and quality improvement.",
    },
    {
      Icon: Clock,
      title: "Faster Development",
      description:
        "Streamline your workflow with automated tasks and smart suggestions.",
    },
    {
      Icon: BrainCircuit,
      title: "Intelligent Optimization",
      description:
        "Context-aware recommendations for better code architecture.",
    },
    {
      Icon: Bug,
      title: "Bug Prevention",
      description: "Catch issues early with predictive error detection.",
    },
    {
      Icon: Shield,
      title: "Security First",
      description: "Deep security analysis to protect your applications.",
    },
    {
      Icon: Languages,
      title: "Multi-Language",
      description:
        "Support for all major programming languages and frameworks.",
    },
  ];

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
  {
    question: "What are tokens, and how do they work?",
    answer:
      "Tokens are credits you use for each AI-powered code review. One token equals one code review.",
  },
  {
    question: "How can I get free tokens?",
    answer: "Sign up to receive 10 free tokens to get started immediately.",
  },
  {
    question: "Can I buy more tokens?",
    answer:
      "Yes, you can purchase additional tokens at $1 per token without any subscription commitments.",
  },
  {
    question: "Do tokens expire?",
    answer:
      "No, tokens do not expire. You can use them whenever you need a code review.",
  },
];

  return (
    <div className="max-w-5xl mx-auto py-20">
      {/* Features */}
      <div className="space-y-16">
        <div className="space-y-3">
          <h2 className="text-3xl leading-loose text-center">
            Everything you need
          </h2>
          <p className="text-gray-600 text-center text-2xl leading-loose mx-auto">
            Powerful features to help you write better code, faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-32 space-y-16">
        <div className="space-y-3">
          <h2 className="text-3xl leading-loose text-center">
            Common questions
          </h2>
          <p className="text-gray-600 text-center text-2xl leading-loose mx-auto">
            Everything you need to know about the product.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

FeatureItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default FeaturesAndFaqSection;
