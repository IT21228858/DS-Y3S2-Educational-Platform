// TODO: for identifying the User Schema
import User from "./models/User.js";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import courseRoutes from "./routes/courseRoutes.js";

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("Course service is up and running");
});

// Routes
app.use("/api/course", courseRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("Course service is up and running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
