import React, { useState, useEffect } from "react";
import axios from "axios";

const randomNames = [
  "LeBron James",
  "Kevin Durant",
  "Stephen Curry",
  "Kawhi Leonard",
  "Giannis Antetokounmpo",
  "Anthony Davis",
  "James Harden",
  "Luka Doncic",
  "Damian Lillard",
  "Nikola Jokic",
];

const randomPositions = [
  "Point Guard",
  "Shooting Guard",
  "Small Forward",
  "Power Forward",
  "Center",
];

const PlayerForm = ({ mode, initialData = {}, playerId, onSuccess, error }) => {
  const [playerData, setPlayerData] = useState({
    first: "",
    last: "",
    nickname: "",
    position: "",
    born: "",
    college: "",
    stock: false,
    year_signed: "",
    years: "",
    ppg: 0,
    apg: 0,
    rpg: 0,
    fgpg: 0,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setPlayerData(initialData);
    }
  }, [mode, initialData]);

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setPlayerData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = {
        ...playerData,
        user: playerData.user || localStorage.getItem("userId"), // Ensure user field is included
      };

      let response;
      const headers = { Authorization: `Bearer ${token}` };

      if (mode === "edit") {
        response = await axios.put(
          `http://localhost:5000/api/players/${playerId}`,
          payload,
          { headers }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/players",
          payload,
          { headers }
        );
      }

      onSuccess(response.data);
    } catch (err) {
      console.error("Error submitting player:", err);
    }
  };

  const randomize = e => {
    e.preventDefault();
    setPlayerData({
      first:
        randomNames[Math.floor(Math.random() * randomNames.length)].split(
          " "
        )[0],
      last: randomNames[Math.floor(Math.random() * randomNames.length)].split(
        " "
      )[1],
      nickname: "",
      position:
        randomPositions[Math.floor(Math.random() * randomPositions.length)],
      born: Math.floor(Math.random() * (1990 - 1960 + 1)) + 1960,
      college: "Random College",
      stock: Math.random() > 0.5,
      year_signed: Math.floor(Math.random() * (2022 - 2015 + 1)) + 2015,
      years: Math.floor(Math.random() * 10) + 1,
      ppg: Math.floor(Math.random() * 30),
      apg: Math.floor(Math.random() * 10),
      rpg: Math.floor(Math.random() * 15),
      fgpg: Math.floor(Math.random() * 5),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first"
        value={playerData.first}
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="last"
        value={playerData.last}
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="nickname"
        value={playerData.nickname}
        placeholder="Nickname"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="position"
        value={playerData.position}
        placeholder="Position"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="born"
        value={playerData.born}
        placeholder="Born Year"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="college"
        value={playerData.college}
        placeholder="College"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="year_signed"
        value={playerData.year_signed}
        placeholder="Year Signed"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="years"
        value={playerData.years}
        placeholder="Years Played"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="ppg"
        value={playerData.ppg}
        placeholder="Points per Game"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="apg"
        value={playerData.apg}
        placeholder="Assists per Game"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="rpg"
        value={playerData.rpg}
        placeholder="Rebounds per Game"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="fgpg"
        value={playerData.fgpg}
        placeholder="Field Goals per Game"
        onChange={handleInputChange}
      />

      {error && <p>{error}</p>}

      <button type="submit">
        {mode === "edit" ? "Update Player" : "Create Player"}
      </button>
      {mode === "create" && (
        <button type="button" onClick={randomize}>
          Randomize Player
        </button>
      )}
    </form>
  );
};

export default PlayerForm;
