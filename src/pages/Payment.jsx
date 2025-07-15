import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { usePlan } from "../auth/PlanContext";
import PlanCard from "../components/commons/PlanCard";
import { AuthContext } from "../auth/AuthProvider";

const Payment = () => {
  const navigate = useNavigate();
  const { isYearly, setIsYearly, setSelectedPlan } = usePlan();
  const { isAuthenticated, role } = useContext(AuthContext);

  const plans = [
    {
      name: "Basic",
      monthlyPrice: 24,
      yearlyPrice: 288,
      savedAmount: 60,
      features: [
        { text: "Can add up to 1 account", included: true },
        { text: "Data storage allowed up to 1Gb", included: true },
        { text: "Can add up to 3 playbooks", included: true },
        { text: "Can invite up to 5 mentees", included: true },
        { text: "Backtesting", included: true },
        { text: "Seconds speed in backtesting", included: false },
        { text: "Trade Replay", included: false },
      ],
    },
    {
      name: "Pro",
      monthlyPrice: 33.25,
      yearlyPrice: 399,
      savedAmount: 189,
      features: [
        { text: "Can add up to 20 accounts", included: true },
        { text: "Data storage allowed up to 6Gb", included: true },
        { text: "Can add unlimited playbooks", included: true },
        { text: "Can invite unlimited mentees", included: true },
        { text: "Backtesting", included: true },
        { text: "Seconds speed in backtesting", included: true },
        { text: "Trade Replay", included: true },
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    if (isAuthenticated && (role == "user" || role == "member")) {
      setSelectedPlan(plan);
      navigate("/payment/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
        Start your subscription
      </h1>
      <div className="flex items-center bg-gray-200 rounded-lg p-1 mb-10">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            !isYearly ? "bg-white text-indigo-600 shadow" : "text-gray-600"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-6 py-2 rounded-md text-sm font-medium relative transition-colors duration-300 ${
            isYearly ? "bg-white text-indigo-600 shadow" : "text-gray-600"
          }`}
        >
          Yearly
          <span className="absolute -top-2 -right-4 text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full">
            Save 32%
          </span>
        </button>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            isYearly={isYearly}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default Payment;
