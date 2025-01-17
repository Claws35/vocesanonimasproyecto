import React, { useState } from "react";
import ImagenFooter from "../img/prueba13.png";
import { BsYoutube } from "react-icons/bs";
import PinSoloCreencias from "../img/IconosSolos/PinSoloCreencias";
import PinSoloFantasmas from "../img/IconosSolos/PinSoloFantasmas";
import PinSoloJuegos from "../img/IconosSolos/PinSoloJuegos";
import PinSoloLeyendas from "../img/IconosSolos/PinSoloLeyendas";
import PinSoloLugares from "../img/IconosSolos/PinSoloLugares";
import PinSoloObjetos from "../img/IconosSolos/PinSoloObjetos";
import Fondo5 from "../img/DetalleFondoAzul/Fondo5.png";
import Fondo4 from "../img/DetalleFondoAzul/Fondo4.png";
import Fondo3 from "../img/DetalleFondoAzul/Fondo3.png";
import Fondo2 from "../img/DetalleFondoAzul/Fondo2.png";
import Fondo from "../img/DetalleFondoAzul/Fondo.png";
import Nube1 from "../img/DetalleFondoAzul/nube1.png";
import Nube2 from "../img/DetalleFondoAzul/nube4.png";
import Nube3 from "../img/DetalleFondoAzul/nube3.png";
import Nube4 from "../img/DetalleFondoAzul/nube4.png";
import Nube5 from "../img/DetalleFondoAzul/nube5.png";
import "../App.css";

const categoryIcons = {
  "Creencias Sobrenaturales": { component: PinSoloCreencias, color: "#669933" },
  "Fantasmas y Apariciones": { component: PinSoloFantasmas, color: "#a06d35" },
  "Juegos y Rituales": { component: PinSoloJuegos, color: "#6e2670" },
  "Leyendas urbanas": { component: PinSoloLeyendas, color: "#308ba0" },
  "Lugares Malditos": { component: PinSoloLugares, color: "#1f4787" },
  "Objetos Malditos": { component: PinSoloObjetos, color: "#99253e" },
};

const StoryDetail = ({ story, onClose }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  if (!story) return null;

  // Función para obtener la imagen según la categoría
  const getImageForCategory = () => {
    if (story.categoria.some((cat) => cat.title === "Lugares Malditos")) {
      return (
        <img
          src={ImagenFooter}
          alt="Descripción de la imagen"
          className="story-image"
        />
      );
    } else {
      return (
        <>
          <img
            src={Nube1}
            className="cloud1 moveCloud1 fadeOut1 cloud z-[3]"
            alt=""
          />
          <img
            src={Nube2}
            className="cloud2 moveCloud2 fadeOut1 cloud z-[5]"
            alt=""
          />
          <img
            src={Nube3}
            className="cloud3 moveCloud3 fadeOut1 cloud z-[3]"
            alt=""
          />
          <img
            src={Nube4}
            className="cloud4 moveCloud3 fadeOut1 cloud z-[5]"
            alt=""
          />
          <img
            src={Nube5}
            className="cloud5 moveCloud3 fadeOut1 cloud z-[1]"
            alt=""
          />
          <img
            src={Fondo3}
            alt=""
            className="absolute z-[6] inset-0 w-screen h-screen object-cover"
          />
          <img
            src={Fondo5}
            alt=""
            className="absolute z-[4] inset-0 w-screen h-screen object-cover"
          />
          <img
            src={Fondo4}
            alt=""
            className="absolute z-[2] inset-0 w-screen h-screen object-cover"
          />
          <img
            src={Fondo2}
            alt=""
            className="absolute z-[0] inset-0 w-screen h-screen object-cover"
          />
          <img
            src={Fondo}
            alt=""
            className="absolute z-[-2] inset-0 w-screen h-screen object-cover"
          />
        </>
      );
    }
  };

  return (
    <div className="story-detail gap-2 flex justify-start flex-col items-center">
      <h1 className="text-[2em] md:text-[5em] font-benguiat font-medium text-center text-white mt-[90px] story-title">
        {story.label}
      </h1>

      <div className="flex relative z-10 space-x-4 my-4">
        {story.categoria.map((cat) => {
          const IconComponent = categoryIcons[cat.title]?.component;
          const color = categoryIcons[cat.title]?.color;
          const isHovered = hoveredCategory === cat.title;

          if (!IconComponent) return null;

          return (
            <div
              key={cat.title}
              onMouseEnter={() => setHoveredCategory(cat.title)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="flex z-50 items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 relative"
              style={{
                backgroundColor: isHovered ? color : "gray",
              }}
            >
              <IconComponent
                width={window.innerWidth < 768 ? 24 : 32}
                height={window.innerWidth < 768 ? 24 : 32}
                colorClass={`transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-gray-600"
                }`}
                className={`transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-gray-600"
                }`}
              />

              {/* Nombre de la categoría que aparece solo en hover */}
              <span
                className={`absolute top-full mt-2 px-2 py-1 text-center z-50 bg-black text-white text-xs rounded opacity-0 transition-opacity duration-300 ${
                  isHovered ? "opacity-100 z-40" : "z-30"
                }`}
              >
                <div className=" bg-gray-900 relative z-50	p-1">{cat.title}</div>
              </span>
            </div>
          );
        })}

        {story.youtube && (
          <div className="p-1 flex justify-center relative z-50">
            <a
              href={story.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              <BsYoutube size={32} />
            </a>
          </div>
        )}
      </div>

      <div className="relative z-[5] max-w-[800px] max-h-[35vh] overflow-y-auto px-4">
        <p className="text-white font-karol font-normal  text-xl leading-relaxed pr-2">
          {story.texto}
        </p>
      </div>

      <div className="story-image-container">{getImageForCategory()}</div>
    </div>
  );
};

export default StoryDetail;
