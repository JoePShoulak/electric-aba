import express from "express";
import Player from "../models/Player.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

router.get("/all", handleExceptions, async (req, res) => {
  const players = await Player.find(); // Fetch all users from the database
  res.status(200).json(divs); // Return the list of users
});

router.get("/:id", handleExceptions, async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) {
    return res.status(404).json({ message: "Player not found" });
  }

  res.status(200).json(player);
});

router.delete("/:id", handleExceptions, async (req, res) => {
  const player = await Player.findById(req.teamId); // Find the user by their ID
  if (!player) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete the user from the database
  await Player.findByIdAndDelete(req.teamId);

  res.status(200).json({ message: "Player deleted successfully" });
});

router.post("/", handleExceptions, userAuth, async (req, res) => {
  const newTeam = new Player({
    ...req.body,
    user: req.userId,
  });

  await newTeam.save();

  res.status(200).json(newTeam);
});

router.put("/:id", handleExceptions, async (req, res) => {
  const { name, players } = req.body;

  const player = await Player.findById(req.teamId);

  // { ...obj, name, players}

  player.name = name || player.name;
  player.players = players || player.players;
  await player.save();

  res.status(200).json(player);
});

export default router;
