const express = require("express");
const router = express.Router();

// Import controller functions
const {registerUser, loginUser, verifyOtp ,resendOtp ,logoutUser,unSubscribe} = require('../controllers/authController');


// Routes
router.post('/signup',registerUser)
router.post('/login', loginUser);        // Step 1: Login & send OTP
router.post('/verify-otp', verifyOtp);   // Step 2: Verify OTP & complete login
router.post("/resend-otp", resendOtp);
router.post('/logout', logoutUser);

router.get('/unsubscribe/:userId',unSubscribe )
module.exports = router;