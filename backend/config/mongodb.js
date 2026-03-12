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
    // Log the URL to verify it's being loaded correctly
    console.log("Attempting to connect to MongoDB with URL:", process.env.MONGODB_URL);

    if (!process.env.MONGODB_URL) {
      throw new Error("MongoDB connection URL is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URL);

    console.log('Database connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;