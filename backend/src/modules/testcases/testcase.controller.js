import { getAllCases, createCase } from "./testcase.service.js";

export async function getAll(req, res, next) {
  try { res.json(await getAllCases()); }
  catch (e) { next(e); }
}

export async function create(req, res, next) {
  try { res.status(201).json(await createCase(req.body, req.user.id)); }
  catch (e) { next(e); }
}
