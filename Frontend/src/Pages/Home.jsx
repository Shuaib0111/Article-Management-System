import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const userData = JSON.parse(localStorage.getItem('UserData'));

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getAllArticles = async () => {
      try {
        let res = await axios.get('http://localhost:3000/article/get/allArticles'
        );
        if (res.data.success) {
          setArticles(res.data.articles);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    getAllArticles();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Latest Articles</h1>

        {/* Article Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {articles && articles.length > 0 ?
            articles.map((article) => (
              <div
                key={article._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                <img
                  src={`http://localhost:3000/${article.thumbnail}`}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 transition-all duration-300 ease-in-out">{article.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.category.title}</span>
                  <Link
                    to={`/singleArticle/${article._id}`}
                    className="text-sm text-gray-800 font-semibold hover:text-gray-600 transition-all duration-300 ease-in-out"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
            : <p className="text-center text-gray-600 col-span-full">No Articles posted yet...</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
