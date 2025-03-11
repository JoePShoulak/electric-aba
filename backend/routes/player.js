import express from "express";
import Player from "../models/Player.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

// Get all players
router.get("/all", handleExceptions, async (req, res) => {
  try {
    const players = await Player.find().populate("user"); // Populate the user reference
    res.status(200).json(players); // Return the list of players
  } catch (error) {
    res.status(500).json({ message: "Error fetching players." });
  }
});

router.get("/owned", handleExceptions, userAuth, async (req, res) => {
  try {
    const players = await Player.find({ user: req.userId }).populate("user"); // Filter players by userId
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players." });
  }
});

// Get single player by ID
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("user"); // Populate user reference
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player." });
  }
});

// Delete a player
router.delete("/:id", handleExceptions, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id); // Use req.params.id
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    await Player.findByIdAndDelete(req.params.id); // Use req.params.id
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player." });
  }
});

// Create a new player
router.post("/", handleExceptions, userAuth, async (req, res) => {
  try {
    const { name, position, stats } = req.body;

    const newPlayer = new Player({
      name,
      position,
      stats,
      user: req.userId, // Associate the player with the logged-in user
    });
    await newPlayer.save();
    res.status(201).json(newPlayer); // Return the newly created player
  } catch (error) {
    res.status(500).json({ message: "Error creating player." });
  }
});

// Update player details
router.put("/:id", handleExceptions, async (req, res) => {
  try {
    const { name, position, stats } = req.body;

    const player = await Player.findById(req.params.id); // Use req.params.id

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    player.name = name || player.name;
    player.position = position || player.position;
    player.stats = stats || player.stats;

    await player.save();
    res.status(200).json(player); // Return the updated player
  } catch (error) {
    res.status(500).json({ message: "Error updating player." });
  }
});

export default router;
