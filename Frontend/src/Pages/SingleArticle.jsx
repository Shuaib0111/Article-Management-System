import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const userData = JSON.parse(localStorage.getItem("UserData"));

const SingleArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/article/get/singleArticle/${id}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        if (res.data.success) {
          setArticle(res.data.article);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchSingleArticle();
  }, [id]);

  if (!article || Object.keys(article).length === 0) {
    return <div className="text-center mt-16">Loading article...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="bg-white shadow-lg rounded-lg p-6 lg:p-10 mb-8">
          <div className="mb-6 relative">
            <img
              src={`http://localhost:3000/${article.thumbnail}`}
              alt={article.title}
              className="w-full h-auto max-h-72 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Headline and Category */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700 tracking-wide leading-tight">
              {article.title}
            </h1>
            <span className="bg-gray-800 text-white text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 rounded-lg font-medium mt-2 sm:mt-0 sm:ml-6">
              {article.category.title}
            </span>
          </div>

          {/* Article Description */}
          <div className="mb-6">
            <p className="text-base sm:text-lg md:text-xl text-gray-600">{article.description}</p>
          </div>

          {/* Article Content */}
          <div className="mb-6 text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl space-y-6">
            <p>{article.content}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <Link
              to="/"
              className="text-white text-center bg-gray-800 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
            >
              Back to Home
            </Link>
            <button
              className="text-white bg-blue-600 py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 w-full sm:w-auto"
            >
              Share Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
