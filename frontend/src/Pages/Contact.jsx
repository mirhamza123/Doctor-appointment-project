import React from "react";
import { assets } from "../assets/assets";

function Contact() {
  return (
    <div>
      <div className="text-xl my-4 text-center  pt-10 text-gray-500">
        <p>
          Contact <span className="text-gray-700 font-semibold"> US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb=28 text-sm">
        <img
          className="w-full md:max-w-[360px] "
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <b className="text-lg text-gray-600">Our OFFICE</b>
          <p className="text-gray-500">
            university Road, <br />
            Ali tower , peshawar, pakistan
          </p>
          <p className="text-gray-500">
            Tel: 92+ 3338974965 <br />
            Email: mirh7169@gmail.com
          </p>
          <b className="text-lg text-gray-600">Careers at PRESCRIPTO</b>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
