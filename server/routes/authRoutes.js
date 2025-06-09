const express = require("express");
const router = express.Router();

// Import controller functions
const {registerUser, loginUser, verifyOtp } = require('../controllers/authController');
const { resendOtp } = require("../controllers/authController");

// Routes
router.post('/signup',registerUser)
router.post('/login', loginUser);        // Step 1: Login & send OTP
router.post('/verify-otp', verifyOtp);   // Step 2: Verify OTP & complete login
router.post("/resend-otp", resendOtp);



module.exports = router;