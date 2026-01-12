import supabase from "../../config/supabase.js";

/* ---------------- GET PAGINATED ---------------- */
export async function getTestCasesPaginated({ projectId, page = 1, limit = 10 }) {
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
}

/* ---------------- GET BY ID ---------------- */
export async function getTestCaseById(id) {
  const { data, error } = await supabase
    .from("test_cases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

/* ---------------- CREATE ---------------- */
export async function createTestCase(payload, userId) {
  const { data, error } = await supabase
    .from("test_cases")
    .insert({
      project_id: payload.project_id,
      title: payload.title,
      description: payload.description || null,
      priority: payload.priority || "Medium",
      type: payload.type || null,
      pre_conditions: payload.pre_conditions || null,
      post_conditions: payload.post_conditions || null,
      created_by: userId,
    })
    .select();

  if (error) throw error;
  return data[0];
}

/* ---------------- UPDATE ---------------- */
export async function updateTestCase(id, payload) {
  const { data, error } = await supabase
    .from("test_cases")
    .update({
      project_id: payload.project_id,
      title: payload.title,
      description: payload.description || null,
      priority: payload.priority || "Medium",
      type: payload.type || null,
      pre_conditions: payload.pre_conditions || null,
      post_conditions: payload.post_conditions || null,
    })
    .eq("id", id)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) throw new Error("Update failed");
  return data[0];
}

/* ---------------- DELETE ---------------- */
export async function deleteTestCase(id) {
  const { error } = await supabase
    .from("test_cases")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return { success: true };
}