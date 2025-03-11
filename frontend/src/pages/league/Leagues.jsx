import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [divisions, setDivisions] = useState([]); // To store available divisions
  const [error, setError] = useState("");
  const [newLeague, setNewLeague] = useState({
    name: "",
    divCap: "", // Division capacity
    divs: [], // Array to store selected division IDs
  });

  useEffect(() => {
    // Fetch all leagues
    axios
      .get("http://localhost:5000/api/leagues/all")
      .then(response => {
        setLeagues(response.data);
      })
      .catch(err => {
        setError("Error fetching leagues.");
        console.error(err);
      });

    // Fetch all divisions
    axios
      .get("http://localhost:5000/api/divisions/all")
      .then(response => {
        setDivisions(response.data); // Set the divisions
      })
      .catch(err => {
        setError("Error fetching divisions.");
        console.error(err);
      });
  }, []);

  const handleInputChange = e => {
    const { name, value, checked } = e.target;

    // Update the divs array when a checkbox is checked/unchecked
    if (name === "divs") {
      setNewLeague(prevState => {
        if (checked) {
          return {
            ...prevState,
            divs: [...prevState.divs, value], // Add division to array if checked
          };
        } else {
          return {
            ...prevState,
            divs: prevState.divs.filter(divId => divId !== value), // Remove division if unchecked
          };
        }
      });
    } else {
      setNewLeague(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Ensure the token exists before sending the request
      if (!token)
        return setError("You need to be logged in to create a league.");

      // Send request to create a new league
      const response = await axios.post(
        "http://localhost:5000/api/leagues",
        newLeague,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLeagues([...leagues, response.data]); // Update the leagues list with the new league
      setNewLeague({ name: "", divCap: "", divs: [] }); // Clear form data
    } catch (err) {
      setError("Error creating league.");
      console.error(err);
    }
  };

  return (
    <main>
      <h2>Leagues</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newLeague.name}
          placeholder="League Name"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="divCap"
          value={newLeague.divCap}
          placeholder="Division Capacity"
          onChange={handleInputChange}
        />

        <div>
          <h3>Select Divisions</h3>
          {divisions.map(div => (
            <div key={div._id}>
              <label>
                <input
                  type="checkbox"
                  name="divs"
                  value={div._id} // Division ID as value
                  checked={newLeague.divs.includes(div._id)} // Check if division is selected
                  onChange={handleInputChange}
                />
                {div.name}
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Add League</button>
      </form>

      <h2>All Leagues</h2>
      {leagues.length > 0 ? (
        <ul>
          {leagues.map(league => (
            <li key={league._id}>
              <Link to={`/leagues/${league._id}`}>{league.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No leagues available. Add one!</p>
      )}
    </main>
  );
};

export default Leagues;
