import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    teamCap: { type: Number, required: true },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true }
);

const Division = mongoose.model("Division", divisionSchema);

export default Division;
