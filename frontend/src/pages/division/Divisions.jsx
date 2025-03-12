import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DivisionForm from "../../components/forms/DivisionForm";

const Divisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [newDivision, setNewDivision] = useState({ name: "", teamCap: "" });
  const [teams, setTeams] = useState([]); // State to store available teams
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/divisions/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => setDivisions(response.data))
      .catch(err => {
        setError("Error fetching divisions.");
        console.error(err);
      });

    axios
      .get("http://localhost:5000/api/teams/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => setTeams(response.data))
      .catch(err => {
        setError("Error fetching teams.");
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewDivision(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/divisions", newDivision, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setDivisions([...divisions, response.data]);
        setNewDivision({ name: "", teamCap: "" });
      })
      .catch(err => {
        setError("Error creating division.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Divisions</h2>
      {error && <p>{error}</p>}

      <DivisionForm
        divisionData={newDivision}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        buttonText="Create Division"
        teams={teams}
      />

      <ul>
        {divisions.map(division => (
          <li key={division._id}>
            <Link to={`/divisions/${division._id}`}>{division.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Divisions;
