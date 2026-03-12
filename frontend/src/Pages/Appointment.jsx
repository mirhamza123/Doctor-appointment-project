import React, { useContext, useState, useEffect } from "react";
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

  const fetchInfo = async () => {
    const docInfo = doctors.find((item) => item._id === docId);
    setDocInfo(docInfo);
    console.log("Doctor Info:", docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    //  geting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting endtime
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(22, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formatedTime;

        const isSlotAvailable =
          docInfo.slot_booked[slotDate] &&
          docInfo.slot_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formatedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("login to  book appiontment");
      return navigate("/login");
    }
    try {
      const date = docSlots[SlotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId: docId, slotDate: slotDate, slotTime: SlotTime },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
    fetchInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
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
          {/* <div>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => {
                <div key={index}>
                  <p>{item[0] && dayOfweek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>;
              })}
          </div> */}
          <div className="flex  gap-3 items-center w-full  mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      SlotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                  >
                    <p>{item[0] && dayOfweek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[SlotIndex].map((item, index) => {
                return (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    className={`mt-5 text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.time === SlotTime
                        ? "bg-primary text-white"
                        : "text-gray-700 border border-gray-400"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
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
