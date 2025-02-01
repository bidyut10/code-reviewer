// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BrainCircuit,
  Bug,
  Clock,
  Terminal,
  Shield,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Languages,
} from "lucide-react";

const FeatureItem = ({ Icon, title, description }) => (
  <div className="w-full max-w-5xl mx-auto py-10">
    <div className="flex flex-col md:flex-row md:gap-40 justify-between gap-10">
      <Icon className="w-10 h-10 mt-2 " strokeWidth={0.7} />
      <div className="flex-1">
        <h1 className="text-xl mb-2 font-normal ">{title}</h1>
        <p className="text-xl text-gray-700 leading-loose">{description}</p>
      </div>
    </div>
    <div className="border-b border-gray-100 mt-10"></div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <div
        className="flex justify-between items-center cursor-pointer transition-colors duration-300 hover:text-green-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-normal text-gray-800">{question}</h3>
        {isOpen ? (
          <ChevronUp className="text-green-300 transition-transform duration-300" />
        ) : (
          <ChevronDown className="text-green-300 transition-transform duration-300" />
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <p className="text-xl text-gray-600 leading-loose">{answer}</p>
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
        "Leverage advanced AI to perform comprehensive code reviews. Our intelligent system identifies potential bugs, code smells, and performance bottlenecks, providing actionable insights to improve your codebase's overall quality and maintainability.",
    },
    {
      Icon: Clock,
      title: "Streamlined Development Workflow",
      description:
        "Dramatically reduce development time by automating repetitive tasks. From code generation to intelligent refactoring suggestions, our AI assistant helps you focus on creative problem-solving and building innovative features.",
    },
    {
      Icon: BrainCircuit,
      title: "Intelligent Code Optimization",
      description:
        "Receive real-time, context-aware suggestions that go beyond simple syntax improvements. Our AI analyzes your entire project's architecture, recommending design patterns, performance optimizations, and best practices tailored to your specific tech stack.",
    },
    {
      Icon: Bug,
      title: "Proactive Error Prevention",
      description:
        "Stay ahead of potential issues with predictive error detection. Our AI learns from millions of code repositories to identify subtle bugs and vulnerabilities before they become critical, ensuring robust and reliable software development.",
    },
    {
      Icon: Shield,
      title: "Security-First Code Analysis",
      description:
        "Protect your applications from potential security risks. Our AI conducts deep security scans, identifying vulnerabilities, recommending secure coding practices, and helping you maintain compliance with industry security standards.",
    },
    {
      Icon: Lightbulb,
      title: "Continuous Learning & Skill Enhancement",
      description:
        "Transform code reviews into personalized learning experiences. Receive detailed explanations for suggested changes, understand the reasoning behind optimizations, and gradually improve your coding skills with each iteration.",
    },
    {
      Icon: Languages,
      title: "Seamless Multi-Language Support",
      description:
        "Break language barriers with our versatile AI assistant. Whether you're working with Python, JavaScript, Java, or multiple languages in a single project, our tool provides consistent, high-quality insights across your entire development ecosystem.",
    },
  ];

  const faqs = [
    {
      question: "How does the AI code review work?",
      answer:
        "Our AI analyzes your code using advanced machine learning algorithms, comparing it against millions of code repositories to identify potential bugs, performance issues, and best practices.",
    },
    {
      question: "Is my code safe and private?",
      answer:
        "Absolutely. We use end-to-end encryption and never store your code permanently. All analysis is done in a secure, isolated environment with strict privacy protocols.",
    },
    {
      question: "What programming languages are supported?",
      answer:
        "We currently support major languages including Python, JavaScript, Java, TypeScript, C++, Ruby, and Go. We're continuously expanding our language support.",
    },
    {
      question: "How accurate are the AI suggestions?",
      answer:
        "Our AI is trained on millions of high-quality code repositories and continuously learns. We boast an 85% accuracy rate in identifying potential improvements and preventing bugs.",
    },
    {
      question: "How often are AI models updated?",
      answer:
        "We continuously update our AI models with the latest code patterns, best practices, and emerging technologies. Major model updates are released quarterly to ensure cutting-edge performance.",
    }
  ];

  return (
    <div>
        
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          Icon={feature.Icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
      <div className="max-w-5xl mx-4 md:mx-0 py-16">
        <h2 className="text-3xl leading-relaxed text-center mb-12 text-gray-900">
          Frequently Asked <span className="text-green-300">Questions</span>
        </h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
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
