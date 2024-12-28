import React from "react";
import ImagenFondoContacto from "../img/ContactoFondo.png";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { Input } from "@material-tailwind/react";
import BackToHome from "../Componentes/BackToHome";

const Contacto = () => {
  return (
    <div>
      <BackToHome />
      <div
        className="h-screen w-full bg-cover bg-top bg-no-repeat flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${ImagenFondoContacto})`,
        }}
      >
        <h1 className="font-benguiat text-5xl md:text-7xl text-white mb-4">
          Contacto
        </h1>
        <div className="flex mb-2 space-x-6">
          <a
            href="https://www.instagram.com/voces_anonimas_oficial/?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white text-3xl md:text-3xl hover:text-gray-400" />
          </a>
          <a
            href="https://www.youtube.com/@VocesAnonimas3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-white text-3xl md:text-3xl hover:text-gray-400" />
          </a>
          <a
            href="https://www.facebook.com/VocesAnonimas"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-white text-3xl md:text-3xl hover:text-gray-400" />
          </a>
        </div>
        <div>
          <p className="text-white font-karol text-lg md:text-xl">
            Escríbenos para futuros eventos o colaboraciones{" "}
          </p>
        </div>
        <form className="w-full max-w-lg p-8 rounded-lg">
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="flex items-center justify-between">
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
