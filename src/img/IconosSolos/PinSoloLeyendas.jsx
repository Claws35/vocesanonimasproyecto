export default function PinSoloLeyendas({
  colorClass = "text-blue-500",
  width = 48, // Valor por defecto para el ancho
  height = 48, // Valor por defecto para la altura
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="15 -20 63.76 143.89" // Ajusta los valores para centrar el contenido
      width={width} // Usa el valor de ancho pasado como prop
      height={height}
      fill="currentColor" // Usamos `currentColor` para que el color se derive de la clase de Tailwind
      className={colorClass} // Aplica el color de Tailwind como una clase
    >
      <g>
        <path
          className="cls-1"
          d="M45.8,0c-8.94,0-16.16,17.99-16.16,26.94s7.24,16.16,16.16,16.16,16.16-7.24,16.16-16.16S54.74,0,45.8,0M45.8,24.24c2.98,0,5.39,2.41,5.39,5.39s-2.41,5.39-5.39,5.39-5.39-2.41-5.39-5.39,2.41-5.39,5.39-5.39M32.33,48.49c-2.98,0-5.39,2.41-5.39,5.39v43.1h-10.78c-2.98,0-5.39-2.41-5.39-5.39v-5.39c0-2.98-2.41-5.39-5.39-5.39s-5.39,2.41-5.39,5.39v5.39c0,8.93,7.24,16.16,16.16,16.16h64.65c2.98,0,5.39-2.41,5.39-5.39s-2.41-5.39-5.39-5.39h-16.16v-43.1c0-2.98-2.41-5.39-5.39-5.39h-26.94Z"
        />
      </g>
    </svg>
  );
}
