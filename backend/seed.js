import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import League from "./models/League.js";
import Division from "./models/Division.js";
import Team from "./models/Team.js";
import Player from "./models/Player.js";

// Connect to the MongoDB database
mongoose
  .connect("mongodb://localhost:27017/your_database_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch(err => console.log("Database connection error: ", err));

const seedData = async () => {
  // Create a user
  const password = "passpass";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: "testuser",
    email: "testuser@example.com",
    password: hashedPassword,
  });

  await user.save();

  // Create 2 divisions
  const division1 = new Division({
    name: "Division 1",
    teamCap: 2,
    user: user._id,
  });

  const division2 = new Division({
    name: "Division 2",
    teamCap: 2,
    user: user._id,
  });

  await division1.save();
  await division2.save();

  // Create 2 teams for each division, with 10 players per team
  const team1 = new Team({
    name: "Team A1",
    user: user._id,
    division: division1._id,
  });

  const team2 = new Team({
    name: "Team B1",
    user: user._id,
    division: division1._id,
  });

  const team3 = new Team({
    name: "Team A2",
    user: user._id,
    division: division2._id,
  });

  const team4 = new Team({
    name: "Team B2",
    user: user._id,
    division: division2._id,
  });

  await team1.save();
  await team2.save();
  await team3.save();
  await team4.save();

  // Add teams to their divisions
  division1.teams.push(team1._id, team2._id);
  division2.teams.push(team3._id, team4._id);
  await division1.save();
  await division2.save();

  // Create 10 players for each team
  const createPlayers = async team => {
    for (let i = 0; i < 10; i++) {
      const player = new Player({
        name: `Player ${team.name} ${i + 1}`,
        position: "Position " + (i + 1),
        stats: { points: 0, assists: 0, rebounds: 0 },
        team: team._id,
        user: user._id,
      });

      await player.save();
      team.players.push(player._id);
    }
    await team.save();
  };

  await createPlayers(team1);
  await createPlayers(team2);
  await createPlayers(team3);
  await createPlayers(team4);

  // Create a league and assign divisions
  const league = new League({
    name: "Test League",
    divCap: 2,
    divs: [division1._id, division2._id],
    user: user._id,
  });

  await league.save();

  console.log("Seed data created successfully!");
  mongoose.connection.close();
};

seedData().catch(err => {
  console.error("Error seeding data:", err);
  mongoose.connection.close();
});
