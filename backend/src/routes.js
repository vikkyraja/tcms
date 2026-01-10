import authRoutes from "./modules/auth/auth.routes.js";
import testcaseRoutes from "./modules/testcases/testcase.routes.js";
import executionRoutes from "./modules/executions/execution.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";

export default function routes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/testcases", testcaseRoutes);
  app.use("/api/executions", executionRoutes);
app.use("/api/analytics", analyticsRoutes);
  app.get("/api/health", (_, res) => res.json({ status: "OK" }));
}
