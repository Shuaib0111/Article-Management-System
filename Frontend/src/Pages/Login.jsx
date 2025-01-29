import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await res.json();
      if (data.success) {
        // Use the `handleLogin` function to update state in App.jsx
        handleLogin({
          token: data.token,
          login: true,
          username: data.user.name,
        });

        alert("Logged in successfully!");
        navigate("/"); // Redirect to home
      } else {  
        alert(data.message || "Something went wrong!");   
      }
    } catch (err) {
      alert(err.message || "An error occurred!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              ref={passRef}
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-800 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
