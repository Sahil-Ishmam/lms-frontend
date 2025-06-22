import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Pages
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

// Main Pages
import Dashboard from "./pages/Dashboard";
import CourseList from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";

// Auth utils
import { getToken } from "./utils/auth";
import Home from "./pages/Home";

const App = () => {
  const isAuthenticated = !!getToken(); // Check if token exists

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses"
            element={
              isAuthenticated ? <CourseList /> : <Navigate to="/login" />
            }
          />


          <Route
            path="/courses/:id"
            element={
              isAuthenticated ? <CourseDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
