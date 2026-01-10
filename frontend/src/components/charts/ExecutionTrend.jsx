import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ExecutionTrend({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded border">
      <h3 className="font-semibold mb-2">Execution Trend</h3>
      <Line
        data={{
          labels: data.map((d) => d.date),
          datasets: [
            {
              label: "Passed",
              data: data.map((d) => d.passed),
              borderColor: "#22c55e",
              tension: 0.3,
            },
            {
              label: "Failed",
              data: data.map((d) => d.failed),
              borderColor: "#ef4444",
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: "bottom" } },
        }}
      />
    </div>
  );
}
