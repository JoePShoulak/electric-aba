import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    stats: [
      {
        player: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Player",
          required: true,
        },
        points: { type: Number, default: 0 },
        assists: { type: Number, default: 0 },
        rebounds: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

export default League;
