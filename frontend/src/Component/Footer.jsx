import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-40 text-sm ">
        {/* left side  */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
        </div>
        {/* center side */}
        <div>
          <h1 className="textxl font-medium mb-5">Company</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-primary transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary transition">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-primary transition">
                Contact Us
              </NavLink>
            </li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* right side */}
        <div>
          <h1 className="textxl font-medium mb-5">Contact Us</h1>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <b>Phone:</b> +92 3338974985
            </li>
            <li>
              <b>Email:</b> mirh7169@gmail.com
            </li>
          </ul>
        </div>
        {/* copyright */}
        <div className="text-center ">
          <p className="py-5 ml-[270px] text-sm text-center text-gray-500">
            &copy; Prescripto. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
