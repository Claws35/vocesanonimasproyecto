import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3-geo";
import uruguayData from "./uruguay.json";

const App = () => {
  const [departamentos, setDepartamentos] = useState({ features: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDepartamento, setHoveredDepartamento] = useState(null);
  const globeRef = useRef(); // Referencia al componente del globo

  useEffect(() => {
    setDepartamentos(uruguayData); // Guardar los datos de los departamentos
    setLoading(false);
  }, []);

  const formatPopulation = (population) => {
    return population
      ? population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "N/A";
  };

  // Función para calcular el centroide del departamento
  const geoCentroid = (feature) => {
    const [lng, lat] = d3.geoCentroid(feature);
    return [lng, lat];
  };

  return (
    <div style={{ height: "100vh" }}>
      {loading ? (
        <div>Cargando mapa...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          polygonsData={
            departamentos.features.length ? departamentos.features : []
          }
          polygonAltitude={
            ({ properties: d }) => (d === hoveredDepartamento ? 0.1 : 0.04) // Aumentar la altura al hacer hover sobre un departamento
          }
          polygonCapColor={({ properties: d }) =>
            d === hoveredDepartamento
              ? "rgba(255, 165, 0, 0.6)"
              : "rgba(0, 100, 255, 0.6)"
          }
          polygonSideColor={() => "rgba(0, 100, 255, 0.4)"}
          polygonStrokeColor={() => "#111"}
          polygonLabel={({ properties: d }) => `
            <b>${d.name}</b><br />
            Population: <i>${formatPopulation(d.POP_EST)}</i>
          `}
          onPolygonHover={(polygon) => {
            if (polygon) {
              setHoveredDepartamento(polygon.properties);
            } else {
              setHoveredDepartamento(null);
            }
          }}
          onPolygonClick={({ properties: d }) => {
            alert(`Clicked on ${d.name}`);
          }}
          polygonsTransitionDuration={300}
        />
      )}
    </div>
  );
};

export default App;
