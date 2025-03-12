import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
    required: true,
  },
  complete: { type: Boolean, default: false },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game", default: [] }],
});

const Season = mongoose.model("Season", seasonSchema);

export default Season;
