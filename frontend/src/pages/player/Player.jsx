import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
        navigate("/players");
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
          <h2>
            {player.first} {player.last}
          </h2>
          {player.nickname && <p>Nickname: {player.nickname}</p>}
          <p>Position: {player.position}</p>
          <p>Born: {player.born}</p>
          <p>College: {player.college}</p>
          <p>Stock: {player.stock ? "Yes" : "No"}</p>
          <p>Year Signed: {player.year_signed}</p>
          <p>Years Played: {player.years}</p>
          <p>PPG: {player.ppg}</p>
          <p>APG: {player.apg}</p>
          <p>RPG: {player.rpg}</p>
          <p>FGPG: {player.fgpg}</p>

          <button onClick={() => navigate(`/players/${id}/edit`)}>
            Edit Player
          </button>
          <button onClick={handleDelete}>Delete Player</button>
        </>
      ) : (
        <p>Loading player details...</p>
      )}
    </main>
  );
};

export default Player;
