import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PlayerForm from "../../components/forms/PlayerForm";

const PlayerEdit = () => {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/players/${id}`)
      .then(response => setPlayerData(response.data))
      .catch(err => {
        setError("Error fetching player details.");
        console.error(err);
      });
  }, [id]);

  const handleSuccess = () => {
    navigate(`/players/${id}`);
  };

  return (
    <main>
      <h2>Edit Player</h2>
      {error && <p>{error}</p>}

      {playerData ? (
        <PlayerForm
          mode="edit"
          initialData={playerData}
          playerId={id}
          onSuccess={handleSuccess}
          error={error}
        />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default PlayerEdit;
