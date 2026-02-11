// Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Database connection
import connectDB from "./db.js";

// Routes imports
import searchRoutes from "./routes/search.js";
import weatherRoutes from "./routes/weather.js";

// Load variables from the .env file
dotenv.config();

//Create and configure server
const app = express();
const PORT = process.env.PORT || 5000;

// Security and useful middleware
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging request in terminal
app.use(cors()); // Allows frontend to call backend
app.use(express.json()); // Parses JSON request bodies

connectDB();

// API Routes
app.use("/api/search", searchRoutes);
app.use("/api/weather", weatherRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "SkyCache backend is running! " });
});

// Catch-all error middleware (must be last!)
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).json({
    message: "Something went wrong on our end",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
