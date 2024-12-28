// BackToHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const BackToHome = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <button
      onClick={handleBackToHome}
      className="fixed top-5 left-4 flex items-center z-20 space-x-2 text-gray-400 bg-transparent border border-gray-700 rounded-full px-3 py-3 md:py-2 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
    >
      <AiOutlineHome className="text-xl" />
      <span className="text-sm font-medium hidden md:flex">Inicio</span>
    </button>
  );
};

export default BackToHome;
