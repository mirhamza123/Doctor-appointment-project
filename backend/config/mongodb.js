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
      throw new Error("MONGODB_URL not set in environment variables");
    }
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URL, {
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      retryReads: true,
    });

    console.log("✅ MongoDB connected successfully!");
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

export default connectDB;
