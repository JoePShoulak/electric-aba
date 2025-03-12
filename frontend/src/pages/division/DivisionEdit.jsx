import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DivisionEdit = () => {
  const { id } = useParams();
  const [divisionData, setDivisionData] = useState({
    name: "",
    teamCap: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/divisions/${id}`)
      .then(response => setDivisionData(response.data))
      .catch(err => {
        setError("Error fetching division details.");
        console.error(err);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setDivisionData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/divisions/${id}`, divisionData)
      .then(() => {
        navigate(`/divisions/${id}`); // Redirect to division page after update
      })
      .catch(err => {
        setError("Error updating division.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Edit Division</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={divisionData.name}
          placeholder="Division Name"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="teamCap"
          value={divisionData.teamCap}
          placeholder="Team Cap"
          onChange={handleInputChange}
        />
        <button type="submit">Update Division</button>
      </form>
    </main>
  );
};

export default DivisionEdit;
