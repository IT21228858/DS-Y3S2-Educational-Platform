import Enrollment from "../models/Enrollment.js";
//
const userController = {
  // create enrollment
  createEnrollment: async (req, res) => {
    try {
      const enrollment = await Enrollment.create({
        course: req.body.courseId,
        learner: req.userId,
      });
      //
      res.status(201).json({ success: true, enrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all enrollments by learner
  getEnrollmentsByLearner: async (req, res) => {
    try {
      const enrollments = await Enrollment.find({
        learner: req.userId,
      })
        .populate("course")
        .populate("learner", "-password");
      //
      res.status(200).json({ success: true, enrollments });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all enrollments by course
  getEnrollmentsByCourse: async (req, res) => {
    try {
      const enrollments = await Enrollment.find({
        course: req.params.courseId,
      })
        .populate("course")
        .populate("learner", "-password");
      //
      res.status(200).json({ success: true, enrollments });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get enrollment by id
  getEnrollmentById: async (req, res) => {
    try {
      // populate the learner field exclude the password field and course field
      const enrollment = await Enrollment.findById(req.params.id)
        .populate("learner", "-password")
        .populate("course");
      //
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }
      //
      res.status(200).json({ success: true, enrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Unenroll from a course
  unenroll: async (req, res) => {
    try {
      const enrollment = await Enrollment.findOneAndDelete({
        course: req.params.courseId,
        learner: req.userId,
      });
      //
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }
      //
      res.status(200).json({ success: true, enrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Mark lesson as completed
  completeLesson: async (req, res) => {
    try {
      const enrollment = await Enrollment.findById(req.params.id);
      //
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }
      //
      if (!enrollment.completedLessons.includes(req.params.lessonId)) {
        enrollment.completedLessons.push(req.params.lessonId);
      }
      //
      await enrollment.save();
      //
      res.status(200).json({ success: true, enrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Mark lesson as incomplete
  incompleteLesson: async (req, res) => {
    try {
      const enrollment = await Enrollment.findById(req.params.id);
      //
      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }
      //
      enrollment.completedLessons = enrollment.completedLessons.filter(
        (lessonId) => lessonId !== req.params.lessonId
      );
      //
      await enrollment.save();
      //
      res.status(200).json({ success: true, enrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};
//
export default userController;
