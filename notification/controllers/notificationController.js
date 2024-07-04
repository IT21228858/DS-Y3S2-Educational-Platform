import sendEmail from "../util/sendEmail.js";
import enrollmentConfirmationEmailTemplate from "../util/email_templates/enrollmentConfirmationEmailTemplate.js";
//
const notificationController = {
  emailSend: async (req, res) => {
    try {
      const { email, subject, template, data } = req.body;
      // template selection
      let emailTemplate;
      switch (template) {
        case "enrollmentConfirmation":
          emailTemplate = enrollmentConfirmationEmailTemplate(data);
          break;
        default:
          emailTemplate = `<h1>This is a default email template</h1>`;
      }
      //
      sendEmail(email, subject, emailTemplate);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
//
export default notificationController;
