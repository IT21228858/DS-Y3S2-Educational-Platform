import api from "./api";

class UserAPI {
  // Get All Users
  static getAllUsers(role = "") {
    return api.get(`/api/user?role=${role}`);
  }

  // Get Current User
  static getCurrentUser() {
    return api.get("/api/user/me");
  }

  // Get User Count
  static getUserCount(role = "") {
    return api.get(`/api/user/count?role=${role}`);
  }

  // Get User By Id
  static getUserById(id) {
    return api.get(`/api/user/${id}`);
  }

  // Update User
  static updateUser({ id, data }) {
    return api.patch(`/api/user/${id}`, data);
  }

  // Delete User
  static deleteUser(id) {
    return api.delete(`/api/user/${id}`);
  }
}

export default UserAPI;
