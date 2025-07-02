
import { createContext, useState, useContext } from "react";
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

   const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

    const login = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user)); // ✅ store user info
  setUser(user); // ✅ update context
  setIsLoggedIn(true);
};


  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser ,isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);