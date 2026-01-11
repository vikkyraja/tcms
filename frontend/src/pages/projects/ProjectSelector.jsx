import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useProject } from "../../context/ProjectContext";

export default function ProjectSelector() {
  const { project, selectProject } = useProject();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <select
      className="border px-3 py-2 rounded text-sm"
      value={project?.id || ""}
      onChange={(e) => {
        const selected = projects.find(
          (p) => p.id === e.target.value
        );
        selectProject(selected);
      }}
    >
      <option value="">Select Project</option>

      {projects.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
