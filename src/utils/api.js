import { parseJWT } from "./jwt";

// Base API URL from .env
const BASE_URL = import.meta.env.VITE_API_URL;

export const api = async (url, options = {}) => {
  let token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // 🔍 Check if token is expired
  const payload = token ? parseJWT(token) : null;
  const isExpired = payload?.exp && Date.now() >= payload.exp * 1000;

  // 🔁 Try refresh if expired
  if (isExpired && refreshToken) {
    try {
      const res = await fetch(`${BASE_URL}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!res.ok) throw new Error("Token refresh failed");

      const data = await res.json();
      token = data.access;
      localStorage.setItem("token", token);
    } catch (err) {
      // ⛔ Logout user if refresh fails
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      console.error("Auto-refresh failed:", err);
      throw new Error("Session expired. Please log in again.");
    }
  }

  // ✅ Build headers with token
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // 🛰️ Make the request
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // 🧠 Parse response once
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "API request failed");
  }

  return data;
};
