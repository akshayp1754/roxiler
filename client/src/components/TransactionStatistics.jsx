import React, { useState, useEffect } from "react";
import axios from "../axios/index";

const TransactionStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSalesAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    if (selectedMonth) {
      fetchStatistics(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get(`/combinedData/combined-data`, {
        params: { month },
      });
      console.log("stats: ", response.data.statistics);

      const { totalSalesAmount, totalSoldItems, totalNotSoldItems } =
        response.data.statistics;
      setStatistics({ totalSalesAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Statistics for {selectedMonth}
        </h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xl">
            <span className="font-bold text-gray-700">Total Sales: </span>
            <span className="text-green-600 font-semibold">
              {" "}
              ${statistics.totalSalesAmount}
            </span>
          </div>
          <div className="text-xl">
            <span className="font-bold text-gray-700">Total Sold Items: </span>
            <span className="text-blue-600 font-semibold">
              {statistics.totalSoldItems}
            </span>
          </div>
          <div className="text-xl">
            <span className="font-bold text-gray-700">
              Total Not Sold Items:{" "}
            </span>
            <span className="text-red-600 font-semibold">
              {statistics.totalNotSoldItems}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
