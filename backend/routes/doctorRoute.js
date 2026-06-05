import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  changeEmail,
  changePassword,
  updateAvailableSlots,
  updateAvailableSchedule,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const router = express.Router();
router.get("/list", doctorList);
router.post("/login", loginDoctor);
router.get("/appointments", authDoctor, appointmentsDoctor);
router.post("/complete-appointment", authDoctor, appointmentComplete);
router.post("/cancel-appointment", authDoctor, appointmentCancel);
router.get("/dashboard", authDoctor, doctorDashboard);
router.get("/profile", authDoctor, doctorProfile);
router.post("/update-profile", authDoctor, updateDoctorProfile);
router.post("/change-email", authDoctor, changeEmail);
router.post("/change-password", authDoctor, changePassword);
router.post("/update-available-slots", authDoctor, updateAvailableSlots);
router.post("/update-available-schedule", authDoctor, updateAvailableSchedule);

export default router;
