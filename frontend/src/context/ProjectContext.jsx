import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(
    JSON.parse(localStorage.getItem("project"))
  );

  const selectProject = (project) => {
    localStorage.setItem("project", JSON.stringify(project));
    setProject(project);
  };

  const clearProject = () => {
    localStorage.removeItem("project");
    setProject(null);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        selectProject,
        clearProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
