import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Función para manejar la búsqueda y el scroll
  const handleSearchAndScroll = () => {
    // Realiza la búsqueda
    handleSearch();
    // Desplaza hacia arriba
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full shadow-lg z-50 flex space-x-2 transition-all duration-200">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          handleSearchAndScroll();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchAndScroll();
          }
        }}
        placeholder="Busca un país o una historia"
        className="bg-transparent border border-gray-300 text-white placeholder-gray-400 p-2 rounded-full focus:outline-none w-64 transition-all duration-200"
      />
      <button
        className="bg-[#9b2b70] text-white p-3 rounded-full hover:bg-indigo-600"
        onClick={handleSearchAndScroll}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
