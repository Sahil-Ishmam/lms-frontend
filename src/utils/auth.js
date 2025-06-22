// Store token in localStorage
export const setToken = (token) => localStorage.setItem("access", token);

// Retrieve token from localStorage
export const getToken = () => localStorage.getItem("access");

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem("access");