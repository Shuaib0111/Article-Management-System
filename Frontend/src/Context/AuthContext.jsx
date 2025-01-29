// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(() =>
//     JSON.parse(localStorage.getItem("UserData"))
//   );

//   // Update state and localStorage when logging in
//   const login = (data) => {
//     localStorage.setItem("UserData", JSON.stringify(data));
//     setUserData(data);
//   };

//   // Clear state and localStorage when logging out
//   const logout = () => {
//     localStorage.removeItem("UserData");
//     setUserData(null);
//   };

//   // Sync state with localStorage changes (optional)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUserData(JSON.parse(localStorage.getItem("UserData")));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userData, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
