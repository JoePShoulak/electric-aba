import express from "express";
import League from "../models/League.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

// Get all leagues
router.get("/all", handleExceptions, async (req, res) => {
  try {
    const leagues = await League.find(); // Fetch all leagues from the database
    res.status(200).json(leagues); // Return the list of leagues
  } catch (error) {
    res.status(500).json({ message: "Error fetching leagues." });
  }
});

// Get a single league by ID
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const league = await League.findById(req.params.id); // Use req.params.id to fetch the league
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: "Error fetching league details." });
  }
});

// Delete a league by ID
router.delete("/:id", handleExceptions, async (req, res) => {
  try {
    const league = await League.findById(req.params.id); // Use req.params.id
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    await League.findByIdAndDelete(req.params.id); // Use req.params.id for deletion
    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting league." });
  }
});

// Create a new league
router.post("/", handleExceptions, userAuth, async (req, res) => {
  try {
    const { name, location, description } = req.body;

    const newLeague = new League({
      name,
      location,
      description,
      user: req.userId, // Associate league with the logged-in user
    });

    await newLeague.save();
    res.status(201).json(newLeague); // Return the newly created league
  } catch (error) {
    res.status(500).json({ message: "Error creating league." });
  }
});

// Update league details
router.put("/:id", handleExceptions, async (req, res) => {
  try {
    const { name, location, description } = req.body;
    const league = await League.findById(req.params.id); // Use req.params.id

    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    league.name = name || league.name;
    league.location = location || league.location;
    league.description = description || league.description;

    await league.save();
    res.status(200).json(league); // Return the updated league data
  } catch (error) {
    res.status(500).json({ message: "Error updating league." });
  }
});

export default router;
