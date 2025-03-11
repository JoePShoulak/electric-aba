import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Team = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teams/${id}`)
      .then(response => {
        setTeam(response.data);
      })
      .catch(err => {
        setError("Error fetching team details.");
        console.error(err);
      });
  }, [id]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {team ? (
        <>
          <h2>{team.name}</h2>
          <p>City: {team.city}</p>
          <p>Players:</p>
          <ul>
            {team.players.map(player => (
              <li key={player._id}>{player.name}</li>
            ))}
          </ul>
          <button onClick={() => navigate(`/teams/${id}/edit`)}>
            Edit Team
          </button>
        </>
      ) : (
        <p>Loading team details...</p>
      )}
    </div>
  );
};

export default Team;
