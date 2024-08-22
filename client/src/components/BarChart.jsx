import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../axios/index';

const TransactionBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (selectedMonth) {
      fetchBarChartData(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchBarChartData = async (month) => {
    try {
      const response = await axios.get(`/combinedData/combined-data`, {
        params: { month },
      });

      // Map the barChart data from the response
      const data = response.data.barChart.map((range) => ({
        priceRange: range.priceRange,
        itemCount: range.count,
      }));

      setChartData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Bar Chart Stats - {selectedMonth}
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priceRange" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="itemCount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionBarChart;
