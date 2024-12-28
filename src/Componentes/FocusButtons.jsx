import React from "react";

const FocusButtons = ({ focusOnWorld, focusOnUruguay }) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
      <button
        className="bg-[#5E657B] bg-opacity-30 text-white p-3 px-3 md:p-4 md:px-7 rounded-full shadow-lg hover:bg-opacity-100 transition-all border-solid border-2 border-[#5E657B]"
        onClick={focusOnWorld}
      >
        Mundo
      </button>
      <button
        className="bg-[#5E657B] bg-opacity-30 text-white p-3 px-3 md:p-4 md:px-7 rounded-full shadow-lg hover:bg-opacity-100 transition-all border-solid border-2 border-[#5E657B]"
        onClick={focusOnUruguay}
      >
        Uruguay
      </button>
    </div>
  );
};

export default FocusButtons;

/* import svgFantasmaPin from "../img/pins/PinFantasmas.svg";
import svgLugaresPin from "../img/pins/PinLugares.svg";
import svgLeyendasPin from "../img/pins/PinLeyendas.svg";
import svgObjetosPin from "../img/pins/PinObjetos.svg";
import svgCreenciasPin from "../img/pins/PinCreencias.svg";
import svgJuegosPin from "../img/pins/PinJuegos.svg";
import tierra1 from "../img/tierra3.jpg";
import svgMarkerType2 from "../img/pins/PinNumero2.svg";
import svgMarkerType3 from "../img/pins/PinNumero3.svg";
import svgMarkerType4 from "../img/pins/PinNumero4.svg";
import svgMarkerType5 from "../img/pins/PinNumero5.svg";
import svgMarkerType5Plus from "../img/pins/PinNumero5plus.svg"; */
