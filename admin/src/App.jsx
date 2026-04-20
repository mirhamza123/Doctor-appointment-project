import React, { useContext } from "react";
import Login from "./pages/Login";
import AdminContextProvider from "./context/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorLIST from "./pages/Admin/DoctorList";
import DoctorContextProvider, { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return aToken || dtoken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full">
        <Routes>
          <Route path="/" element={<Navigate to={aToken ? "/admin-dashboard" : "/doctor-dashboard"} replace />} />
          <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />
          {/* admin routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/alll-apointments" element={<AllApointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorLIST />} />

          {/* doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
