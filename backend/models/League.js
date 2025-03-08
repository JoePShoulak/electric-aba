const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    divCap: { type: Number, required: true },
    divs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Division",
        required: true,
      },
    ], // Reference to Team
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

module.exports = League;
