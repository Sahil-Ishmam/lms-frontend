import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

import Logo from "../../assets/logo.png"; // Adjust the path as necessary
// import { useState } from "react";

export default function Navbar() {
  //   const { user, logout } = useAuth();
  const navigate = useNavigate();
  //   const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    // logout();
    navigate("/login");
  };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (searchQuery.trim()) {
  //       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  //     }
  //   };

  return (
    <nav className="bg-white border-b border-black shadow-sm py-3 px-4 md:px-8 flex items-center justify-between text-black">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-8 w-auto" />
        <span className="font-semibold text-xl tracking-wide">MyLMS</span>
      </Link>

      {/* Search Bar */}
      {/* onSubmit={handleSearch} */}
      <form className="flex-1 mx-4 max-w-lg hidden sm:flex">
        <input
          type="text"
          placeholder="Search courses..."
          //   value={searchQuery}
          //   onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-1 border border-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 rounded-r-md hover:bg-white hover:text-black border border-black transition"
        >
          Search
        </button>
      </form>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 text-sm">
        <Link
          to="/courses"
          className="px-3 py-1 border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          All Courses
        </Link>

        {/* {!user ? ( */}
        <>
          <Link
            to="/login"
            className="px-3 py-1 border border-black rounded-md hover:bg-black hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 border border-black rounded-md hover:bg-black hover:text-white transition"
          >
            Signup
          </Link>
        </>
        {/* ) : ( */}
        <>
          <Link
            to="/dashboard"
            className="px-3 py-1 border border-black rounded-md hover:bg-black hover:text-white transition"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="px-3 py-1 border border-black rounded-md hover:bg-black hover:text-white transition"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1 border border-black rounded-md hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </>
        {/* )} */}
      </div>
    </nav>
  );
}
