import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const Division = () => {
  const { id } = useParams(); // Get the division ID from the URL
  const [division, setDivision] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // To navigate after deleting

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/divisions/${id}`)
      .then(response => setDivision(response.data))
      .catch(err => {
        setError("Error fetching division.");
        console.error(err);
      });
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setError("You need to be logged in to delete a division.");
    }

    axios
      .delete(`http://localhost:5000/api/divisions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        navigate("/divisions"); // Redirect to the divisions list after deletion
      })
      .catch(err => {
        setError("Error deleting division.");
        console.error(err);
      });
  };

  return (
    <main>
      {error && <p>{error}</p>}
      {division && (
        <>
          <h2>{division.name}</h2>
          <p>Team Cap: {division.teamCap}</p>
          <p>Teams: {division.teams.length}</p>
          <Link to={`/divisions/${division._id}/edit`}>Edit Division</Link>
          <br />
          <button onClick={handleDelete}>Delete Division</button>{" "}
          {/* Delete button */}
        </>
      )}
    </main>
  );
};

export default Division;
