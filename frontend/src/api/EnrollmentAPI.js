import api from "./api";

class EnrollmentAPI {
  // Create Enrollment
  static createEnrollment(id) {
    return api.post("/api/enrollment", { courseId: id });
  }

  // Get Enrollments By Learner
  static getEnrollmentsByLearner() {
    return api.get("/api/enrollment/learner");
  }

  // Get Enrollments By Course
  static getEnrollmentsByCourse(courseId) {
    return api.get(`/api/enrollment/course/${courseId}`);
  }

  // Get Enrollment By Id
  static getEnrollmentById(id) {
    return api.get(`/api/enrollment/${id}`);
  }

  // Unenroll
  static unenroll(courseId) {
    return api.delete(`/api/enrollment/${courseId}`);
  }

  // Complete Lesson
  static completeLesson({ id, lessonId }) {
    return api.patch(`/api/enrollment/${id}/complete/${lessonId}`);
  }

  // Incomplete Lesson
  static incompleteLesson({ id, lessonId }) {
    return api.patch(`/api/enrollment/${id}/incomplete/${lessonId}`);
  }
}

export default EnrollmentAPI;
