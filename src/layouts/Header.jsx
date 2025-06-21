import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin =(e)=>{
    e.preventDefault();
    navigate("/login")
  }

  const handlePayment =(e)=>{
    e.preventDefault();
    navigate("/payment")
  }

  return (
    <nav className="bg-white shadow-md px-8 py-4 border-b-[1px] lg:mt-3 lg:w-[90%] mx-auto lg:border-[1px] lg:border-solid border-gray-300 lg:rounded-xl">
      <div className="flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-3xl font-bold flex items-center">
          <span className="text-blue-700">Trade</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Verse
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-10 font-medium font-inter text-xl">
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md ">
            Features
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
            Discord
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
            Pricing
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
            Resources
          </li>
        </ul>

        {/* CTA buttons */}
        <div className="hidden lg:flex space-x-4">
          <button className="text-gray-700 font-medium cursor-pointer" onClick={handleLogin} >
            Log In
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-md shadow-md cursor-pointer transition-all duration-300 hover:from-indigo-500 hover:to-red-400" onClick={handlePayment}>
            Get Started
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-4 space-y-4">
          <ul className="space-y-6 font-medium font-inter text-xl">
            <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
              Features
            </li>
            <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
              Discord
            </li>
            <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
              Pricing
            </li>
            <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md">
              Resources
            </li>
          </ul>
          <div className="flex flex-col space-y-2 mt-4">
            <button className="text-gray-700 font-medium cursor-pointer" onClick={handleLogin}>
              Log In
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-md shadow-md cursor-pointer transition-all duration-300 hover:from-indigo-500 hover:to-red-400" onClick={handlePayment}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
