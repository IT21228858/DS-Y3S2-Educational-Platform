import { z } from "zod";
//
const createPaymentIntentSchema = z.object({
  amount: z.number().int().positive(),
  currency: z.string(),
});
//
export default createPaymentIntentSchema;
