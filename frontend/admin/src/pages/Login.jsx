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
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">
            Login
          </button>

          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="text-[#5f6fff] underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-[#5f6fff] underline cursor-pointer"
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
