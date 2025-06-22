import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ✅ Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://lms-backend-xpwc.onrender.com/api/courses/"
        );
        const data = await res.json();
        console.log("Courses API response:", data);
        setCourses(data.results || []); // ✅ Use data.results if paginated
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://lms-backend-xpwc.onrender.com/api/categories/"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchSearch = course.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🎓 All Courses</h1>

      {/* Search + Category filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <input
          type="text"
          placeholder="Search by course title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered courses */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-600">
          No courses match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="p-4 bg-white border border-gray-200 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {course.description?.slice(0, 80)}...
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-medium">Instructor:</span>{" "}
                {course.instructor}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Category:</span> {course.category}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
