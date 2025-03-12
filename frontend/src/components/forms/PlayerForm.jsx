// PlayerForm.js
import React from "react";

const PlayerForm = ({
  playerData,
  handleInputChange,
  handleSubmit,
  error,
  buttonText,
}) => {
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
    </form>
  );
};

export default PlayerForm;
