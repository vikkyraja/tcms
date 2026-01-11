import { getAllProjects } from "./projects.service.js";

export const fetchProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
