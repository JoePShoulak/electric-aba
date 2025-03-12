import express from "express";
import League from "../models/League.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

// Get all leagues created by the logged-in user
router.get("/all", handleExceptions, userAuth, async (req, res) => {
  try {
    const leagues = await League.find({ user: req.userId }); // Fetch leagues for the current user
    res.status(200).json(leagues); // Return the leagues
  } catch (error) {
    res.status(500).json({ message: "Error fetching leagues." });
  }
});

// Get single league by ID (this can be accessed by any user if they know the ID)
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const league = await League.findById(req.params.id).populate("user");
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: "Error fetching league." });
  }
});

// Create a new league (only accessible by authenticated users)
router.post("/", handleExceptions, userAuth, async (req, res) => {
  try {
    const { name, divCap, divs } = req.body;

    const newLeague = new League({
      name,
      divCap,
      divs,
      user: req.userId, // Set the user as the creator of the league
    });

    await newLeague.save();
    res.status(201).json(newLeague);
  } catch (error) {
    res.status(500).json({ message: "Error creating league." });
  }
});

export default router;
