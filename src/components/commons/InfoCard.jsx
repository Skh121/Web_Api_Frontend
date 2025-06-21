import React from "react";

const InfoCard = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-[#5930c5] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Header text section */}
      <div className="p-8 sm:p-10">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 text-base lg:text-lg text-indigo-200">
          {description}
        </p>
      </div>

      {/* Image section */}
      <div className="mt-auto bg-gray-50 p-3 rounded-b-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default InfoCard;
