import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayerForm from "../../components/forms/PlayerForm";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all players
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/players/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => setPlayers(response.data))
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, []);

  const handleSuccess = newPlayer => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  return (
    <main>
      <h2>Players</h2>
      {error && <p>{error}</p>}

      {/* Use the PlayerForm component for adding players */}
      <PlayerForm mode="create" onSuccess={handleSuccess} error={error} />

      <h2>My players ({players.length})</h2>
      {players.length > 0 ? (
        <ul>
          {players.map(player => (
            <li key={player._id}>
              <Link to={`/players/${player._id}`}>
                {player.first} {player.last} ({player.position})
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
