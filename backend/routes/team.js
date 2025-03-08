const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const { handleExceptions } = require("middleware.js");

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
  const team = await Team.findById(req.teamId); // Find the user by their ID
  if (!team) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete the user from the database
  await Team.findByIdAndDelete(req.teamId);

  res.status(200).json({ message: "Team deleted successfully" });
});

router.post("/:id", handleExceptions, async (req, res) => {});

router.put("/:id", handleExceptions, async (req, res) => {});
