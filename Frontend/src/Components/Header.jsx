import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = ({ userData, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-white to-gray-200 text-black shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        <div className="text-2xl font-bold text-black">POST-CRAFT</div>

        {/* Mobile menu button */}
        <button
          className="md:hidden absolute top-4 right-4 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </button>

        {/* Navbar items */}
        <div className="flex items-center space-x-8 w-full justify-between md:w-auto">
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-600 transition font-medium">
              Home
            </Link>
            <Link
              to="/addArticle"
              className="hover:text-gray-600 transition font-medium"
            >
              Add Article
            </Link>
            <Link
              to="/addCategory"
              className="hover:text-gray-600 transition font-medium"
            >
              Add Category
            </Link>
          </div>

          {/* Always display the username */}
          <div className="flex items-center space-x-4">
            {userData && (
              <span className="bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded-full shadow-md text-sm md:text-base font-semibold">
                {userData.username}
              </span>
            )}
          </div>

          {/* Always display the logout button on large screens */}
          {userData && (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 space-y-4">
          <Link
            to="/"
            className="block px-4 hover:bg-gray-200 transition text-black font-medium"
          >
            Home
          </Link>
          <Link
            to="/addArticle"
            className="block px-4 hover:bg-gray-200 transition text-black font-medium"
          >
            Add Article
          </Link>
          <Link
            to="/addCategory"
            className="block px-4 hover:bg-gray-200 transition text-black font-medium"
          >
            Add Category
          </Link>
          <div className="space-y-2">
            {!userData && (
              <>
                <Link
                  to="/login"
                  className="block bg-white text-black border border-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-black border border-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
                >
                  Signup
                </Link>
              </>
            )}

            {/* Logout button visible only on mobile */}
            {userData && (
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
