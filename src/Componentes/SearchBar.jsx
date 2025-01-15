import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Función para verificar si el dispositivo es móvil
  const isMobile = () => window.innerWidth <= 768;

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full shadow-lg z-50 flex space-x-2 transition-all duration-200 ${
        isFocused && isMobile() ? "scale-110" : ""
      }`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Busca un país o una historia"
        className="bg-transparent border border-gray-300 text-white placeholder-gray-400 p-2 rounded-full focus:outline-none w-64 transition-all duration-200"
      />
      <button
        className="bg-[#9b2b70] text-white p-3 rounded-full hover:bg-indigo-600"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
