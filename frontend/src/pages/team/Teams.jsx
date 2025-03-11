import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]); // To store players the current user owns
  const [error, setError] = useState("");
  const [newTeam, setNewTeam] = useState({
    name: "",
    city: "",
    players: [], // Array to store selected player IDs
  });

  useEffect(() => {
    // Fetch all teams
    axios
      .get("http://localhost:5000/api/teams/all")
      .then(response => {
        setTeams(response.data);
      })
      .catch(err => {
        setError("Error fetching teams.");
        console.error(err);
      });

    // Fetch players owned by the logged-in user
    axios
      .get("http://localhost:5000/api/players/owned", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setPlayers(response.data); // Set the players
      })
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value, checked } = e.target;

    // Update the players array when a checkbox is checked/unchecked
    if (name === "players") {
      setNewTeam(prevState => {
        if (checked) {
          return {
            ...prevState,
            players: [...prevState.players, value], // Add player to array if checked
          };
        } else {
          return {
            ...prevState,
            players: prevState.players.filter(playerId => playerId !== value), // Remove player if unchecked
          };
        }
      });
    } else {
      setNewTeam(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/teams", newTeam, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setTeams([...teams, response.data]);
        setNewTeam({ name: "", city: "", players: [] });
      })
      .catch(err => {
        setError("Error creating team.");
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Teams</h2>
      {error && <p>{error}</p>}

      {/* Add Team Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newTeam.name}
          placeholder="Team Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          value={newTeam.city}
          placeholder="City"
          onChange={handleInputChange}
        />

        <div>
          <h3>Select Players</h3>
          {players.map(player => (
            <div key={player._id}>
              <label>
                <input
                  type="checkbox"
                  name="players"
                  value={player._id} // Player ID as value
                  checked={newTeam.players.includes(player._id)} // Check if player is selected
                  onChange={handleInputChange}
                />
                {player.name}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Add Team</button>
      </form>

      {/* List of teams */}
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <Link to={`/teams/${team._id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsList;
