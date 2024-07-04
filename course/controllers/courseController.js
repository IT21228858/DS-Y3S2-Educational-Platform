import Course from "../models/Course.js";
import courseCreateSchema from "../validations/courseCreate.validation.js";
import lessonCreateSchema from "../validations/lessonCreate.validation.js";
//
const userController = {
  // create course
  createCourse: async (req, res) => {
    try {
      // validate request body
      const { error } = courseCreateSchema.safeParse(req.body);
      //
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.errors[0],
        });
      }
      //
      const course = await Course.create({
        ...req.body,
        instructor: req.userId,
      });
      //
      res.status(201).json({ success: true, course });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all courses
  getCourses: async (req, res) => {
    try {
      let filter = {};
      //
      if (req.query) {
        if (req.query.status) {
          // validate status
          if (!["Pending", "Approved", "Rejected"].includes(req.query.status)) {
            return res.status(400).json({
              success: false,
              message: "Invalid status",
            });
          }
          filter.status = req.query.status;
        }
      }
      //
      let courses = await Course.find(filter).populate(
        "instructor",
        "-password"
      );
      //
      // if instructor.status is INACTIVE not select that Course
      courses = courses.filter((course) => course.instructor.status !== "INACTIVE");
      //
      res.status(200).json({ success: true, courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get course by id
  getCourseById: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate(
        "instructor",
        "-password"
      );
      //
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      //
      res.status(200).json({ success: true, course });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update course
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate(
        "instructor",
        "-password"
      );
      //
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      //
      // chnage the course status to "Pending" if the course status is "Approved"
      if (course.status === "Approved") {
        req.body.status = "Pending";
      } else if (course.status === "Rejected") {
        req.body.status = "Pending";
      }
      //
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      ).populate("instructor", "-password");
      //
      res.status(200).json({ success: true, course: updatedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete course
  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate(
        "instructor",
        "-password"
      );
      //
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      //
      let deletedCourse = await Course.findByIdAndDelete(req.params.id);
      //
      res.status(200).json({ success: true, course: deletedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get course count
  getCourseCount: async (req, res) => {
    try {
      const count = await Course.countDocuments();
      //
      res.status(200).json({ success: true, count });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get courses by instructor
  getCoursesByInstructor: async (req, res) => {
    try {
      const courses = await Course.find({
        instructor: req.params.instructorId,
      }).populate("instructor", "-password");
      //
      res.status(200).json({ success: true, courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Add lesson to course
  addLesson: async (req, res) => {
    try {
      // validate request body
      const { error } = lessonCreateSchema.safeParse(req.body);
      //
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.errors[0],
        });
      }
      //
      const course = await Course.findById(req.params.id);
      //
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      //
      course.lessons.push(req.body);
      //
      // chnage the course status to "Pending" if the course status is "Approved"
      if (course.status === "Approved") {
        course.status = "Pending";
      } else if (course.status === "Rejected") {
        course.status = "Pending";
      }
      //
      await course.save();
      //
      res.status(201).json({ success: true, course });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // Delete lesson from course
  deleteLesson: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      //
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      //
      course.lessons = course.lessons.filter(
        (lesson) => lesson._id.toString() !== req.params.lessonId
      );
      //
      await course.save();
      //
      res.status(200).json({ success: true, course });
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
