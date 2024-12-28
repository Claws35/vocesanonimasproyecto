export default function PinSoloLugares({
  colorClass = "text-blue-500",
  width = 48, // Valor por defecto para el ancho
  height = 48, // Valor por defecto para la altura
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 -20 63.76 143.89" // Ajusta los valores para centrar el contenido
      width={width} // Usa el valor de ancho pasado como prop
      height={height}
      fill="currentColor" // Usamos `currentColor` para que el color se derive de la clase de Tailwind
      className={colorClass} // Aplica el color de Tailwind como una clase
    >
      <g>
        <path
          className="cls-1"
          d="M68.62,14.16C59.53.83,45.72-.84,30.54.29,15.54,1.4,1.46,14.57,0,29.66v73.9h74.69V30.86c0-4.9-3.3-12.65-6.07-16.7ZM55.5,40.49h-14.26v28.53h-7.78v-28.53h-14.27v-7.78h14.27v-15.56h7.78v15.56h14.26v7.78Z"
        />
      </g>
    </svg>
  );
}
