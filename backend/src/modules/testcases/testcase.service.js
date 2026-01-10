import supabase from "../../config/supabase.js";

export async function getAllCases() {
  const { data } = await supabase.from("test_cases").select("*");
  return data;
}

export async function createCase(data, userId) {
  const { data: result } = await supabase
    .from("test_cases")
    .insert([{ ...data, created_by: userId }])
    .select()
    .single();
  return result;
}
