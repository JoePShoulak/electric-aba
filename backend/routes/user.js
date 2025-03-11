import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Use `import` in ES Module mode
import User from "../models/User.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

const genToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Get all users route
router.get("/all", handleExceptions, async (_req, res) => {
  const users = await User.find(); // Fetch all users from the database

  res.status(200).json(users); // Return the list of users
});

// Delete user route
router.delete("/delete", handleExceptions, userAuth, async (req, res) => {
  const user = await User.findById(req.userId); // Find the user by their ID
  if (!user) return res.status(404).json({ message: "User not found" });

  await User.findByIdAndDelete(req.userId);

  res.status(200).json({ message: "User deleted successfully" });
});

// Signup route
router.post("/signup", handleExceptions, async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Please provide all fields" });

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = genToken(newUser._id);

  res.status(201).json({ token }); // Return the token after successful signup
});

// Login route
router.post("/login", handleExceptions, async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Compare the password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token
  const token = genToken(user._id);

  res.status(200).json({ token }); // Return the token after successful login
});

// Get user profile by ID (public route)
router.get("/profile/:id", handleExceptions, async (req, res) => {
  const user = await User.findById(req.params.id); // Get user by ID from URL params
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user); // Return user data
});

// Update user profile (only logged-in user can update their profile)
router.put("/profile", handleExceptions, userAuth, async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.userId); // Get user by token-provided ID
  if (!user) return res.status(404).json({ message: "User not found" });

  // Update user details
  user.username = username || user.username;
  user.email = email || user.email;

  await user.save(); // Save the updated user details

  res.status(200).json(user); // Return the updated user data
});

// Get the logged-in user's profile
router.get("/profile", handleExceptions, userAuth, async (req, res) => {
  const user = await User.findById(req.userId); // Find user by ID from token
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user); // Send user data back as response
});

export default router;
