import React from "react";
const PlanCard = ({ plan, isYearly, onSelectPlan }) => {
  const { name, monthlyPrice, yearlyPrice, savedAmount, features } = plan;
  const displayPrice = isYearly ? (yearlyPrice / 12).toFixed(2) : monthlyPrice;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      {isYearly && (
        <p className="text-sm text-gray-500 mt-1">
          You Saved ${savedAmount} if paid ${yearlyPrice} annually.
        </p>
      )}
      <div className="my-6">
        <span className="text-5xl font-bold text-indigo-600">${displayPrice}</span>
        <span className="text-gray-500">/month</span>
      </div>
      <p className="text-sm font-semibold text-gray-800 mb-4">Plan includes</p>
      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-center">
            {feature.included ? (
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            <span className="text-gray-700">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSelectPlan(plan)}
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg mt-8 hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
        Subscribe now
      </button>
    </div>
  );
};

export default PlanCard;