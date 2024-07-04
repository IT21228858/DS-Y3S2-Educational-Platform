import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    lectureNotes: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    // optional
    quizQuestion: {
      type: String,
    },
    quizOptions: {
      type: [String],
    },
    quizAnswer: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected"],
    },
    // optional
    lessons: [lessonSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);
