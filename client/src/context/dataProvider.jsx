import React, { createContext, useState, useEffect } from 'react';
import axios from '../axios/index';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [statistics, setStatistics] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState('March');

  useEffect(() => {
    if (selectedMonth) {
      fetchCombinedData(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchCombinedData = async (month) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/combinedData/combined-data', {
        params: { month },
      });
      console.log(response);
      
      setStatistics(response.data.statistics);
      setBarChartData(response.data.barChart);
    } catch (error) {
      console.error('Error fetching combined data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        statistics,
        barChartData,
        selectedMonth,
        setSelectedMonth,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
