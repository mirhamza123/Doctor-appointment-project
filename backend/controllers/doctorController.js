import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId, availabilityStatus } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//API fo doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    console.log("Entered password:", password);
    console.log("DB hash:", doctor.password);
    const isMatch = await bcrypt.compare(password, doctor.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate token only when password is correct
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    console.log("Doctor logged in:", doctor.email);
    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// const loginDoctor = async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     // 🧩 Normalize email (avoid case sensitivity issues)
//     email = email.trim().toLowerCase();

//     // 🔍 Find doctor case-insensitively
//     const doctor = await doctorModel.findOne({
//       email: { $regex: new RegExp(`^${email}$`, "i") },
//     });

//     if (!doctor) {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }

//     // 🔐 Compare password using bcrypt
//     const isMatch = await bcrypt.compare(password, doctor.password);
//     console.log("Password match:", isMatch);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }

//     // 🎫 Generate JWT token (expires in 7 days)
//     const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     console.log(`✅ Doctor logged in: ${doctor.email}`);
//     return res.json({
//       success: true,
//       token,
//       message: "Login successful",
//     });
//   } catch (error) {
//     console.error("❌ Doctor login error:", error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// API to get appointments for a doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    console.log("Doctor ID:", docId);
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.json({ success: false, message: error.message });
  }
};

///////////////////////////////////////////

//API to mark appointment as completed by doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment  completed" });
    } else {
      return res.json({ success: false, message: "marke failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
//////////////////////////////////////////////////////////

//API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (
      appointmentData &&
      appointmentData.docId.toString() === docId.toString()
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment  cancelled" });
    } else {
      return res.json({ success: false, message: "cancellation failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get update doctor profile data for doctor panel
// const updateDoctorProfile = async (req, res) => {
//   try {
//     const docId = req.docId;
//     const { fee, address, available } = req.body;
//     await doctorModel.findByIdAndUpdate(docId, { fee, address, available });
//     res.json({ success: true, message: "Profile updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// ✅ Corrected controller
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    let { fee, addres, available } = req.body;

    // If frontend sends JSON string, parse it safely
    if (typeof addres === "string") {
      try {
        addres = JSON.parse(addres);
      } catch (err) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    await doctorModel.findByIdAndUpdate(
      docId,
      { fee, addres, available },
      { new: true }
    );

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
