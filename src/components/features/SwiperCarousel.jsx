import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Analytics from "../../assets/images/Analytics.webp";
import Education from "../../assets/images/Education.webp";
import Mentoring from "../../assets/images/Mentoring.webp";
import Notebook from "../../assets/images/Notebook.webp";
import Playbook from "../../assets/images/Playbook.webp";
import Reporting from "../../assets/images/Reporting.webp";
import JournalImage from "../../assets/images/JournalImage.webp";
import {
  BarChart2,
  FileText,
  ClipboardList,
  Layout,
  Wrench,
  RotateCw,
  Play,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const features = [
  { label: "Analytics", icon: <BarChart2 size={28} />, image: Analytics },
  { label: "Notebook", icon: <FileText size={28} />, image: Notebook },
  { label: "Reporting", icon: <ClipboardList size={28} />, image: Reporting },
  { label: "Journal", icon: <Layout size={28} />, image: JournalImage },
  { label: "Education", icon: <Wrench size={28} />, image: Education },
  { label: "Mentoring", icon: <RotateCw size={28} />, image: Mentoring },
  { label: "Playbook", icon: <Play size={28} />, image: Playbook },
];

const SwiperCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center w-[85%] mx-auto py-10 space-y-6">
      {/* Swiper + Arrows */}
      <div className="relative flex items-center justify-center w-full">
        {/* Left Arrow */}
        <div className="swiper-button-prev text-gray-600 hover:text-black transition-all absolute left-0 z-10 ml-2 md:ml-6 w-[10%]" />

        {/* Swiper Container */}
        <div className="w-[80%] px-4">
          <Swiper
            slidesPerView={4.2}
            spaceBetween={24}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4.2 },
            }}
          >
            {features.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div
                  onClick={() => setActiveIndex(idx)}
                  className={`flex flex-col items-center justify-center text-center p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? "bg-[#1C1C38] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow"
                  }`}
                >
                  {item.icon}
                  <p className="mt-2 text-sm font-medium">{item.label}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Arrow */}
        <div className="swiper-button-next text-gray-600 hover:text-black transition-all absolute right-0 z-10 mr-2 md:mr-6 w-[10%]" />
      </div>

      {/* Image Below the Container */}
      <div className="w-full">
        <img
          src={features[activeIndex]?.image}
          alt={features[activeIndex]?.label}
          className="rounded-xl w-full object-cover shadow-md transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default SwiperCarousel;
