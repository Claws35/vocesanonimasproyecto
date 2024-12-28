import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-spring-3d-carousel";
import Logo from "../img/logovoces2.png";
import { config } from "react-spring";
import IconoInicioPlaneta from "../img/IconosInicio/PlanetaIconoInicio.png";
import IconoInicioNosotros from "../img/IconosInicio/NosotrosIconoInicio.png";
import IconoInicioTelefono2 from "../img/IconosInicio/TelefonoIconoInicio2.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Inicio = () => {
  const [goToSlide, setGoToSlide] = useState(0);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      key: "mundo",
      content: (
        <div onClick={() => handleSlideClick(0)}>
          <Link className="p-2 min-w-24 text-center block" to="#">
            <div className="flex flex-col items-center justify-center gap-3">
              <img className="h-32 w-32" src={IconoInicioPlaneta} alt="" />
              <h1 className="font-benguiat font-medium text-white">Mundo</h1>
            </div>
          </Link>
        </div>
      ),
      route: "/mundo",
    },
    {
      key: "nosotros",
      content: (
        <div onClick={() => handleSlideClick(1)}>
          <Link className="p-2 min-w-28 text-center block" to="#">
            <div className="flex flex-col items-center justify-center gap-3">
              <img className="h-28 w-28" src={IconoInicioNosotros} alt="" />
              <h1 className="font-benguiat font-medium text-white">Nosotros</h1>
            </div>
          </Link>
        </div>
      ),
      route: "/nosotros",
    },
    {
      key: "contacto",
      content: (
        <div onClick={() => handleSlideClick(2)}>
          <Link className="p-2 min-w-24 text-center block" to="#">
            <div className="flex flex-col items-center justify-center gap-3">
              <img className="h-32 w-32" src={IconoInicioTelefono2} alt="" />
              <h1 className="font-benguiat font-medium text-white">Contacto</h1>
            </div>
          </Link>
        </div>
      ),
      route: "/contacto",
    },
  ];

  const handleSlideClick = (index) => {
    if (index === goToSlide) {
      navigate(slides[index].route);
    } else {
      setGoToSlide(index);
    }
  };

  const handleNext = () => {
    setGoToSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setGoToSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Efecto para mover el carrusel automáticamente
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setGoToSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Cambia de diapositiva cada 3 segundos
      return () => clearInterval(interval);
    }
  }, [isHovered, slides.length]);

  return (
    <div className="bg-[#000011] w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src={Logo}
          alt="Voces Anónimas Logo"
          className="w-[300px] md:w-[500px] mb-4"
        />
        <div
          className="w-full flex items-center justify-center min-w-[200px] md:min-w-[400px]    mt-20 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 text-white  bg-gray-800 p-2 rounded-full  hover:bg-gray-700 opacity-75"
            onClick={handlePrev}
          >
            <IoIosArrowBack />
          </button>
          <div className="flex  min-w-[300px] ">
            <Carousel
              slides={slides}
              goToSlide={goToSlide}
              offsetRadius={3}
              showNavigation={false}
              animationConfig={config.gentle}
            />
          </div>

          <button
            className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2  text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 opacity-75"
            onClick={handleNext}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
