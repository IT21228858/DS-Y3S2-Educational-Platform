import { z } from "zod";
//
const courseCreateSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10),
  image: z.string().url(),
  price: z.number().int(),
  lessons: z
    .array(
      z.object({
        lectureNotes: z.string(),
        video: z.string().url(),
        quizQuestion: z.string().optional(),
        quizOptions: z.array(z.string()).optional(),
        quizAnswer: z.number().optional(),
      })
    )
    .optional(),
});
//
export default courseCreateSchema;
