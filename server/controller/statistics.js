import { Product } from "../schema/product.js";

export const getStatistics = async (req, res, isInternalCall = false) => {
  try {
    const { month } = req.query;

    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

    const stats = await Product.aggregate([
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
        $facet: {
          totalSalesAmount: [
            { $match: { sold: true } },
            { $group: { _id: null, totalAmount: { $sum: "$price" } } },
          ],
          totalSoldItems: [{ $match: { sold: true } }, { $count: "totalSold" }],
          totalNotSoldItems: [
            { $match: { sold: false } },
            { $count: "totalNotSold" },
          ],
        },
      },
    ]);

    const response = {
      totalSalesAmount: stats[0].totalSalesAmount[0]?.totalAmount || 0,
      totalSoldItems: stats[0].totalSoldItems[0]?.totalSold || 0,
      totalNotSoldItems: stats[0].totalNotSoldItems[0]?.totalNotSold || 0,
    };

    if (isInternalCall) {
      return response;
    }

    res.json(response);
  } catch (error) {
    console.error("Error fetching statistics: ", error);
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};
