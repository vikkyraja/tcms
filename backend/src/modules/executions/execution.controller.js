import { executeTest } from "./execution.service.js";

export async function execute(req, res, next) {
  try { res.status(201).json(await executeTest(req.body, req.user.id)); }
  catch (e) { next(e); }
}
