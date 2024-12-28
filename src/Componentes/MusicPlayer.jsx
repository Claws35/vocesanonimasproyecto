import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import miMusica from "../vocesAnonimasReaper2.mp3"; // Ajusta la ruta según la ubicación del archivo

const MusicPlayer = () => {
  const audioRef = useRef(new Audio(miMusica));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Detección de dispositivo móvil
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Configuración inicial del audio
  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      audioRef.current.pause();
      clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Alternar reproducción y pausa
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.error("Error al reproducir el audio:", e);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Ajustar el volumen
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Mostrar el control de volumen al hacer hover o tocar el elemento
  const handleMouseEnter = () => {
    if (isMobileDevice()) return; // No activar en dispositivos móviles
    clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobileDevice()) return; // No activar en dispositivos móviles
    hoverTimeoutRef.current = setTimeout(() => setIsHovered(false), 1000); // 1 segundo después de salir
  };

  const handleTouchStart = () => {
    setIsHovered(true); // Mostrar barra en dispositivos táctiles
  };

  const handleTouchEnd = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsHovered(false), 2000); // Desaparece después de 2 segundos
  };

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botón circular */}
      <button
        onClick={togglePlayPause}
        className="w-12 h-12 flex items-center justify-center text-gray-400 bg-transparent border border-gray-700 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300"
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>

      {/* Contenedor de volumen (se muestra al hacer hover o tocar el botón) */}
      {isHovered && (
        <div className="absolute top-full mt-2 p-2 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center transition-opacity duration-300 opacity-100">
          <FaVolumeUp />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="h-24 w-2 bg-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 transform rotate-180"
            style={{ writingMode: "vertical-rl" }}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
