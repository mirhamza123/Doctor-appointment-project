import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fee: { type: Number, required: true },
    addres: { type: Object, required: true },
    date: { type: Number, required: true },
    slot_booked: { type: Object, default: {} },
    availableSlots: { type: [String], default: [] }, // Legacy: Array of available time slots
    availableSchedule: {
      type: [
        {
          day: {
            type: String,
            enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            required: true,
          },
          isActive: { type: Boolean, default: false },
          slots: { type: [String], default: [] }, // e.g., ["08:00 AM", "08:30 AM", "09:00 AM"]
        },
      ],
      default: [],
    },
    isVerified: { type: Boolean, default: false },
  },
  { minimize: false },
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("prescripto", doctorSchema);

export default doctorModel;
