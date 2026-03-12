import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import MyAppointment from "./Pages/MyAppointment";
import MyProfle from "./Pages/MyProfile";
import Appointment from "./Pages/Appointment";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
// import Chatbot from "./component/ChatBot";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/My-Profile" element={<MyProfle />} />
        <Route path="My-Appointment" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
      {/* <Chatbot /> */}
    </div>
  );
}

export default App;
/////////////////////////////////////////////////////////////

// import "./App.css";
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import Doctors from "./Pages/Doctors";
// import Login from "./Pages/Login";
// import MyAppointment from "./Pages/MyAppointment";
// import MyProfle from "./Pages/MyProfile";
// import Appointment from "./Pages/Appointment";
// import Navbar from "./Component/Navbar";
// import Footer from "./Component/Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <div className="mx-4 sm:mx-[10%]">
//       <ToastContainer />
//       <Navbar />
//       <Routes>
//         {/* Home */}
//         <Route path="/" element={<Home />} />

//         {/* Doctors */}
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/doctors/:speciality" element={<Doctors />} />

//         {/* Login */}
//         <Route path="/login" element={<Login />} />

//         {/* Static pages */}
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Profile & Appointment */}
//         <Route path="/my-profile" element={<MyProfle />} />
//         <Route path="/my-appointment" element={<MyAppointment />} />

//         {/* Appointment with doctor */}
//         <Route path="/appointment/:docId" element={<Appointment />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;
