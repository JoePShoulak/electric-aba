import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import teamRoutes from "./routes/team.js";
import playerRoutes from "./routes/player.js";
import leagueRoutes from "./routes/league.js";
import divisionRoutes from "./routes/division.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS setup
const corsOptions = {
  origin: "http://localhost:5173", // Replace this with your frontend URL/port
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/leagues", leagueRoutes);
app.use("/api/divisions", divisionRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
