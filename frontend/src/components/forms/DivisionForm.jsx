import React from "react";

const DivisionForm = ({
  divisionData,
  handleInputChange,
  handleSubmit,
  buttonText,
  teams, // Add teams prop
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={divisionData.name}
        placeholder="Division Name"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="teamCap"
        value={divisionData.teamCap}
        placeholder="Team Cap"
        onChange={handleInputChange}
      />

      <div>
        <h3>Select Teams</h3>
        {teams.map(team => (
          <div key={team._id}>
            <label>
              <input
                type="checkbox"
                name="teams" // The name for the teams field
                value={team._id} // Team ID as value
                checked={divisionData?.teams?.includes(team._id)} // Check if team is selected
                onChange={handleInputChange}
              />
              {team.name} ({team.city})
            </label>
          </div>
        ))}
      </div>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default DivisionForm;
