import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedLessons: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Enrollment", enrollmentSchema);
