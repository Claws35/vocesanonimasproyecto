export default function PinSoloFantasmas({
  colorClass = "text-blue-500",
  width = 48, // Valor por defecto para el ancho
  height = 48, // Valor por defecto para la altura
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="8 -20 63.76 143.89" // Ajusta los valores para centrar el contenido
      width={width} // Usa el valor de ancho pasado como prop
      height={height}
      fill="currentColor" // Usamos `currentColor` para que el color se derive de la clase de Tailwind
      className={colorClass} // Aplica el color de Tailwind como una clase
    >
      <g>
        <path
          className="cls-1"
          d="M8.14,94.82l-2.27,1.83c-.65.51-1.44.79-2.25.79-1.99,0-3.61-1.62-3.61-3.61v-54.85C0,17.46,17.46,0,38.98,0s38.98,17.46,38.98,38.98v54.85c0,1.99-1.62,3.61-3.61,3.61-.81,0-1.6-.28-2.25-.79l-2.27-1.83c-2.72-2.17-6.66-1.83-8.95.79l-6.19,7.1c-.67.77-1.66,1.22-2.7,1.22s-2.01-.45-2.7-1.22l-5.4-6.19c-2.58-2.96-7.19-2.96-9.78,0l-5.4,6.19c-.67.77-1.66,1.22-2.7,1.22s-2.01-.45-2.7-1.22l-6.19-7.1c-2.29-2.62-6.23-2.96-8.95-.79M32.48,38.98c0-3.59-2.91-6.5-6.5-6.5s-6.5,2.91-6.5,6.5,2.91,6.5,6.5,6.5,6.5-2.91,6.5-6.5M51.97,45.47c3.59,0,6.5-2.91,6.5-6.5s-2.91-6.5-6.5-6.5-6.5,2.91-6.5,6.5,2.91,6.5,6.5,6.5"
        />
      </g>
    </svg>
  );
}
