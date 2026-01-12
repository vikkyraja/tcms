import { getDashboardSummary } from "./analytics.service.js";

export async function getSummary(req, res) {
  try {
    const projectId = req.query.projectId || null;
    const summary = await getDashboardSummary(projectId);
    res.json(summary);
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Failed to load analytics" });
  }
}
