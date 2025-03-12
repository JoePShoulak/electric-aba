import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Division = () => {
  const { id } = useParams();
  const [division, setDivision] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/divisions/${id}`)
      .then(response => setDivision(response.data))
      .catch(err => {
        setError("Error fetching division.");
        console.error(err);
      });
  }, [id]);

  return (
    <main>
      {error && <p>{error}</p>}
      {division && (
        <>
          <h2>{division.name}</h2>
          <p>Team Cap: {division.teamCap}</p>
          <p>Teams: {division.teams.length}</p>
          <Link to={`/divisions/${division._id}/edit`}>Edit Division</Link>
        </>
      )}
    </main>
  );
};

export default Division;
