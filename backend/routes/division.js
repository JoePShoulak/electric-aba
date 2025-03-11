import express from "express";
import Division from "../models/Division.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

router.get("/all", handleExceptions, async (req, res) => {
  const divs = await Division.find(); // Fetch all users from the database
  res.status(200).json(divs); // Return the list of users
});

router.get("/:id", handleExceptions, async (req, res) => {
  const div = await Division.findById(req.params.id);
  if (!div) {
    return res.status(404).json({ message: "Division not found" });
  }

  res.status(200).json(div);
});

router.delete("/:id", handleExceptions, async (req, res) => {
  const div = await Division.findById(req.teamId); // Find the user by their ID
  if (!div) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete the user from the database
  await Division.findByIdAndDelete(req.teamId);

  res.status(200).json({ message: "Division deleted successfully" });
});

router.post("/", handleExceptions, userAuth, async (req, res) => {
  const newTeam = new Division({
    ...req.body,
    user: req.userId,
  });

  await newTeam.save();

  res.status(200).json(newTeam);
});

router.put("/:id", handleExceptions, async (req, res) => {
  const { name, players } = req.body;

  const div = await Division.findById(req.teamId);

  // { ...obj, name, players}

  div.name = name || div.name;
  div.players = players || div.players;
  await div.save();

  res.status(200).json(div);
});

export default router;
