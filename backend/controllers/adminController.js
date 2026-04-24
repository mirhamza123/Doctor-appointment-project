//  api for adding doctor
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary for image upload
import doctorModel from "../models/doctorModel.js"; // Adjust path if doctorModel.js is elsewhere
import jwt from "jsonwebtoken"; // Import JWT for token generation
import appointmentModel from "../models/appointmentModel.js"; // Import appointment model
import userModel from "../models/userModel.js"; // Import user model

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    //    console.log("image file",imageFile)
    //    console.log({ name, email, password, speciality, degree, experience,about, fees, address},imageFile)

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "missing details" });
    }
    //validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    // Validate strong password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    //hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary (support both disk path and buffer for Vercel serverless)
    let imageUrl;
    if (imageFile.buffer) {
      // Serverless: use buffer
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => (err ? reject(err) : resolve(result)),
        );
        uploadStream.end(imageFile.buffer);
      });
      const imageUpload = await uploadPromise;
      imageUrl = imageUpload.secure_url;
    } else {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // ...existing code...
    const doctorData = {
      name,
      email,
      Image: imageUrl, // changed from image
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee: fees, // changed from fees
      addres: address, // changed from address
      date: Date.now(), // changed from data
    };

    // Create a new doctor document in the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//////////////////////////////////////////////////////////

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const trimEmail = (email || "").trim().toLowerCase();
    const trimPassword = (password || "").trim();

    // Validate input
    if (!trimEmail || !trimPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set in environment variables");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    // ✅ METHOD 1: Check against environment variables (plain text)
    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();

    if (
      adminEmail &&
      adminPassword &&
      trimEmail === adminEmail &&
      trimPassword === adminPassword
    ) {
      const token = jwt.sign(
        { email: trimEmail, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      console.log("Admin login successful via env variables");
      return res.json({ success: true, token, message: "Login successful" });
    }

    // ✅ METHOD 2: Check against MongoDB (hashed password)
    const adminUser = await userModel.findOne({ email: trimEmail });

    if (!adminUser) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Verify hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(
      trimPassword,
      adminUser.password,
    );

    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: adminUser._id, email: trimEmail, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    console.log("Admin login successful via MongoDB");
    return res.json({ success: true, token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all appointments list

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API appointmend cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slot_booked = doctorData.slot_booked;

    slot_booked[slotDate] = slot_booked[slotDate].filter((e) => e !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slot_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (!appointmentData.cancelled) {
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slot_booked = doctorData.slot_booked;
      slot_booked[slotDate] = slot_booked[slotDate].filter(
        (e) => e !== slotTime,
      );
      await doctorModel.findByIdAndUpdate(docId, { slot_booked });
    }

    await appointmentModel.findByIdAndDelete(appointmentId);
    res.json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a doctor (admin only)
const deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Doctor ID is required" });
    }
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    await doctorModel.findByIdAndDelete(docId);
    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  deleteAppointment,
  adminDashboard,
  deleteDoctor,
};
