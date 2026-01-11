import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import StatusPie from "../../components/charts/StatusPie";
import PriorityBar from "../../components/charts/PriorityBar";
import ExecutionTrend from "../../components/charts/ExecutionTrend";
import { useProject } from "../../context/ProjectContext";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/analytics/summary");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
        setError("Failed to load dashboard data. Please try again.");
        setAnalytics(null); // Ensure analytics is null on error
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

const { project } = useProject();

useEffect(() => {
  if (!project) return;

  api.get(`/analytics/summary?projectId=${project.id}`)
     .then(res => setAnalytics(res.data));
}, [project]);
  // ✅ SAFE FALLBACK DATA (charts will ALWAYS load if API fails or is empty)
  // This fallback will only be used if analytics is explicitly null after loading.
  const fallbackAnalytics = useMemo(() => ({
    totalTestCases: 42,
    totalExecutions: 120,
    passed: 82,
    failed: 25,
    blocked: 8,
    skipped: 5,
    priorityDistribution: {
      LOW: 10,
      MEDIUM: 15,
      HIGH: 12,
      CRITICAL: 5,
    },
    executionTrend: [
      { date: "Jan 01", passed: 5, failed: 2 },
      { date: "Jan 02", passed: 8, failed: 1 },
      { date: "Jan 03", passed: 6, failed: 3 },
      { date: "Jan 04", passed: 10, failed: 2 },
      { date: "Jan 05", passed: 12, failed: 1 },
      { date: "Jan 06", passed: 9, failed: 3 },
      { date: "Jan 07", passed: 11, failed: 2 },
    ],
  }), []);


  // Use real data if available, otherwise use fallback data.
  // If loading, `data` will be null, and we'll show a spinner.
  const dataToDisplay = analytics || fallbackAnalytics;

  const statusData = useMemo(
    () => ({
      Pass: dataToDisplay.passed,
      Fail: dataToDisplay.failed,
      Blocked: dataToDisplay.blocked,
      Skipped: dataToDisplay.skipped,
    }),
    [dataToDisplay]
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error State (after loading, if error occurred)
  if (error && !analytics) { // Only show error if no fallback data loaded.
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md text-center">
          <p className="font-bold text-xl mb-2">Oops!</p>
          <p>{error}</p>
          <p className="mt-3 text-sm">Displaying fallback data instead.</p>
        </div>
        {/* Still render the dashboard with fallback data */}
        {renderDashboardContent(dataToDisplay, statusData)}
      </div>
    );
  }

  // Render the dashboard content
  return renderDashboardContent(dataToDisplay, statusData);
}

// Helper function to render the actual dashboard content
function renderDashboardContent(data, statusData) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">📊 Dashboard Overview</h1>
        <p className="text-lg text-gray-600">
          Get real-time insights into your test execution health and trends.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <Kpi title="Total Test Cases" value={data.totalTestCases} color="from-purple-600 to-purple-800" />
        <Kpi title="Total Executions" value={data.totalExecutions} color="from-blue-600 to-blue-800" />
        <Kpi title="Passed Executions" value={data.passed} color="from-green-500 to-green-700" />
        <Kpi title="Failed Executions" value={data.failed} color="from-red-500 to-red-700" />
        <Kpi title="Blocked Executions" value={data.blocked} color="from-yellow-500 to-yellow-700" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard title="Execution Status Distribution">
          <StatusPie data={statusData} />
        </ChartCard>
        <ChartCard title="Test Case Priority Breakdown">
          <PriorityBar data={data.priorityDistribution} />
        </ChartCard>
      </div>

      {/* Execution Trend Chart */}
      <ChartCard title="Daily Execution Trend" className="lg:col-span-2"> {/* Added className to allow full width for larger screens if needed */}
        <ExecutionTrend data={data.executionTrend} />
      </ChartCard>
    </div>
  );
}

// Reusable KPI Card Component
function Kpi({ title, value, color }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${color} text-white rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <div className="absolute inset-0 bg-black opacity-10 blur-sm rounded-2xl pointer-events-none"></div> {/* Subtle overlay for depth */}
      <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
      <p className="text-4xl font-extrabold">{value}</p>
      {/* Optional: Add an icon or small graph visual here */}
    </div>
  );
}

// Reusable Chart Card Wrapper
function ChartCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl border border-gray-100 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
        {title}
      </h3>
      {children}
    </div>
  );
}