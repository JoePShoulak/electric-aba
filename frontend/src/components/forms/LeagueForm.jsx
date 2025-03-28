import React from "react";

const LeagueForm = ({
  leagueData,
  handleInputChange,
  handleSubmit,
  error,
  buttonText,
  divisions,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={leagueData.name}
        placeholder="League Name"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="divCap"
        value={leagueData.divCap}
        placeholder="Division Capacity"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="foundingYear"
        value={leagueData.foundingYear}
        placeholder="Founding Year"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="gamesPerSet"
        value={leagueData.gamesPerSet}
        placeholder="Games Per Set"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="monthBegin"
        value={leagueData.monthBegin}
        placeholder="Start Month"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="monthEnd"
        value={leagueData.monthEnd}
        placeholder="End Month"
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
                checked={leagueData.divs.includes(div._id)} // Check if division is selected
                onChange={handleInputChange}
              />
              {div.name}
            </label>
          </div>
        ))}
      </div>

      {error && <p>{error}</p>}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default LeagueForm;
