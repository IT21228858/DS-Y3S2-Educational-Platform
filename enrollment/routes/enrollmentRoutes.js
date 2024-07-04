import express from "express";
import enrollmentController from "../controllers/enrollmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import USER_ROLES from "../constants/roles.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware([USER_ROLES.LEARNER]),
  enrollmentController.createEnrollment
);
router.get(
  "/learner",
  authMiddleware([USER_ROLES.LEARNER]),
  enrollmentController.getEnrollmentsByLearner
);
router.get(
  "/course/:courseId",
  authMiddleware([USER_ROLES.COURSE_INSTRUCTOR]),
  enrollmentController.getEnrollmentsByCourse
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.LEARNER, USER_ROLES.COURSE_INSTRUCTOR]),
  enrollmentController.getEnrollmentById
);
router.delete(
  "/:courseId",
  authMiddleware([USER_ROLES.LEARNER, USER_ROLES.COURSE_INSTRUCTOR]),
  enrollmentController.unenroll
);
router.patch(
  "/:id/complete/:lessonId",
  authMiddleware([USER_ROLES.LEARNER]),
  enrollmentController.completeLesson
);
router.patch(
  "/:id/incomplete/:lessonId",
  authMiddleware([USER_ROLES.LEARNER]),
  enrollmentController.incompleteLesson
);

export default router;
