import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from 'react-chartjs-2';
ChartJS.register(LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Internships",
        data: [5, 10, 18, 25, 35],
        borderColor: "#10b981", // emerald
        backgroundColor: "#10b981",
        tension: 0.4
      },
      {
        label: "Jobs",
        data: [2, 6, 12, 20, 28],
        borderColor: "#8b5cf6", // purple
        backgroundColor: "#8b5cf6",
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return <Line data={data} options={options} />;
};

export default LineChart;