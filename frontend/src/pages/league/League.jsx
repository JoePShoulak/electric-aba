import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Season = ({ data }) => {
  return (
    <>
      <h3>Current Season</h3>
      <p>Year: {data.year}</p>
    </>
  );
};

const League = () => {
  const { id } = useParams();
  const [league, setLeague] = useState({});
  const [error, setError] = useState("");

  const [seasonData, setSeasonData] = useState({});

  const play = () => {
    console.log(league.seasons);
    console.log(seasonData);
    const currentSeasonId = league.seasons.find(s => !s.complete);

    if (!currentSeasonId) {
      const year =
        league.seasons.length == 0
          ? league.foundingYear
          : league.seasons.sort(s => s.year)[0].year;

      axios
        .post(
          `http://localhost:5000/api/leagues/${id}/season`,
          {
            league: id,
            year,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, // Include token for authentication
          }
        )
        .then(response => {
          setSeasonData(response.data);
          refreshLeague(id);
        })
        .catch(err => {
          setError("Error creating season.");
          console.error(err);
        });
    } else {
      axios
        .get(`http://localhost:5000/api/leagues/season/${currentSeasonId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }, // Include token for authentication
        })
        .then(response => setSeasonData(response.data))
        .catch(err => {
          setError("Error loading season.");
          console.error(err);
        });
    }
  };

  const refreshLeague = id => {
    axios
      .get(`http://localhost:5000/api/leagues/${id}`)
      .then(response => setLeague(response.data))
      .catch(err => {
        setError("Error fetching league details.");
        console.error(err);
      });
  };

  useEffect(() => {
    // Fetch the league details
    refreshLeague(id);
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
      <br />
      <button onClick={play}>Play!</button>

      {seasonData && <Season data={seasonData} />}
    </main>
  );
};

export default League;
