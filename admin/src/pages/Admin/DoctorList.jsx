import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";

const DoctorList = () => {
  const { doctors, aToken, getalldoctor, changeAvailability, deleteDoctor } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getalldoctor();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-medium mb-6">ALL Doctor</h1>
      {/* <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 ">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-900 rounded-xl max-w-[22rem] overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              src={item.Image}
              alt={item.name || "doctor"}
              className="w-32 h-32 object-cover"
            />
            <div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
              <div>
                <input type="checkbox" checked={item.available} readOnly />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-300 rounded-xl overflow-hidden cursor-pointer group bg-white"
          >
            <img
              src={item.Image} // lowercase field matches your controller
              alt={item.name || "doctor"}
              className="w-full h-40 object-cover bg-indigo-50 group-hover:bg-[#5f6fff] transition-all duration-300"
            />
            <div className="p-5 flex flex-col gap-4">
              <p className="text-lg text-neutral-800 font-medium">
                {item.name}
              </p>
              <p className="text-sm text-zinc-600">{item.speciality}</p>
              <div className="flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  readOnly
                />
                <p className="text-xs">Available</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete Dr. ${item.name}? This cannot be undone.`)) {
                    deleteDoctor(item._id);
                  }
                }}
                className="mt-1 w-full py-2.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
