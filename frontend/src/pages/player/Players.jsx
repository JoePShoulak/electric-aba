import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayerForm from "../../components/forms/PlayerForm";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    stats: { points: 0, assists: 0, rebounds: 0 },
    team: "",
  });

  // Fetch all players
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/players/owned", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => setPlayers(response.data))
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;

    // Check if the input is for a nested object (e.g., stats.points)
    if (name.startsWith("stats.")) {
      const statKey = name.split(".")[1]; // Extract the key (e.g., 'points', 'assists', etc.)
      setNewPlayer(prevState => ({
        ...prevState,
        stats: {
          ...prevState.stats,
          [statKey]: value, // Update the specific stat value
        },
      }));
    } else {
      setNewPlayer(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token)
        return setError("You need to be logged in to create a player.");

      const response = await axios.post(
        "http://localhost:5000/api/players",
        newPlayer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlayers([...players, response.data]);
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

  return (
    <main>
      <h2>Players</h2>
      {error && <p>{error}</p>}

      {/* Use the PlayerForm component */}
      <PlayerForm
        playerData={newPlayer}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        buttonText="Add Player"
      />

      <h2>My players</h2>
      {players.length > 0 ? (
        <ul>
          {players.map(player => (
            <li key={player._id}>
              <Link to={`/players/${player._id}`}>
                {player.name} ({player.position})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players, go ahead and make one!</p>
      )}
    </main>
  );
};

export default Players;
