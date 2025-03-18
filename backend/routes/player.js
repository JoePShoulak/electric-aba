import express from "express";
import Player from "../models/Player.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

router.get("/all", handleExceptions, userAuth, async (req, res) => {
  try {
    const players = await Player.find({
      $or: [{ stock: true }, { user: req.userId }],
    }).populate("user");
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Error fetching players." });
  }
});

// Get single player by ID
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("user");
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
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    await Player.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting player." });
  }
});

// Create a new player
router.post("/", handleExceptions, userAuth, async (req, res) => {
  try {
    const {
      first,
      last,
      nickname,
      position,
      born,
      college,
      stock,
      year_signed,
      years,
      ppg,
      apg,
      rpg,
      fgpg,
    } = req.body;

    const newPlayer = new Player({
      first,
      last,
      nickname,
      position,
      born,
      college,
      stock,
      year_signed,
      years,
      ppg,
      apg,
      rpg,
      fgpg,
      user: req.userId,
    });

    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ message: "Error creating player." });
  }
});

// Update player details (FIXED!)
router.put("/:id", handleExceptions, userAuth, async (req, res) => {
  try {
    const {
      first,
      last,
      nickname,
      position,
      born,
      college,
      stock,
      year_signed,
      years,
      ppg,
      apg,
      rpg,
      fgpg,
    } = req.body;

    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    // Retain the existing user field if not provided in the request
    const updatedPlayer = {
      first: first ?? player.first,
      last: last ?? player.last,
      nickname: nickname ?? player.nickname,
      position: position ?? player.position,
      born: born ?? player.born,
      college: college ?? player.college,
      stock: stock ?? player.stock,
      year_signed: year_signed ?? player.year_signed,
      years: years ?? player.years,
      ppg: ppg ?? player.ppg,
      apg: apg ?? player.apg,
      rpg: rpg ?? player.rpg,
      fgpg: fgpg ?? player.fgpg,
      user: player.user, // Ensure user remains unchanged
    };

    // Use findOneAndUpdate to avoid validation errors
    const updated = await Player.findByIdAndUpdate(
      req.params.id,
      updatedPlayer,
      {
        new: true,
        runValidators: true, // Ensures validation is applied
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ message: "Error updating player.", error });
  }
});

export default router;
