export default function PinSoloObjetos({
  colorClass = "text-blue-500",
  width = 48, // Valor por defecto para el ancho
  height = 48, // Valor por defecto para la altura
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 -20 63.76 143.89" // Ajusta los valores para centrar el contenido
      width={width} // Usa el valor de ancho pasado como prop
      height={height}
      fill="currentColor" // Usamos `currentColor` para que el color se derive de la clase de Tailwind
      className={colorClass} // Aplica el color de Tailwind como una clase
    >
      <g>
        <path
          className="cls-1"
          d="M20.24,0l6.08,15.05c-1.39,2.56-8.9,8.97-8.11,11.53l12.56,9.65-4.23,10.91,7.41-11.91-10.54-9.57,10.1-9.41L28.62,0h17.81c1.32,15.76,9.42,47.04,0,60.23-3,4.2-13.12,9.86-14.12,12.07-.95,2.08-.92,14.47-.6,17.33.82,7.11,12.88,3.95,17.39,8.8,1.94,2.08,2.06,6.33-.04,6.33H1.91c-2.1,0-1.98-4.25-.04-6.33,4.51-4.85,16.57-1.68,17.39-8.8.35-3.01.37-14.99-.6-17.32-1.11-2.65-10.98-7.68-14.11-12.08C-4.94,46.95,3.17,15.81,4.52,0h15.71Z"
        />{" "}
      </g>
    </svg>
  );
}
