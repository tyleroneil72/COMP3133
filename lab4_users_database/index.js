import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/usersdb";

app.use(bodyParser.json());
app.use(userRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
