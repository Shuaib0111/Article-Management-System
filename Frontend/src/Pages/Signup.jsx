import axios from "axios";
import React, { useRef} from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    const handleSignup = async (e)=>{
        e.preventDefault();
        let obj = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value
        }
        console.log(obj);
        try{
            const res = await fetch("http://localhost:3000/users/register",{
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            const data = await res.json();
            if(data.success){
                alert(data.message);
                navigate("/login");
            }
            else{
                alert("Something went wrong");
            }
        }
        catch(err){
            alert(err.response.data.message);
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
            ref={nameRef}
              type="text"
              id="name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your name"
            />
          </div>

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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your email"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-gray-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;