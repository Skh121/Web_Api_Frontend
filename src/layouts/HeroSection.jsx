import React from "react";
import SwiperCarousel from "../components/features/SwiperCarousel";
import InfoCard from "../components/commons/InfoCard";
import InfoCardImage1 from "../assets/images/InfoCardImage1.webp";
import InfoCardImage2 from "../assets/images/InfoCardImage2.webp";
import InfoCardImage3 from "../assets/images/InfoCardImage3.webp";
import ProfitableCard from "../components/commons/ProfitableCard";

const HeroSection = () => {
  return (
    <section className="text-center py-16 px-4 bg-white">
      <div className="sm:w-[90%] md:w-[75%] lg:w-[65%] xl:w-[60%] mx-auto">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
          The Last <span className="text-purple-600">Trading Journal</span>{" "}
          You'll <span className="text-pink-500">Ever Need</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          TradeVerse helps you unlock better trading decisions through
          data-backed journaling, in-depth performance tracking and actionable
          insights.
        </p>
        <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 font-semibold text-white px-8 py-3 md:px-10 lg:px-12 xl:px-15 rounded-md shadow-md cursor-pointer transition-all duration-300 hover:from-indigo-500 hover:to-red-400">
          Get Started Now
        </button>
      </div>
      <SwiperCarousel />
      <div className="mt-16 mb-10 w-[90%] mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Dive deeper into your strategy"
          description="Reports to help you visualize your trading performance."
          imageUrl={InfoCardImage1}
        />
        <InfoCard
          title="Understand your trading behaviors"
          description="Gain Key insights in your trading behaviors by digging deeper into reports."
          imageUrl={InfoCardImage2}
        />
        <InfoCard
          title="Get a summary of what's working for you"
          description="Curated summaries for you to understand your strengths and weakness as a trader."
          imageUrl={InfoCardImage3}
        />
      </div>
      <ProfitableCard/>
    </section>
  );
};

export default HeroSection;
