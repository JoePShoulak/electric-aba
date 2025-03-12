import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    divCap: { type: Number, required: true },
    foundingYear: { type: Number, required: true },
    gamesPerSet: { type: Number, required: true },
    monthBegin: { type: Number, required: true },
    monthEnd: { type: Number, required: true },
    seasons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Season",
        default: [],
      },
    ], // Reference to Season
    divs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Division", // Reference to Division model
      },
    ], // Reference to Divisions
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

export default League;
