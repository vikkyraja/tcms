import { getDashboardSummary } from "./analytics.service.js";

export async function getSummary(req, res, next) {
  try {
    const data = await getDashboardSummary();
    res.json(data);
  } catch (e) {
    next(e);
  }
}
