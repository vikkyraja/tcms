import { getSuitesByProject } from "./testsuites.service.js";

export const fetchTestSuites = async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }

  try {
    const suites = await getSuitesByProject(projectId);
    res.json(suites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
