import supabase from "../../config/supabase.js";

export async function getDashboardSummary(projectId) {
  // ---------- Test Cases ----------
  let testCaseQuery = supabase
    .from("test_cases")
    .select("id", { count: "exact", head: true });

  if (projectId) {
    testCaseQuery = testCaseQuery.eq("project_id", projectId);
  }

  const { count: totalTestCases } = await testCaseQuery;

  // ---------- Executions ----------
  let executionQuery = supabase
    .from("test_executions")
    .select("status");

  if (projectId) {
    executionQuery = executionQuery.eq("project_id", projectId);
  }

  const { data: executions = [] } = await executionQuery;

  return {
    totalTestCases: totalTestCases || 0,
    totalExecutions: executions.length,
    passed: executions.filter(e => e.status === "Pass").length,
    failed: executions.filter(e => e.status === "Fail").length,
    blocked: executions.filter(e => e.status === "Blocked").length,
    skipped: executions.filter(e => e.status === "Skipped").length,

    priorityDistribution: {
      Low: 0,
      Medium: 0,
      High: 0,
      Critical: 0,
    },

    executionTrend: [], // can add later
  };
}
