import { createContext, useContext, useState, useEffect } from "react";
import { parseJWT } from "../utils/jwt";

const AuthContext = createContext();

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://lms-backend-xpwc.onrender.com/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = ({ access, refresh }) => {
    localStorage.setItem("token", access);
    localStorage.setItem("refreshToken", refresh);
    const parsed = parseJWT(access);
    setUser(parsed);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const refresh = localStorage.getItem("refreshToken");

      if (!token || !refresh) {
        setLoading(false);
        return;
      }

      const payload = parseJWT(token);
      const isExpired = payload?.exp && Date.now() >= payload.exp * 1000;

      if (!isExpired) {
        setUser(payload);
        setLoading(false);
        return;
      }

      // Try to refresh the token
      try {
        const res = await fetch(`${BASE_URL}/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh }),
        });

        if (!res.ok) throw new Error("Refresh token failed");

        const data = await res.json();
        login({ access: data.access, refresh }); // reuse refresh
      } catch (err) {
        console.error("Auto-refresh failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) return null; // Avoid rendering while checking auth

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        token: localStorage.getItem("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
