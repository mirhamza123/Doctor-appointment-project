// import express from 'express'

// import { addDoctor, loginAdmin,} from '../controllers/adminController.js'

// import upload from '../middlewares/multer.js'
// import authAdmin from '../middlewares/authAdmin.js'

// const adminRouter= express.Router()

//  adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
// adminRouter.post('/login',loginAdmin)
//  export default adminRouter;

import express from "express";
import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  deleteAppointment,
  adminDashboard,
  deleteDoctor,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
// import { allDoctors } from '../controllers/adminController.js';
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin); // ✅ Uses express.json() from main app
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.post("/delete-appointment", authAdmin, deleteAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/delete-doctor", authAdmin, deleteDoctor);
export default adminRouter;
