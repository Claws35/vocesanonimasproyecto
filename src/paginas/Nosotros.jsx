import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BackToHome from "../Componentes/BackToHome";
import ImagenDeFondoNosotros from "../img/NosotrosFondo.jpg";
import IconoNosotros1 from "../img/NosotrosIconos/IconosInicio2.png";
import IconoNosotros2 from "../img/NosotrosIconos/IconosInicio3.png";
import IconoNosotros3 from "../img/NosotrosIconos/IconosInicio1.png";
import IconoNosotros4 from "../img/NosotrosIconos/IconosInicio4.png";
import IconoProyectosNosotrosLibros from "../img/NosotrosIconos/IconosProyectos3.png";
import IconoProyectosNosotrosSerie from "../img/NosotrosIconos/IconosProyectos4.png";
import IconoProyectosNosotrosTours from "../img/NosotrosIconos/IconosProyectos2.png";
import IconoProyectosNosotrosCharlas from "../img/NosotrosIconos/IconosProyectos1.png";
import ImagenNosotrosCreacion from "../img/fotoguillermoVIeja.png";
import ImagenNosotrosActualidad from "../img/ImgActualidad.jpg";
import ImagenNosotrosProyectos1 from "../img/NosotrosProyectos/ImagenNosotrosProyectos1.jpg";
import ImagenNosotrosProyectos2 from "../img/NosotrosProyectos/ImagenNosotrosProyectos2.jpg";
import ImagenNosotrosProyectos3 from "../img/NosotrosProyectos/ImagenNosotrosProyectos4.jpg";
import ImagenNosotrosProyectos4 from "../img/NosotrosProyectos/ImagenNosotrosProyectos3.jpg";
import ImagenNosotrosProyectos5 from "../img/bannerNosotorosDistinto.png";

const Nosotros = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projectsContent = [
    {
      title: "Libros",
      description:
        "Los libros de Voces Anónimas recogen relatos de misterio, leyendas y mitos que forman parte de la cultura popular y el folclore local. Cada volumen ofrece un compendio de historias que reflejan el lado enigmático de nuestras tradiciones, transportando al lector a un mundo donde lo desconocido se vuelve cercano. A través de estos textos, se busca preservar y difundir las narrativas orales y las creencias que han perdurado en el tiempo.",
      image: ImagenNosotrosProyectos1, // Replace with the actual image path
    },
    {
      title: "Serie",
      description:
        "La serie televisiva de Voces Anónimas presenta una antología de relatos basados en historias reales y leyendas urbanas de Uruguay y otros lugares. Cada episodio explora un nuevo misterio, reflejando el interés por lo inexplicable y la fascinación por lo sobrenatural en diferentes culturas. Esta producción ha permitido llevar a la pantalla la esencia de las narrativas orales, presentándolas de una manera visual y envolvente.",
      image: ImagenNosotrosProyectos2, // Replace with the actual image path
    },
    {
      title: "Tours",
      description:
        "Los tours de Voces Anónimas son experiencias en las que se recorren lugares emblemáticos vinculados a leyendas y relatos populares. Estos recorridos invitan a los participantes a adentrarse en espacios que forman parte de las historias narradas, ofreciendo una visión directa de los sitios y las atmósferas que inspiraron las historias contadas. Los tours combinan narración y exploración, promoviendo una conexión con el contexto cultural de cada relato.",
      image: ImagenNosotrosProyectos3, // Replace with the actual image path
    },
    {
      title: "Charlas",
      description:
        "Las charlas de Voces Anónimas son encuentros dedicados al arte de contar historias, donde se comparten relatos de misterio, leyendas urbanas y anécdotas personales vinculadas a lo sobrenatural. En un ambiente cercano e íntimo, los participantes escuchan y comparten historias que han marcado sus vidas o que forman parte del imaginario colectivo, generando un espacio de conexión y fascinación por lo desconocido. Estas charlas buscan preservar la tradición oral, permitiendo que las historias continúen vivas a través de la voz de quienes las cuentan.",
      image: ImagenNosotrosProyectos4, // Replace with the actual image path
    },
  ];
  const icons = {
    Creación: IconoNosotros1,
    Hitos: IconoNosotros2,
    Proyectos: IconoNosotros3,
    Actualidad: IconoNosotros4,
  };
  const icons2 = {
    Libros: IconoProyectosNosotrosLibros,
    Serie: IconoProyectosNosotrosSerie,
    Tours: IconoProyectosNosotrosTours,
    Charlas: IconoProyectosNosotrosCharlas,
  };

  const handleIconClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <div className="text-white ">
      <BackToHome />

      <div
        className="h-[1679px] w-full bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${ImagenDeFondoNosotros})`,
        }}
      >
        {/* aca era 700px */}
        <div className="flex w-full h-[77vh] items-end justify-center">
          <h1 className="font-benguiat text-9xl">Nosotros</h1>
        </div>

        <div className="flex justify-center mt-8 gap-28">
          {["Creación", "Hitos", "Proyectos", "Actualidad"].map((item) => (
            <a
              href={`#${item.toLowerCase()}`} // Convierte el nombre a minúsculas para que coincida con los `id`
              key={item}
              className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-all hover:scale-110"
            >
              <img src={icons[item]} alt="" className="h-24" />
              <h3 className="font-benguiat text-lg">{item}</h3>
            </a>
          ))}
        </div>

        <div id="creación"></div>
        <section className="flex flex-col items-center mt-24">
          <h2 className="font-benguiat font-light text-6xl">Creación</h2>
          <div className="flex mt-6 gap-4 max-w-3xl">
            <div className="max-w-[400px]">
              <h4 className="font-benguiat font-light text-3xl">
                Una idea innovadora
              </h4>
              <p className="font-karol text-xl mt-3">
                Voces Anónimas nació de una idea innovadora que revolucionó la
                forma en que las historias de misterio y fenómenos paranormales
                se cuentan en Uruguay y más allá. Este proyecto comenzó como una
                visión de Guillermo Lockhart, quien, impulsado por su
                fascinación por lo desconocido, creó un espacio donde las
                leyendas urbanas, las experiencias sobrenaturales y los relatos
                de terror cobran vida.
                <br /> <br />
                Hoy, Voces Anónimas se consolida como un referente en la
                narrativa de lo desconocido y lo inexplicable, transformando
                cada historia en una puerta a un mundo misterioso y provocando
                la misma fascinación y misterio que en sus inicios.
              </p>
            </div>
            <img
              src={ImagenNosotrosCreacion}
              className="h-[500px] saturate-0 hover:saturate-100 transition-all duration-300"
              alt="Creación Icono"
            />
          </div>
        </section>

        {/* Sección de Hitos */}
        <div id="hitos"></div>
        <section className="bg-black py-24">
          <div
            className="flex flex-col items-center py-[200px] "
            style={{
              backgroundImage: `url(${ImagenNosotrosProyectos5})`,
            }}
          >
            <h2 className="font-benguiat font-light text-7xl">Hitos</h2>
            <div className="flex mt-5 gap-20">
              <div className="flex flex-col items-center">
                <a href="#">
                  <h1 className="font-benguiat font-light text-[6em]">7</h1>
                </a>
                <h3 className="font-benguiat text-lg mt-[-20px]">Temporadas</h3>
              </div>
              <div className="flex flex-col items-center">
                <a href="#">
                  <h1 className="font-benguiat font-light text-[7em]">#1</h1>
                </a>
                <h3 className="font-benguiat text-lg mt-[-20px]">
                  Serie Uruguaya
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <a href="#">
                  <h1 className="font-benguiat font-light text-[6em]">27</h1>
                </a>
                <h3 className="font-benguiat text-lg mt-[-20px]">Libros</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Proyectos */}
        <section id="proyectos" className="flex flex-col items-center bg-black">
          <h2 className="font-benguiat font-light text-6xl py-2">Proyectos</h2>
          <div className="flex gap-8 mt-6">
            {projectsContent.map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col items-center cursor-pointer transition-transform duration-300 ${
                  activeIndex === index
                    ? "scale-100 opacity-110 shadow-lg"
                    : " scale-75 opacity-75"
                }`}
                onClick={() => handleIconClick(index)}
              >
                <img
                  className="h-28"
                  src={icons2[item.title]}
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        </section>

        <Swiper
          navigation={true}
          loop={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {projectsContent.map((item, index) => (
            <SwiperSlide
              key={index}
              className="bg-gray-900 min-h-[60vh] flex items-center"
            >
              <div className="flex max-w-5xl mx-auto items-center justify-between p-6 gap-8 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[400px] w-[580px] object-cover rounded-lg shadow-lg"
                />
                <div className="text-white ">
                  <div className="min-h-40 max-h-[400px] min-w-[400px]">
                    <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                    <p className="text-lg">{item.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <section
          id="actualidad"
          className="flex flex-col items-center pt-24 bg-black"
        >
          <h2 className="font-benguiat font-light text-6xl">Actualidad</h2>
          <div className="flex mt-1 gap-1 max-w-4xl items-center">
            <div className="w-[300px]">
              <h4 className="font-benguiat font-light text-3xl">
                Últimas Noticias
              </h4>
              <p className="font-karol text-xl mt-3">
                Mantente al tanto de las últimas noticias y eventos relacionados
                con nuestro proyecto. Aquí encontrarás actualizaciones recientes
                y actividades en curso.
              </p>
            </div>
            <img
              src={ImagenNosotrosActualidad} // Replace this with the actual image for "Actualidad"
              className="h-[400px]"
              alt="Actualidad Icono"
            />
          </div>
        </section>

        <footer>
          <div className="flex justify-center items-center h-20 bg-black">
            <p className="text-white text-lg">
              &copy; 2024 Voces Anónimas. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Nosotros;
