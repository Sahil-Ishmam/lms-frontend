const BASE_URL = "https://lms-backend-xpwc.onrender.com/api";

export async function fetchWithToken(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("access");

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return res.json();
}
