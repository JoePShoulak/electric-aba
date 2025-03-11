import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [newTeam, setNewTeam] = useState({
    name: "",
    city: "",
    players: [], // Array to store selected player IDs
  });

  useEffect(() => {
    // Fetch all teams when the component mounts
    axios
      .get("http://localhost:5000/api/teams/all")
      .then(response => {
        setTeams(response.data); // Update state with fetched teams
      })
      .catch(err => {
        setError("Error fetching teams.");
        console.error(err);
      });
  }, []);

  const handleDelete = teamId => {
    // Send DELETE request to remove the team
    axios
      .delete(`http://localhost:5000/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setTeams(teams.filter(team => team._id !== teamId)); // Remove team from state
      })
      .catch(err => {
        setError("Error deleting team.");
        console.error(err);
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewTeam(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
          {/* Render available players here */}
        </div>

        <button type="submit">Add Team</button>
      </form>

      {/* List of teams with delete button */}
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <Link to={`/teams/${team._id}`}>{team.name}</Link>
            <button onClick={() => handleDelete(team._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TeamsList;
