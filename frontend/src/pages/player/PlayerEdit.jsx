import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PlayerForm from "../../components/forms/PlayerForm";

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

    axios
      .put(`http://localhost:5000/api/players/${id}`, playerData)
      .then(() => {
        navigate(`/players/${id}`);
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

      {/* Use the PlayerForm component */}
      <PlayerForm
        playerData={playerData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        buttonText="Update Player"
      />
    </main>
  );
};

export default PlayerEdit;
