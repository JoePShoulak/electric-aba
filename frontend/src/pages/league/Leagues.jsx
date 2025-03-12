import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LeagueForm from "../../components/forms/LeagueForm";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [divisions, setDivisions] = useState([]); // To store available divisions for the current user
  const [newLeague, setNewLeague] = useState({
    name: "",
    divCap: "",
    divs: [], // Array to store selected divisions
  });
  const [error, setError] = useState("");

  // Fetch all leagues created by the logged-in user
  useEffect(() => {
    // Fetch leagues created by the user
    axios
      .get("http://localhost:5000/api/leagues/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Include token for authentication
      })
      .then(response => setLeagues(response.data))
      .catch(err => {
        setError("Error fetching leagues.");
        console.error(err);
      });

    // Fetch available divisions for the logged-in user
    axios
      .get("http://localhost:5000/api/divisions/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(response => setDivisions(response.data))
      .catch(err => {
        setError("Error fetching divisions.");
        console.error(err);
      });
  }, []);

  // Handle input change for the new league form
  const handleInputChange = e => {
    const { name, value, checked } = e.target;
    if (name === "divs") {
      // Handle multiple divisions (checkboxes)
      setNewLeague(prevState => {
        if (checked) {
          return {
            ...prevState,
            divs: [...prevState.divs, value], // Add selected division
          };
        }

        return {
          ...prevState,
          divs: prevState.divs.filter(divId => divId !== value), // Remove unselected division
        };
      });
    }

    setNewLeague(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the form submission for creating a new league
  const handleSubmit = e => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return setError("You need to be logged in to create a league.");

    axios
      .post("http://localhost:5000/api/leagues", newLeague, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setLeagues([...leagues, response.data]); // Add the new league to the list of leagues
        setNewLeague({ name: "", divCap: "", divs: [] }); // Clear the form after submission
      })
      .catch(err => {
        setError("Error creating league.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Leagues</h2>
      {error && <p>{error}</p>}
      <LeagueForm
        leagueData={newLeague}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        buttonText="Create League"
        divisions={divisions}
      />

      <h3>My Leagues</h3>
      <ul>
        {leagues.length > 0 ? (
          leagues.map(league => (
            <li key={league._id}>
              <Link to={`/leagues/${league._id}`}>{league.name}</Link>
            </li>
          ))
        ) : (
          <p>No leagues available. Create one!</p>
        )}
      </ul>
    </main>
  );
};

export default Leagues;
