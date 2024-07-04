import { z } from "zod";
//
const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
//
export default userSignupSchema;
