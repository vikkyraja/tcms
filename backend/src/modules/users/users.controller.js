import { getUsersPaginated } from "./users.service.js";

export const fetchUsers = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const result = await getUsersPaginated({ page, limit });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
