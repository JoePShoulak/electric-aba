import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Season = () => {
  const { id } = useParams(); // Get the season ID from the URL
  const [season, setSeason] = useState(null); // State to store season data
  const [error, setError] = useState(""); // State for errors

  useEffect(() => {
    // Fetch the season details using the season ID from the URL
    axios
      .get(`http://localhost:5000/api/leagues/seasons/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => {
        setSeason(response.data); // Set the season data in state
      })
      .catch(err => {
        setError("Error fetching season details.");
        console.error(err);
      });
  }, [id]); // Runs only when the id in the URL changes

  if (error) return <p>{error}</p>;

  return (
    <main>
      <h2>Season Details</h2>
      {season ? (
        <div>
          <h3>
            {season.name} - {season.year}
          </h3>
          <p>
            <strong>Status:</strong>{" "}
            {season.complete ? "Completed" : "In Progress"}
          </p>

          <h4>Games:</h4>
          <ul>
            {season.games && season.games.length > 0 ? (
              season.games.map((game, index) => (
                <li key={index}>
                  {game.homeTeam} vs {game.awayTeam} - {game.date}
                </li>
              ))
            ) : (
              <p>No games scheduled yet.</p>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading season data...</p>
      )}
    </main>
  );
};

export default Season;
