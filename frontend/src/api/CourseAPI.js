import api from "./api";

class CourseAPI {
  // Get All Courses
  static getAllCourses(status = "") {
    return api.get(`/api/course?status=${status}`);
  }

  // Get Course Count
  static getCourseCount() {
    return api.get("/api/course/count");
  }

  // Get Courses By Instructor
  static getCoursesByInstructor(instructorId) {
    return api.get(`/api/course/instructor/${instructorId}`);
  }

  // Get Course By Id
  static getCourseById(id) {
    return api.get(`/api/course/${id}`);
  }

  // Create Course
  static createCourse(data) {
    return api.post("/api/course", data);
  }

  // Update Course
  static updateCourse({ id, data }) {
    return api.patch(`/api/course/${id}`, data);
  }

  // Delete Course
  static deleteCourse(id) {
    return api.delete(`/api/course/${id}`);
  }

  // Add Lesson
  static addLesson({ id, data }) {
    return api.post(`/api/course/${id}/lesson`, data);
  }

  // Delete Lesson
  static deleteLesson({ id, lessonId }) {
    return api.delete(`/api/course/${id}/lesson/${lessonId}`);
  }
}

export default CourseAPI;
