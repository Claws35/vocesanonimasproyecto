// Función de distancia de Levenshtein para categorías
const levenshteinDistance = (a, b) => {
  // (El mismo código de Levenshtein que antes)
};

// Búsqueda difusa específica para categorías
const fuzzySearchCategories = (input, keywords) => {
  const threshold = 2; // Umbral para categorías
  const inputNormalized = input.toLowerCase();

  for (const category in keywords) {
    for (const keyword of keywords[category]) {
      const keywordNormalized = keyword.toLowerCase();
      const distance = levenshteinDistance(inputNormalized, keywordNormalized);

      if (distance <= threshold) {
        return category; // Retorna la categoría si encuentra coincidencia
      }
    }
  }
  return null;
};

export { fuzzySearchCategories };
