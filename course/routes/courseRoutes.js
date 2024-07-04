import express from "express";
import courseController from "../controllers/courseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import USER_ROLES from "../constants/roles.js";

const router = express.Router();

router.get(
  "/",
  // !This is for guest users to view courses
  // authMiddleware([
  //   USER_ROLES.SYSTEM_ADMIN,
  //   USER_ROLES.COURSE_INSTRUCTOR,
  //   USER_ROLES.LEARNER,
  // ]),
  courseController.getCourses
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.SYSTEM_ADMIN]),
  courseController.getCourseCount
);
router.get(
  "/instructor/:instructorId",
  authMiddleware([
    USER_ROLES.SYSTEM_ADMIN,
    USER_ROLES.COURSE_INSTRUCTOR,
    USER_ROLES.LEARNER,
  ]),
  courseController.getCoursesByInstructor
);
router.get(
  "/:id",
  authMiddleware([
    USER_ROLES.SYSTEM_ADMIN,
    USER_ROLES.COURSE_INSTRUCTOR,
    USER_ROLES.LEARNER,
  ]),
  courseController.getCourseById
);
router.post(
  "/",
  authMiddleware([USER_ROLES.COURSE_INSTRUCTOR]),
  courseController.createCourse
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.COURSE_INSTRUCTOR, USER_ROLES.SYSTEM_ADMIN]),
  courseController.updateCourse
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.COURSE_INSTRUCTOR, USER_ROLES.SYSTEM_ADMIN]),
  courseController.deleteCourse
);
router.post(
  "/:id/lesson",
  authMiddleware([USER_ROLES.COURSE_INSTRUCTOR]),
  courseController.addLesson
);
router.delete(
  "/:id/lesson/:lessonId",
  authMiddleware([USER_ROLES.COURSE_INSTRUCTOR]),
  courseController.deleteLesson
);

export default router;
