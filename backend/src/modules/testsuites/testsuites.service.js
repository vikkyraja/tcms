import supabase from "../../config/supabase.js";

export const getSuitesByProject = async (projectId) => {
  const { data, error } = await supabase
    .from("test_suites")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
