import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../auth/PlanContext";
import CheckoutForm from "../components/auth/CheckoutForm";
import { AuthContext } from "../auth/AuthProvider";

const Checkout = () => {
  const navigate = useNavigate();
  const { selectedPlan: plan, isYearly } = usePlan();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated || !plan) {
      navigate("/payment");
    }
  }, [plan, isAuthenticated, navigate]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  const total = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden bg-white">
          {/* Left Side: Order Summary */}
          <div className="w-full lg:w-2/5 bg-[#6A5ACD] text-white p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Subscribe to {plan.name} Plan
              </h2>
              <p className="text-4xl font-extrabold">
                ${total.toFixed(2)}
                <span className="text-lg font-normal">
                  /{isYearly ? "year" : "month"}
                </span>
              </p>
            </div>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>
                  {plan.name} Plan (
                  {isYearly ? "Billed annually" : "Billed monthly"})
                </span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div>
                <button className="text-indigo-200 hover:text-white font-semibold">
                  Add promotion code
                </button>
              </div>
            </div>
            <div className="border-t border-indigo-400 pt-6">
              <div className="flex justify-between font-bold text-xl">
                <span>Total due today</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Form Component */}
          <CheckoutForm plan={plan} isYearly={isYearly} />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
