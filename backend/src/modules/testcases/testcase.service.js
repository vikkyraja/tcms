import supabase from "../../config/supabase.js";

export const getTestCasesPaginated = async ({
  projectId,
  page = 1,
  limit = 10,
}) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("test_cases")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (projectId) {
    query = query.eq("project_id", projectId);
  }

  const { data, count, error } = await query;

  if (error) throw error;

  return {
    data,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
};
