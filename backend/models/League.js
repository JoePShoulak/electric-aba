import mongoose from "mongoose";
const leagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    divCap: { type: Number, required: true },
    divs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Division",
      },
    ], // Reference to Team
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

export default League;
