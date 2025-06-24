export const API_BASE_URL = 'http://lms-backend-xpwc.onrender.com/api';

export const API_ENDPOINTS = {
  AUTH: '/user/auth/',
  FORGOT_PASSWORD: '/user/forget-password/',
  RESET_PASSWORD: (uidb64, token) => `/user/reset-password/${uidb64}/${token}`,
  STUDENT_PROFILE: '/user/profile/student/',
  TEACHER_PROFILE: '/user/profile/teacher/',
};

export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
};


