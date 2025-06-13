import React from "react";
import logoImage2 from "../assets/images/logoImage2.png";
import loginSideImage from "../assets/images/LoginImage.png";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center w-[95%] mx-auto">
      <div className="flex justify-between max-w-[380px] md:w-[100%] md:max-w-[700px] md:p-4 md:gap-3.5 lg:max-w-[770px] bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* Left side - signup form */}
        <div className="w-full px-6 py-2 text-center">
          <div className="w-full rounded-xl overflow-hidden mb-2">
            <img
              src={logoImage2}
              alt="Logo"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Join us and start your trading journey!
          </p>

          <SignupForm />
        </div>

        {/* Right side - image */}
        <div className="hidden md:flex w-full">
          <img
            src={loginSideImage}
            alt="Trading Dashboard"
            className="w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
