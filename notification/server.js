import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Routes
import notificationRoutes from "./routes/notificationRoutes.js";

// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.send("Notification service is up and running");
});

// Routes
app.use("/api/notification", notificationRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    "Notification service is up and running on port",
    process.env.PORT
  );
});
