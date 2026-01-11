import {
  getTestCasesPaginated,
  getTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase,
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

export const getTestCase = async (req, res) => {
  try {
    const tc = await getTestCaseById(req.params.id);
    res.json(tc);
  } catch (e) {
    res.status(404).json({ message: "Test case not found" });
  }
};

export const addTestCase = async (req, res) => {
  try {
    const tc = await createTestCase(req.body, req.user.id);
    res.status(201).json(tc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const editTestCase = async (req, res) => {
  try {
    const tc = await updateTestCase(req.params.id, req.body);
    res.json(tc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const removeTestCase = async (req, res) => {
  try {
    await deleteTestCase(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
