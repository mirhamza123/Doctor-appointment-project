import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllApointment = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
    deleteAppointment,
  } = useContext(AdminContext);
  const { calculateAge, slotDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full m-5">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-semibold text-slate-900">
            ALL Appointments
          </p>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            View recent bookings, appointment status, and doctor details in a
            clean executive table.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18rem] text-indigo-700">
          newest first
        </span>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_12px_40px_-20px_rgba(15,23,42,0.2)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-200 text-black">
              <tr>
                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  #
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Patient
                </th>
                <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Age
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Date & Time
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Doctor
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Fees
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Status
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {appointments.map((item, index) => (
                <tr
                  key={item._id || index}
                  className="transition hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-11 w-11 rounded-full object-cover"
                        src={item.userData.image}
                        alt={item.userData.name}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.userData.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.userData.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {calculateAge(item.userData.dob)}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    <p className="font-medium text-slate-900">
                      {slotDateFormate(item.slotDate)}
                    </p>
                    <p className="text-xs text-slate-500">{item.slotTime}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-11 w-11 rounded-full bg-slate-100 object-cover"
                        src={item.docData.Image}
                        alt={item.docData.name}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.docData.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.docData.speciality}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                    <span className="text-sm font-semibold text-slate-900">
                      {currency}
                      {item.amount}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {item.cancelled ? (
                      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {!item.cancelled && !item.isCompleted && (
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-800"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => deleteAppointment(item._id)}
                        className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-100"
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
  );
};

export default AllApointment;
