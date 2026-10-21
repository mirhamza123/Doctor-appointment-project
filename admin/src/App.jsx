import React, { useContext } from "react";
import Login from "./pages/Login";
import AdminContextProvider from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorLIST from "./pages/Admin/DoctorList";
import PendingDoctors from "./pages/Admin/PendingDoctors";
import DoctorContextProvider, { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSettings from "./pages/Doctor/DoctorSettings";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  return aToken || dtoken ? (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F8F9FD]">
      <ToastContainer />
      <header className="shrink-0">
        <Navbar />
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="h-full w-64 flex-shrink-0 overflow-hidden">
          <Sidebar />
        </aside>
        <main className="h-full min-w-0 flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={aToken ? "/admin-dashboard" : "/doctor-dashboard"}
                  replace
                />
              }
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin-dashboard" replace />}
            />
            {/* admin routes */}
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/alll-apointments" element={<AllApointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorLIST />} />
            <Route path="/pending-doctors" element={<PendingDoctors />} />

            {/* doctor routes */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/doctor-settings" element={<DoctorSettings />} />
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
