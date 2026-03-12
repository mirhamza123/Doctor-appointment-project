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

          <div className="w-full">
            <p>Password</p>
            <input
              id="password"
              name="password"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
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
