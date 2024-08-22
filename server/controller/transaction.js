import { Product } from "../schema/product.js";
import mongoose from "mongoose";

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month } = req.query;

    // Set pagination options
    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    let filter = {};

    // Handle search filter for title and description
    if (search) {
      const searchAsNumber = parseFloat(search);
      if (!isNaN(searchAsNumber)) {
        filter.price = searchAsNumber;
      } else {
        filter.$or = [
          { title: new RegExp(search, "i") },
          { description: new RegExp(search, "i") },
        ];
      }
    }

    // Handle month filter
    if (month) {
      const monthNumber = new Date(`${month} 1, 2000`).getMonth() + 1;

      filter.$expr = {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      };
    }

    const transactions = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    // Count total transactions for pagination
    const totalTransactions = await Product.countDocuments(filter);

    res.json({
      page: parseInt(page),
      perPage: limit,
      totalTransactions,
      totalPages: Math.ceil(totalTransactions / limit),
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};
