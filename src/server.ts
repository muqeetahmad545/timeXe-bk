import express, { Application } from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app: Application = express();
app.use(cors());
const PORT: number = parseInt(process.env.PORT || "5000");

mongoose
  .connect(
    "mongodb+srv://muqeetahmad545:aws123@cluster0.c2nkkir.mongodb.net/attendence" as string
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
// app.use("/api", userRoutes);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});