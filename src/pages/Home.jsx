import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://lms-backend-xpwc.onrender.com/api/courses/"
        );
        const data = await res.json();
        console.log("📦 Courses API Response:", data);

        // Handle paginated or plain list
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.results)) {
          setCourses(data.results);
        } else {
          setCourses([]); // fallback to empty
        }
      } catch (error) {
        console.error("❌ Failed to load courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // Search filter (only if courses is an array)
  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) =>
        course.title?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎓 Explore Our Courses
      </h1>

      {/* Search input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-600">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {course.description?.slice(0, 80)}...
              </p>
              <div className="text-sm text-gray-800">
                <p>
                  <span className="font-medium">Instructor:</span>{" "}
                  {course.instructor || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {typeof course.category === "object"
                    ? course.category?.title
                    : course.category || "General"}
                </p>
                <p>
                  <span className="font-medium">Price:</span>{" "}
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
