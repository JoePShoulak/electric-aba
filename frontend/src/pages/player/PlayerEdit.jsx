import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PlayerEdit = () => {
  const { id } = useParams(); // Get the player ID from the URL
  const [playerData, setPlayerData] = useState({
    name: "",
    position: "",
    stats: { points: 0, assists: 0, rebounds: 0 },
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current player data for editing
    axios
      .get(`http://localhost:5000/api/players/${id}`)
      .then(response => {
        setPlayerData(response.data);
      })
      .catch(err => {
        setError("Error fetching player details.");
        console.error(err);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name in playerData.stats) {
      setPlayerData(prevState => ({
        ...prevState,
        stats: { ...prevState.stats, [name]: value },
      }));
    } else {
      setPlayerData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Send the updated player data to the server
    axios
      .put(`http://localhost:5000/api/players/${id}`, playerData)
      .then(() => {
        navigate(`/players/${id}`); // Redirect back to the player profile after updating
      })
      .catch(err => {
        setError("Error updating player.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Edit Player</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={playerData.name}
          placeholder="Player Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="position"
          value={playerData.position}
          placeholder="Position"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="points"
          value={playerData.stats.points}
          placeholder="Points"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="assists"
          value={playerData.stats.assists}
          placeholder="Assists"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rebounds"
          value={playerData.stats.rebounds}
          placeholder="Rebounds"
          onChange={handleInputChange}
        />
        <button type="submit">Update Player</button>
      </form>
    </main>
  );
};

export default PlayerEdit;
