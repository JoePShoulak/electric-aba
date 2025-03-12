import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Team = () => {
  const { id } = useParams(); // Get the team ID from the URL
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

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setError("You need to be logged in to delete a team.");
    }

    axios
      .delete(`http://localhost:5000/api/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/teams"); // Redirect to the teams list after deletion
      })
      .catch(err => {
        setError("Error deleting team.");
        console.error(err);
      });
  };

  if (error) return <p>{error}</p>;

  return (
    <main>
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
          <button onClick={handleDelete}>Delete Team</button>{" "}
        </>
      ) : (
        <p>Loading team details...</p>
      )}
    </main>
  );
};

export default Team;
