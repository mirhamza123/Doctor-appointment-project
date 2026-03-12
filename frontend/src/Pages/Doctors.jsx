// ////////////////////////////////////////////////////////////////////////////
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { doctors } from "../assets/assets";

function Doctors() {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const { speciality } = useParams();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };
  React.useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-1 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={` flex-col gap-4 text=sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transltion-all cursor-pointer  ${
              speciality === "General physician" ? "bg-blue-100 text-black" : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transltion-all cursor-pointer  ${
              speciality === "Gynecologist" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transltion-all cursor-pointer  ${
              speciality === "Dermatologist" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>

          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
              speciality === "Pediatricians" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transltion-all cursor-pointer  ${
              speciality === "Neurologist" ? "bg-blue-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transltion-all cursor-pointer  ${
              speciality === "Gastroenterologist"
                ? "bg-blue-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4  gap-y-6 ">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/Appointment/${item._id}`)}
              className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img src={item.Image} alt="" className="bg-blue-50" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center  ${
                    item.Available ? "text-green-500" : "text-gray-500"
                  } `}
                >
                  <p
                    className={`w-2  h-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }  rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
///////////////////////////////////////////////////////
// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../Context/AppContext";

// function Doctors() {
//   const navigate = useNavigate();
//   const { speciality } = useParams(); // URL se param
//   const { doctors } = useContext(AppContext);

//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);

//   useEffect(() => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((item) => item.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   }, [doctors, speciality]);

//   return (
//     <div>
//       <p className="text-gray-600">Browse through the doctors specialist.</p>

//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         {/* mobile filter toggle */}
//         <button
//           className={`py-1 px-1 border rounded text-sm transition-all sm:hidden ${
//             showFilter ? "bg-primary text-white" : ""
//           }`}
//           onClick={() => setShowFilter((prev) => !prev)}
//         >
//           Filters
//         </button>

//         {/* Filter buttons */}
//         <div
//           className={`flex-col gap-4 text-sm text-gray-600 ${
//             showFilter ? "flex" : "hidden sm:flex"
//           }`}
//         >
//           <p
//             onClick={() =>
//               speciality === "General physician"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/General physician")
//             }
//             className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//               speciality === "General physician" ? "bg-blue-100 text-black" : ""
//             }`}
//           >
//             General physician
//           </p>

//           <p
//             onClick={() =>
//               speciality === "Gynecologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Gynecologist")
//             }
//             className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//               speciality === "Gynecologist" ? "bg-blue-100 text-black" : ""
//             }`}
//           >
//             Gynecologist
//           </p>

//           <p
//             onClick={() =>
//               speciality === "Dermatologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Dermatologist")
//             }
//             className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//               speciality === "Dermatologist" ? "bg-blue-100 text-black" : ""
//             }`}
//           >
//             Dermatologist
//           </p>

//           <p
//             onClick={() =>
//               speciality === "Pedistricians"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Pedistricians")
//             }
//             className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//               speciality === "Pedistricians" ? "bg-blue-100 text-black" : ""
//             }`}
//           >
//             Pediatricians
//           </p>

//           <p
//             onClick={() =>
//               speciality === "Neurologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Neurologist")
//             }
//             className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//               speciality === "Neurologist" ? "bg-blue-100 text-black" : ""
//             }`}
//           >
//             Neurologist
//           </p>

//           <p
//             onClick={() =>
//               speciality === "Gastroenterologist"
//                 ? navigate("/doctors")
//                 : navigate("/doctors/Gastroenterologist")
//             }
//             className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//               speciality === "Gastroenterologist"
//                 ? "bg-blue-100 text-black"
//                 : ""
//             }`}
//           >
//             Gastroenterologist
//           </p>
//         </div>

//         {/* Doctors list */}
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
//           {filterDoc.length === 0 ? (
//             <p className="text-red-500">
//               No doctors found for this speciality.
//             </p>
//           ) : (
//             filterDoc.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => navigate(`/Appointment/${item._id}`)}
//                 className="border border-blue-300 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
//               >
//                 <img
//                   src={item.Image} // AppContext me field ka naam Image hai
//                   alt={item.name}
//                   className="bg-blue-50 w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center gap-2 text-sm text-green-500">
//                     <p className="font-semibold text-2xl">*</p>
//                     <p>Available</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold">{item.name}</p>
//                     <p className="text-gray-600 text-sm">{item.speciality}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Doctors;
