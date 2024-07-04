import USER_ROLES from "../constants/roles.js";
import User from "../models/User.js";
//
const userController = {
  // get all users
  getUsers: async (req, res) => {
    try {
      let filter = {};
      //
      if (req.query) {
        if (req.query.role) {
          // validate role
          if (!Object.values(USER_ROLES).includes(req.query.role)) {
            return res.status(400).json({
              success: false,
              message: "Invalid role",
            });
          }
          filter.role = req.query.role;
        }
      }
      //
      const users = await User.find(filter).select("-password");
      //
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      //
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      //
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get current user
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      //
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      //
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update user
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      //
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      //
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      ).select("-password");
      //
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      //
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      //
      // let deletedUser = await User.findByIdAndDelete(req.params.id); // ! delete user from db
      // update status to INACTIVE instead of deleting
      let deleted;
      if (user.role === USER_ROLES.SYSTEM_ADMIN) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete SYSTEM_ADMIN user",
        });
      }
      //
      deleted = await User.findByIdAndUpdate(
        req.params.id,
        { status: "INACTIVE" },
        {
          new: true,
        }
      ).select("-password");
      //
      res
        .status(200)
        .json({
          success: true,
          user: deleted,
          message: "User set to INACTIVE",
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

  // get user count filtered by role
  getUserCount: async (req, res) => {
    try {
      let filter = {};
      //
      if (req.query) {
        if (req.query.role) {
          // validate role
          if (!Object.values(USER_ROLES).includes(req.query.role)) {
            return res.status(400).json({
              success: false,
              message: "Invalid role",
            });
          }
          filter.role = req.query.role;
        }
      }
      //
      const count = await User.countDocuments(filter);
      //
      res.status(200).json({ success: true, count, role: filter.role });
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
