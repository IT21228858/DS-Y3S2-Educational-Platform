import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes
import paymentRoutes from "./routes/paymentRoutes.js";

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("Payment service is up and running");
});

// Routes
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log("Payment service is up and running on port", process.env.PORT);
});
