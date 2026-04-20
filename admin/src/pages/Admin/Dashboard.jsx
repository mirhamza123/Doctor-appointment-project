import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { useEffect } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const {
    aToken,
    getDashData,
    cancelAppointment,
    deleteAppointment,
    dashData,
  } = useContext(AdminContext);

  const { slotDateFormate, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <img
                  className="h-8 w-8"
                  src={assets.doctor_icon}
                  alt="Doctors"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Doctors
                </p>
                <p className="text-3xl font-semibold text-slate-900">
                  {dashData.doctors}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <img
                  className="h-8 w-8"
                  src={assets.appointments_icon}
                  alt="Appointments"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Appointments
                </p>
                <p className="text-3xl font-semibold text-slate-900">
                  {dashData.appointments}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
                <img
                  className="h-8 w-8"
                  src={assets.patients_icon}
                  alt="Patients"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Patients
                </p>
                <p className="text-3xl font-semibold text-slate-900">
                  {dashData.patients}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <img
                className="h-6 w-6"
                src={assets.list_icon}
                alt="Latest Booking"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Latest Booking
              </p>
              <p className="text-sm text-slate-500">
                Newest appointments appear first.
              </p>
            </div>
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
                {dashData.latestAppointments.map((item, index) => (
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
                          src={item.userData?.image || ""}
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
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(item._id)}
                          className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
