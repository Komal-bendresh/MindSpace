// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import DarkModeToggle from "./DarkModeToggle";

// const Header = () => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check login status on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//       localStorage.removeItem("token");
//       setIsLoggedIn(false);
//       alert("Logged out successfully");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to log out");
//     }
//   };

//   return (
//     <header className="fixed top-0 w-full bg-blue-600 dark:bg-zinc-900 text-white shadow z-50">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">MindSpace</Link>

//         <div className="flex items-center gap-4">
//           <nav className="space-x-4">
//             <Link to="/" className="hover:underline">Home</Link>

//             {!isLoggedIn && (
//               <>
//                 <Link to="/login" className="hover:underline">Login</Link>
//                 <Link to="/signup" className="hover:underline">Signup</Link>
//               </>
//             )}

           
//                 <Link to="/journal" className="hover:underline">Journal</Link>
//                 <Link to="/chat" className="hover:underline">ChatWithAi</Link>
//                 <Link to="/analytics" className="hover:underline">Ai Dashboard</Link>
    
//           </nav>

//           <DarkModeToggle />

//           {isLoggedIn && (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import axios from "axios";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      logout(); // instantly updates state
      alert("Logged out");
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 w-full bg-blue-600 dark:bg-zinc-900 text-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MindSpace</Link>
        <div className="flex items-center gap-4">
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>

            {!isLoggedIn && (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Signup</Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="/journal" className="hover:underline">Journal</Link>
                <Link to="/chat" className="hover:underline">ChatWithAi</Link>
                <Link to="/analytics" className="hover:underline">Ai Dashboard</Link>
              </>
            )}
          </nav>

          <DarkModeToggle />

          {isLoggedIn && (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
