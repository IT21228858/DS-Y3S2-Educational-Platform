import api from "./api";

class AuthAPI {
  // User Login
  static login(credentials) {
    return api.post("/api/auth/login", credentials);
  }

  // Learner Signup
  static learnerSignup(data) {
    return api.post("/api/auth/learner/signup", data);
  }

  // Course Instructor Signup
  static courseInstructorSignup(data) {
    return api.post("/api/auth/course-instructor/signup", data);
  }
}

export default AuthAPI;
