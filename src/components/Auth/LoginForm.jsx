import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://lms-backend-xpwc.onrender.com/api/token/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // Save tokens in context or localStorage
      login({ access: data.access, refresh: data.refresh });
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="bg-white text-black shadow-lg rounded-xl w-full max-w-md p-10 border border-black">
      <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-black rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-black rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {error && <p className="text-red-600 text-sm -mt-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-200"
        >
          Login
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-6 text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
