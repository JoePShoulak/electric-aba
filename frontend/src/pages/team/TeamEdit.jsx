import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TeamEdit = () => {
  const { id } = useParams();
  const [teamData, setTeamData] = useState({
    name: "",
    city: "",
    players: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teams/${id}`)
      .then(response => {
        setTeamData(response.data);
      })
      .catch(err => {
        setError("Error fetching team details.");
        console.error(err);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setTeamData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/teams/${id}`, teamData)
      .then(() => {
        navigate(`/teams/${id}`);
      })
      .catch(err => {
        setError("Error updating team.");
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Edit Team</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={teamData.name}
          placeholder="Team Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          value={teamData.city}
          placeholder="City"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="players"
          value={teamData.players.join(", ")} // A simple text input for player names
          placeholder="Players"
          onChange={handleInputChange}
        />
        <button type="submit">Update Team</button>
      </form>
    </div>
  );
};

export default TeamEdit;
