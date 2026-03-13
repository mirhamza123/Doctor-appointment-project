// import React from "react";
// import { useContext } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const DoctorAppointments = () => {
//   const { dtoken, appointments, getAppointments } = useContext(DoctorContext);

//   const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dtoken) {
//       getAppointments();
//     }
//   }, [dtoken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg  font-medium">ALL Appointments</p>
//       <div className="bg-white border rounded text-sm  max-h-[80vh] min-h-[50vh] overflow-y-scroll">
//         <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {appointments.map((item, index) => {
//           <div key={index}>
//             <p>{index + 1}</p>
//             <div>
//               <img src={item.userData.image} alt="" />
//               <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p>{item.paymemt ? "online" : "Cash"}</p>
//             </div>
//             <p>{calculateAge(item.userData.dob)}</p>
//             <p>
//               {slotDateFormate(item.slotDate)}, {item.slotTime}
//             </p>
//             <p>
//               {currency} , {item.amount}{" "}
//             </p>
//             <div>
//               <img src={assets.cancel_icon} alt="" />
//               <img src={assets.tick_icon} alt="" />
//             </div>
//           </div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;
//////////////////////////////////////////

import React, { useContext, useEffect, useState, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const PER_PAGE = 50;
const FILTERS = [
  { id: "all", label: "All Appointments" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
  { id: "pending", label: "Pending" },
];

const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  const getSortKey = (item) => {
    const parts = (item.slotDate || "").split("_");
    const day = parts[0] || "";
    const month = parts[1] || "";
    const year = parts[2] || "";
    if (!year) return "";
    const yyyy = String(year);
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return yyyy + mm + dd + " " + (item.slotTime || "");
  };

  const filteredAppointments = useMemo(() => {
    let list = [...(appointments || [])];
    if (statusFilter === "completed") list = list.filter((a) => a.isCompleted);
    else if (statusFilter === "cancelled") list = list.filter((a) => a.cancelled);
    else if (statusFilter === "pending") {
      list = list.filter((a) => !a.cancelled && !a.isCompleted);
    }
    list.sort((a, b) => {
      const keyA = getSortKey(a);
      const keyB = getSortKey(b);
      return keyB.localeCompare(keyA);
    });
    return list;
  }, [appointments, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PER_PAGE));
  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredAppointments.slice(start, start + PER_PAGE);
  }, [filteredAppointments, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const tableHeader = (
    <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50 font-medium">
      <p>#</p>
      <p>Patient</p>
      <p>Payment</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Fees</p>
      <p>Action</p>
    </div>
  );

  return (
    <div className="w-full m-5">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setStatusFilter(id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === id
                  ? "bg-[#5f6fff] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Showing {paginatedAppointments.length} of {filteredAppointments.length} appointments
        </p>
      </div>

      <div className="bg-white border rounded text-sm overflow-hidden">
        {tableHeader}
        <div className="max-h-[60vh] overflow-y-auto">
          {paginatedAppointments.length === 0 ? (
            <p className="py-12 px-6 text-gray-500 text-center">No appointments match this filter.</p>
          ) : (
            paginatedAppointments.map((item, index) => {
              const rowNum = (currentPage - 1) * PER_PAGE + index + 1;
              return (
                <div
                  key={item._id}
                  className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b items-center hover:bg-gray-50"
                >
                  <p className="max-sm:hidden">{rowNum}</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userData?.image}
                      alt="User"
                      className="w-8 rounded-full"
                    />
                    <p>{item.userData?.name}</p>
                  </div>
                  <p className="w-13 text-xs inline border border-[#5f6fff] px-2 rounded-full">
                    {item.payment ? "Online" : "Cash"}
                  </p>
                  <p className="max-sm:hidden">{calculateAge(item.userData?.dob)}</p>
                  <p>
                    {slotDateFormate(item.slotDate)}, {item.slotTime}
                  </p>
                  <p>
                    {currency} {item.amount}
                  </p>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt="Complete"
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4 py-3 px-6 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage <= 1}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
