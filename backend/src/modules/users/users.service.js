import supabase from "../../config/supabase.js";

export const getUsersPaginated = async ({ page = 1, limit = 10 }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("users")
    .select("id, name, email, role, created_at", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

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
