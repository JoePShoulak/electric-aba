// TeamForm.js
import React from "react";

const TeamForm = ({
  teamData,
  handleInputChange,
  handleSubmit,
  error,
  players,
  buttonText,
}) => {
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
    </form>
  );
};

export default TeamForm;
