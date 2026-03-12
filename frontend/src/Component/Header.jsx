import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row flex-wrap    bg-primary rounded-lg px-5 md:px-10 lg:px-15 ">
      {/* left side */}
      <div className=" md:w-1/2 flex flex-col justify-center items-start gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]   text-white">
        <p className="text-3xl md:text-4xl  text-white  font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> with trusted doctors
        </p>
        <div className=" flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-20" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate("/Login");
            window.scrollTo(0, 0);
          }}
          className="flex  items-center gap-2 bg-white text-gray-600 px-8 py-3 rounded-full text-sm m-auto md:m-0  hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Book Appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </button>
      </div>
      {/* right sidew */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
