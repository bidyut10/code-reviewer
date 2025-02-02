// eslint-disable-next-line no-unused-vars
import React from "react";
import { Award, BarChart2, BrainCircuit, Gauge } from "lucide-react";

const Features = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-16 space-y-12">
      <section className="space-y-12 mt-20">
        <p className=" bg-gradient-to-r from-[#595859] to-black  text-transparent bg-clip-text text-start leading-loose text-3xl mb-8">
          Accelerate your development workflow <br /> with intelligent
          automation. Reduce manual tasks, eliminate bottlenecks, and focus on
          what truly matters - creating innovative solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-2 row-span-2 bg-black text-white p-8 rounded-3xl flex flex-col justify-between">
            <BrainCircuit className="w-14 h-14 mb-6" strokeWidth={0.6} />
            <div>
              <h3 className="text-2xl mb-4">AI Intelligence</h3>
              <p className="text-gray-200 text-base">
                Learn from every suggestion
              </p>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <div className="bg-[#c1ff72] text-white p-6 rounded-3xl flex flex-col justify-between">
              <BarChart2 className="w-10 h-10 mb-4" strokeWidth={1.1} />
              <h4 className="text-xl">Metrics</h4>
              <p className="text-gray-600 text-sm mt-2">
                Quantitative performance evaluation
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-3xl flex flex-col justify-between">
              <Award
                className="w-10 h-10 text-[#c1ff72] mb-4"
                strokeWidth={0.8}
              />
              <h4 className="text-xl">Reports</h4>
              <p className="text-gray-500 text-sm mt-2">
                Detailed insights and recommendations
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-white border border-gray-200 p-6 rounded-3xl flex items-center space-x-6">
            <Gauge className="w-12 h-12 text-[#c1ff72]" strokeWidth={1} />
            <div>
              <h4 className="text-xl mb-2">Performance Tracking</h4>
              <p className="text-gray-600 text-base">
                Real-time monitoring of code efficiency and optimization
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
