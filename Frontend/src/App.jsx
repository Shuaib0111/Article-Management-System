import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import AddArticle from "./Pages/AddArticle";
import AddCategory from "./Pages/AddCategory";
import SingleArticle from "./Pages/SingleArticle";
import PrivateRoute from "./Services/ProtectedRoute"; // Ensure you are using the correct path for PrivateRoute
import UserDashboard from "./Pages/UserDashboard";

function App() {
  // State to track user login status
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("UserData")) || null
  );
  const navigate = useNavigate();

  // Login handler
  const handleLogin = (user) => {
    localStorage.setItem("UserData", JSON.stringify(user));
    setUserData(user); // Update state
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("UserData");
    setUserData(null); // Clear state
    navigate("/login");
  };

  return (
    <>
     
      <Header userData={userData} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/singleArticle/:id" element={<SingleArticle />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/addArticle" element={<AddArticle />} />
          <Route path="/addCategory" element={<AddCategory />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
