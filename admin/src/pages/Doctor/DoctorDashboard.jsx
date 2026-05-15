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

      <div className="bg-white rounded mt-10 overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b bg-gray-50">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">All Appointments</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  #
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Patient
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Age
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Fees
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.12rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {sortedAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-10 px-6 text-gray-500 text-center text-sm"
                  >
                    No appointments yet.
                  </td>
                </tr>
              ) : (
                sortedAppointments.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-11 w-11 rounded-full object-cover"
                          src={item.userData?.image || item.userData?.Image}
                          alt={item.userData?.name || "Patient"}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.userData?.name || "Patient"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.userData?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.userData?.dob
                        ? calculateAge(item.userData.dob)
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <p className="font-medium text-slate-900">
                        {slotDateFormate(item.slotDate)}
                      </p>
                      <p className="text-xs text-slate-500">{item.slotTime}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-11 w-11 rounded-full object-cover"
                          src={item.docData?.Image || ""}
                          alt={item.docData?.name || "Doctor"}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.docData?.name || "Doctor"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.docData?.speciality || "Speciality"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-semibold">
                      {currency}
                      {item.amount}
                    </td>
                    <td className="px-6 py-4">
                      {item.cancelled ? (
                        <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!item.cancelled && !item.isCompleted && (
                          <>
                            <img
                              onClick={() => cancelAppointment(item._id)}
                              className="w-10 cursor-pointer transition hover:scale-110"
                              src={assets.cancel_icon}
                              alt="Cancel"
                            />
                            <img
                              onClick={() => completeAppointment(item._id)}
                              className="w-10 cursor-pointer transition hover:scale-110"
                              src={assets.tick_icon}
                              alt="Complete"
                            />
                          </>
                        )}
                        {(item.cancelled || item.isCompleted) && (
                          <span className="text-xs text-slate-400 italic">
                            No action
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
