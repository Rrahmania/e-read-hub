require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const favoriteRoutes = require("./routes/favorites");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Sesuaikan dengan URL frontend Anda
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/favorites", favoriteRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
