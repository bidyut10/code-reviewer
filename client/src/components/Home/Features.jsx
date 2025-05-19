import {
  Code,
  Zap,
  Brain,
  Bug,
  Shield,
  Globe,
  Github,
  Star,
  Languages,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Automated Code Review",
      icon: <Code size={24} strokeWidth={1} />,
      description:
        "AI-powered code analysis that delivers comprehensive review and quality improvement suggestions.",
    },
    {
      title: "Faster Development",
      icon: <Zap size={24} strokeWidth={1} />,
      description:
        "Streamline your workflow with smart automation and expert suggestions that boost productivity.",
    },
    {
      title: "Intelligent Optimization",
      icon: <Brain size={24} strokeWidth={1} />,
      description:
        "Context-aware recommendations that enhance your code architecture and performance.",
    }
  ];

  return (
    <div id="feature" className="px-4 md:px-0 w-full py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="space-y-3 mb-16">
          <p className="text-4xl text-center font-semibold text-gray-900 ">
            Focus on creating
          </p>
          <p className="text-4xl text-center font-semibold text-gray-900 leading-snug">
            while we handle{" "}
            <span className="block sm:inline">smarter code</span>
          </p>
          <p className="text-gray-600 mt-4 text-start md:text-center px-0 md:px-64 leading-relaxed">
            CodewiseAI transforms how developers work by providing intelligent,
            real-time code analysis. Our platform helps you write cleaner, more
            efficient code through actionable insights that catch issues before
            they become problems.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Everything you need */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8">
            <h3 className="text-2xl font-normal mb-4 text-[#1a1a1a] flex items-center">
              <Shield className="text-[#beff69] mr-3" size={24} />
              Everything you need
            </h3>
            <p className="mb-6 text-[#4a4a4a]">
              Essential features engineered to elevate your coding workflow and
              dramatically increase your development velocity.
            </p>

            <div className="space-y-4">
              {features.slice(0, 3).map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center p-3 rounded-full bg-[#e4ffbe] hover:bg-[#f6f6f6] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md border border-[#eeeeee]">
                    <span className="text-[#e4ffbe]">{feature.icon}</span>
                  </div>
                  <span className="ml-4 font-normal text-[#333333]">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Automated */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ecffdb] rounded-full opacity-15 blur-2xl"></div>
            <h3 className="text-2xl font-normal mb-4 text-[#1a1a1a] flex items-center">
              <Zap className="text-[#c1ff72] mr-3" size={24} />
              Automated Intelligence
            </h3>
            <p className="mb-6 text-[#4a4a4a]">
              Our AI handles comprehensive code reviews while you focus on
              creating innovative solutions. Save hours of debugging time every
              week.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-8 relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg border border-[#eeeeee]">
                <Code className="text-[#c1ff72]" size={24} strokeWidth={1} />
              </div>
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-[#c1ff72] shadow-lg">
                <Zap className="text-white" size={44} strokeWidth={1.2} />
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-lg border border-[#eeeeee]">
                <Bug className="text-[#4a4a4a]" size={24} strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* Productive */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8">
            <h3 className="text-2xl font-normal mb-4 text-[#1a1a1a] flex items-center">
              <Brain className="text-[#c1ff72] mr-3" size={24} />
              Productivity Boosted
            </h3>
            <p className="mb-6 text-[#4a4a4a]">
              Reach your development milestones faster with intelligent
              suggestions that eliminate repetitive tasks and streamline your
              workflow.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="flex items-end">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-6 h-16 rounded-full mb-2 bg-[#eeeeee]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#e4ffbe]"></div>
                </div>
                <div className="flex flex-col items-center mx-4">
                  <div className="w-6 h-6 rounded-full mb-2 bg-[#d5ff9d]"></div>
                  <div className="w-6 h-24 rounded-full bg-[#c1ff72]"></div>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <div className="w-6 h-12 rounded-full mb-2 bg-[#dddddd]"></div>
                  <div className="w-6 h-10 rounded-full bg-[#d5ff9d]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row with two wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free and Open Source */}
          <div className="bg-[#c1ff72] rounded-2xl shadow-lg hover:shadow-xl transition-all p-8  relative overflow-hidden">
            <h3 className="text-2xl font-normal mb-4 text-[#1a1a1a] flex items-center">
              <Github className="text-[#10100f] mr-3" size={22} />
              Community-Driven Open Source
            </h3>
            <p className="mb-6 text-[#4a4a4a]">
              Join our thriving developer community completely free of charge.
              Contribute to shaping the future of AI-powered code reviews and
              benefit from collective expertise.
            </p>

            <div className="mt-8 pl-4 border-l-4 border-[#4d4d4d]">
              <div className="flex items-center">
                <Github size={16} className="text-[#4a4a4a] mr-3" />
                <p className="text-md font-normal text-[#3d3c3c]">
                  100% Open Source Forever
                </p>
              </div>
              <p className="mt-1 text-[#4a4a4a]">
                Accessible on GitHub with an active, passionate developer
                community
              </p>
            </div>

            <div className="mt-8 rounded-lg flex items-center justify-between px-6 py-5 bg-white shadow-md border border-[#eeeeee]">
              <div className="flex items-center">
                <div className="h-10 w-1 bg-[#171716] mr-4"></div>
                <div className="flex flex-col">
                  <div className="text-sm text-[#666666]">Active users</div>
                  <div className="text-xl font-normal text-[#1a1a1a]">
                    1000+
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  <div className="px-4 py-2 rounded-md flex items-center bg-[#080808] hover:bg-[#111111] transition-colors cursor-pointer">
                    <Star
                      size={16}
                      className="text-white mr-2"
                      fill="currentColor"
                    />
                    <span className="text-white font-normal">Star Project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All-in-one place */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-8  relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#ecffdb] rounded-full opacity-15  blur-3xl"></div>
            <h3 className="text-2xl font-normal mb-4 text-[#1a1a1a] flex items-center">
              <Globe className="text-[#c1ff72] mr-3" size={24} />
              Universal Language Solution
            </h3>
            <p className="mb-6 text-[#4a4a4a]">
              One platform to manage code quality across your entire tech stack.
              Supports all major programming languages and frameworks with
              specialized language-specific insights.
            </p>

            <div className="flex justify-center mt-8">
              <div className="relative w-48 h-48">
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-[#c1ff72] shadow-lg z-10">
                  <Languages className="text-white" size={24} />
                </div>

                {/* JS */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-10 h-10 rounded-full flex items-center justify-center bg-[#f7e05a] border-border-white shadow-md z-20">
                  <span className="text-white font-medium text-xs">JS</span>
                </div>

                {/* PY */}
                <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-[#4584b6] border-border-white shadow-md z-20">
                  <span className="text-white font-medium text-xs">PY</span>
                </div>

                {/* GO */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-10 h-10 rounded-full flex items-center justify-center bg-[#8adeff] border border-white shadow-md z-20">
                  <span className="text-white font-medium text-xs">GO</span>
                </div>

                {/* TS */}
                <div className="absolute top-1/2 left-0 transform -translate-x-1/4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-[#3178c6] border-border-white shadow-md z-20">
                  <span className="text-white font-medium text-xs">TS</span>
                </div>

                {/* Connect all with a circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border-2 border-dashed border-[#d5ff9d] z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
