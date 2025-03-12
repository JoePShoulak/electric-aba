// TeamForm.js
import React from "react";

const randomNames = [
  "Lakers",
  "Warriors",
  "Celtics",
  "Bulls",
  "Heat",
  "Spurs",
  "Rockets",
  "Nets",
  "Clippers",
  "Suns",
];

const randomCities = [
  "Los Angeles",
  "San Francisco",
  "Boston",
  "Chicago",
  "Miami",
  "San Antonio",
  "Houston",
  "Brooklyn",
  "Los Angeles",
  "Phoenix",
];

const TeamForm = ({
  teamData,
  setTeamData,
  handleInputChange,
  handleSubmit,
  error,
  players,
  buttonText,
}) => {
  const randomize = e => {
    e.preventDefault();

    const randomPlayers = [];
    while (randomPlayers.length < 10) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      if (!randomPlayers.includes(randomPlayer._id)) {
        randomPlayers.push(randomPlayer._id);
      }
    }

    const randomTeam = {
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      city: randomCities[Math.floor(Math.random() * randomCities.length)],
      players: randomPlayers,
    };

    setTeamData(randomTeam);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={teamData.name}
        placeholder="Team Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="city"
        value={teamData.city}
        placeholder="City"
        onChange={handleInputChange}
      />

      <div>
        <h3>Select Players</h3>
        {players.map(player => (
          <div key={player._id}>
            <label>
              <input
                type="checkbox"
                name="players"
                value={player._id} // Player ID as value
                checked={teamData.players.includes(player._id)} // Check if player is selected
                onChange={handleInputChange}
              />
              {player.name}
            </label>
          </div>
        ))}
      </div>

      {error && <p>{error}</p>}
      <button type="submit">{buttonText}</button>
      <button onClick={randomize}>Random</button>
    </form>
  );
};

export default TeamForm;
