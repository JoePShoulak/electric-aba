import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    first: { type: String, required: true },
    last: { type: String, required: true },
    nickname: { type: String, required: false },
    position: { type: String, required: true },
    born: { type: Number, required: true },
    college: { type: String, required: true },
    stock: { type: Boolean, default: false, required: true },
    year_signed: { type: Number, required: true },
    years: { type: Number, required: true },
    ppg: { type: Number, default: 0, required: true },
    apg: { type: Number, default: 0, required: true },
    rpg: { type: Number, default: 0, required: true },
    fgpg: { type: Number, default: 0, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;
