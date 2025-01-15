import React, { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3-geo";
import SearchBar from "./Componentes/SearchBar";
import FocusButtons from "./Componentes/FocusButtons";
import GlobeComponent from "./Componentes/GlobeComponent";
import CountryStoriesList from "./Componentes/CountryStoriesList";
import { FaArrowLeft, FaMusic } from "react-icons/fa";
import uruguayData from "./uruguay.json";
import "./App.css";
import StoryDetail from "./Componentes/StoryDetail";
import categoryKeywords from "./keywords";
import { fuzzySearch } from "./fuzzySearch";
import { fuzzySearchCountries } from "./fuzzySearchCountries";
import { Toaster, toast } from "sonner";
//hola este es un cambio
//segunda pueba q ande

import MusicPlayer from "./Componentes/MusicPlayer"; // Ajusta la ruta según la ubicación del archivo
import miMusica from "./vocesAnonimasReaper1.mp3"; // Asegúrate de que la ruta del archivo de audio sea correcta
import BackToHome from "./Componentes/BackToHome";

const Planeta = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomedIn, setZoomedIn] = useState(false);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedCountryStories, setSelectedCountryStories] = useState([]);
  const globeRef = useRef();
  const [markers, setMarkers] = useState([]);
  const [activeCountries, setActiveCountries] = useState([]);
  const [paisesRespaldo, setPaisesRespaldo] = useState([]);
  const [adentroUruguay, setAdentroUruguay] = useState(false);
  const [uruguayDepartments, setUruguayDepartments] = useState([]);
  const [arrayUruguayYMundo, setarrayUruguayYMundo] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const inactivityTimeoutRef = useRef(null);
  const storyLoopIntervalRef = useRef(null);
  const currentStoryIndexRef = useRef(0);
  const [countryMarkers, setCountryMarkers] = useState([]); // Lista de marcadores, uno por país
  const [isPlaying, setIsPlaying] = useState(false); // Estado para manejar la música

  const audioRef = useRef(new Audio(miMusica)); // Referencia al audio
  const [consolidatedMarkers, setConsolidatedMarkers] = useState([]);

  const removeAccents = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Detectar inactividad del usuario
  const isMobileDevice = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 1366
    );
  };
  const updateConsolidatedMarkers = (altitude) => {
    const threshold = altitude * 0.5; // A mayor `altitude`, mayor `threshold` para agrupar

    const groupedMarkers = [];
    const visited = new Set();

    markers.forEach((marker, index) => {
      if (visited.has(index)) return;

      const closeMarkers = markers.filter(
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
        closeMarkers.forEach((m) => visited.add(markers.indexOf(m)));
      } else {
        groupedMarkers.push({
          ...marker,
          texto: marker.texto || "Sin texto disponible",
        });
      }
    });

    setConsolidatedMarkers(groupedMarkers);
  };
  const resetInactivityTimeout = () => {
    if (isMobileDevice()) {
      console.log(
        "Dispositivo móvil detectado o tamaño de pantalla menor a 1366. Inactividad no será manejada."
      );
      return;
    }

    console.log(
      "Actividad detectada: moviendo el mouse o interactuando con el mapa"
    );

    if (storyLoopIntervalRef.current) {
      console.log(
        "Deteniendo el loop de historias debido a actividad del usuario"
      );
      clearInterval(storyLoopIntervalRef.current);
      storyLoopIntervalRef.current = null;
    }

    setUserActive(true);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      console.log("Usuario inactivo. Iniciando el loop de historias.");
      setUserActive(false);
    }, 10000); // 10 segundos de inactividad para pruebas
  };

  useEffect(() => {
    audioRef.current.loop = true; // Repetir en bucle
    audioRef.current.volume = 0.5; // Asegurar que el volumen esté al máximo
  }, []);

  useEffect(() => {
    if (isMobileDevice()) {
      console.log(
        "Dispositivo móvil o tamaño de pantalla menor a 1366 detectado. No se manejará la inactividad."
      );
      return;
    }

    const globeElement = globeRef.current;

    if (globeElement) {
      globeElement.addEventListener("mousedown", resetInactivityTimeout);
      globeElement.addEventListener("touchmove", resetInactivityTimeout);
    }

    window.addEventListener("mousemove", resetInactivityTimeout);
    window.addEventListener("keydown", resetInactivityTimeout);

    return () => {
      if (globeElement) {
        globeElement.removeEventListener("mousedown", resetInactivityTimeout);
        globeElement.removeEventListener("touchmove", resetInactivityTimeout);
      }
      window.removeEventListener("mousemove", resetInactivityTimeout);
      window.removeEventListener("keydown", resetInactivityTimeout);
    };
  }, []);

  useEffect(() => {
    if (isMobileDevice()) {
      console.log(
        "Dispositivo móvil o tamaño de pantalla menor a 1366 detectado. Loop de historias desactivado."
      );
      return;
    }

    if (!userActive && !storyLoopIntervalRef.current && !showDetail) {
      console.log("Iniciando el loop de historias.");

      if (!globeRef.current) {
        console.error(
          "globeRef.current no está disponible. No se puede iniciar el loop de historias."
        );
        return;
      }

      // Guardar la lista de marcadores para el loop dependiendo del estado de zoom
      const markersToLoop = zoomedIn ? filteredMarkers : countryMarkers;

      storyLoopIntervalRef.current = setInterval(() => {
        if (showDetail) return; // Evita el loop si ya hay un detalle activo

        const currentMarker = markersToLoop[currentStoryIndexRef.current];
        if (currentMarker) {
          console.log("Moviendo la vista al marcador:", currentMarker);

          setFilteredMarkers([currentMarker]);
          globeRef.current.pointOfView(
            {
              lat: currentMarker.lat,
              lng: currentMarker.lng,
              altitude: 0.4,
            },
            3000
          );

          // Elimina esta línea para evitar entrar en detalle automáticamente
          // handleShowStoryDetail(currentMarker);
        }
        currentStoryIndexRef.current =
          (currentStoryIndexRef.current + 1) % markersToLoop.length;
      }, 10000);
    } else if (userActive && storyLoopIntervalRef.current) {
      console.log("Deteniendo el loop de historias.");
      clearInterval(storyLoopIntervalRef.current);
      storyLoopIntervalRef.current = null;
    }
  }, [userActive, filteredMarkers, zoomedIn, countryMarkers, showDetail]);

  // Generar una lista de un marcador por país
  useEffect(() => {
    if (!zoomedIn && markers.length > 0) {
      const uniqueCountryMarkers = Array.from(
        markers
          .reduce((map, marker) => {
            if (!map.has(marker.country)) {
              map.set(marker.country, marker);
            }
            return map;
          }, new Map())
          .values()
      );
      setCountryMarkers(uniqueCountryMarkers);
      console.log("Country markers generados:", uniqueCountryMarkers);
    }
  }, [markers, zoomedIn]);

  // Fetch de los datos del globo
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error loading data");
        }
        return res.json();
      })
      .then((countriesGeoJson) => {
        const filteredCountries = {
          ...countriesGeoJson,
          features: countriesGeoJson.features.filter(
            (country) => country.id !== "BMU"
          ),
        };

        setCountries(filteredCountries);
        const filteredCountries2 = {
          ...countriesGeoJson,
          features: countriesGeoJson.features.filter(
            (country) =>
              country.id !== "BMU" && country.properties.name !== "Uruguay"
          ),
        };
        const combinedFeatures = [
          ...filteredCountries2.features,
          ...uruguayData.features,
        ];

        const combinedData = {
          ...filteredCountries,
          features: combinedFeatures,
        };
        setarrayUruguayYMundo(combinedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Fetch de la API en localhost para obtener los marcadores e historias
  useEffect(() => {
    fetch("http://vocesback.up.railway.app/api/historias?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        const markersFromApi = data.docs.map((item) => ({
          lat: parseFloat(item.latitud),
          lng: parseFloat(item.longitud),
          label: item.title,
          country: item.paisesIngles?.title || "",
          pais: item.paises?.title || "",
          categoria: item.categorias || [],
          textoCorto: item.content ? item.content.slice(0, 100) + "..." : "",
          texto: item.content,
          youtube: item.youtube,
        }));

        setMarkers(markersFromApi);
        console.log("Markers from API:", markersFromApi);

        const countriesFromStories = Array.from(
          new Set(
            markersFromApi.map((item) => ({
              country: item.country,
              pais: item.pais,
            }))
          )
        );

        setActiveCountries(countriesFromStories);
        setPaisesRespaldo(countriesFromStories);
      })
      .catch((err) => console.error("Error fetching markers:", err));
  }, []);

  // Fetch de los datos de Uruguay
  useEffect(() => {
    fetch("http://vocesback.up.railway.app/api/historiasUruguay?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        const markersFromApi = data.docs.map((item) => ({
          lat: parseFloat(item.latitud),
          lng: parseFloat(item.longitud),
          label: item.title,
          country: item.departamento?.title || "",
          pais: "Uruguay",
          categoria: item.categorias || [],
          textoCorto: item.content ? item.content.slice(0, 100) + "..." : "",
          texto: item.content,
          youtube: item.youtube,
        }));
        console.log("Uruguay departments:", markersFromApi);
        setUruguayDepartments(markersFromApi);
      })
      .catch((err) =>
        console.error("Error fetching Uruguay departments:", err)
      );
  }, []);
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleUruguayClick = () => {
    const uruguay = countries.features.find(
      (d) => d.properties.name === "Uruguay"
    );
    if (uruguay) {
      const [lng, lat] = d3.geoCentroid(uruguay);
      globeRef.current.pointOfView({ lat, lng, altitude: 0.3 }, 3000);
      setFilteredMarkers(uruguayDepartments);
      setSelectedCountryStories(uruguayDepartments);
      setZoomedIn(true);
    }
  };
  const handleSearch = () => {
    const normalizedQuery = removeAccents(searchQuery).toLowerCase();

    // Verificar si el término de búsqueda coincide con una palabra clave de alguna categoría usando fuzzySearch
    const matchedCategory = fuzzySearch(normalizedQuery, categoryKeywords);

    if (matchedCategory) {
      // Filtrar marcadores por la categoría coincidente
      const categoryMarkers = markers.filter((marker) =>
        marker.categoria[0].title
          .toLowerCase()
          .includes(matchedCategory.toLowerCase())
      );
      setFilteredMarkers(categoryMarkers);

      //globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 3000);
      if (categoryMarkers.length > 0) {
        const randomMarker =
          categoryMarkers[Math.floor(Math.random() * categoryMarkers.length)];
        globeRef.current.pointOfView(
          { lat: randomMarker.lat, lng: randomMarker.lng, altitude: 2 },
          3000
        );
      }

      console.log("Category markers:", categoryMarkers);
      setSelectedCountryStories(categoryMarkers);
      setZoomedIn(true);
    } else {
      // Búsqueda difusa en países
      const matchedCountry = fuzzySearchCountries(
        normalizedQuery,
        activeCountries.map((ac) => ac.pais)
      );

      if (matchedCountry) {
        const countryInList = activeCountries.find(
          (ac) =>
            removeAccents(ac.pais.toLowerCase()) ===
            removeAccents(matchedCountry.toLowerCase())
        );

        if (countryInList) {
          const country = countries.features.find(
            (c) =>
              removeAccents(c.properties.name.toLowerCase()) ===
              removeAccents(countryInList.country.toLowerCase())
          );
          if (country) {
            handleCountryClick(country);
          } else {
            toast.error("País o categoría no encontrada");
          }
        } else {
          toast.error("País o categoría no encontrada");
        }
      } else {
        toast.error("País o categoría no encontrada");
      }
    }
  };

  const handleDepartmentClick = (country) => {
    if (!country) return;

    console.log("Country clicked in App:", country);

    const [lng, lat] = d3.geoCentroid(country);

    const altitude = 0.1;

    globeRef.current.pointOfView(
      {
        lat: country.lat,
        lng: country.lng,
        altitude: altitude,
      },
      3000
    );

    // Filtrar los marcadores para mostrar solo los de ese país
    const countryMarkers = uruguayDepartments.filter(
      (marker) => marker.country === country.country
    );
    console.log("Country markerssssss:", countryMarkers);
    setFilteredMarkers(countryMarkers); // Guardar los marcadores filtrados
    console.log("Country markerssssss:", filteredMarkers);
    setSelectedCountryStories(countryMarkers); // Guardar las historias del país seleccionado
    setAdentroUruguay(true);
    setZoomedIn(true);
  };
  const handleCountryClick = (country) => {
    if (!country) return;

    if (country.properties.name === "Uruguay") {
      handleUruguayClick();
      return;
    }

    const [lng, lat] = d3.geoCentroid(country);
    let altitude;

    if (window.innerWidth < 768) {
      altitude = country.properties.POP_EST > 100000000 ? 2.5 : 1.5; // Ajusta la altitud mínima para dispositivos móviles
    } else {
      altitude = country.properties.POP_EST > 100000000 ? 2.5 : 0.7; // Altitud para pantallas más grandes
    }

    globeRef.current.pointOfView({ lat, lng, altitude }, 3000);

    const countryMarkers = markers.filter(
      (marker) => marker.country === country.properties.name
    );
    setFilteredMarkers(countryMarkers);
    setSelectedCountryStories(countryMarkers);
    setZoomedIn(true);
  };

  const handleZoomOut = () => {
    if (showDetail) {
      setShowDetail(false);
      setSelectedStory(null);
    } else if (!adentroUruguay && paisesRespaldo === activeCountries) {
      const altitude = window.innerWidth < 768 ? 4 : 2.2; // Ajusta la altitud según el tamaño de la pantalla
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude }, 3000);
      setZoomedIn(false);
      setFilteredMarkers([]);
      setSelectedCountryStories([]);
    } else if (adentroUruguay) {
      setAdentroUruguay(false);
      setFilteredMarkers([]);
      globeRef.current.pointOfView(
        { lat: -32.522779, lng: -55.765835, altitude: 0.3 },
        3000
      );
      setZoomedIn(true);
      setSelectedCountryStories([]);
    } else {
      const altitude = window.innerWidth < 768 ? 4 : 2.2; // Ajusta la altitud según el tamaño de la pantalla
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude }, 3000);
      setZoomedIn(false);
      setFilteredMarkers([]);
      setSelectedCountryStories([]);
      setActiveCountries(paisesRespaldo);
    }
  };
  const handleShowStoryDetail = (story) => {
    console.log("Story clicked:", story); // Debugging

    // Detiene el loop de historias si está activo
    if (storyLoopIntervalRef.current) {
      clearInterval(storyLoopIntervalRef.current);
      storyLoopIntervalRef.current = null;
    }

    setSelectedStory(story);
    setShowDetail(true);
  };

  return (
    <div className="relative bg-[#000011]">
      {/* Botón de música */}
      <div className="absolute top-5 right-5 z-20">
        <MusicPlayer />
      </div>
      <Toaster richColors position="top-center" />
      {!zoomedIn && !showDetail && <BackToHome />}
      {!showDetail && (
        <>
          <FocusButtons
            focusOnWorld={() =>
              globeRef.current.pointOfView(
                { lat: 0, lng: 0, altitude: 2.2 },
                3000
              )
            }
            focusOnUruguay={handleUruguayClick}
          />
          {(!isMobileDevice() ||
            !(
              zoomedIn &&
              selectedCountryStories.length > 0 &&
              !showDetail
            )) && (
            <div className="absolute top-5 right-5 z-10">
              <SearchBar
                searchQuery={searchQuery}
                setZoomedIn={setZoomedIn}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />
            </div>
          )}
        </>
      )}
      <div
        className={`relative ${
          zoomedIn
            ? isMobileDevice()
              ? "w-[100vw]"
              : "w-[90vw] -ml-[27vw]"
            : "w-[100vw]"
        } h-screen transition-all ease-in-out duration-[3000ms] contenedor ${
          showDetail ? "move-up" : ""
        }`}
      >
        {loading ? (
          <div>Cargando mapa...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <GlobeComponent
            searchQuery={searchQuery}
            countries={countries}
            setCountries={setCountries}
            hoveredCountry={hoveredCountry}
            setHoveredCountry={setHoveredCountry}
            globeRef={globeRef}
            handleCountryClick={handleCountryClick}
            setZoomedIn={setZoomedIn}
            zoomedIn={zoomedIn}
            markers={filteredMarkers}
            uruguayDepartments={uruguayDepartments}
            activeCountries={activeCountries}
            setFilteredMarkers={setFilteredMarkers}
            filteredMarkers={filteredMarkers}
            setActiveCountries={setActiveCountries}
            setSelectedCountryStories={setSelectedCountryStories}
            selectedCountryStories={selectedCountryStories}
            handleDepartmentClick={handleDepartmentClick}
            combinedData={arrayUruguayYMundo}
            handleShowStoryDetail={handleShowStoryDetail} // Asegúrate de pasar la función correcta
            showDetail={showDetail}
            consolidatedMarkers={consolidatedMarkers}
            setConsolidatedMarkers={setConsolidatedMarkers}
            updateConsolidatedMarkers={updateConsolidatedMarkers}
          />
        )}
      </div>
      {(zoomedIn || showDetail) && (
        <button
          onClick={handleZoomOut}
          className="absolute top-5 left-5 z-20 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          <FaArrowLeft size={20} />
        </button>
      )}
      {zoomedIn && selectedCountryStories.length > 0 && !showDetail && (
        <CountryStoriesList
          stories={selectedCountryStories}
          setFilteredMarkers={setFilteredMarkers}
          countryName={selectedCountryStories[0].pais}
          handleShowStoryDetail={handleShowStoryDetail} // Asegúrate de pasar la función correcta
          setConsolidatedMarkers={setConsolidatedMarkers}
        />
      )}
      {selectedStory && showDetail && (
        <StoryDetail
          story={selectedStory}
          onClose={() => {
            setShowDetail(false);
            setSelectedStory(null);
          }}
        />
      )}
    </div>
  );
};

export default Planeta;
