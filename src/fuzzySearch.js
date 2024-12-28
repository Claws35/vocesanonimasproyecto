// fuzzySearch.js

// Función de distancia de Levenshtein para comparar la cercanía de dos palabras
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

// Función de búsqueda difusa para encontrar la palabra clave más cercana
const fuzzySearch = (input, keywords) => {
  const threshold = 2; // Define cuántas diferencias se permiten
  const inputNormalized = input.toLowerCase();

  for (const category in keywords) {
    for (const keyword of keywords[category]) {
      const keywordNormalized = keyword.toLowerCase();
      const distance = levenshteinDistance(inputNormalized, keywordNormalized);

      if (distance <= threshold) {
        return category; // Retorna la categoría si encuentra una coincidencia cercana
      }
    }
  }
  return null; // Retorna null si no encuentra coincidencias
};

export { fuzzySearch };
