import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LeagueForm from "../../components/forms/LeagueForm";

const LeagueEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leagueData, setLeagueData] = useState({
    name: "",
    divCap: "",
    divs: [],
  });
  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch league and divisions
    axios
      .get(`http://localhost:5000/api/leagues/${id}`)
      .then(response => {
        setLeagueData(response.data);
      })
      .catch(err => {
        setError("Error fetching league details.");
        console.error(err);
      });

    axios
      .get("http://localhost:5000/api/divisions/all")
      .then(response => {
        setDivisions(response.data);
      })
      .catch(err => {
        setError("Error fetching divisions.");
        console.error(err);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value, checked } = e.target;
    if (name === "divs") {
      setLeagueData(prevState => {
        if (checked) {
          return {
            ...prevState,
            divs: [...prevState.divs, value],
          };
        } else {
          return {
            ...prevState,
            divs: prevState.divs.filter(divId => divId !== value),
          };
        }
      });
    } else {
      setLeagueData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/leagues/${id}`, leagueData)
      .then(() => {
        navigate(`/leagues/${id}`);
      })
      .catch(err => {
        setError("Error updating league.");
        console.error(err);
      });
  };

  return (
    <main>
      <h2>Edit League</h2>
      <LeagueForm
        leagueData={leagueData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        buttonText="Update League"
        divisions={divisions}
      />
    </main>
  );
};

export default LeagueEdit;
