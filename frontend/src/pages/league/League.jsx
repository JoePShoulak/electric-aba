import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const League = () => {
  const { id } = useParams();
  const [league, setLeague] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the league details
    axios
      .get(`http://localhost:5000/api/leagues/${id}`)
      .then(response => {
        setLeague(response.data);
      })
      .catch(err => {
        setError("Error fetching league details.");
        console.error(err);
      });
  }, [id]);

  return (
    <main>
      <h2>League Details</h2>
      {error && <p>{error}</p>}

      <h3>{league.name}</h3>
      <p>Division Capacity: {league.divCap}</p>

      <h4>Divisions:</h4>
      <ul>
        {league.divs && league.divs.length > 0 ? (
          league.divs.map(div => <li key={div._id}>{div.name}</li>)
        ) : (
          <p>No divisions assigned.</p>
        )}
      </ul>

      <Link to={`/leagues/${league._id}/edit`}>Edit League</Link>
    </main>
  );
};

export default League;
