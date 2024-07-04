import dotenv from "dotenv";
dotenv.config();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
import Stripe from "stripe";
import createPaymentIntentSchema from "../validations/createPaymentIntent.validation.js";
const stripe = new Stripe(STRIPE_SECRET_KEY);
//
const paymentController = {
  // Create a payment intent
  createPaymentIntent: async (req, res) => {
    const { amount, currency } = req.body;
    //
    try {
      createPaymentIntentSchema.safeParse({ amount, currency });
      //
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
      res
        .status(200)
        .json({ success: true, client_secret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating the payment intent",
      });
    }
  },
};

export default paymentController;
