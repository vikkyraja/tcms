import express from "express";
import cors from "cors";
import routes from "./routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
routes(app);

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler Middleware
app.use((err, req, res, _next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;