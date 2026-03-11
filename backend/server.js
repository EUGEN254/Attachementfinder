import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import sql, { testConnection } from "./configs/connectDB.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins =
  (isProduction ? process.env.PROD_ORIGINS : process.env.DEV_ORIGINS)?.split(
    ",",
  ) || [];

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    environment: process.env.NODE_ENV || "development",
  });
});

//routes
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

// Test database on startup
testConnection().then((connected) => {
  if (connected) {
    app.listen(PORT, () => {
      logger.line();
      logger.server(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
      logger.info(`Allowed origins: ${allowedOrigins.join(", ")}`);
      logger.line();
    });
  } else {
    logger.error("Failed to connect to database. Exiting...");
    process.exit(1);
  }
});
