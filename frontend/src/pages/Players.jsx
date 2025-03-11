import React, { useState, useEffect } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    stats: { points: 0, assists: 0, rebounds: 0 },
    team: "", // Add a team selection field
  });

  // Fetch all players
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/players/all")
      .then(response => setPlayers(response.data))
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPlayer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Ensure the token exists before sending the request
      if (!token) {
        setError("You need to be logged in to create a player.");
        return;
      }

      // Send request to create a new player with the token in the Authorization header
      const response = await axios.post(
        "http://localhost:5000/api/players",
        newPlayer,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as part of the Authorization header
          },
        }
      );

      setPlayers([...players, response.data]); // Update the players list with the new player
      setNewPlayer({
        name: "",
        position: "",
        stats: { points: 0, assists: 0, rebounds: 0 },
        team: "",
      });
    } catch (err) {
      setError("Error creating player.");
      console.error(err);
    }
  };

  const handleDelete = async playerId => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${playerId}`);
      setPlayers(players.filter(player => player._id !== playerId));
    } catch (err) {
      setError("Error deleting player.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Players</h2>
      {error && <p>{error}</p>}

      {/* Form to create a new player */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newPlayer.name}
          placeholder="Player Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="position"
          value={newPlayer.position}
          placeholder="Position"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="points"
          value={newPlayer.stats.points}
          placeholder="Points"
          onChange={e =>
            setNewPlayer(prevState => ({
              ...prevState,
              stats: { ...prevState.stats, points: e.target.value },
            }))
          }
        />
        <input
          type="number"
          name="assists"
          value={newPlayer.stats.assists}
          placeholder="Assists"
          onChange={e =>
            setNewPlayer(prevState => ({
              ...prevState,
              stats: { ...prevState.stats, assists: e.target.value },
            }))
          }
        />
        <input
          type="number"
          name="rebounds"
          value={newPlayer.stats.rebounds}
          placeholder="Rebounds"
          onChange={e =>
            setNewPlayer(prevState => ({
              ...prevState,
              stats: { ...prevState.stats, rebounds: e.target.value },
            }))
          }
        />
        <button type="submit">Add Player</button>
      </form>

      <ul>
        {players.map(player => (
          <li key={player._id}>
            <span>
              {player.name} ({player.position})
            </span>
            <button onClick={() => handleDelete(player._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
