// CountryStoriesList.jsx
import React, { useState, useEffect } from "react";
import PinSoloCreencias from "../img/IconosSolos/PinSoloCreencias";
import PinSoloFantasmas from "../img/IconosSolos/PinSoloFantasmas";
import PinSoloJuegos from "../img/IconosSolos/PinSoloJuegos";
import PinSoloLeyendas from "../img/IconosSolos/PinSoloLeyendas";
import PinSoloLugares from "../img/IconosSolos/PinSoloLugares";
import PinSoloObjetos from "../img/IconosSolos/PinSoloObjetos";
import svgMarkerType2 from "../img/pins/PinNumero2.svg";
import svgMarkerType3 from "../img/pins/PinNumero3.svg";
import svgMarkerType4 from "../img/pins/PinNumero4.svg";
import svgMarkerType5 from "../img/pins/PinNumero5.svg";
import svgMarkerType5Plus from "../img/pins/PinNumero5plus.svg";

const categoryIcons = {
  "Creencias Sobrenaturales": { component: PinSoloCreencias, color: "#669933" },
  "Fantasmas y Apariciones": { component: PinSoloFantasmas, color: "#a06d35" },
  "Juegos y Rituales": { component: PinSoloJuegos, color: "#6e2670" },
  "Leyendas urbanas": { component: PinSoloLeyendas, color: "#308ba0" },
  "Lugares Malditos": { component: PinSoloLugares, color: "#1f4787" },
  "Objetos Malditos": { component: PinSoloObjetos, color: "#99253e" },
  closeMarkers2: { icon: svgMarkerType2 },
  closeMarkers3: { icon: svgMarkerType3 },
  closeMarkers4: { icon: svgMarkerType4 },
  closeMarkers5: { icon: svgMarkerType5 },
  closeMarkers5Plus: { icon: svgMarkerType5Plus },
};

const CountryStoriesList = ({
  stories,
  setFilteredMarkers,
  handleShowStoryDetail,
  countryName,
  setConsolidatedMarkers,
  selectedGroup,
  setSelectedGroup,
  handleBackToList,
}) => {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [filteredStories, setFilteredStories] = useState(stories);
  const [groupedMarkers, setGroupedMarkers] = useState([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const availableCategories = Array.from(
    new Set(stories.flatMap((story) => story.categoria.map((cat) => cat.title)))
  );

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const areStoriesClose = (story1, story2, threshold = 0.5) => {
    const distance = Math.sqrt(
      Math.pow(story1.lat - story2.lat, 2) +
        Math.pow(story1.lng - story2.lng, 2)
    );
    return distance < threshold;
  };

  const groupStories = (storiesToGroup) => {
    const groupedStories = [];
    const visited = new Set();

    storiesToGroup.forEach((story, index) => {
      if (visited.has(index)) return;

      const closeStories = storiesToGroup.filter(
        (otherStory, i) => i !== index && areStoriesClose(story, otherStory)
      );

      const numCloseStories = closeStories.length + 1;

      let iconKey = null;
      if (numCloseStories === 2) iconKey = "closeMarkers2";
      else if (numCloseStories === 3) iconKey = "closeMarkers3";
      else if (numCloseStories === 4) iconKey = "closeMarkers4";
      else if (numCloseStories === 5) iconKey = "closeMarkers5";
      else if (numCloseStories > 5) iconKey = "closeMarkers5Plus";

      if (numCloseStories > 1) {
        const consolidatedStory = {
          ...story,
          label: `${numCloseStories} historias agrupadas`,
          categoria: [{ title: iconKey }],
          groupedStories: [story, ...closeStories],
        };

        groupedStories.push(consolidatedStory);
        visited.add(index);
        closeStories.forEach((s) => visited.add(storiesToGroup.indexOf(s)));
      } else {
        groupedStories.push(story);
      }
    });

    return groupedStories;
  };

  useEffect(() => {
    const activeCategories = Object.keys(selectedCategories).filter(
      (category) => selectedCategories[category]
    );

    // Filtrar historias basadas en las categorías seleccionadas
    let filtered =
      activeCategories.length > 0
        ? stories.filter((story) =>
            story.categoria.some((cat) => activeCategories.includes(cat.title))
          )
        : stories;

    // Ordenar las historias por etiqueta
    filtered = filtered.sort((a, b) => a.label.localeCompare(b.label));

    // Actualizar las historias filtradas para la lista (sin agrupar)
    setFilteredStories(filtered);

    // Agrupar historias para los marcadores
    const grouped = groupStories(filtered);
    setGroupedMarkers(grouped);

    // Actualizar los marcadores agrupados
    const filteredMarkers = grouped.map((story) => ({
      lat: story.lat,
      lng: story.lng,
      label: story.label,
      categoria: story.categoria,
      texto: story.texto,
      textoCorto: story.textoCorto,
      youtube: story.youtube,
      groupedStories: story.groupedStories || null, // Añadir groupedStories si existen
    }));
    setFilteredMarkers(filteredMarkers);
    setConsolidatedMarkers(filteredMarkers);
  }, [selectedCategories, stories, setFilteredMarkers, setConsolidatedMarkers]);

  // Manejador de clic en una historia
  const handleStoryClick = (story) => {
    if (story.groupedStories) {
      setSelectedGroup(story.groupedStories);
    } else {
      handleShowStoryDetail(story);
    }
  };

  // Determinar qué historias mostrar
  const storiesToDisplay = selectedGroup || filteredStories;

  return (
    <>
      {/* Versión web */}
      <div className="hidden md:block absolute top-20 right-20 z-20">
        {/* Filtros de Categorías */}
        <div className="flex gap-3 space-x-2 mb-3">
          {availableCategories.map((category) => {
            const IconComponent = categoryIcons[category]?.component;
            const bgColor = categoryIcons[category]?.color;

            if (!IconComponent) return null;

            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className="relative rounded-full group p-3 flex items-center gap-2 justify-center transition-colors duration-200"
                style={{
                  backgroundColor: selectedCategories[category]
                    ? bgColor
                    : "#e5e7eb",
                }}
              >
                <IconComponent
                  colorClass={
                    selectedCategories[category]
                      ? "text-black-600"
                      : "text-gray-400"
                  }
                  width={32}
                  height={32}
                />

                {/* Tooltip */}
                <div
                  className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out
                transform translate-y-4 group-hover:translate-y-0 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {category}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Historias */}
        <div className="p-1 rounded-lg max-h-[70vh] w-[25vw] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          <h3 className="text-lg font-bold mb-3 text-cyan-50">
            {countryName ? `Historias de ${countryName}` : "Historias"}
          </h3>
          {/* Botón para regresar si se está viendo un grupo */}
          {selectedGroup && (
            <button
              onClick={handleBackToList}
              className="mb-4 px-3 py-2 bg-gray-300 rounded-md text-sm font-semibold"
            >
              ← Volver al listado
            </button>
          )}
          <div className="flex flex-col gap-2">
            {storiesToDisplay.map((story) => (
              <div
                key={story.id || story.label}
                className="bg-[#D9D9D9] min-h-24 mb-4 p-3 border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => handleStoryClick(story)}
                style={{
                  borderLeft: `8px solid ${
                    categoryIcons[story.categoria[0]?.title]?.color || "#D9D9D9"
                  }`,
                }}
              >
                <h4 className="text-md font-semibold">{story.label}</h4>
                {!selectedGroup && (
                  <div className="flex items-center gap-2">
                    {story.categoria.map((cat, i) => {
                      const IconComponent = categoryIcons[cat.title]?.component;
                      return (
                        <div
                          key={cat.title + i}
                          className="flex items-center gap-1"
                        >
                          {IconComponent && (
                            <IconComponent
                              width={24}
                              height={24}
                              colorClass="text-gray-600"
                            />
                          )}
                          <span className="text-sm">{cat.title}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <p className="text-sm">{story.textoCorto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Versión móvil */}
      <div className="md:hidden fixed bottom-0 w-full bg-black/60 backdrop-blur-lg shadow-lg rounded-t-lg">
        <button
          onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          className="w-full text-center py-3 bg-gray-800/70 backdrop-blur-md text-lg font-semibold text-white"
        >
          {isMobileDrawerOpen
            ? "Cerrar"
            : `Historias ${countryName ? `de ${countryName}` : ""}`}
        </button>
        {isMobileDrawerOpen && (
          <div className="p-4 overflow-y-scroll max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-500 bg-gray-900/70 backdrop-blur-lg rounded-t-lg">
            {/* Botón para regresar si se está viendo un grupo */}
            {selectedGroup && (
              <button
                onClick={handleBackToList}
                className="mb-4 px-3 py-2 bg-gray-700/70 backdrop-blur-md rounded-md text-sm font-semibold text-white hover:bg-gray-600/80 transition-colors"
              >
                ← Volver al listado
              </button>
            )}
            {/* Filtros de Categorías */}
            {!selectedGroup && (
              <div className="flex flex-wrap gap-2 mb-4">
                {availableCategories.map((category) => {
                  const IconComponent = categoryIcons[category]?.component;
                  const bgColor = categoryIcons[category]?.color;

                  if (!IconComponent) return null;

                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className="relative rounded-full group p-3 flex items-center gap-2 justify-center transition-colors duration-200 backdrop-blur-md"
                      style={{
                        backgroundColor: selectedCategories[category]
                          ? `${bgColor}B3` // Slightly transparent background
                          : "rgba(31, 41, 55, 0.5)", // Dark gray transparent
                      }}
                    >
                      <IconComponent
                        colorClass={
                          selectedCategories[category]
                            ? "text-white"
                            : "text-gray-400"
                        }
                        width={32}
                        height={32}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col gap-2">
              {storiesToDisplay.map((story) => (
                <div
                  key={story.id || story.label}
                  className="bg-gray-800/70 backdrop-blur-md min-h-24 mb-4 p-3 border-gray-700 cursor-pointer hover:bg-gray-700/80 rounded-md transition-colors"
                  onClick={() => handleStoryClick(story)}
                  style={{
                    borderLeft: `8px solid ${
                      categoryIcons[story.categoria[0]?.title]?.color ||
                      "#4B5563"
                    }`,
                  }}
                >
                  <h4 className="text-md font-semibold text-white">
                    {story.label}
                  </h4>
                  {!selectedGroup && (
                    <p className="text-sm text-gray-300">{story.textoCorto}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CountryStoriesList;
