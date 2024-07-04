import express from "express";
import notificationController from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import USER_ROLES from "../constants/roles.js";

const router = express.Router();

// emai send
router.post(
  "/send-email",
  authMiddleware([
    USER_ROLES.SYSTEM_ADMIN,
    USER_ROLES.COURSE_INSTRUCTOR,
    USER_ROLES.LEARNER,
  ]),
  notificationController.emailSend
);

export default router;
