const enrollmentConfirmationEmailTemplate = ({ userName, courseName }) => `
<!DOCTYPE html>
<html>
<head>
    <title>Enrollment Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .confirmation { color: #333366; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="confirmation">Congratulations, ${userName}!</h1>
        <p>Hi ${userName},</p>
        <p>We're thrilled to inform you that you have successfully enrolled in the course "${courseName}".</p>
        <p>This course will provide you with valuable knowledge and skills.</p>
        <p>If you have any questions or need assistance during your learning journey, please don't hesitate to contact us.</p>
        <br />
        <p>Thank you for choosing us,</p>
        <p>The Educational Platform Team</p>
    </div>
</body>
</html>
`;

export default enrollmentConfirmationEmailTemplate;
