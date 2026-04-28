// import mongoose from "mongoose";

// const connectDB = async()=>{

//     mongoose.Connection('connected', ()=>console.log("database coonected"))
//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)

// }
// export default connectDB;

// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' });

// import mongoose from "mongoose";
// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' });

// const connectDB = async () => {
//   try {
//     console.log(process.env.MONGODB_URL);
//     await mongoose.connect(process.env.MONGODB_URL);

//     console.log('Database connected');
//   } catch (err) {
//     console.error('MongoDB connection failed: hamza ', err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

// const connectDB = async () => {
//   mongoose.connect('connected', ()=> console.log('database connected'))
//    await mongoose.connect(`${process.env. MONGOSE_URL}`)
// };

// export default connectDB;

// ///////////////////////////////////////////////////////////////////////////////////
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      console.warn("MONGODB_URL not set - DB features will not work");
      return;
    }
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.log(
      "Server will continue without database - ensure MongoDB is running and accessible",
    );
    // Don't exit - let serverless function start (admin login works without DB)
  }
};

export default connectDB;
