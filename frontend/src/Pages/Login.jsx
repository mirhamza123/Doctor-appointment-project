//////////////////////////////////////////////////////////////

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("sign up");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (state === "sign up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <form className="min-h-[80vh] flex items-center" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 items-start m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "sign up" ? "Create Account" : "Login"}
          </p>
          <p>
            Please {state === "sign up" ? "sign up" : "log in"} to book an
            appointment
          </p>

          {/* Show Full Name only when signing up */}

          {/* Show Full Name only when signing up */}
          {state === "sign up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                id="fullName"
                name="fullName"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required={state === "sign up"}
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              id="email"
              name="email"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full relative">
            <p>Password</p>
            <input
              id="password"
              name="password"
              className="border border-zinc-300 rounded w-full p-2 pr-10 mt-1"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              type="button"
              className="absolute top-[40px] right-3 text-zinc-500 hover:text-zinc-900"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
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
          {/* {state === "sign up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required={state === "sign up"}
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div> */}

          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer"
          >
            {state === "sign up" ? "Create Account" : "Log In"}
          </button>

          {state === "sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("login")}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("sign up")}
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
