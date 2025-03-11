import express from "express";
import Team from "../models/Team.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

router.get("/all", handleExceptions, async (req, res) => {
  const teams = await Team.find(); // Fetch all users from the database
  res.status(200).json(teams); // Return the list of users
});

router.get("/:id", handleExceptions, async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  res.status(200).json(team);
});

router.delete("/:id", handleExceptions, async (req, res) => {
  const team = await Team.findById(req.teamId); // Find the team by their ID
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  // Delete the user from the database
  await Team.findByIdAndDelete(req.teamId);

  res.status(200).json({ message: "Team deleted successfully" });
});

router.post("/", handleExceptions, userAuth, async (req, res) => {
  const newTeam = new Team({
    ...req.body,
    user: req.userId,
  });

  await newTeam.save();

  res.status(200).json(newTeam);
});

router.put("/:id", handleExceptions, async (req, res) => {
  const { name, players } = req.body;

  const team = await Team.findById(req.teamId);

  // { ...obj, name, players}

  team.name = name || team.name;
  team.players = players || team.players;
  await team.save();

  res.status(200).json(team);
});

export default router;
