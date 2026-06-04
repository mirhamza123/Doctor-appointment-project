import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

const verifyAllDoctors = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    console.log("🔄 Updating all doctors...");
    const result = await doctorModel.updateMany(
      {},
      { $set: { isVerified: true } },
    );

    console.log("✅ Update Complete!");
    console.log(`📊 Matched: ${result.matchedCount} doctors`);
    console.log(`✏️ Modified: ${result.modifiedCount} doctors`);

    // Verify
    const allDoctors = await doctorModel.countDocuments({});
    const verifiedDoctors = await doctorModel.countDocuments({
      isVerified: true,
    });

    console.log("\n📋 Database Status:");
    console.log(`Total Doctors: ${allDoctors}`);
    console.log(`Verified Doctors: ${verifiedDoctors}`);

    await mongoose.connection.close();
    console.log("✅ Connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

verifyAllDoctors();
