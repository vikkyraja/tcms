import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "✅ Yes" : "❌ No");
});
