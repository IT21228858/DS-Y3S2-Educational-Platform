import api from "./api";

class NotificationAPI {
  // Send Email Notification
  static emailSend(data) {
    return api.post(`/api/notification/send-email`, data);
  }
}

export default NotificationAPI;
