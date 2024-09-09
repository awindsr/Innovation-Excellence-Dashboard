import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const pieChartData = [
  { name: "Engineering", value: 400 },
  { name: "Sciences", value: 300 },
  { name: "Business", value: 200 },
  { name: "Arts", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent = () => {
  return (
    <div className="font-poppins p-4 text-black bg-white border border-gray-300 rounded-lg  h-auto flex flex-col items-start justify-between w-1/2">
      <PieChart width={400} height={400}>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value">
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
