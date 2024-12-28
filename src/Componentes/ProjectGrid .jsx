// ProjectGrid.jsx
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects }) => {
  return (
    <section
      id="grillaProyectos"
      className="py-10 min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        Proyectos de Voces Anónimas
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl p-4 grid-flow-row auto-rows-fr">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            rowSpan={project.rowSpan}
            colSpan={project.colSpan}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
