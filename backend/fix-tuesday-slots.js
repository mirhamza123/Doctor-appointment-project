import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";

dotenv.config();

/**
 * This script fixes Tuesday slot formatting issues.
 * It normalizes all slot times to the "HH:MM am/pm" format (e.g., "08:00 am", "02:30 pm")
 * to ensure consistent matching between doctor selection and user availability display.
 */

const normalizeTimeFormat = (timeString) => {
  if (!timeString) return timeString;

  // Already in correct format like "08:00 am"
  if (/^\d{2}:\d{2}\s(am|pm)$/.test(timeString)) {
    return timeString;
  }

  // Handle formats like "8:00 am", "08:00", "08:00:00", "08:00 AM", etc.
  let match = timeString.match(
    /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?/i,
  );
  if (!match) return timeString;

  let [, hours, minutes, , period] = match;
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  // If no AM/PM specified, determine from hours
  if (!period) {
    period = hours >= 12 ? "pm" : "am";
  }

  period = period.toLowerCase();

  // Convert to 12-hour format if needed
  if (hours > 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
};

const fixTuesdaySlots = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB\n");

    // Get all doctors with availableSchedule
    const doctors = await doctorModel.find({
      availableSchedule: { $exists: true, $ne: [] },
    });

    console.log(`📊 Found ${doctors.length} doctors with available schedules`);

    let fixedCount = 0;
    let totalSlotsNormalized = 0;

    for (let doctor of doctors) {
      let doctorModified = false;

      for (let schedule of doctor.availableSchedule) {
        if (schedule.slots && schedule.slots.length > 0) {
          let normalizedSlots = [];
          let slotsChanged = false;

          for (let slot of schedule.slots) {
            const normalizedSlot = normalizeTimeFormat(slot);
            normalizedSlots.push(normalizedSlot);

            if (normalizedSlot !== slot) {
              slotsChanged = true;
              totalSlotsNormalized++;
            }
          }

          if (slotsChanged) {
            schedule.slots = normalizedSlots;
            doctorModified = true;

            if (schedule.day === "TUE") {
              console.log(`\n🔧 Fixed ${doctor.name} (${doctor.email}):`);
              console.log(`   Day: ${schedule.day}`);
              console.log(`   Normalized ${normalizedSlots.length} slots`);
            }
          }
        }
      }

      if (doctorModified) {
        await doctor.save();
        fixedCount++;
      }
    }

    console.log(`\n✅ Results:`);
    console.log(`   Doctors modified: ${fixedCount}`);
    console.log(`   Total slots normalized: ${totalSlotsNormalized}`);

    await mongoose.connection.close();
    console.log("\n✅ Migration complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

fixTuesdaySlots();
