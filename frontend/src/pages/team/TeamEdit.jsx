import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TeamEdit = () => {
  const { id } = useParams(); // Get the team ID from the URL
  const [teamData, setTeamData] = useState({
    name: "",
    city: "",
    players: [], // Players that are currently part of the team
  });
  const [availablePlayers, setAvailablePlayers] = useState([]); // Players the user owns
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate to redirect after saving

  useEffect(() => {
    // Fetch the team data
    axios
      .get(`http://localhost:5000/api/teams/${id}`)
      .then(response => {
        setTeamData(response.data); // Set the team data
      })
      .catch(err => {
        setError("Error fetching team details.");
        console.error(err);
      });

    // Fetch players owned by the logged-in user
    axios
      .get("http://localhost:5000/api/players/owned", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setAvailablePlayers(response.data); // Set available players
      })
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value, checked } = e.target;

    // Update the players array when a checkbox is checked/unchecked
    if (name === "players") {
      setTeamData(prevState => {
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
      setTeamData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/teams/${id}`, teamData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate(`/teams/${id}`); // Redirect to the team profile page
      })
      .catch(err => {
        setError("Error updating team.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Edit Team</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={teamData.name}
          placeholder="Team Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          value={teamData.city}
          placeholder="City"
          onChange={handleInputChange}
        />

        <div>
          <h3>Select Players</h3>
          {availablePlayers.map(player => (
            <div key={player._id}>
              <label>
                <input
                  type="checkbox"
                  name="players"
                  value={player._id} // Player ID as value
                  checked={teamData.players.includes(player._id)} // Pre-select the players who are part of the team
                  onChange={handleInputChange}
                />
                {player.name}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Update Team</button>
      </form>
    </main>
  );
};

export default TeamEdit;
