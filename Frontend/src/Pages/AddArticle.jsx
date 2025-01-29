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
  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);

  const formData = new FormData();

  formData.append("title",input.title);
  formData.append("category", input.category);
  formData.append("description",input.description);
  formData.append("thumbnail", file);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      console.log("hello")
      let res = await axios.post('http://localhost:3000/article/create',formData,{
        headers: {
          Authorization: `Bearer ${userData.token}`,
        }
      });
      console.log(res);
      if(res.data){
        alert("Article posted successfully...");
        navigate("/");
      }
      else{
        console.log(res.message)
      }
    }
    catch(err){
      alert(err.message);
    }
  }

  useEffect(()=>{
    const fetchAllCategories = async ()=>{
      let res = await fetch('http://localhost:3000/category/get/allCategories',{
        method: 'get',
        headers: {
          Authorization: `Bearer ${userData.token}`,
          'content-type': 'application/json'
        },
      });
      let data = await res.json();
      if(data.success){
        setCategories(data.allCategories);
      }
    }
    fetchAllCategories();
  },[])
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
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={input.title}
                onChange={(e)=>{
                  setInput({...input, [e.target.name]: e.target.value})
                }}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter article title"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                onChange={(e)=>{
                  setInput({...input, [e.target.name]: e.target.value})
                }}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="" disabled selected> Select category</option>
                {categories && categories.map((item)=>{
                  return <option value={item._id}>{item.title}</option>
                })}
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={(e)=>{
                  setInput({...input, [e.target.name]: e.target.value})
                }}
                rows="4"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter article description"
              />
            </div>

            {/* Thumbnail */}
            <div className="mb-6">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-gray-500 focus:border-gray-500"
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
