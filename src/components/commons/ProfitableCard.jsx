import React from "react";
import Analytics from "../../assets/images/Analytics.webp"

const ProfitableCard = () => {
  return (
    <div className="flex justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main grid layout for the hero section. */}
        {/* It's a 1-column grid on mobile and a 2-column grid on larger screens (`lg:grid-cols-2`). */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">
              Ready to become a
              <span className="block mt-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                profitable trader?
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
              The one tool that lets you do everything you need to improve your
              trading strategy. Get started today.
            </p>
            <div className="mt-8">
              <button className="px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started Today &rsaquo;
              </button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex items-center justify-center p-4">
            <img
              src={Analytics}
              alt="Trading platform interface"
              className="rounded-xl shadow-2xl transform lg:rotate-3 w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitableCard;
