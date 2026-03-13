import React, { useContext, useEffect, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const DoctorDashboard = () => {
  const {
    dtoken,
    dashData,
    getDashData,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormate, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashData();
      getAppointments();
    }
  }, [dtoken]);

  const sortedAppointments = useMemo(() => {
    const list = [...(appointments || [])];
    list.sort((a, b) => {
      const partsA = (a.slotDate || "").split("_");
      const partsB = (b.slotDate || "").split("_");
      const keyA = (partsA[2] || "") + (partsA[1] || "").padStart(2, "0") + (partsA[0] || "").padStart(2, "0") + " " + (a.slotTime || "");
      const keyB = (partsB[2] || "") + (partsB[1] || "").padStart(2, "0") + (partsB[0] || "").padStart(2, "0") + " " + (b.slotTime || "");
      return keyB.localeCompare(keyA);
    });
    return list;
  }, [appointments]);

  if (!dashData) return null;

  return (
    <div className="w-full m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {currency}
              {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded mt-10 overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b bg-gray-50">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">All Appointments</p>
        </div>

        <div className="overflow-x-auto">
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b bg-gray-50 font-medium text-sm">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          <div className="max-h-[55vh] overflow-y-auto">
            {sortedAppointments.length === 0 ? (
              <p className="py-10 px-6 text-gray-500 text-center text-sm">No appointments yet.</p>
            ) : (
              sortedAppointments.map((item, index) => (
                <div
                  key={item._id}
                  className="flex flex-wrap justify-between max-sm:gap-3 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b items-center hover:bg-gray-50 text-sm"
                >
                  <p className="max-sm:hidden">{index + 1}</p>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.userData?.image || item.userData?.Image}
                      alt=""
                      className="w-8 rounded-full"
                    />
                    <p>{item.userData?.name}</p>
                  </div>
                  <p className="text-xs inline border border-[#5f6fff] px-2 rounded-full w-fit">
                    {item.payment ? "Online" : "Cash"}
                  </p>
                  <p className="max-sm:hidden">{calculateAge(item.userData?.dob)}</p>
                  <p>
                    {slotDateFormate(item.slotDate)}, {item.slotTime}
                  </p>
                  <p>
                    {currency}{item.amount}
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
