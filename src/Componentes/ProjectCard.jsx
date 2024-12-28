// ProjectCard.jsx
import React from "react";

const ProjectCard = ({
  title,
  description,
  rowSpan = "row-span-1",
  colSpan = "col-span-1",
}) => {
  return (
    <article
      className={`relative bg-cover bg-center rounded-lg overflow-hidden h-64 ${rowSpan} ${colSpan} bg-gray-800`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 transition-opacity duration-300 hover:bg-opacity-60">
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-white mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;
