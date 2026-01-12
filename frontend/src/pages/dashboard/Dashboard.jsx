import { useMemo, useState } from "react"; // Removed useEffect as API call is gone
// Removed 'api' import since it's no longer used for fetching
import StatusPie from "../../components/charts/StatusPie";
import PriorityBar from "../../components/charts/PriorityBar";
import ExecutionTrend from "../../components/charts/ExecutionTrend";
import { useProject } from "../../context/ProjectContext";

/* 🔒 DUMMY DATA FOR ALL DASHBOARD ELEMENTS */
// This object will now be the sole source of data for the dashboard.
const DUMMY_ANALYTICS = {
  totalTestCases: 42,
  totalExecutions: 120,
  passed: 82,
  failed: 25,
  blocked: 8,
  skipped: 5,
  priorityDistribution: {
    Low: 10,
    Medium: 15,
    High: 12,
    Critical: 15,
  },
  executionTrend: [
    { date: "Jan 01", passed: 5, failed: 2 },
    { date: "Jan 02", passed: 8, failed: 1 },
    { date: "Jan 03", passed: 6, failed: 3 },
    { date: "Jan 04", passed: 10, failed: 2 },
    { date: "Jan 05", passed: 12, failed: 1 },
    { date: "Jan 06", passed: 15, failed: 3 },
    { date: "Jan 07", passed: 11, failed: 0 },
  ],
};

export default function Dashboard() {
  const { project } = useProject();

  // We are no longer fetching, so loading can be false by default.
  // The 'analytics' state is also no longer needed.
  // const [analytics, setAnalytics] = useState(null);
  const [loading] = useState(false); // Always false now

  // The useEffect hook for API fetching is removed.
  // useEffect(() => {
  //   let url = "/analytics/summary";
  //   if (project?.id) {
  //     url += `?projectId=${project.id}`;
  //   }
  //   setLoading(true);
  //   api.get(url) // Changed from the previous hardcoded URL for consistency.
  //     .then((res) => {
  //       if (res.data && Object.keys(res.data).length > 0) {
  //         setAnalytics(res.data);
  //       } else {
  //         setAnalytics(null);
  //       }
  //     })
  //     .catch(() => {
  //       setAnalytics(null);
  //     })
  //     .finally(() => setLoading(false));
  // }, [project]);

  /* ✅ ALWAYS PROVIDE DUMMY DATA */
  // 'data' now directly references our DUMMY_ANALYTICS
  const data = DUMMY_ANALYTICS;

  /* ✅ CHART SAFE SHAPES */
  const statusData = useMemo(
    () => ({
      Passed: data.passed ?? 0,
      Failed: data.failed ?? 0,
      Blocked: data.blocked ?? 0,
      Skipped: data.skipped ?? 0,
    }),
    [data]
  );

  const priorityData = useMemo(
    () => data.priorityDistribution, // Directly use the dummy distribution
    [data]
  );

  const trendData = useMemo(
    () => data.executionTrend, // Directly use the dummy trend
    [data]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          📊 Dashboard
        </h1>
        <p className="text-gray-500">
          Test execution insights {project ? `for ${project.name}` : ""}
          {/* Note: This will still show project name from context if available */}
        </p>
      </div>

      {/* KPI CARDS - Now use DUMMY_ANALYTICS directly */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <Kpi title="Test Cases" value={data.totalTestCases} color="from-indigo-500 to-indigo-700" />
        <Kpi title="Executions" value={data.totalExecutions} color="from-blue-500 to-blue-700" />
        <Kpi title="Passed" value={data.passed} color="from-green-500 to-green-700" />
        <Kpi title="Failed" value={data.failed} color="from-red-500 to-red-700" />
        <Kpi title="Blocked" value={data.blocked} color="from-yellow-500 to-yellow-700" />
      </div>

      {/* CHARTS - Now use DUMMY_ANALYTICS via memoized shapes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Execution Status">
          <StatusPie data={statusData} />
        </ChartCard>

        <ChartCard title="Priority Distribution">
          <PriorityBar data={priorityData} />
        </ChartCard>
      </div>

      <ChartCard title="Execution Trend">
        <ExecutionTrend data={trendData} />
      </ChartCard>
    </div>
  );
}

/* ================== UI HELPERS ================== */

function Kpi({ title, value, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} text-white p-5 rounded-xl shadow`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};