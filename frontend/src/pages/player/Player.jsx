import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // To access the player ID

const Player = () => {
  const { id } = useParams(); // Get the player ID from the URL
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate to redirect to the edit page

  useEffect(() => {
    // Fetch player details using the player ID
    axios
      .get(`http://localhost:5000/api/players/${id}`)
      .then(response => {
        setPlayer(response.data);
      })
      .catch(err => {
        setError("Error fetching player details.");
        console.error(err);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setError("You need to be logged in to delete a player.");
    }

    axios
      .delete(`http://localhost:5000/api/players/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/players"); // Redirect to the players list after deletion
      })
      .catch(err => {
        setError("Error deleting player.");
        console.error(err);
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <main>
      {player ? (
        <>
          <h2>{player.name}</h2>
          <p>Position: {player.position}</p>
          <p>Points: {player.stats.points}</p>
          <p>Assists: {player.stats.assists}</p>
          <p>Rebounds: {player.stats.rebounds}</p>
          <button onClick={() => navigate(`/players/${id}/edit`)}>
            Edit Player
          </button>
          <button onClick={handleDelete}>Delete Player</button>{" "}
        </>
      ) : (
        <p>Loading player details...</p>
      )}
    </main>
  );
};

export default Player;
