export default function PinSoloCreencias({
  colorClass = "text-blue-500",
  width = 48, // Valor por defecto para el ancho
  height = 48, // Valor por defecto para la altura
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="20 -20 63.76 143.89" // Ajusta los valores para centrar el contenido
      width={width} // Usa el valor de ancho pasado como prop
      height={height} // Usa el valor de altura pasado como prop
      fill="currentColor" // Usamos `currentColor` para que el color se derive de la clase de Tailwind
      className={colorClass} // Aplica el color de Tailwind como una clase
    >
      <g>
        <path
          className="cls-1"
          d="M115.96,10.23c-.16-.94-.81-4.4-3.67-7.06-6.54-6.08-17.9-1.63-18.97-1.2-5.74,2.34-9.19,6.45-10.65,8.39-15.91,21.08-3.64,60.67-11.08,60.67-10.65,0-6.58-17.6-34.48-17.44C4.77,53.79,0,91.13,0,91.13c0,0,96.53,0,96.54,0,10.9-17.69,4.26-26.53-.38-43.67-.53-1.96-1.97-7.6-1.22-14.72.4-3.8.79-7.27,3.19-8.57,2.26-1.22,4.09.68,8.66-.22,1.3-.26,3.81-.75,5.94-2.66,4.38-3.96,3.33-10.57,3.25-11.05ZM103.62,13.84c-2.03,0-3.67-1.64-3.67-3.67s1.64-3.67,3.67-3.67,3.67,1.64,3.67,3.67-1.64,3.67-3.67,3.67Z"
        />
      </g>
    </svg>
  );
}
