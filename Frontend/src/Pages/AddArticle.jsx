import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const userData = JSON.parse(localStorage.getItem('UserData'));

const AddArticle = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    category: "",
    description: ""
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("description", input.description);
    if (file) {
      formData.append("thumbnail", file);
    }

    try {
      let res = await axios.post('http://localhost:3000/article/create', formData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-Type": "multipart/form-data",
        }
      });

      if (res.data.success) {
        alert("Article posted successfully...");
        navigate("/");
      } else {
        alert(res.data.message || "Failed to post article.");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        let res = await fetch('http://localhost:3000/category/get/allCategories', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          },
        });

        let data = await res.json();
        if (data.success) {
          setCategories(data.allCategories);
        } else {
          console.error("Failed to fetch categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add New Article
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter article title"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={input.category}
                onChange={(e) => setInput({ ...input, category: e.target.value })}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
                required
              >
                <option value="" disabled> Select category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>{item.title}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={(e) => setInput({ ...input, description: e.target.value })}
                rows="4"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter article description"
                required
              />
            </div>

            {/* Thumbnail */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
                required
              />
            </div>

            {/* Add Article Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              Add Article
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
