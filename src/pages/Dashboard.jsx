import { useEffect, useState } from "react";
import { fetchWithToken } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch enrolled courses
  useEffect(() => {
    const fetchCourses = async () => {
      if (!getToken()) {
        navigate("/login");
        return;
      }

      try {
        const data = await fetchWithToken("enrollments/");
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Your Courses</h1>

      {loading && <p className="text-center">Loading...</p>}

      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {!loading && courses.length === 0 && (
        <p className="text-center text-gray-500">
          You are not enrolled in any courses.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {item.course.title}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Instructor:</span>{" "}
              {item.course.instructor}
            </p>
            <p className="text-sm text-green-600">
              {item.completed ? "✅ Completed" : "📖 In Progress"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
