// Load environment variables first
require("dotenv").config();

// Import required modules
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

// Create Express app
const app = express();

// Import database connection
const { AppDataSource } = require("./dist/dataSource");

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Import and use routes
const router = require("./dist/route").default;
const { RequestLogger } = require("./dist/middleware/logger");
const { genericErrorHandler } = require("./dist/middleware/errorHandler");

app.use(RequestLogger);
app.use(router);
app.use(genericErrorHandler);

// Initialize database without starting the server
const initialize = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

// Initialize database
initialize();

// Export the app for LiteSpeed
module.exports = app;
