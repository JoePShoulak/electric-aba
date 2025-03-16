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
      first:
        randomNames[Math.floor(Math.random() * randomNames.length)].split(
          " "
        )[0],
      last: randomNames[Math.floor(Math.random() * randomNames.length)].split(
        " "
      )[1],
      nickname: "", // Optional, if you want a random nickname, you can add it here
      position:
        randomPositions[Math.floor(Math.random() * randomPositions.length)],
      born: Math.floor(Math.random() * (1990 - 1960 + 1)) + 1960, // Random year of birth between 1960 and 1990
      college: "Random College", // You can update this to fetch or randomize as needed
      stock: Math.random() > 0.5, // Random true/false for stock
      year_signed: Math.floor(Math.random() * (2022 - 2015 + 1)) + 2015, // Random year signed between 2015 and 2022
      years: Math.floor(Math.random() * 10) + 1, // Random number of years (1-10)
      ppg: Math.floor(Math.random() * 30), // Random points per game between 0 and 30
      apg: Math.floor(Math.random() * 10), // Random assists per game between 0 and 10
      rpg: Math.floor(Math.random() * 15), // Random rebounds per game between 0 and 15
      fgpg: Math.floor(Math.random() * 5), // Random field goals per game between 0 and 5
    };

    setPlayerData(randomPlayer);
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
        placeholder="Nickname (Optional)"
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
      <button type="submit">{buttonText}</button>
      <button type="button" onClick={randomize}>
        Randomize Player
      </button>
    </form>
  );
};

export default PlayerForm;
