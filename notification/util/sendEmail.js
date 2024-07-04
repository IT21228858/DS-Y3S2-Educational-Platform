import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
//
const APP_PASSWORD = process.env.APP_PASSWORD;
const APP_EMAIL = process.env.APP_EMAIL;
//
// Function to send email
const sendEmail = (email, subject, emailTemplate) => {
  // Create reusable transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: APP_EMAIL,
      pass: APP_PASSWORD,
    },
  });

  // Setup email data
  let mailOptions = {
    from: `"DS Project" <${APP_EMAIL}>`, // Sender address
    to: email, // Recipient's email address
    subject: subject, // Email subject
    html: emailTemplate, // Email content in HTML
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(`Error sending email: ${error}`);
    }
    console.log(`Message sent to ${email}: %s`, info.messageId);
  });
};

export default sendEmail;
