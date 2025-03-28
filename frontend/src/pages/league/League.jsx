import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// Helper function to fetch the league details
const fetchLeague = (id, setError, setLeague) => {
  axios
    .get(`http://localhost:5000/api/leagues/${id}`)
    .then(response => {
      setLeague(response.data);
    })
    .catch(err => {
      setError("Error fetching league details.");
      console.error(err);
    });
};

const SeasonList = ({ seasons }) => (
  <div>
    <h3>Seasons</h3>
    <ul>
      {seasons && seasons.length > 0 ? (
        seasons.map((season, index) => (
          <li key={index}>
            <Link to={`/leagues/seasons/${season._id}`}>
              Season {season.year}
            </Link>
          </li>
        ))
      ) : (
        <p>No seasons available.</p>
      )}
    </ul>
  </div>
);

const League = () => {
  const { id } = useParams();
  const [league, setLeague] = useState({});
  const [error, setError] = useState("");

  // Fetch league details when the component mounts
  useEffect(() => {
    fetchLeague(id, setError, setLeague);
  }, [id]);

  // Handle deleting the league
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("You need to be logged in to delete a league.");

    axios
      .delete(`http://localhost:5000/api/leagues/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Redirect user after deletion
        alert("League deleted successfully!");
        window.location.href = "/leagues"; // Redirect back to the leagues list
      })
      .catch(err => {
        setError("Error deleting league.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>League Details</h2>
      {error && <p>{error}</p>}

      <h3>{league.name}</h3>
      <p>Division Capacity: {league.divCap}</p>

      <h4>Divisions:</h4>
      <ul>
        {league.divs && league.divs.length > 0 ? (
          league.divs.map((div, index) => <li key={index}>{div.name}</li>)
        ) : (
          <p>No divisions assigned.</p>
        )}
      </ul>

      <Link to={`/leagues/${league._id}/edit`}>Edit League</Link>

      {/* Delete Button */}
      <button onClick={handleDelete}>Delete League</button>

      <SeasonList seasons={league.seasons} />
    </main>
  );
};

export default League;
