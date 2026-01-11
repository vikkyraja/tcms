import supabase from "../../config/supabase.js";

/* LIST (PAGINATED) */
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

/* GET BY ID */
export const getTestCaseById = async (id) => {
  const { data, error } = await supabase
    .from("test_cases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

/* CREATE */
export const createTestCase = async (payload, userId) => {
  const { data, error } = await supabase
    .from("test_cases")
    .insert({
      ...payload,
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/* UPDATE */
export const updateTestCase = async (id, payload) => {
  const { data, error } = await supabase
    .from("test_cases")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/* DELETE */
export const deleteTestCase = async (id) => {
  const { error } = await supabase
    .from("test_cases")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return { success: true };
};
