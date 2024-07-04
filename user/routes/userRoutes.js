import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import USER_ROLES from "../constants/roles.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware([USER_ROLES.SYSTEM_ADMIN]),
  userController.getUsers
);
router.get(
  "/me",
  authMiddleware([
    USER_ROLES.SYSTEM_ADMIN,
    USER_ROLES.COURSE_INSTRUCTOR,
    USER_ROLES.LEARNER,
  ]),
  userController.getCurrentUser
);
router.get(
  "/count",
  authMiddleware([USER_ROLES.SYSTEM_ADMIN]),
  userController.getUserCount
);
router.get(
  "/:id",
  authMiddleware([USER_ROLES.SYSTEM_ADMIN]),
  userController.getUserById
);
router.patch(
  "/:id",
  authMiddleware([USER_ROLES.SYSTEM_ADMIN]),
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware([USER_ROLES.SYSTEM_ADMIN]),
  userController.deleteUser
);

export default router;
