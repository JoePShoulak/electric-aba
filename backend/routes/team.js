import express from "express";
import Team from "../models/Team.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

// Get all teams
router.get("/all", handleExceptions, async (req, res) => {
  try {
    const teams = await Team.find({ user: req.userId }).populate("players"); // Populate player details
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams." });
  }
});

// Get single team by ID
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team." });
  }
});

// Create a new team
router.post("/", handleExceptions, userAuth, async (req, res) => {
  try {
    const { name, city, players } = req.body;

    // Ensure that the userId is attached from the authentication middleware
    const newTeam = new Team({
      name,
      city,
      user: req.userId, // Add the user ID from the authenticated user
      players, // Players can be passed when creating a team
    });

    await newTeam.save();
    res.status(201).json(newTeam); // Return the newly created team
  } catch (error) {
    res.status(500).json({ message: "Error creating team." });
    console.error(error);
  }
});

// Update team details
router.put("/:id", handleExceptions, async (req, res) => {
  try {
    const { name, city, players } = req.body;

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.name = name || team.name;
    team.city = city || team.city;
    team.players = players || team.players;

    await team.save();
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Error updating team." });
  }
});

// Delete team
router.delete("/:id", handleExceptions, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team." });
  }
});

export default router;
