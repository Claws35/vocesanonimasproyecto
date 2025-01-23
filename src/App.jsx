import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planeta from "./Planeta";
import Inicio from "./paginas/Inicio";
import Contacto from "./paginas/Contacto";
import Nosotros from "./paginas/Nosotros";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mundo" element={<Planeta />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
};

export default App;
