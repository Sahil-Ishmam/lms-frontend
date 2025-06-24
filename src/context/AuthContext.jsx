import { createContext, useContext, useState } from "react";
// import { useEffect } from "react";
// import { parseJWT } from "../utils/jwt";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) setUser(parseJWT(token));
  // }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    // setUser(parseJWT(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
