import express from "express";
import League from "../models/League.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

router.get("/all", handleExceptions, async (req, res) => {
  const leagues = await League.find(); // Fetch all users from the database
  res.status(200).json(divs); // Return the list of users
});

router.get("/:id", handleExceptions, async (req, res) => {
  const league = await League.findById(req.params.id);
  if (!league) {
    return res.status(404).json({ message: "League not found" });
  }

  res.status(200).json(league);
});

router.delete("/:id", handleExceptions, async (req, res) => {
  const league = await League.findById(req.teamId); // Find the user by their ID
  if (!league) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete the user from the database
  await League.findByIdAndDelete(req.teamId);

  res.status(200).json({ message: "League deleted successfully" });
});

router.post("/", handleExceptions, userAuth, async (req, res) => {
  const newTeam = new League({
    ...req.body,
    user: req.userId,
  });

  await newTeam.save();

  res.status(200).json(newTeam);
});

router.put("/:id", handleExceptions, async (req, res) => {
  const { name, players } = req.body;

  const league = await League.findById(req.teamId);

  // { ...obj, name, players}

  league.name = name || league.name;
  league.players = players || league.players;
  await league.save();

  res.status(200).json(league);
});

export default router;
