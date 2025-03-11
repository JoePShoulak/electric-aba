import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TeamForm from "../../components/forms/TeamForm";

const TeamEdit = () => {
  const { id } = useParams(); // Get the team ID from the URL
  const [teamData, setTeamData] = useState({
    name: "",
    city: "",
    players: [],
  });
  const [availablePlayers, setAvailablePlayers] = useState([]); // Players owned by the user
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch team data for editing
    axios
      .get(`http://localhost:5000/api/teams/${id}`)
      .then(response => {
        setTeamData(response.data);
      })
      .catch(err => {
        setError("Error fetching team details.");
        console.error(err);
      });

    // Fetch players the user owns
    axios
      .get("http://localhost:5000/api/players/owned", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setAvailablePlayers(response.data); // Set available players
      })
      .catch(err => {
        setError("Error fetching players.");
        console.error(err);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value, checked } = e.target;

    // Update players array when a checkbox is checked/unchecked
    if (name === "players") {
      setTeamData(prevState => {
        if (checked) {
          return {
            ...prevState,
            players: [...prevState.players, value],
          };
        } else {
          return {
            ...prevState,
            players: prevState.players.filter(playerId => playerId !== value),
          };
        }
      });
    } else {
      setTeamData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/teams/${id}`, teamData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate(`/teams/${id}`); // Redirect back to the team profile
      })
      .catch(err => {
        setError("Error updating team.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Edit Team</h2>
      {error && <p>{error}</p>}

      {/* Use the TeamForm component */}
      <TeamForm
        teamData={teamData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        players={availablePlayers}
        buttonText="Update Team"
      />
    </main>
  );
};

export default TeamEdit;
