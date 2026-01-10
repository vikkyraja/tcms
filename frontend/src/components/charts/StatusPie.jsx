import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatusPie({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded border">
      <h3 className="font-semibold mb-2">Test Status Distribution</h3>
      <Pie
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [
                "#22c55e", // Pass
                "#ef4444", // Fail
                "#f59e0b", // Blocked
                "#6b7280", // Skipped
              ],
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
