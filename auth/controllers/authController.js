import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import userSignupSchema from "../validations/userSignup.validation.js";
import USER_ROLES from "../constants/roles.js";

const authController = {
  learnerSignup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const role = USER_ROLES.LEARNER;

      // validate request body
      userSignupSchema.parse(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        message: "Learner registered successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  courseInstructorSignup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const role = USER_ROLES.COURSE_INSTRUCTOR;

      // validate request body
      userSignupSchema.parse(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        message: "Course instructor registered successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // if user status is INACTIVE return error
      if (user.status === "INACTIVE") {
        return res.status(401).json({
          success: false,
          message: "User is inactive",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          // expiresIn: "1h",
        }
      );

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        message: "Logged in successfully",
      });
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

export default authController;
