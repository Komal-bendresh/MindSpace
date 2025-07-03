// import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import DarkModeToggle from "./DarkModeToggle";
// import axios from "axios";
// import { 
//   Brain } from 'lucide-react';
// const Header = () => {
//   const { isLoggedIn, user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//       logout();
//       alert("Logged out");
//       navigate("/");
//     } catch (err) {
//       alert("Logout failed");
//     }
//   };


//   return (
//     <header className="fixed top-0 w-full bg-blue-900 dark:bg-zinc-900 text-white shadow z-50">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <Brain className="w-8 h-8 text-purple-600" />
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               MindSpace
//             </span>
//           </div>
//           </div>
//           </Link>
       
//         <div className="flex items-center gap-4">
//           <nav className="space-x-4">
//             <Link to="/" className="hover:underline">Home</Link>

//             {!isLoggedIn && (
//               <>
//                 <Link to="/login" className="hover:underline">Login</Link>
//                 <Link to="/signup" className="hover:underline">Signup</Link>
//               </>
//             )}

//             {isLoggedIn && (
//               <>
//                 <Link to="/journal" className="hover:underline">Journal</Link>
//                 <Link to="/chat" className="hover:underline">ChatWithAi</Link>
//                 <Link to="/analytics" className="hover:underline">Ai Dashboard</Link>
//                 {user?.role === "admin" && (
//                   <Link to="/admin" className="hover:underline text-yellow-300">Admin</Link>
//                 )}
//               </>
//             )}
//           </nav>

//           <DarkModeToggle />

//           {isLoggedIn && (
//             <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">
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
import { Brain } from "lucide-react";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      logout();
      alert("Logged out");
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 w-full bg-blue-900 dark:bg-zinc-900 text-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="w-8 h-8 text-purple-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MindSpace
          </span>
        </Link>

        {/* Navigation + Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <nav className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base">
            <Link to="/" className="hover:underline">Home</Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Signup</Link>
              </>
            ) : (
              <>
                <Link to="/journal" className="hover:underline">Journal</Link>
                <Link to="/chat" className="hover:underline">ChatWithAi</Link>
                <Link to="/analytics" className="hover:underline">Ai Dashboard</Link>
                {user?.role === "admin" && (
                  <Link to="/admin" className="hover:underline text-yellow-300">Admin</Link>
                )}
              </>
            )}
          </nav>

          {/* Dark Mode + Logout */}
          <div className="flex items-center gap-5 sm:gap-4">
            <DarkModeToggle />
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded ml-6 sm:ml-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
