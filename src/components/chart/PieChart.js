import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function PieChart({ tasks }) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full h-full mt-5 dark:bg-gray-800">
      <div className=" flex justify-center items-center flex-col p-5 rounded-lg shadow-md">
        <h2 className="text-center text-lg font-semibold mb-4">Task Completion Pie Chart</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default PieChart;
