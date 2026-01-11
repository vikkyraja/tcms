import {
  getTestCasesPaginated,
} from "./testcase.service.js";

export const getAllTestCases = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const projectId = req.query.projectId;

    const result = await getTestCasesPaginated({
      page,
      limit,
      projectId,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
