import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const LineChart = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  // Group tasks by creation date
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(tasksByDate),
    datasets: [
      {
        label: 'Tasks Created Over Time',
        data: Object.values(tasksByDate),
        fill: false,
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C0',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className=" h-full w-full mt-5 dark:bg-gray-800">
      <div className=" flex items-center flex-col p-5 rounded-lg shadow-md">
        <h2 className="text-center text-lg font-semibold mb-4">Task Completion Line Chart</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default LineChart;
