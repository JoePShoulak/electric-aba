import express from "express";
import Division from "../models/Division.js";
import { userAuth, handleExceptions } from "./middleware.js";

const router = express.Router();

// Get all divisions for the logged-in user
router.get("/all", handleExceptions, userAuth, async (req, res) => {
  try {
    const divisions = await Division.find({ user: req.userId }); // Only fetch divisions created by the logged-in user
    res.status(200).json(divisions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching divisions." });
  }
});

// Get a single division by ID
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const division = await Division.findById(req.params.id).populate("teams");
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json(division);
  } catch (error) {
    res.status(500).json({ message: "Error fetching division." });
  }
});

// Create a new division
router.post("/", handleExceptions, userAuth, async (req, res) => {
  const { name, teamCap } = req.body;

  const newDivision = new Division({
    name,
    teamCap,
    user: req.userId, // Associate the division with the logged-in user
  });

  try {
    await newDivision.save();
    res.status(201).json(newDivision);
  } catch (error) {
    res.status(500).json({ message: "Error creating division." });
  }
});

// Update division details
router.put("/:id", handleExceptions, async (req, res) => {
  try {
    const division = await Division.findById(req.params.id);
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }

    const { name, teamCap } = req.body;
    division.name = name || division.name;
    division.teamCap = teamCap || division.teamCap;

    await division.save();
    res.status(200).json(division);
  } catch (error) {
    res.status(500).json({ message: "Error updating division." });
  }
});

// Delete a division
router.delete("/:id", handleExceptions, async (req, res) => {
  try {
    const division = await Division.findById(req.params.id);
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }

    await Division.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Division deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting division." });
  }
});

export default router;
