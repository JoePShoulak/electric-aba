import React from "react";

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

const PlayerForm = ({
  playerData,
  setPlayerData,
  handleInputChange,
  handleSubmit,
  error,
  buttonText,
}) => {
  const randomize = e => {
    e.preventDefault();

    const randomPlayer = {
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      position:
        randomPositions[Math.floor(Math.random() * randomPositions.length)],
      stats: {
        points: Math.floor(Math.random() * 50),
        assists: Math.floor(Math.random() * 30),
        rebounds: Math.floor(Math.random() * 20),
      },
    };

    playerData = randomPlayer;
    setPlayerData(randomPlayer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={playerData.name}
        placeholder="Player Name"
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
        name="stats.points"
        value={playerData.stats.points}
        placeholder="Points"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="stats.assists"
        value={playerData.stats.assists}
        placeholder="Assists"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="stats.rebounds"
        value={playerData.stats.rebounds}
        placeholder="Rebounds"
        onChange={handleInputChange}
      />
      {error && <p>{error}</p>}
      <button type="submit">{buttonText}</button>
      <button onClick={randomize}>Random</button>
    </form>
  );
};

export default PlayerForm;
