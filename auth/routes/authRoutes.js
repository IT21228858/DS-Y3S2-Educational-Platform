import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/learner/signup", authController.learnerSignup);
router.post("/course-instructor/signup", authController.courseInstructorSignup);
router.post("/login", authController.login);

export default router;
