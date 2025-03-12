import express from "express";
import League from "../models/League.js";
import { userAuth, handleExceptions } from "./middleware.js";
import Season from "../models/Season.js";

const router = express.Router();

// Get all leagues created by the logged-in user
router.get("/all", handleExceptions, userAuth, async (req, res) => {
  try {
    const leagues = await League.find({ user: req.userId }).populate("seasons");
    res.status(200).json(leagues);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leagues.", error: error.message });
  }
});

router.post("/:id/season", handleExceptions, userAuth, async (req, res) => {
  try {
    const { league, year } = req.body;

    const newSeason = new Season({
      league,
      year: year,
      complete: false,
      games: [],
    });

    await newSeason.save();
    await League.findByIdAndUpdate(league, {
      $push: { seasons: newSeason._id },
    });
    res.status(201).json(newSeason);
  } catch (error) {
    res.status(500).json({ message: "Error creating season." });
  }
});

// Get single league by ID (this can be accessed by any user if they know the ID)
router.get("/seasons/:id", handleExceptions, async (req, res) => {
  try {
    const season = await Season.findById(req.params.id).populate("league");
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json(season);
  } catch (error) {
    res.status(500).json({ message: "Error fetching season." });
  }
});

// Get single league by ID (this can be accessed by any user if they know the ID)
router.get("/:id", handleExceptions, async (req, res) => {
  try {
    const league = await League.findById(req.params.id)
      .populate("user")
      .populate("seasons");
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: "Error fetching league." });
  }
});

// Create a new league (only accessible by authenticated users)
router.post("/", handleExceptions, userAuth, async (req, res) => {
  try {
    const {
      name,
      divCap,
      divs,
      foundingYear, // Include foundingYear
      gamesPerSet, // Include gamesPerSet
      monthBegin, // Include monthBegin
      monthEnd, // Include monthEnd
    } = req.body;

    // Create a new League with the required fields
    const newLeague = new League({
      name,
      divCap,
      divs,
      foundingYear, // Set foundingYear
      gamesPerSet, // Set gamesPerSet
      monthBegin, // Set monthBegin
      monthEnd, // Set monthEnd
      user: req.userId, // Set the user as the creator of the league
    });

    await newLeague.save();
    res.status(201).json(newLeague); // Return the newly created league
  } catch (error) {
    res.status(500).json({ message: "Error creating league." });
  }
});

// Delete a league (only accessible by the user who created it)
router.delete("/:id", handleExceptions, userAuth, async (req, res) => {
  try {
    // Check if the league exists and if the user is the one who created it
    const league = await League.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!league) {
      return res.status(404).json({
        message: "League not found or you are not authorized to delete it.",
      });
    }

    // Delete the league and its related data (seasons, divisions, etc.)
    await League.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "League deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting league.", error: error.message });
  }
});

export default router;
