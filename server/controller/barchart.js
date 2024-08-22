import { Product } from '../schema/product.js';

export const getBarChart = async (req, res, isInternalCall = false) => {
  try {
    const { month } = req.query;
    
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;    

    const barChartData = await Product.aggregate([
      {
        $addFields: {
          saleMonth: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          saleMonth: monthNumber,
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          default: "901-above",
          output: {
            count: { $sum: 1 },
          },
        },
      },
      {
        $addFields: {
          priceRange: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "0-100" },
                { case: { $eq: ["$_id", 100] }, then: "101-200" },
                { case: { $eq: ["$_id", 200] }, then: "201-300" },
                { case: { $eq: ["$_id", 300] }, then: "301-400" },
                { case: { $eq: ["$_id", 400] }, then: "401-500" },
                { case: { $eq: ["$_id", 500] }, then: "501-600" },
                { case: { $eq: ["$_id", 600] }, then: "601-700" },
                { case: { $eq: ["$_id", 700] }, then: "701-800" },
                { case: { $eq: ["$_id", 800] }, then: "801-900" },
                { case: { $eq: ["$_id", 900] }, then: "901-above" },
              ],
              default: "901-above"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          priceRange: 1,
          count: 1,
        },
      },
    ]);

    console.log(barChartData);
    if (isInternalCall) return barChartData;
    res.json(barChartData);
    
  } catch (error) {
    res.status(500).json({ message: "Error generating bar chart data", error });
  }
};
