import React, { useEffect } from "react";
import ImagenFondoContacto from "../img/ContactoFondo.jpg";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import BackToHome from "../Componentes/BackToHome";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm, ValidationError } from "@formspree/react";

const Contacto = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      disable: "mobile",
      once: true,
    });
  }, []);

  function ContactForm() {
    const [state, handleSubmit] = useForm("xdkaabkg");
    if (state.succeeded) {
      return (
        <p className="text-white font-karol text-lg md:text-xl">
          ¡Gracias por contactarnos, le escribiremos pronto!
        </p>
      );
    }
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg px-8 pb-8 md:p-8 rounded-lg"
      >
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
            name="name"
            type="text"
            placeholder="Nombre"
            required="required"
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
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            required="required"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div data-aos="fade-up" data-aos-delay="1200" className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="number"
          >
            Teléfono
          </label>
          <input
            className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-300 bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
            id="number"
            name="phone"
            type="tel"
            placeholder="Teléfono"
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
            name="message"
            placeholder="Mensaje"
            rows="4"
            required="required"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="1400"
          className="flex items-center justify-between"
        >
          <button
            className="bg-[#8497a0] hover:bg-[#52707e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-300"
            type="submit"
            disabled={state.submitting}
          >
            {state.submitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    );
  }

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
          className="font-benguiat text-5xl md:text-7xl text-white mb-4 mt-20 md:mt-0"
        >
          Contacto
        </h1>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          className="flex mb-1 md:mb-2 space-x-6"
        >
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
          <p
            data-aos="fade-up"
            data-aos-delay="600"
            className="text-white font-karol text-lg md:text-xl"
          >
            Escríbenos para futuros eventos o colaboraciones{" "}
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contacto;
