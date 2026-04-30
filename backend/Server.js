/////////////////////////////////////////////////////////

import express from "express";
import cors from "cors";
import "dotenv/config"; // Loads environment variables from .env
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import dotenv from "dotenv";
import router from "./routes/doctorRoute.js";
import updaterouter from "./routes/userRoute.js";
dotenv.config();

// URLs
const ADMIN_PANEL_URL = "https://doctor-appointment-project-ra7q.vercel.app";

// Initialize Express app

const app = express();
const PORT = process.env.PORT || 4000;

// CORS - allow admin panel and all origins
const allowedOrigins = [
  ADMIN_PANEL_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  /\.vercel\.app$/,
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowOrigin =
    !origin ||
    allowedOrigins.some((o) =>
      typeof o === "string" ? o === origin : o.test(origin),
    )
      ? origin || "*"
      : ADMIN_PANEL_URL;
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, aToken, dtoken, dToken",
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "aToken",
      "dtoken",
      "dToken",
    ],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", router);
app.use("/api/user", updaterouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! Server is running.");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Initialize server with proper async handling
const startServer = async () => {
  try {
    console.log("📦 Starting server initialization...");

    // Connect to MongoDB FIRST
    await connectDB();

    // Then connect Cloudinary
    connectCloudinary();

    // Start server only when not on Vercel (serverless)
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log("✅ All systems ready!");
      });
    } else {
      console.log("✅ App ready for Vercel serverless");
    }
  } catch (error) {
    console.error("💥 Server initialization failed:", error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

// Start the server with proper async handling
startServer();

export default app;
