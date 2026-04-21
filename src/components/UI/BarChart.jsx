import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { TbBackground } from 'react-icons/tb';
ChartJS.register(Legend,Tooltip,LinearScale,CategoryScale,BarElement);
const BarChart = () => {
    const options = {
    responsive: true,
    maintainAspectRatio: false, // IMPORTANT
    plugins: {
    legend: {
      display: false
    }
  }
};

    const data = {
        labels: ["Web Dev", "AI/ML", "Data Science", "Cyber Security", "Others"],
        datasets: [
            {
                label: "Students",
                data: [30, 30, 10, 10, 20],
                backgroundColor: [
                       " #64748b", 
                    "#334155",
                    "#10b981",
                    "#059669",
                    "#8b5cf6"
                ]
            }
        ]
    }
    return <Bar data={data} />;
};
export default BarChart;