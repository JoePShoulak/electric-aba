const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    stats: {
      points: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      rebounds: { type: Number, default: 0 },
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Reference to Team
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
