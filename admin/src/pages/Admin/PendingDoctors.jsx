import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const PendingDoctors = () => {
  const { pendingDoctors, getPendingDoctors, verifyDoctor, aToken } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getPendingDoctors();
    }
  }, [aToken]);

  const handleApprove = (docId) => {
    verifyDoctor(docId, true);
  };

  const handleReject = (docId) => {
    if (
      window.confirm(
        "Are you sure you want to reject this doctor registration? This action cannot be undone.",
      )
    ) {
      verifyDoctor(docId, false);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-medium mb-6">
        📋 Doctor Registration Requests
      </h1>

      {pendingDoctors.length === 0 ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded text-center">
          <p className="text-gray-700 font-medium">
            ✅ All pending requests processed!
          </p>
          <p className="text-gray-600 text-sm mt-2">
            No doctors awaiting approval at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pendingDoctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className="border-l-4 border-yellow-500 bg-yellow-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  {/* Doctor Image and Basic Info */}
                  <div className="flex gap-6 flex-1">
                    <img
                      src={doctor.Image}
                      alt={doctor.name}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-yellow-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">
                          {doctor.name}
                        </h2>
                        <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          ⏳ Pending Verification
                        </span>
                      </div>

                      {/* Professional Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">
                            Speciality
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.speciality}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">
                            Experience
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.experience}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">
                            Degree
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.degree}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">
                            Fee
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            ${doctor.fee}
                          </p>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          Email
                        </p>
                        <p className="text-sm text-gray-900 break-all">
                          {doctor.email}
                        </p>
                      </div>

                      {/* About Section */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          About
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {doctor.about}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          Address
                        </p>
                        <p className="text-sm text-gray-900">
                          {doctor.addres?.line1 && (
                            <>
                              {doctor.addres.line1}
                              {doctor.addres.line2 &&
                                `, ${doctor.addres.line2}`}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-yellow-200">
                  <button
                    onClick={() => handleApprove(doctor._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                  >
                    ✅ Approve Request
                  </button>
                  <button
                    onClick={() => handleReject(doctor._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Information Card */}
      <div className="mt-8 bg-blue-50 border border-blue-300 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          📌 About Doctor Registration Approval:
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>
            ✅ When you approve a doctor, their profile becomes visible to
            patients on the website.
          </li>
          <li>
            ❌ When you reject a doctor, their registration is permanently
            removed from the system.
          </li>
          <li>⚠️ Make sure to verify all information before approving.</li>
          <li>
            📧 The doctor will receive notification about your decision (if
            email integration is added).
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PendingDoctors;
