import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ============== Serve React Frontend (Vite) ==============
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend/dist (Vite output)
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle React routing - return index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// 404 Handler (Move AFTER the frontend serving in production)
if (process.env.NODE_ENV !== "production") {
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
}

// Error Handler Middleware
app.use((err, req, res, _next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;