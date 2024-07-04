import express from "express";
import paymentController from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import USER_ROLES from "../constants/roles.js";

const router = express.Router();

router.post(
  "/create-payment-intent",
  authMiddleware([USER_ROLES.LEARNER]),
  paymentController.createPaymentIntent
);

export default router;
