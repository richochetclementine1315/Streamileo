
import express from "express";
import "dotenv/config";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
  origin:"http://localhost:5173",
  credentials:true //allows frontend to send cookies
})
);

// ✅ Middleware order matters
app.use(express.json());
app.use(cookieParser()); // ✅ This must come before your routes

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoutes);
// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
