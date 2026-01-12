import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import testCaseRoutes from "./modules/testcases/testcase.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import projectRoutes from "./modules/projects/projects.routes.js";
import testSuiteRoutes from "./modules/testsuites/testsuites.routes.js";
import executionRoutes from "./modules/executions/execution.routes.js";

export default function routes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/testcases", testCaseRoutes);
  app.use("/api/analytics", analyticsRoutes); // ✅ ONLY THIS
  app.use("/api/projects", projectRoutes);
  app.use("/api/testsuites", testSuiteRoutes);
  app.use("/api/executions", executionRoutes);
}
