import React, { useEffect } from "react";
import ImagenFondoContacto from "../img/ContactoFondo.jpg";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import BackToHome from "../Componentes/BackToHome";
import AOS from "aos";
import "aos/dist/aos.css";
import { Resend } from "resend";

const resend = new Resend("re_LVN9Na16_G9mbpdGc1thL4GVH6djZHJ9Q");

const Contacto = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones en milisegundos
      easing: "ease-in-out", // Tipo de animación
      disable: "mobile",
      once: true, // La animación se ejecuta solo una vez
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const message = form.message.value;

    try {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["mateocuti@gmail.com"],
        subject: `Nuevo contacto de ${name}`,
        html: `<strong>Nombre:</strong> ${name}<br/><strong>Correo Electrónico:</strong> ${email}<br/><strong>Teléfono:</strong> ${number}<br/><strong>Mensaje:</strong> ${message}`,
      });

      if (error) {
        console.error("Error al enviar el correo:", error);
        alert("Hubo un problema al enviar tu mensaje. Intenta nuevamente.");
        return;
      }

      console.log("Correo enviado con éxito:", data);
      alert("¡Mensaje enviado con éxito!");
      form.reset();
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Hubo un error inesperado. Por favor, intenta de nuevo.");
    }
  };

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
          className="flex mb-2 space-x-6"
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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 rounded-lg"
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
              required
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
              required
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="1200" className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="number"
            >
              Teléfono{" "}
            </label>
            <input
              className="shadow appearance-none border border-transparent rounded w-full py-2 px-3 text-gray-300 bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
              id="number"
              name="number"
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
              required
            ></textarea>
          </div>
          <div data-aos="fade-up" data-aos-delay="1400">
            <button
              className="bg-[#8497a0] hover:bg-[#52707e] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-300"
              type="submit"
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
