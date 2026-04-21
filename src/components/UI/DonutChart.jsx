import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Donut = () => {
  const data = {
    labels: ["AI/ML", "Web Dev", "Data Science", "Cyber Security", "Finance", "Startup", "Others"],
    datasets: [
      {
        label: "Alumnis",
        data: [30, 17, 13, 10, 5, 5, 15],
        backgroundColor: [
          "#78716c",
          "#57534e",
          "#16a34a",
          "#15803d",
          "#a855f7",
          "#7c3aed",
          "#a1a1aa"
        ]
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default Donut;