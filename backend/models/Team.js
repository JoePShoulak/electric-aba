import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Reference to Player
    // Implement city, and other stuff
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
