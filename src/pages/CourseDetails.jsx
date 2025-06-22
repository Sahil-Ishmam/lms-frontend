import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = "https://lms-backend-xpwc.onrender.com/api";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, lessonsRes, materialsRes] = await Promise.all([
          fetch(`${BASE_URL}/courses/${id}/`),
          fetch(`${BASE_URL}/lessons/`),
          fetch(`${BASE_URL}/materials/`),
        ]);

        const courseData = await courseRes.json();
        const allLessons = await lessonsRes.json();
        const allMaterials = await materialsRes.json();

        const lessonArray = Array.isArray(allLessons)
          ? allLessons
          : Array.isArray(allLessons.results)
          ? allLessons.results
          : [];

        const materialArray = Array.isArray(allMaterials)
          ? allMaterials
          : Array.isArray(allMaterials.results)
          ? allMaterials.results
          : [];

        const courseLessons = lessonArray.filter(
          (lesson) => lesson.course === parseInt(id)
        );

        const courseMaterials = materialArray.filter(
          (material) => material.course === parseInt(id)
        );

        setCourse(courseData);
        setLessons(courseLessons);
        setMaterials(courseMaterials);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching course data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!course) return <div className="text-center py-10">Course not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      {/* Header */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{course.title}</h1>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Instructor:</span> {course.instructor || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Category:</span>{" "}
          {typeof course.category === "object" ? course.category.title : course.category}
        </p>
        <p className="text-gray-700 mt-3">{course.description}</p>
      </div>

      {/* Lessons */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">📚 Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-gray-600">No lessons available.</p>
        ) : (
          <ul className="space-y-3">
            {lessons.map((lesson) => (
              <li key={lesson.id} className="border rounded p-3 bg-gray-50">
                <h3 className="text-lg font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-700">{lesson.description}</p>
                {lesson.video && (
                  <video controls className="mt-2 w-full max-w-xl rounded">
                    <source src={lesson.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Materials */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">📎 Materials</h2>
        {materials.length === 0 ? (
          <p className="text-gray-600">No materials available.</p>
        ) : (
          <ul className="space-y-3">
            {materials.map((material) => (
              <li key={material.id} className="border rounded p-3 bg-gray-50">
                <h3 className="font-medium text-blue-600">{material.title}</h3>
                <p className="text-sm text-gray-700">{material.description}</p>
                <a
                  href={material.file}
                  download
                  className="text-sm text-blue-500 underline mt-1 inline-block"
                >
                  Download ({material.file_type})
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
