import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../Component/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorData } =
    useContext(AppContext);
  // const dayOfweek = ["MON", "TUE", "WED", "TUS", "FRI", "SAT", "SUN"];
  const dayOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [SlotIndex, setSlotIndex] = useState(0);
  const [SlotTime, setSlotTime] = useState("");
  const slotContainerRef = useRef(null);

  // Reset scroll position when day changes
  useEffect(() => {
    if (slotContainerRef.current) {
      slotContainerRef.current.scrollLeft = 0;
      setSlotTime(""); // Clear selected slot time when day changes
    }
  }, [SlotIndex]);

  const fetchInfo = async () => {
    try {
      // First try to get from context
      let docInfo = doctors.find((item) => item._id === docId);

      // Always fetch fresh data from API to get latest availableSchedule
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
        if (data.success && data.doctors) {
          const freshDocInfo = data.doctors.find((item) => item._id === docId);
          if (freshDocInfo) {
            docInfo = freshDocInfo; // Use fresh data from API
            console.log("Fresh doctor data loaded:", docInfo);
          }
        }
      } catch (error) {
        console.log(
          "Could not fetch fresh doctor data, using context data:",
          error,
        );
      }

      if (docInfo) {
        setDocInfo(docInfo);
        console.log("Doctor Info set:", docInfo);
      } else {
        console.log("No doctor info found for ID:", docId);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
      toast.error("Failed to load doctor information");
    }
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;

    setDocSlots([]);
    //  geting current date
    let today = new Date();
    let allDocSlots = []; // Collect all slots first

    // Check if doctor has configured the new schedule system
    const hasConfiguredSchedule =
      docInfo.availableSchedule &&
      docInfo.availableSchedule.length > 0 &&
      docInfo.availableSchedule.some((s) => s.isActive);

    console.log("Doctor availableSchedule:", docInfo.availableSchedule);
    console.log("Has configured schedule:", hasConfiguredSchedule);

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Get day name (MON, TUE, WED, THU, FRI, SAT, SUN)
      const dayIndex = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const currentDayName = dayNames[dayIndex];

      // Find doctor's schedule for this day
      const doctorSchedule = docInfo.availableSchedule?.find(
        (s) => s.day === currentDayName,
      );

      // If no schedule configured, default to all days active with all slots available (backward compatibility)
      // If schedule is configured, use the configured values
      const isDayActive = hasConfiguredSchedule
        ? doctorSchedule?.isActive || false
        : true; // Default to active if no schedule configured
      const availableSlotsForDay = hasConfiguredSchedule
        ? doctorSchedule?.slots || []
        : []; // Will check legacy availableSlots below

      // setting endtime
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(22, 0, 0, 0);

      // setting hours - start from 08:00 AM for all days
      currentDate.setHours(8);
      currentDate.setMinutes(0);

      let timeSlots = [];

      while (currentDate < endTime) {
        // Format time to match DoctorTimeSlotManager format: "08:00 am"
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const period = currentDate.getHours() >= 12 ? "pm" : "am";
        const displayHours = currentDate.getHours() % 12 || 12; // Convert to 12-hour format
        const formatedTime = `${String(displayHours).padStart(2, "0")}:${minutes} ${period}`;

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formatedTime;

        // Check if slot is already booked
        const isSlotBooked =
          docInfo.slot_booked[slotDate] &&
          docInfo.slot_booked[slotDate].includes(slotTime);

        // Check if slot is in doctor's available slots for this day
        let isDoctorAvailable;

        if (hasConfiguredSchedule) {
          // Use new schedule system (doctor has configured days/slots)
          // If doctor explicitly selected this slot, show it regardless of past time
          isDoctorAvailable =
            isDayActive && availableSlotsForDay.includes(slotTime);
        } else if (
          docInfo.availableSlots &&
          docInfo.availableSlots.length > 0
        ) {
          // Use legacy availableSlots system (old simple slots array)
          // For legacy system, only skip past slots for today
          if (today.getDate() === currentDate.getDate()) {
            const now = new Date();
            isDoctorAvailable =
              docInfo.availableSlots.includes(slotTime) && currentDate >= now;
          } else {
            isDoctorAvailable = docInfo.availableSlots.includes(slotTime);
          }
        } else {
          // No configuration - show all slots as available (default behavior)
          isDoctorAvailable = true;
        }

        // Slot should only be bookable if it's not booked AND doctor has it available
        const isSlotAvailable = !isSlotBooked && isDoctorAvailable;

        // Add all slots (booked, unavailable, and available) to display them all
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formatedTime,
          isAvailable: isSlotAvailable,
          isDoctorAvailable: isDoctorAvailable,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add this day's slots to the array
      allDocSlots.push({
        daySlots: timeSlots,
        dayName: currentDayName,
        isDayActive,
        dayDate: currentDate.getDate(),
      });
    }

    // Sort days in calendar week order (MON=1, TUE=2, ..., SUN=0)
    const dayOrder = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 0 };
    allDocSlots.sort((a, b) => dayOrder[a.dayName] - dayOrder[b.dayName]);

    // Set all slots at once, not in a loop
    setDocSlots(allDocSlots);

    // Find today's day index in the sorted array and set it as default
    const todayDayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const todayDayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const todayDayName = todayDayNames[todayDayIndex];
    const todaySlotIndex = allDocSlots.findIndex(
      (slot) => slot.dayName === todayDayName,
    );
    if (todaySlotIndex !== -1) {
      setSlotIndex(todaySlotIndex);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("login to book appointment");
      return navigate("/login");
    }

    // Check if selected slot is available
    if (!SlotTime) {
      toast.error("Please select a time slot");
      return;
    }

    // Check if selected day is active
    if (!docSlots[SlotIndex]?.isDayActive) {
      toast.error("Doctor is not available on this day");
      return;
    }

    // Verify the selected slot is doctor available
    const selectedSlot = docSlots[SlotIndex].daySlots?.find(
      (s) => s.time === SlotTime,
    );
    if (!selectedSlot?.isDoctorAvailable) {
      toast.error("This time slot is not available");
      return;
    }

    try {
      const dayDate = docSlots[SlotIndex].daySlots[0]?.datetime;

      let day = dayDate.getDate();
      let month = dayDate.getMonth() + 1;
      let year = dayDate.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId: docId, slotDate: slotDate, slotTime: SlotTime },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate("/My-Appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("failed to book appointment" + error.message);
    }
  };

  useEffect(() => {
    const loadDoctorInfo = async () => {
      await fetchInfo();
    };
    loadDoctorInfo();
  }, [docId, backendUrl]);

  useEffect(() => {
    if (docInfo && docInfo._id) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* doctor detail */}

        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.Image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounde-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* doc info name, degree , experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray 900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex  items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="py-0.5  px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm  font-medium  text-gray-900 mi-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Apointment fee:{" "}
              <span className="text-gray-900 ">
                {currencySymbol}
                {docInfo.fee}
              </span>
            </p>
          </div>
        </div>
        {/* booking slots */}
        <div className="sm:ml-72  sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Day Selection */}
          <div className="flex gap-3 items-center w-full mt-4 overflow-x-scroll">
            {docSlots.length &&
              docSlots.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (item.isDayActive) {
                        setSlotIndex(index);
                      }
                    }}
                    className={`text-center py-6 min-w-16 rounded-full flex-shrink-0 transition ${
                      item.isDayActive
                        ? SlotIndex === index
                          ? "bg-primary text-white border border-primary cursor-pointer"
                          : "border border-gray-200 cursor-pointer hover:border-primary"
                        : "opacity-50 bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                    title={
                      !item.isDayActive
                        ? `${item.dayName} - Doctor not available`
                        : ""
                    }
                  >
                    <p className="text-sm font-semibold">{item.dayName}</p>
                  </div>
                );
              })}
          </div>

          {/* Time Slots for Selected Day */}
          {docSlots[SlotIndex]?.isDayActive ? (
            <div
              className="flex items-center gap-3 w-full overflow-x-scroll mt-4"
              ref={slotContainerRef}
            >
              {docSlots[SlotIndex].daySlots.map((item, index) => {
                return (
                  <p
                    onClick={() => {
                      // Only allow selection if doctor has this slot available
                      if (item.isDoctorAvailable) {
                        setSlotTime(item.time);
                      }
                    }}
                    className={`mt-5 text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition ${
                      item.isDoctorAvailable
                        ? item.time === SlotTime
                          ? "bg-primary text-white"
                          : "text-gray-700 border border-gray-400 hover:border-primary"
                        : "opacity-50 text-gray-400 border border-gray-300 cursor-not-allowed"
                    }`}
                    key={index}
                    title={
                      !item.isDoctorAvailable
                        ? "This slot is not available"
                        : ""
                    }
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
              <p>
                Doctor is not available on{" "}
                {docSlots[SlotIndex]?.dayName || "this day"}. Please select a
                different day.
              </p>
            </div>
          )}
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-8 py-3 rounded-full my-6 mt-7 cursor-pointer"
          >
            Booking an Appointment
          </button>
        </div>
        {/* related doctors */}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
