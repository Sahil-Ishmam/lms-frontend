// import { useState } from "react";
// import { api } from "../../utils/api";
// import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  // const { login } = useAuth();
  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  // const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (form.password !== form.confirmPassword) {
  //     return setError("Passwords do not match.");
  //   }

  //   try {
  //     const data = await api("/api/signup", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name: form.name,
  //         email: form.email,
  //         password: form.password,
  //       }),
  //     });

  //     login(data.token); // Automatically log in user after sign up
  //   } catch (err) {
  //     setError(err.message || "Signup failed.");
  //   }
  // };

  return (
    <div className="bg-white text-black shadow-lg rounded-xl w-full max-w-md p-10 border border-black">
      <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide">
        Sign Up
      </h2>

      {/* onSubmit={handleSubmit}  */}
      <form className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            // value={form.name}
            // onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-black rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            // value={form.email}
            // onChange={handleChange}
            required
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-black rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            // value={form.password}
            // onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-black rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            // value={form.confirmPassword}
            // onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-black rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Error Message */}
        {/* {error && <p className="text-red-600 text-sm -mt-3">{error}</p>} */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-200"
        >
          Create Account
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}
