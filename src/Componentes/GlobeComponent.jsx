import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3-geo";
import { TextureLoader } from "three";
import * as THREE from "three";
import Globe from "react-globe.gl";
import svgFantasmaPin from "../img/pins/PinFantasmas.svg";
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
import svgMarkerType5Plus from "../img/pins/PinNumero5plus.svg";
import uruguayData from "../uruguay.json";

const CustomGlobe = ({
  countries,
  hoveredCountry,
  setHoveredCountry,
  globeRef,
  zoomedIn,
  setZoomedIn,
  handleCountryClick,
  searchQuery,
  markers,
  activeCountries,
  uruguayDepartments,
  setFilteredMarkers,
  filteredMarkers,
  setSelectedCountryStories,
  selectedCountryStories,
  setActiveCountries,
  handleDepartmentClick,
  combinedData,
  handleShowStoryDetail,
  showDetail,
  consolidatedMarkers,
  setConsolidatedMarkers,
}) => {
  const globeEl = globeRef;
  const [textures, setTextures] = useState({});
  const [hoveredObject, setHoveredObject] = useState(null);
  const [markerSize, setMarkerSize] = useState(4); // Tamaño inicial del marcador
  const MIN_MARKER_SIZE = 0.3;
  const MAX_MARKER_SIZE = 5;

  // Cargar los SVG como texturas
  useEffect(() => {
    const loader = new TextureLoader();
    const categories = {
      fantasma: svgFantasmaPin,
      objetos: svgObjetosPin,
      creencias: svgCreenciasPin,
      leyendas: svgLeyendasPin,
      juegos: svgJuegosPin,
      lugares: svgLugaresPin,
      closeMarkers2: svgMarkerType2,
      closeMarkers3: svgMarkerType3,
      closeMarkers4: svgMarkerType4,
      closeMarkers5: svgMarkerType5,
      closeMarkers5Plus: svgMarkerType5Plus,
    };

    Object.entries(categories).forEach(([key, value]) => {
      loader.load(value, (texture) => {
        setTextures((prev) => ({ ...prev, [key]: texture }));
      });
    });
  }, []);

  // Ajusta el tamaño del marcador en función de la altura del zoom y actualiza la agrupación de marcadores
  const handleZoom = (pointOfView) => {
    const { altitude } = pointOfView;
    const calculatedSize = 4 * altitude;

    // Aplica el límite entre el tamaño mínimo y máximo
    setMarkerSize(
      Math.max(MIN_MARKER_SIZE, Math.min(MAX_MARKER_SIZE, calculatedSize))
    );

    updateConsolidatedMarkers(altitude); // Actualiza la agrupación de los marcadores según el nivel de zoom
  };

  // Función para verificar si dos marcadores están cerca, usando un umbral adaptable
  // Función para verificar si dos marcadores están cerca, usando un umbral adaptable
  const areMarkersClose = (marker1, marker2, threshold) => {
    const distance = Math.sqrt(
      Math.pow(marker1.lat - marker2.lat, 2) +
        Math.pow(marker1.lng - marker2.lng, 2)
    );
    return distance < threshold;
  };

  // Detectar y agrupar marcadores cercanos con un umbral adaptable basado en el nivel de zoom
  const updateConsolidatedMarkers = (altitude) => {
    const threshold = altitude * 0.5; // A mayor `altitude`, mayor `threshold` para agrupar

    const groupedMarkers = [];
    const visited = new Set();

    filteredMarkers.forEach((marker, index) => {
      if (visited.has(index)) return;

      const closeMarkers = filteredMarkers.filter(
        (otherMarker, i) =>
          i !== index && areMarkersClose(marker, otherMarker, threshold)
      );

      const numCloseMarkers = closeMarkers.length + 1;

      let iconKey = null;
      if (numCloseMarkers === 2) iconKey = "closeMarkers2";
      else if (numCloseMarkers === 3) iconKey = "closeMarkers3";
      else if (numCloseMarkers === 4) iconKey = "closeMarkers4";
      else if (numCloseMarkers === 5) iconKey = "closeMarkers5";
      else if (numCloseMarkers > 5) iconKey = "closeMarkers5Plus";

      // Calcular separación adaptativa: hasta 10 marcadores, incrementos de 0.1 por cada uno, luego se mantiene fijo
      const separationAltitude = Math.min(1, numCloseMarkers * 0.1);

      if (numCloseMarkers > 1) {
        const consolidatedMarker = {
          lat:
            (marker.lat + closeMarkers.reduce((sum, m) => sum + m.lat, 0)) /
            numCloseMarkers,
          lng:
            (marker.lng + closeMarkers.reduce((sum, m) => sum + m.lng, 0)) /
            numCloseMarkers,
          categoria: [{ title: iconKey }],
          stories: [marker, ...closeMarkers],
          texto: [marker, ...closeMarkers]
            .map((m) => m.texto || "Sin texto disponible")
            .join("\n\n"), // Combina los textos de las historias
          label: marker.label,
          country: marker.country,
          pais: marker.pais,
          textoCorto: marker.textoCorto,
          youtube: marker.youtube,
          separationAltitude: separationAltitude, // Altitud para la separación de los marcadores
        };
        groupedMarkers.push(consolidatedMarker);
        visited.add(index);
        closeMarkers.forEach((m) => visited.add(filteredMarkers.indexOf(m)));
      } else {
        groupedMarkers.push({
          ...marker,
          texto: marker.texto || "Sin texto disponible",
        });
      }
    });

    setConsolidatedMarkers(groupedMarkers);
  };

  useEffect(() => {
    const setPointOfView = () => {
      const altitude = window.innerWidth < 768 ? 4 : 2.5; // Ajusta la altitud según el tamaño de la pantalla
      globeEl.current.pointOfView({ altitude });
      updateConsolidatedMarkers(altitude); // Llama a la función con la altitud ajustada
    };

    setPointOfView(); // Establece la vista inicial

    window.addEventListener("resize", setPointOfView); // Ajusta la vista cuando se redimensiona la ventana

    return () => {
      window.removeEventListener("resize", setPointOfView); // Limpia el evento al desmontar el componente
    };
  }, []);

  // Seleccionar la textura basada en la categoría del marcador
  const getTextureForMarker = (category) => {
    const textureMapping = {
      "Fantasmas y Apariciones": textures.fantasma,
      "Leyendas urbanas": textures.leyendas,
      "Lugares Malditos": textures.lugares,
      "Objetos Malditos": textures.objetos,
      "Creencias Sobrenaturales": textures.creencias,
      "Juegos y Rituales": textures.juegos,
      closeMarkers2: textures.closeMarkers2,
      closeMarkers3: textures.closeMarkers3,
      closeMarkers4: textures.closeMarkers4,
      closeMarkers5: textures.closeMarkers5,
      closeMarkers5Plus: textures.closeMarkers5Plus,
    };
    return textureMapping[category] || null;
  };

  const handleMarkerClick = (marker) => {
    const isGroupedMarker = [
      "closeMarkers2",
      "closeMarkers3",
      "closeMarkers4",
      "closeMarkers5",
      "closeMarkers5Plus",
    ].includes(marker.categoria[0].title);

    console.log("handleMarkerClick", marker);
    if (isGroupedMarker && marker.stories) {
      setSelectedCountryStories(marker.stories);
    } else if (marker.groupedStories) {
      setSelectedCountryStories(marker.groupedStories);
    } else {
      const matchedMarker = selectedCountryStories.find(
        (story) =>
          story.label === marker.label &&
          story.lat === marker.lat &&
          story.lng === marker.lng
      );

      if (matchedMarker) {
        handleShowStoryDetail(matchedMarker);
      } else {
        handleShowStoryDetail(marker);
      }
    }
  };

  const handleUruguayClick = () => {
    const uruguay = countries.features.find(
      (d) => d.properties.name === "Uruguay"
    );
    if (!uruguay) return;

    const [lng, lat] = d3.geoCentroid(uruguay);
    globeRef.current.pointOfView({ lat, lng, altitude: 0.3 }, 3000);

    if (uruguayDepartments?.length > 0) {
      setActiveCountries(
        uruguayDepartments.map((dept) => ({
          country: dept.name,
          pais: dept.name,
        }))
      );
      setActiveCountries(uruguayDepartments);
    } else {
      console.error("No hay datos de departamentos de Uruguay disponibles");
    }

    setZoomedIn(true);
    setHoveredCountry(uruguay.properties);
  };

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={tierra1}
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      customLayerData={consolidatedMarkers}
      onZoom={handleZoom} // Callback de zoom
      customThreeObject={(d) => {
        const texture = getTextureForMarker(d.categoria[0].title);
        if (!texture) return null;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });

        const baseBoxSize = markerSize;
        const hoverBoxSize = baseBoxSize * 1.2;
        const boxSize = hoveredObject === d ? hoverBoxSize : baseBoxSize;

        const box = new THREE.Mesh(
          new THREE.BoxGeometry(boxSize, boxSize * 1.32, 0),
          material
        );

        const pivot = new THREE.Object3D();
        pivot.add(box);

        // Altitud adaptativa para los marcadores agrupados
        const positionY = baseBoxSize / 2 + (d.separationAltitude || 0);
        box.position.set(0, positionY, 0);

        const { x, y, z } = globeEl.current.getCoords(d.lat, d.lng, 0.03);
        pivot.position.set(x, y, z);
        pivot.lookAt(new THREE.Vector3(0, 0, 0));

        return pivot;
      }}
      onCustomLayerClick={handleMarkerClick}
      polygonsData={
        zoomedIn && hoveredCountry?.name === "Uruguay"
          ? combinedData.features
          : countries.features.length
          ? countries.features
          : []
      }
      polygonAltitude={({ properties: d }) =>
        zoomedIn && hoveredCountry?.name === "Uruguay"
          ? 0.02
          : zoomedIn
          ? 0.009
          : activeCountries.find((c) => c.country === d.name) &&
            d === hoveredCountry
          ? 0.02
          : 0.01
      }
      polygonCapColor={({ properties: d }) =>
        activeCountries.find((c) => c.country === d.name)
          ? "rgba(232, 152, 94, 0.7)"
          : "rgba(50, 50, 50, 0.1)"
      }
      polygonSideColor={({ properties: d }) =>
        activeCountries.find((c) => c.country === d.name)
          ? "rgba(241, 230, 210, 0.4)"
          : "rgba(0, 0, 40, 0.1)"
      }
      polygonStrokeColor={() => "#111"}
      polygonLabel={({ properties: d }) =>
        zoomedIn
          ? ""
          : activeCountries.find((c) => c.country === d.name)
          ? `<b>${
              activeCountries.find((c) => c.country === d.name).pais
            }</b><br />`
          : ""
      }
      onPolygonClick={(polygon) => {
        const countryName = polygon?.properties?.name;

        const isActiveCountry = activeCountries.find(
          (c) => c.country === countryName
        );

        if (!isActiveCountry) {
          console.log(
            `El país ${countryName} no está en la lista de países disponibles`
          );
          return;
        }

        if (countryName === "Uruguay") {
          handleUruguayClick();
        } else if (polygon.properties.TYPE_1 === "Departamento") {
          const selectedDepartment = uruguayDepartments.find(
            (dept) => dept.country === countryName
          );

          if (selectedDepartment) {
            handleDepartmentClick(selectedDepartment);
          } else {
            console.error("No se encontró el departamento para:", countryName);
          }
        } else {
          const selectedCountry = countries.features.find(
            (c) => c.properties.name === countryName
          );
          handleCountryClick(selectedCountry);
        }
      }}
      onPolygonHover={(polygon) => {
        if (!zoomedIn) {
          const matchingCountry = activeCountries.find(
            (c) => c.country === polygon?.properties.name
          );
          setHoveredCountry(matchingCountry ? polygon.properties : null);
        }
      }}
      customTransitionDuration={300}
      polygonsTransitionDuration={300}
    />
  );
};

export default CustomGlobe;
