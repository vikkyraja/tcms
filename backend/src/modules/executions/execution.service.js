import supabase from "../../config/supabase.js";

export async function executeTest(data, userId) {
  const { data: result } = await supabase
    .from("test_executions")
    .insert([{ ...data, executed_by: userId }])
    .select()
    .single();
  return result;
}
