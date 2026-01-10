import swaggerJsdoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test Case Management System API",
      version: "1.0.0",
      description: "Backend APIs for TCMS",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Fixed path using __dirname
  apis: [
    path.join(__dirname, "./modules/**/*.js"),
    path.join(__dirname, "./routes.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;