import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyAppointment() {
  const { backendUrl, token, getDoctorData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const month = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormate = (slotdate) => {
    const dataArr = slotdate.split("_");
    return dataArr[0] + "" + month[Number(dataArr[1])] + " " + dataArr[2];
  };
  const navigate = useNavigate();

  const getuserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getuserAppointments();
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const initPay = (order) => {
  //   const option = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Appointment Payment",
  //     description: "Appointment Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);

  //       try {
  //         const { data } = await axios.post(
  //           `${backendUrl}/api/user/verifyRazorpay`,
  //           { response },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         if (data.success) {
  //           getuserAppointments();
  //           navigate("/my-appointments");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         toast.error(Error.message);
  //       }
  //     },
  //   };
  //   const rzp = new window.Razorpay(option);
  //   res.open();
  // };

  // const appointmentRazorpay = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(
  //       `${backendUrl}/api/user/payment-stripe`,
  //       { appointmentId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (data.success) {
  //       initPay(data.order);
  //       console.log(data.order);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        window.location.href = data.sessionUrl; // redirect to Stripe Checkout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getuserAppointments();
    }
  }, [token]);

  return (
    <div>
      <h1 className="pb-3 mt-12 font-medium text-zinc-700 border-b ">
        My Appointment
      </h1>
      <div>
        {appointments.map((item, index) => {
          return (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData?.Image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData?.name}
                </p>
                <p> {item.docData?.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address</p>
                <p className="text-xs"> {item.userData?.address?.line1}</p>
                <p className="text-xs"> {item.userData?.address?.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time
                  </span>{" "}
                  {slotDateFormate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                    paid
                  </button>
                )}

                {!item.cancelled && item.payment && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    pay online
                  </button>
                )}

                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Cancel appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}
              </div> */}
              <div className="flex flex-col gap-2 justify-end">
                {/* Show when appointment is paid */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                    Paid
                  </button>
                )}

                {/* Show when appointment is NOT paid */}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Pay Online
                  </button>
                )}

                {/* Cancel button (always visible if not cancelled) */}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Cancel Appointment
                  </button>
                )}

                {/* Show cancelled status */}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-green-600 bg-green-50">
                    Completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyAppointment;
