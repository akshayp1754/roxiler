import { getStatistics } from './statistics.js';
import { getBarChart } from './barchart.js';
import { getPieChart } from './pieChart.js';

export const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    // Validate the month parameter
    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    // Fetch data from all three APIs
    const [statisticsData, barChartData, pieChartData] = await Promise.all([
      getStatistics(req, res, true), // Passing the same req, res to reuse the logic
      getBarChart(req, res, true),
      getPieChart(req, res, true),
    ]);

    // Combine the data into one response
    const combinedData = {
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData,
    };

    
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching combined data", error });
  }
};
