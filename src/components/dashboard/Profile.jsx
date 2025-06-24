import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const role = user.role || "student"; // fallback default
        const endpoint =
          role === "teacher"
            ? "/user/profile/teacher/"
            : "/user/profile/student/";
        const data = await api(endpoint);
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-2xl mx-auto border border-black p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center uppercase">
          User Profile
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        {!profile ? (
          <p className="text-center">Loading profile...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Name:</span> {profile.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {profile.email}
            </div>
            <div>
              <span className="font-semibold">Role:</span> {user.role}
            </div>
            {/* Optional additional info */}
            {profile.bio && (
              <div>
                <span className="font-semibold">Bio:</span> {profile.bio}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
