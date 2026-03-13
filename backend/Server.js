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

// Initialize Express app

const app = express();
const PORT = process.env.PORT || 4000;
//middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "https://doctor-appointment-project-mu.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
      ];
      if (!origin || allowed.includes(origin) || /\.vercel\.app$/.test(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // allow for now
      }
    },
    credentials: true,
  })
);

adminRouter.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", router);
app.use("/api/user", updaterouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! Server is running.");
});

// Start server only when not on Vercel (serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

export default app;
