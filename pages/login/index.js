import React from "react";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [err, setError] = useState(null);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newState = {};
    newState[name] = value;

    setFormState({ ...formState, ...newState });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formState);
      if (formState.username && formState.password) {
        router.push("/");
      } else {
        alert("username and password required!");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className=" bg-blue-50 shadow-lg h-screen flex items-center justify-center">
      <div className="flex lg:flex-row flex-col p-4  min-h-[600px]">
        <div className="bg-gray-400 flex-1 p-4 bg-login bg-center bg-cover bg-blend-multiply  ">
          <div className="flex flex-col justify-between h-full p-10 ">
            <div>
              <h1 className=" text-6xl text-white">
                <b>Welcome to Reach!</b>{" "}
              </h1>
              <p className="text-white mt-5 font-extrabold">
                Connecting people!
              </p>
            </div>
            <div>
              <p className="text-white">No account? </p>
              <Link href="/register">
                <button className="mt-2 bg-blue-500 text-white w-28 p-1 rounded-md hover:bg-blue-600">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 flex items-center">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-between h-72 w-[400px] p-10"
          >
            <h2 className=" text-3xl font-semibold">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className=" border-b-2 border-gray-300 outline-none"
              name="username"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              className="border-b-2 border-gray-300 outline-none mt-2"
              name="password"
              onChange={handleChange}
            />
            <button
              type="submit"
              className=" bg-blue-400 text-white mt-2 p-2 rounded-md hover:bg-blue-500"
            >
              Login
            </button>
            {<p className="text-lg text-red-500">{err}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
