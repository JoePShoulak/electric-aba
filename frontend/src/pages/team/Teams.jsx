import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeamForm from "../../components/forms/TeamForm";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]); // Players the user owns
  const [error, setError] = useState("");
  const [newTeam, setNewTeam] = useState({
    name: "",
    city: "",
    players: [], // Array to store selected player IDs
  });

  // Fetch all teams and players
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teams/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setTeams(response.data);
      })
      .catch(err => {
        setError("Error fetching teams.");
        console.error(err);
      });

    axios
      .get("http://localhost:5000/api/players/owned", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setPlayers(response.data); // Set the players the user owns
      })
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value, checked } = e.target;

    // Update players array when a checkbox is checked/unchecked
    if (name === "players") {
      setNewTeam(prevState => {
        if (checked) {
          return {
            ...prevState,
            players: [...prevState.players, value],
          };
        } else {
          return {
            ...prevState,
            players: prevState.players.filter(playerId => playerId !== value),
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
    <main>
      <h2>Teams</h2>
      {error && <p>{error}</p>}

      {/* Use the TeamForm component */}
      <TeamForm
        teamData={newTeam}
        setTeamData={setNewTeam}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        players={players}
        buttonText="Add Team"
      />

      <h2>My Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <Link to={`/teams/${team._id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Teams;
