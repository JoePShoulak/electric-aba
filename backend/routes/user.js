const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

// Router setup
const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Get all users (add this route in your user.js route file)
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.status(200).json(users); // Return the list of users
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/profile: Fetch the profile of the logged-in user
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Fetch the user by ID from the token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return user data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sign Up Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      token, // Send token to the client
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token, // Send token to the client
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit Account Route (protected)
router.put("/edit", authMiddleware, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Find the user by ID (from the decoded JWT)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username and email if provided
    if (username) user.username = username;
    if (email) user.email = email;

    // If password is provided, hash it and update
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Account Route (protected)
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.remove();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
