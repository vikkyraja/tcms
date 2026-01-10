export async function fetchDashboardAnalytics() {
  // 🔁 Replace with real API later:
  // return fetch("/api/analytics").then(res => res.json());

  // MOCK RESPONSE (matches backend spec)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: {
          total: 120,
          passed: 78,
          failed: 22,
          blocked: 10,
          pending: 10,
        },
        statusDistribution: {
          Passed: 78,
          Failed: 22,
          Blocked: 10,
          Pending: 10,
        },
        executionTrend: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          values: [12, 20, 18, 30, 40],
        },
        priorityStats: {
          Low: { pass: 20, fail: 5 },
          Medium: { pass: 30, fail: 8 },
          High: { pass: 18, fail: 6 },
          Critical: { pass: 10, fail: 5 },
        },
      });
    }, 600);
  });
}
