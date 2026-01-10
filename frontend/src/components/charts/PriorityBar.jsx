import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function PriorityBar({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white p-4 rounded border">
      <h3 className="font-semibold mb-2">Priority-wise Test Distribution</h3>
      <Bar
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              label: "Test Cases",
              data: Object.values(data),
              backgroundColor: "#3b82f6",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
}
