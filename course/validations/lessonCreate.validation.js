import { z } from "zod";
//
const lessonCreateSchema = z.object({
  lectureNotes: z.string(),
  video: z.string().url(),
  quizQuestion: z.string().optional(),
  quizOptions: z.array(z.string()).optional(),
  quizAnswer: z.number().optional(),
});
//
export default lessonCreateSchema;
