// Función de distancia de Levenshtein para países
const levenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array(b.length + 1).fill(i)
  );

  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // eliminación
          matrix[i][j - 1] + 1, // inserción
          matrix[i - 1][j - 1] + 1 // sustitución
        );
      }
    }
  }

  return matrix[a.length][b.length];
};

// Búsqueda difusa específica para países
const fuzzySearchCountries = (input, countryList) => {
  const threshold = 2; // Umbral para países
  const inputNormalized = input.toLowerCase();

  let bestMatch = null;
  let minDistance = threshold + 1;

  for (const country of countryList) {
    const countryNormalized = country.toLowerCase();
    const distance = levenshteinDistance(inputNormalized, countryNormalized);

    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = country;
    }
  }

  return minDistance <= threshold ? bestMatch : null;
};

export { fuzzySearchCountries };
