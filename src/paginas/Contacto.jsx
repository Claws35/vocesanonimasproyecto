import React, { useEffect } from "react";
import ImagenFondoContacto from "../img/ContactoFondo.jpg";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { Input } from "@material-tailwind/react";
import BackToHome from "../Componentes/BackToHome";
import AOS from "aos";
import "aos/dist/aos.css";

const Contacto = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones en milisegundos
      easing: "ease-in-out", // Tipo de animación
      disable: "mobile",

      once: true, // Si es true, la animación se ejecuta solo una vez
    });
  }, []);
  return (
    <div>
      <BackToHome />
      <div
        className="h-screen w-full bg-cover bg-top bg-no-repeat flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${ImagenFondoContacto})`,
        }}
      >
        <h1
          data-aos="fade-up"
          className="font-benguiat text-5xl md:text-7xl text-white mb-4"
        >
          Contacto
        </h1>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          className="flex mb-2 space-x-6"
        >
          <a
            href="https://www.instagram.com/voces_anonimas_oficial/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaInstagram className="text-white text-3xl md:text-3xl hover:text-gray-400" />
          </a>
          <a
            href="https://www.youtube.com/@VocesAnonimas3"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <FaYoutube className="text-white text-3xl md:text-3xl hover:text-gray-400" />
          </a>
          <a
            href="https://www.facebook.com/VocesAnonimas"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaFacebook className="text-white text-3xl md:text-3xl hover:text-gray-400" />
          </a>
        </div>
        <div>
          <p
            data-aos="fade-up"
            data-aos-delay="600"
            className="text-white font-karol text-lg md:text-xl"
          >
            Escríbenos para futuros eventos o colaboraciones{" "}
          </p>
        </div>
        <form className="w-full max-w-lg p-8 rounded-lg">
          <div data-aos="fade-up" data-aos-delay="1000" className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-300 bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
              id="name"
              type="text"
              placeholder="Nombre"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="1100" className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-300 bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
              id="email"
              type="email"
              placeholder="Correo Electrónico"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="1200" className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="number"
            >
              Telefono{" "}
            </label>
            <input
              className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-300 bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
              id="number"
              type="tel"
              placeholder="Telefono"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="1300" className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Mensaje
            </label>
            <textarea
              className="shadow appearance-none max-h-40 border border-transparent rounded w-full py-2 px-3 text-gray-300 bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
              id="message"
              placeholder="Mensaje"
              rows="4"
            ></textarea>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="1400"
            className="flex items-center justify-between"
          >
            <button
              className="bg-[#8497a0] hover:bg-[#52707e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-300"
              type="button"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
