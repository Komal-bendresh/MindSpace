// utils/sendOtpEmail.js
const transporter = require("./mailer");

const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"MindSpace" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP for verification",
      html: `
        <h2>Welcome to MindSpace!</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });
    console.log("OTP email sent successfully.");
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
  }
};

module.exports = sendOtpEmail;
