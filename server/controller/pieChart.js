import { Product } from "../schema/product.js";

export const getPieChart = async (req, res, isInternalCall = false) => {
  try {
    const { month } = req.query;
    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const pieChartData = await Product.aggregate([
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
        $group: {
          _id: "$category",
          itemCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          itemCount: 1,
        },
      },
    ]);

    if (isInternalCall) return pieChartData;
    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ message: "Error generating pie chart data", error });
  }
};
