import express from "express";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8081;

import { connectDB } from "./utils/db.js";
import { Product } from "./schema/product.js";
import transactionRoutes from "./routes/transaction.js";
import statisticsRoutes from "./routes/statistics.js";
import barChartRoutes from "./routes/barchart.js";
import pieChartRoutes from "./routes/pieChart.js";
import combinedDataRoute from "./routes/combinedData.js";

connectDB();

app.use(cors());
app.use(express.json());
app.use("/product", transactionRoutes);
app.use("/stats", statisticsRoutes);
app.use("/barchart", barChartRoutes);
app.use("/pieChart", pieChartRoutes);
app.use("/combinedData", combinedDataRoute);

app.get("/", (req, res) => {
  return res.json({ greetings: `Hare Krishna` });
});

app.get("/seed-transactions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    // Save each transaction to MongoDB
    await Product.insertMany(transactions);

    res.status(200).send("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).send("Error seeding data.");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
