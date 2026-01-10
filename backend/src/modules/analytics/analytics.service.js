import supabase from "../../config/supabase.js";

export async function getDashboardSummary() {
  const { data: testCases } = await supabase
    .from("test_cases")
    .select("id");

  const { data: executions } = await supabase
    .from("test_executions")
    .select("status");

  const summary = {
    totalTestCases: testCases?.length || 0,
    totalExecutions: executions?.length || 0,
    passed: executions?.filter(e => e.status === "PASS").length || 0,
    failed: executions?.filter(e => e.status === "FAIL").length || 0,
    blocked: executions?.filter(e => e.status === "BLOCKED").length || 0,
  };

  return summary;
}
