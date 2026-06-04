import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

const fixMirDoctor = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB\n");

    // Set mir doctor to unverified
    const result = await doctorModel.findOneAndUpdate(
      { name: /mir/i },
      { isVerified: false },
      { new: true },
    );

    if (result) {
      console.log("✅ Mir doctor updated!");
      console.log(`Name: ${result.name}`);
      console.log(`isVerified: ${result.isVerified}`);
    } else {
      console.log("❌ Mir doctor not found");
    }

    // Show all unverified doctors
    console.log("\n📊 All Unverified Doctors:");
    const unverified = await doctorModel.find({ isVerified: false });
    unverified.forEach((doc) => {
      console.log(`- ${doc.name} (${doc.email})`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Done!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

fixMirDoctor();
