import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const catRef = useRef();
  const navigate = useNavigate();

  const handleCategory = async (e) => {
    e.preventDefault();

    // Get user data dynamically
    const userData = JSON.parse(localStorage.getItem("UserData"));

    // Redirect to login if user is not authenticated
    if (!userData || !userData.token) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }

    const categoryTitle = catRef.current.value;
    if (!categoryTitle) {
      alert("Category name cannot be empty!");
      return;
    }

    let obj = { title: categoryTitle };

    try {
      let res = await fetch("http://localhost:3000/category/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      let data = await res.json();

      if (data.success) {
        alert("Category added successfully!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-r from-gray-100 to-white">
      <div className="mt-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Category</h2>

        <form onSubmit={handleCategory}>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              ref={catRef}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter category name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Add Category
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Want to go back?{" "}
          <Link to="/" className="text-gray-800 hover:underline">
            Go Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AddCategory;
