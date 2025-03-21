import { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(() => {
        return JSON.parse(localStorage.getItem("UserData"));
    });

    useEffect(() => {
        if (!userData) return; // Prevent fetching if userData is null

        const fetchUserArticles = async () => {
            try {
                setLoading(true);
                let res = await axios.get("http://localhost:3000/article/get/userArticles", {
                    headers: { Authorization: `Bearer ${userData.token}` },
                });

                if (res.data.success) {
                    setArticles(res.data.articles);
                    setError("");
                }
            } catch (err) {
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserArticles();
    }, [userData]); // ✅ Run only when `userData` changes

    const handleDelete = async (articleId) => {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

        try {
            await axios.delete(`http://localhost:3000/article/delete/${articleId}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            });
            setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
        } catch (err) {
            alert("Error deleting article");
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-100 to-white min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Articles</h1>

                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : articles.length === 0 ? (
                    <p className="text-center text-gray-600">No articles found. Start writing now!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
                            >
                                <img
                                    src={`http://localhost:3000/${article.thumbnail}`}
                                    alt={article.title}
                                    className="w-full h-48 object-cover rounded-lg mb-6"
                                />
                                <h2 className="text-2xl font-semibold text-gray-800 mb-3 transition-all duration-300 ease-in-out">
                                    {article.title}
                                </h2>
                                <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{article.category?.title}</span>
                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
