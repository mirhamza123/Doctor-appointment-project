import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

const checkMirDoctor = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB\n");

    const mirDoctor = await doctorModel.findOne({ name: /mir/i });

    if (mirDoctor) {
      console.log("📋 Mir Doctor Details:");
      console.log(`Name: ${mirDoctor.name}`);
      console.log(`Email: ${mirDoctor.email}`);
      console.log(`isVerified: ${mirDoctor.isVerified}`);
      console.log(`Date: ${new Date(mirDoctor.date).toLocaleString()}`);
    } else {
      console.log("❌ Mir doctor not found");
    }

    console.log("\n📊 All Doctors Status:");
    const unverified = await doctorModel.countDocuments({ isVerified: false });
    const verified = await doctorModel.countDocuments({ isVerified: true });
    const noField = await doctorModel.countDocuments({
      isVerified: { $exists: false },
    });

    console.log(`Verified: ${verified}`);
    console.log(`Unverified: ${unverified}`);
    console.log(`No isVerified field: ${noField}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

checkMirDoctor();
