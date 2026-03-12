////////////////////////////////////////////////

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  // ✅ Step 1: Parse address once
  useEffect(() => {
    if (profileData?.addres && typeof profileData.addres === "string") {
      try {
        const parsed = JSON.parse(profileData.addres);
        setProfileData((prev) => ({
          ...prev,
          addres: parsed,
        }));
      } catch (err) {
        console.error("Error parsing address:", err);
      }
    }
  }, [profileData?.addres]);

  // Fetch profile data on load
  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  // ✅ Step 2: Update doctor profile
  const updateProfile = async () => {
    try {
      const updateData = {
        // addres: profileData.addres,
        addres: profileData.addres,
        fee: profileData.fee,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        {
          headers: { dtoken: dtoken },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // ✅ Step 3: Update UI immediately
        setProfileData((prev) => ({
          ...prev,
          ...updateData,
        }));

        setIsEdit(false);

        // Optional small delay to sync backend
        setTimeout(() => getProfileData(), 500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error updating doctor profile data:", error);
      toast.error(error.message);
    }
  };

  if (!profileData) return null;

  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img
            className="bg-[#5f6fff]/80 w-full sm:max-w-64 rounded-lg"
            src={profileData.Image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
          {/* Doctor info */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {profileData.name}
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="border text-xs py-0.5 px-2 rounded-full">
              {profileData.experience}
            </button>
          </div>

          {/* About */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData.about}
            </p>
          </div>

          {/* Fee */}
          <p className="text-gray-600 font-m mt-4">
            Appointment fee:
            <span className="text-gray-800">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fee: e.target.value,
                    }))
                  }
                  value={profileData.fee || ""}
                  className="border rounded px-2 ml-2"
                />
              ) : (
                profileData.fee
              )}
            </span>
          </p>

          {/* Address */}
          <div className="flex gap-2 py-2">
            <p>Address</p>
            {profileData.addres ? (
              <p className="text-sm">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          addres: { ...prev.addres, line1: e.target.value },
                        }))
                      }
                      value={profileData.addres.line1 || ""}
                      className="border rounded px-2"
                    />
                    <br />
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          addres: { ...prev.addres, line2: e.target.value },
                        }))
                      }
                      value={profileData.addres.line2 || ""}
                      className="border rounded px-2 mt-1"
                    />
                  </>
                ) : (
                  <>
                    {profileData.addres.line1}
                    <br />
                    {profileData.addres.line2}
                  </>
                )}
              </p>
            ) : (
              <p>No address available</p>
            )}
          </div>

          {/* Availability */}
          <div className="flex gap-1 pt-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
            />
            <label>Available</label>
          </div>

          {/* Buttons */}
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

////////////////////////////////////////////////
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets.js";

// const DoctorProfile = () => {
//   const { dtoken, profileData, setProfileData, getProfileData, backendUrl } =
//     useContext(DoctorContext);
//   const { currency } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);

//   // ✅ Parse address string to object once
//   useEffect(() => {
//     if (profileData?.addres && typeof profileData.addres === "string") {
//       try {
//         const parsed = JSON.parse(profileData.addres);
//         setProfileData((prev) => ({
//           ...prev,
//           addres: parsed,
//         }));
//       } catch (err) {
//         console.error("Error parsing doctor address:", err);
//       }
//     }
//   }, [profileData?.addres]);

//   // ✅ Fetch doctor profile when token available
//   useEffect(() => {
//     if (dtoken) {
//       getProfileData();
//     }
//   }, [dtoken]);

//   // ✅ Update doctor profile
//   const updateProfile = async () => {
//     try {
//       // Make sure address is a string before sending to backend
//       const updateData = {
//         addres:
//           typeof profileData.addres === "object"
//             ? JSON.stringify(profileData.addres)
//             : profileData.addres,
//         fee: profileData.fee,
//         available: profileData.available,
//       };

//       const { data } = await axios.post(
//         `${backendUrl}/api/doctor/update-profile`,
//         updateData,
//         {
//           headers: { dtoken },
//         }
//       );

//       if (data.success) {
//         toast.success("Profile updated successfully");

//         // Update UI immediately
//         setProfileData((prev) => ({
//           ...prev,
//           ...updateData,
//           addres: JSON.parse(updateData.addres), // keep it parsed for UI
//         }));

//         setIsEdit(false);
//         setTimeout(() => getProfileData(), 500);
//       } else {
//         toast.error(data.message || "Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Error updating doctor profile:", error);
//       toast.error(error.message);
//     }
//   };

//   if (!profileData) return null;

//   return (
//     <div className="flex flex-col gap-4 m-5">
//       <div>
//         <img
//           className="bg-[#5f6fff]/80 w-full sm:max-w-64 rounded-lg"
//           src={profileData.Image}
//           alt="Doctor"
//         />
//       </div>

//       <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//         <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//           {profileData.name}
//         </p>

//         <div className="flex items-center gap-2 mt-1 text-gray-600">
//           <p>
//             {profileData.degree} - {profileData.speciality}
//           </p>
//           <button className="border text-xs py-0.5 px-2 rounded-full">
//             {profileData.experience}
//           </button>
//         </div>

//         {/* About */}
//         <div>
//           <p className="text-sm font-medium text-neutral-800 mt-3">About:</p>
//           <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//             {profileData.about}
//           </p>
//         </div>

//         {/* Fee */}
//         <p className="text-gray-600 font-m mt-4">
//           Appointment fee:
//           <span className="text-gray-800">
//             {currency}{" "}
//             {isEdit ? (
//               <input
//                 type="number"
//                 onChange={(e) =>
//                   setProfileData((prev) => ({
//                     ...prev,
//                     fee: e.target.value,
//                   }))
//                 }
//                 value={profileData.fee || ""}
//                 className="border rounded px-2 ml-2"
//               />
//             ) : (
//               profileData.fee
//             )}
//           </span>
//         </p>

//         {/* Address */}
//         <div className="flex gap-2 py-2">
//           <p className="font-medium">Address:</p>
//           {profileData.addres ? (
//             <p className="text-sm">
//               {isEdit ? (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Address line 1"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         addres: { ...prev.addres, line1: e.target.value },
//                       }))
//                     }
//                     value={profileData.addres.line1 || ""}
//                     className="border rounded px-2"
//                   />
//                   <br />
//                   <input
//                     type="text"
//                     placeholder="Address line 2"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         addres: { ...prev.addres, line2: e.target.value },
//                       }))
//                     }
//                     value={profileData.addres.line2 || ""}
//                     className="border rounded px-2 mt-1"
//                   />
//                 </>
//               ) : (
//                 <>
//                   {profileData.addres.line1}
//                   <br />
//                   {profileData.addres.line2}
//                 </>
//               )}
//             </p>
//           ) : (
//             <p>No address available</p>
//           )}
//         </div>

//         {/* Availability */}
//         <div className="flex gap-1 pt-2">
//           <input
//             type="checkbox"
//             checked={profileData.available}
//             onChange={() =>
//               isEdit &&
//               setProfileData((prev) => ({
//                 ...prev,
//                 available: !prev.available,
//               }))
//             }
//           />
//           <label>Available</label>
//         </div>

//         {/* Buttons */}
//         {isEdit ? (
//           <button
//             onClick={updateProfile}
//             className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all"
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsEdit(true)}
//             className="px-4 py-1 border border-[#5f6fff] text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;
