// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { toast } from "react-toastify";

// import { assets } from "../assets/assets";

// function Login() {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAToken, backendUrl } = useContext(AdminContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(backendUrl + "/api/admin/login", {
//           email,
//           password,
//         });
//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token);
//           console.log("Admin token:", data.token);
//         }
//       } else {
//         toast.error(data.token);
//         // const { data } = await axios.post(backendURL + "/api/doctor/login", {
//         //   email,
//         //   password,
//         // });
//       }
//     } catch (error) {
//       console.log("Login failed:");
//       alert(
//         "Login failed: " + (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     if (state === "Admin") {
//   //       const { data } = await axios.post(backendURL + "/api/admin/login", {
//   //         email,
//   //         password,
//   //       });
//   //       if (data.success) {
//   //         console.log(data.token);
//   //       }
//   //     } else {
//   //     }
//   //   } catch (error) {
//   //     console.error("Login failed:");
//   //   }
//   // };
//   return (
//     <div>
//       <form
//         onSubmit={handleLogin}
//         className="min-h-[60vh] flex justify-center items-center "
//       >
//         <div className="flex flex-col gap-3 w-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//           <p className="text-2xl font-semibold m-auto ">
//             <span className="text-[#5f6fff]">{state} </span>login
//           </p>
//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="email"
//               required
//             />
//           </div>
//           <div className="w-full">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="password"
//               required
//             />
//           </div>
//           <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">
//             login
//           </button>
//           {state === "Admin" ? (
//             <p>
//               Doctor Login?{" "}
//               <span
//                 className="text-[#5f6fff] underline cursor-pointer"
//                 onClick={() => setState("Doctor")}
//               >
//                 Click here
//               </span>
//             </p>
//           ) : (
//             <p>
//               Admin Login?{" "}
//               <span
//                 className="text-[#5f6fff] underline cursor-pointer"
//                 onClick={() => setState("Admin")}
//               >
//                 Click here
//               </span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

///////////////////////////////////////////////////////////////

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { toast } from "react-toastify";

// function Login() {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAToken, backendUrl } = useContext(AdminContext); // ✅ backendUrl fix

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(backendUrl + "/api/admin/login", {
//           email,
//           password,
//         });

//         console.log("Login response:", data); // Debugging

//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token);
//           toast.success("Login successful ✅");
//         } else {
//           toast.error(data.message || "Invalid credentials ❌");
//         }
//       } else {
//         // Doctor login handle karna ho to yahan karein
//         toast.error("Doctor login not implemented yet ❌");
//       }
//     } catch (error) {
//       console.log("Login failed:", error);
//       toast.error(error.response?.data?.message || "Login failed ❌");
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleLogin}
//         className="min-h-[60vh] flex justify-center items-center "
//       >
//         <div className="flex flex-col gap-3 w-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//           <p className="text-2xl font-semibold m-auto ">
//             <span className="text-[#5f6fff]">{state} </span>login
//           </p>
//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="email"
//               required
//             />
//           </div>
//           <div className="w-full">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="password"
//               required
//             />
//           </div>
//           <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">
//             login
//           </button>
//           {state === "Admin" ? (
//             <p>
//               Doctor Login?{" "}
//               <span
//                 className="text-[#5f6fff] underline cursor-pointer"
//                 onClick={() => setState("Doctor")}
//               >
//                 Click here
//               </span>
//             </p>
//           ) : (
//             <p>
//               Admin Login?{" "}
//               <span
//                 className="text-[#5f6fff] underline cursor-pointer"
//                 onClick={() => setState("Admin")}
//               >
//                 Click here
//               </span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

//////////////////////////////////////////////////////////////////////

// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { AdminContext } from "../context/AdminContext";
// import { toast } from "react-toastify";
// import { DoctorContext } from "../context/DoctorContext";

// function Login() {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAToken, backendUrl } = useContext(AdminContext);

//   const { setDtoken } = useContext(DoctorContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(backendUrl + "/api/admin/login", {
//           email,
//           password,
//         });

//         // console.log("Login response:", data);

//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token);

//           // ✅ Show toast message on success
//           toast.success(data.message || "Login successful ✅");
//         } else {
//           toast.error(data.message || "Invalid credentials ❌");
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/doctor/login", {
//           email,
//           password,
//         });

//         if (data.success) {
//           localStorage.setItem("dToken", data.token);
//           setDtoken(data.token);
//           console.log("Doctor token:", data.token);
//           toast.success(data.message || "Doctor login successful ✅");
//         } else {
//           toast.error(data.message || "Invalid doctor credentials ❌");
//         }
//       }
//     } catch (error) {
//       console.log("Login failed:", error);
//       toast.error(error.response?.data?.message || "Login failed ❌");
//     }
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleLogin}
//         className="min-h-[60vh] flex justify-center items-center "
//       >
//         <div className="flex flex-col gap-3 w-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//           <p className="text-2xl font-semibold m-auto ">
//             <span className="text-[#5f6fff]">{state} </span>login
//           </p>
//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="email"
//               required
//             />
//           </div>
//           <div className="w-full">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="border border-[#DADADA] rounded w-full p-2 mt-1"
//               type="password"
//               required
//             />
//           </div>
//           <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">
//             login
//           </button>
//           {state === "Admin" ? (
//             <p>
//               Doctor Login?{" "}
//               <span
//                 className="text-[#5f6fff] underline cursor-pointer"
//                 onClick={() => setState("Doctor")}
//               >
//                 Click here
//               </span>
//             </p>
//           ) : (
//             <p>
//               Admin Login?{" "}
//               <span
//                 className="text-[#5f6fff] underline cursor-pointer"
//                 onClick={() => setState("Admin")}
//               >
//                 Click here
//               </span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

///////////////////////////////////////////////////////////////////////
import React, { useContext, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          // ✅ Store admin token & clear doctor token
          localStorage.setItem("aToken", data.token);
          localStorage.removeItem("dToken");
          setAToken(data.token);
          setDtoken(null);

          toast.success("Admin login successful ✅");
          navigate("/admin-dashboard");
        } else {
          toast.error(data.message || "Invalid admin credentials ❌");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          // ✅ Store doctor token & clear admin token
          localStorage.setItem("dToken", data.token);
          localStorage.removeItem("aToken");
          setDtoken(data.token);
          setAToken(null);

          toast.success("Doctor login successful ✅");
          navigate("/doctor-dashboard");
        } else {
          toast.error(data.message || "Invalid doctor credentials ❌");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="min-h-[60vh] flex justify-center items-center "
      >
        <div className="flex flex-col gap-3 w-auto items-start p-8 min-w-[340px] sm:min-w-98 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto ">
            <span className="text-[#5f6fff]">{state} </span>login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-[#DADADA] rounded w-full p-2 mt-1 pr-10"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer mt-1"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l1.73 1.73A11.1 11.1 0 0 0 1.5 12c1.97 3.78 5.95 6.75 10.5 6.75 1.4 0 2.74-.26 3.99-.74l2.1 2.1a.75.75 0 1 0 1.06-1.06L3.53 2.47Zm5.55 5.55 1.88 1.88a2.25 2.25 0 0 0 2.84 2.84l1.88 1.88A7.16 7.16 0 0 1 12 17.25c-3.45 0-6.33-2.1-7.5-5.25.7-1.34 1.7-2.5 2.9-3.35Zm4.72 4.72-1.29-1.29a.75.75 0 0 0-1.06 1.06l1.29 1.29a.75.75 0 0 0 1.06-1.06ZM12 6.75c-1.96 0-3.7.82-4.95 2.15l1.42 1.42A3.75 3.75 0 0 1 12 9.75c.5 0 .98.1 1.42.28l1.48 1.48A3.75 3.75 0 0 1 12 6.75Zm0 10.5a7.16 7.16 0 0 1-4.78-1.84l1.46-1.46c.75.4 1.6.65 2.52.65 1.74 0 3.28-.86 4.22-2.18l1.5 1.5A9.58 9.58 0 0 1 12 17.25Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 5.25c-4.55 0-8.53 2.97-10.5 6.75 1.97 3.78 5.95 6.75 10.5 6.75 4.55 0 8.53-2.97 10.5-6.75C20.53 8.22 16.55 5.25 12 5.25Zm0 11.25a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button className="bg-[#5f6fff] hover:bg-indigo-700 transition-all duration-300 text-white w-full py-2 rounded-md text-base cursor-pointer">
            Login
          </button>

          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-[#5f6fff] hover:text-indigo-800 transition-all underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-[#5f6fff] hover:text-indigo-800 transition-all underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
