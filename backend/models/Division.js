const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teamCap: { type: Number, required: true },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
    ], // Reference to Team
  },
  { timestamps: true }
);

const Division = mongoose.model("Division", divisionSchema);

module.exports = Division;
