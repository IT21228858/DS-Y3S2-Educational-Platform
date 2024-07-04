import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("User service is up and running");
});

// Routes
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("User service is up and running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
