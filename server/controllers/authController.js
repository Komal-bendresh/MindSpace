const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User and Sign up
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400)
      .json({
         message: "All fields are required" 
        });
    }

    const userExists = await User.findOne({ email });
    if (userExists){ 
        return res.status(400)
        .json({ 
            message: "User already exists"
         });}

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);

    res.cookie("token", token ,{
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).
    json({
        message:"User registered successfully",
        user:{
            name:user.name,
            _id : user._id,
            email : user.email
        }
  })

    } catch (error) {
        console.error("Register error:", error.message);
       res.status(500)
       .json({ 
        message: "Error occured while registering user"
     });
    }
    
}

//Login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "error while login user" });
  }
};

const verifyOtp = async (req, res) => {
  // your OTP verification logic
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
};