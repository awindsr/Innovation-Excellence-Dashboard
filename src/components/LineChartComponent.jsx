import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useFetchAmounts from "../hooks/useFetchAmounts"; // Adjust the import path as needed

const LineChartComponent = () => {
  const { data, loading, error } = useFetchAmounts();

  if (loading) return <div>Loading chart data...</div>;
  if (error) return <div>{error}</div>;

  // Prepare data for the chart
  const chartData = data.map((item) => ({
    amount: item.amount,
    date: new Date(item.date).toLocaleDateString(), // Ensure proper date formatting
  }));

  console.log(chartData);

  return (
    <div className="font-poppins p-4 text-black bg-white border border-gray-300 rounded-lg h-auto flex flex-col items-start justify-between w-full">
      <h2 className="text-lg font-semibold mb-4">Grants Chart</h2>
      <div className="w-full h-[600px] sm:h-[400px] flex items-center justify-center">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default LineChartComponent;
