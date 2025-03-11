import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    stats: {
      points: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      rebounds: { type: Number, default: 0 },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
