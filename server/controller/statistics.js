import { Product } from "../schema/product.js";

export const getStatistics = async (req, res, isInternalCall = false) => {
  try {
    const { month } = req.query;
    console.log("Month received: ", month);

    const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;
    console.log("Parsed month number: ", monthNumber);

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
          totalSoldItems: [
            { $match: { sold: true } },
            { $count: "totalSold" },
          ],
          totalNotSoldItems: [
            { $match: { sold: false } },
            { $count: "totalNotSold" },
          ],
        },
      },
    ]);

    console.log("Aggregation results: ", JSON.stringify(stats, null, 2));

    const response = {
      totalSalesAmount: stats[0].totalSalesAmount[0]?.totalAmount || 0,
      totalSoldItems: stats[0].totalSoldItems[0]?.totalSold || 0,
      totalNotSoldItems: stats[0].totalNotSoldItems[0]?.totalNotSold || 0,
    };

    console.log("Response to be sent: ", JSON.stringify(response, null, 2));

    if (isInternalCall) {
      console.log("Returning response for internal call");
      return response;
    }

    console.log("Sending response to client");
    res.json(response);

  } catch (error) {
    console.error("Error fetching statistics: ", error);
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};
