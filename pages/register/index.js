import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [err, setError] = useState(null);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = {};
    newState[name] = value;

    setFormState({ ...formState, ...newState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/auth/register", formState);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className=" bg-blue-50 shadow-lg h-screen flex items-center justify-center">
      <div className="flex lg:flex-row flex-col p-4  min-h-[600px]">
        <div className="bg-white flex-1 flex items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-96 w-[400px] p-10"
          >
            <h2 className=" text-3xl font-semibold mb-2">Register</h2>
            <input
              type="text"
              placeholder="Username"
              className=" border-b-2 border-gray-300 outline-none"
              autoComplete="new-password"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className=" border-b-2 border-gray-300 outline-none mt-2"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b-2 border-gray-300 outline-none mt-2"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              className=" border-b-2 border-gray-300 outline-none mt-2"
              autoComplete="new-password"
              name="name"
              onChange={handleChange}
            />
            {<p className=" text-xl text-red-500">{err}</p>}
            <button
              type="submit"
              className=" bg-blue-400 text-white mt-2 p-2 rounded-md hover:bg-blue-500"
            >
              Login
            </button>
          </form>
        </div>
        <div className="bg-gray-400 flex-1 p-4 bg-login bg-center bg-cover bg-blend-multiply  ">
          <div className="flex flex-col justify-between h-full p-10 ">
            <div>
              <h1 className=" text-5xl text-white">
                <b>Reach Social</b>{" "}
              </h1>
            </div>
            <div>
              <p className="text-white font-bold">Have an account? </p>
              <Link href="/login">
                <button className="mt-2 bg-blue-500 text-white w-28 p-1 rounded-md hover:bg-blue-600">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
